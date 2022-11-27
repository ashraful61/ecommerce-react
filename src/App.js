import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Main from "./layouts/Main";
// import Header from './components/Header/Header';
import Shop from "./components/Shop/Shop";
import Orders from "./components/Orders/Orders";
import Inventory from "./components/Inventory/Inventory";
import { ProductsAndCartLoader } from "./loaders/ProductsAndCartLoader";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Shipping from "./components/Shipping/Shipping";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: ProductsAndCartLoader,
          element: <Shop></Shop>,
        },
        {
          path: "orders",
          loader: ProductsAndCartLoader,
          element: <Orders></Orders>,
        },
        {
          path: "inventory",
          element: <PrivateRoute><Inventory></Inventory></PrivateRoute>,
        },
        {
          path: "about",
          element: <About></About>,
        },
        {
          path:'login',
          element: <Login></Login>
        },
        {
          path:'signup',
          element:<Signup></Signup>
        },
        { 
          path: 'shipping',
          element: <PrivateRoute><Shipping></Shipping></PrivateRoute>
        }
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
