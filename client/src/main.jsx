import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import './index.css'
import Layout from './Layout.jsx'
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route path='*' element={<PageNotFound />}></Route>

  </Route>

))


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
