import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Photo from "./components/Photo";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
import { ContextProvider } from "./components/Context.js";
import "./input.css";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <App/>
      ),
    
    },
    {
        path:"photos/:imageId",
        element:(
          <Photo/>
        ),
    }
  ]);

root.render( <ContextProvider><RouterProvider router={router} /></ContextProvider>);