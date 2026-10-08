# React User Registration and Login Demo

A simple beginner-friendly React app that demonstrates components, React Router, controlled input fields, validation, fetch(), localStorage, and a JSON file used through JSON Server as a small backend.

## Requirements

- Node.js installed
- A terminal

## Install

1. Open a terminal in this project folder.
2. Install the packages:

```bash
npm install
```

## Run the project

You need two terminals.

### Terminal 1 - Start the JSON backend

```bash
npm run server
```

This starts JSON Server at:

http://localhost:3000

### Terminal 2 - Start React

```bash
npm run dev
```

Open the URL shown by Vite, normally:

http://localhost:5173

## How to use

1. Open Register.
2. Enter a username, email and password.
3. Password must contain at least 6 characters.
4. Click Register.
5. The user is saved in `db.json`.
6. Go to Login.
7. Enter the same username and password.
8. After successful login, you are taken to `/user`.
9. Click Logout to remove the saved login and return to Login.

## Important

This is a learning/demo project. Passwords are stored as plain text in `db.json`. Real applications should use a real backend, secure password hashing and proper authentication/session handling.

## Existing project parts kept

The original Header, Footer, Home page and MDBInput-based form design are kept. The existing `/`, `/login` and `/register` routes are also kept; the `/user` route is added for the User page that already existed in the project.


### Wallpapers
The gallery now contains 58 wallpapers. Each wallpaper can be saved per logged-in user.
