# Running the app in the development

## 1) Configure the environment variables

Create `.env` file in the project root, then copy the content of `.env.example` and paste it on the created `.env` file.

On the `.env` file change the value of `CONTACT_RECEIVER_MAIL` with your email.

Also, feel free to change the value of the following variables (if you want to):

- `PORT`
- `THIS_BACKEND_URL`
- `COOKIES_BASE_DOMAIN`
- `AUTH_FRONTEND_URL`
- `CORS`

The value of the other variable, leave them as them, you do not have to change them.

## 2) Generate RSA Keys
navigate to the project root, then ran the following two commands
```bash
openssl genrsa -out ./keys/jwt.private.key 2048
openssl rsa -in ./keys/jwt.private.key -pubout -out ./keys/jwt.public.key
```

## 3) Run the App
> Docker must be installed on your computer

navigate to the project root, then ran the following command:
```bash
docker-compose up
```
