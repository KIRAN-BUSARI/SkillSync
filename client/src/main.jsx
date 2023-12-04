import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import store from './components/Redux/store.js';
import Layout from './components/Layout/Layout.jsx';
import Signup from './components/Pages/Signup.jsx';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'
import './index.css';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* <Route path="" element={<Home />} /> */}
      <Route path="/signup" element={<Signup /> } />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <App />  */}
      <Toaster />
    </Provider>
  </React.StrictMode>
);
