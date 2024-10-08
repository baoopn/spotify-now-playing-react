# Spotify Currently Playing

This Create React App (CRA) is used to display the currently playing track of the user as well as their 5 most recently played tracks using the Spotify API.

## Made with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Node Version

This app was developed using Create React App v5 with Node.js v16. For best compatibility, please use Node.js v16. You can use [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage and switch between different versions of Node.js.

### Use Node.js v16

```sh
nvm install 16
nvm use 16
```

Ensure you are using Node.js v16 before running the project:

```sh
node -v
# Should output: v16.x.x
```

## Create .env

Use the template `.env.example`.

To sync with your account, you'll need three things from Spotify Developer:
- Client ID
- Client secret
- Refresh token

## Backend

For reference, visit my [spotify-api](https://github.com/baoopn/spotify-api) repository.

## Note

I do ***NOT*** recommend building this Create React App with the `.env` and deploying the static build, as your tokens may be included in one of the built JavaScript files. It’s better to handle token management on the server side for security reasons.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.