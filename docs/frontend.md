## Environment Variables
#### General
| Name                      | Description                                                       |
| ------------------------- | ----------------------------------------------------------------- |
| `NODE_ENV`                | Set to `production` or `development`                              |
| `NEXT_PUBLIC_BACKEND_URL` | URL of the API server. Example: `http://localhost:8000/api/`      |

#### NextAuth Authentication
| Name                 | Description                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| `NEXTAUTH_URL`       | Callback URL for NextAuth redirects. Example: `http://127.0.0.1:3000`        |
| `SESSION_SECRET_KEY` | Secret used to sign session ID cookie                                        |

#### Google Provider (NextAuth)
| Name                   | Description                       |
| ---------------------- | --------------------------------- |
| `GOOGLE_CLIENT_ID`     | OAuth 2.0 Client ID               |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 Client Secret           |
- Refer to [here](https://next-auth.js.org/providers/google)

#### JWT Token
| Name                           | Description                                   |
| ------------------------------ | --------------------------------------------- |
| `JWT_SECRET_KEY`               | Secret used to sign JWT Tokens                |
| `JWT_ACCESS_TOKEN_EXPIRY_MINS` | Number of minutes before access token expires |