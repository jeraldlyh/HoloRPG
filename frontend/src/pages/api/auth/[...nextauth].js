import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import axios from "axios"
import axiosInstance from "../../../axios"
import { isAccessTokenExpired, refreshToken } from "../../../utils/jwt"

const settings = {
    debug: process.env.NODE_ENV === "development",
    secret: process.env.SESSION_SECRET_KEY,
    session: {
        jwt: true,
        maxAge: 7 * 24 * 60 * 60,       // 7 days validity
    },
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
    },
    // pages: {                // Custom pages
    //     signIn: "/login",
    //     signIn: "/faq"
    // },
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Providers.Credentials({
            async authorize(credentials, request) {
                const response = await axiosInstance.post("/api/auth/login/", {
                    username: credentials.username,
                    password: credentials.password
                })

                if (response.status === 200) {
                    return response.data
                }
                return null
            }
        })
    ],
    callbacks: {
        async session(session, token) {
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken
            session.user = token.userProfile
            if (token.error) {
                session.error = token.error
            }
            return session
        },
        async redirect(url, baseUrl) {
            return baseUrl
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (user) {
                if (account.provider === "google") {
                    const { accessToken, idToken } = account

                    try {
                        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/social/google/`, { access_token: accessToken, id_token: idToken })
                        const { access_token, refresh_token } = response.data
                        token = {
                            ...token,
                            accessToken: access_token,
                            refreshToken: refresh_token
                        }
                        return token
                    } catch (error) {
                        return null
                    }
                } else if (account.type === "credentials") {
                    const { access_token, refresh_token, user: user_profile } = user

                    token = {
                        ...token,
                        accessToken: access_token,
                        refreshToken: refresh_token,
                        userProfile: user_profile
                    }
                    return token
                }
            }

            if (isAccessTokenExpired(token.accessToken)) {
                const [newAccessToken] = await refreshToken(token.refreshToken)

                if (newAccessToken) {
                    token = {
                        ...token,
                        accessToken: newAccessToken,
                        // refreshToken: newRefreshToken,
                        iat: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000 + process.env.JWT_ACCESS_TOKEN_EXPIRY_MINS * 60 * 60)
                    }
                    return token
                }
                return {
                    ...token,
                    error: "Unable to refresh token",
                    exp: 0,
                }
            }
            return token
        }
    }
}

export default (request, response) => NextAuth(request, response, settings)