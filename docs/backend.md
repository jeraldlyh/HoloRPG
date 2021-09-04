## Environment Variables
#### General
| Name                      | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `DJANGO_DEBUG`            | Set to `True` or `False`                               |
| `DJANGO_SECRET_KEY`       | Secret used to sign the session, messages, crypography |
Refer to [here](https://docs.djangoproject.com/en/3.2/ref/settings/)

#### Database
| Name                 | Description                          |
| -------------------- | ------------------------------------ |
| `DB_NAME`     | Name of the database to use                 |
| `DB_HOST`     | URI to MySQL database                       |
| `DB_PORT`     | Port to use when connecting to database     |
| `DB_USER`     | Username to use when connecting to database |
| `DB_PASSWORD` | Password to use when connecting to database |

#### Google Provider (NextAuth)
| Name                   | Description                       |
| ---------------------- | --------------------------------- |
| `GOOGLE_CLIENT_ID`     | OAuth 2.0 Client ID               |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 Client Secret           |
- Refer to [here](https://next-auth.js.org/providers/google)

#### JWT Token
| Name                            | Description                                   |
| ------------------------------- | --------------------------------------------- |
| `JWT_SECRET_KEY`                | Secret used to sign JWT Tokens                |
| `JWT_ACCESS_TOKEN_EXPIRY_MINS`  | Number of minutes before access token expires |
| `JWT_REFRESH_TOKEN_EXPIRY_DAYS` | Number of days before refresh token expires   |