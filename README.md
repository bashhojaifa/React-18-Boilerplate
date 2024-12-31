# React 18 Boilerplate

## About the Project

This React 18 Boilerplate serves as a solid foundation for building scalable and efficient web applications with React. It integrates modern tools and libraries to streamline development, enhance performance, and ensure maintainability.

## Features

- **React 18**: The latest version of React with concurrent rendering.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **React Tanstack Table**: A powerful and flexible table library for React.
- **Redux Toolkit**: The official, recommended way to write Redux logic.
- **Formik**: A library for building and managing forms in React.
- **Yup**: A JavaScript schema builder for value parsing and validation.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/React-18-Boilerplate.git
cd React-18-Boilerplate
npm install
```

## Running the Project

To run the project locally, use the following command:

```bash
npm start
```

This will start the development server and open the application in your default browser.

## Project Structure

The project structure is organized as follows:

```
React 18 Boilerplate/
├── src/
│   ├── assets/       # Static files
│   ├── components/   # Reusable UI components
│   ├── constant/     # Constants and configuration files
│   ├── features/     # Redux slices
│   ├── layouts/      # Layout components (e.g., Header, Footer, Sidebar)
│   ├── pages/        # Application pages
│   ├── routes/       # Route configurations
│   ├── utils/        # Reusable utility functions
│   ├── schemas/      # Yup validation schemas
│   ├── services/     # API calls and external services
│   ├── store/        # Redux store configuration
│   ├── App.jsx       # Main App component
│   ├── index.js      # Entry point
└── public/           # Static public files
```

This structure helps in maintaining a clean and organized codebase, making it easier to manage and scale your application.

## Usage

You can start building your application by modifying the components in the `src` directory. The project is already configured to use TailwindCSS, React Tanstack Table, and Redux Toolkit, so you can start using these tools right away.

- **TailwindCSS**: Use utility classes to style your components.
- **React Tanstack Table**: Create and manage tables with ease.
- **Redux Toolkit**: Manage your application's state efficiently.

For more information on how to use these tools, refer to their respective documentation.

## Authentication

This boilerplate includes a basic setup for authentication, including storing access tokens in local storage and implementing private and protected routes.

### Setting Up Authentication

1. **Login Component**: Create a `Login` component where users can enter their credentials and obtain an access token.

2. **Storing Access Token**: Once the user is authenticated, store the access token in local storage:

   ```javascript
   localStorage.setItem("accessToken", token);
   ```

3. **Private Route**: Create a `PrivateRoute` component to protect routes that require authentication:

   ```javascript
   import React from "react";
   import { Route, Redirect } from "react-router-dom";

   const PrivateRoute = ({ component: Component, ...rest }) => (
     <Route
       {...rest}
       render={(props) =>
         localStorage.getItem("accessToken") ? (
           <Component {...props} />
         ) : (
           <Redirect to="/login" />
         )
       }
     />
   );

   export default PrivateRoute;
   ```

4. **Protected Route**: Use the `PrivateRoute` component to protect your routes:

   ```javascript
   <PrivateRoute path="/dashboard" component={Dashboard} />
   ```

### Logging Out

To log out, simply remove the access token from local storage:

```javascript
localStorage.removeItem("accessToken");
```

This will ensure that the user is redirected to the login page when trying to access protected routes.

For more detailed information on implementing authentication, refer to the documentation of the authentication library you are using.
