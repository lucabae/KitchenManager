import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import ShoppingList from './pages/ShoppingList';
import Scanner from './pages/Scanner';
import Inventory from './pages/Inventory';
import Layout from './Layout';

let router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children : [
      {
        index:true,
        Component: Inventory,
      },
      {
        path: "/scanner",
        Component: Scanner,
      },
      {
        path: "/shopping-list",
        Component: ShoppingList,
      },
    ]
  }
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
