## Available Scripts

### `python3 manage.py runserver`
Starts a lightweight development Web server. <br />

### `python3 manage.py run`
Bypasses all migration checks and starts a lightweight development Web server. <br />


Open [http://127.0.0.1](http://127.0.0.1) to view the application in the browser. <br />
[Hot reloading](https://docs.djangoproject.com/en/3.2/ref/django-admin/) is enabled by default.

## Authentication
HoloRPG utilises [django-allauth](https://github.com/pennersr/django-allauth) to be able to provide multiple authorization methods such as the following but is not limited to:
| Provider        | Supported          |
| --------------- | :----------------: |
| Email/Password  | :heavy_check_mark: |
| Google          | :heavy_check_mark: |
| Twitter         | :x:                |
| Github          | :x:                |

Configuration of a social account on Django Admin panel is required in order for the integration with [NextAuth](https://next-auth.js.org/) to work seamlessly. <br />
To find out more about how to setup the integration, refer to [here](https://www.section.io/engineering-education/django-google-oauth/).
