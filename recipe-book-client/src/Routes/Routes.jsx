import { createBrowserRouter } from "react-router";
import Roots from "../Layouts/Roots";
import Auth from "../Layouts/Auth";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import AddRecipe from "../Pages/AddRecipe";
import AllRecipes from "../Pages/AllRecipes";
import MyRecipes from "../Pages/MyRecipes";
import PrivateRoutes from "./PrivateRoutes";
import UpdateRecipe from "../Pages/UpdateRecipe";
import RecipeDetailCard from "../Pages/RecipeDetailCard";
import Loading from "../Components/Body/Loading";
import Home from "../Pages/Home";
import Error404 from "../Components/Body/Error404";
import MyProfile from "../Pages/MyProfile";
import ProfileCard from "../Components/Body/ProfileCard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Roots,
    children: [
      {
        path: "/",
        element:<Home></Home>,
        loader:()=>fetch("https://recipe-book-server-rose.vercel.app/recipes/top"),
        hydrateFallbackElement:<Loading></Loading>
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth></Auth>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
  {
    path: "/allrecipe",
    element: (
      <PrivateRoutes>
        <AllRecipes></AllRecipes>
      </PrivateRoutes>
    ),
    loader: () => fetch("https://recipe-book-server-rose.vercel.app/recipes"),
    hydrateFallbackElement:<Loading></Loading>
  },
  {
    path: "/myrecipe",
    element: (
      <PrivateRoutes>
        <MyRecipes></MyRecipes>
      </PrivateRoutes>
    ),
    loader: () => fetch("https://recipe-book-server-rose.vercel.app/recipes"),
    hydrateFallbackElement:<Loading></Loading>
  },
  {
    path: "/addrecipe",
    element: (
      <PrivateRoutes>
        <AddRecipe></AddRecipe>
      </PrivateRoutes>
    ),
  },
  {
    path:"/updaterecipe/:_id",
    element: (
      <PrivateRoutes>
        <UpdateRecipe></UpdateRecipe>
      </PrivateRoutes>
    ),
    loader:({params})=>fetch(`https://recipe-book-server-rose.vercel.app/recipes/${params._id}`),
    hydrateFallbackElement:<Loading></Loading>
  },
  {
    path:"/recipedetailcard/:_id",
    element: (
      <PrivateRoutes>
        <RecipeDetailCard></RecipeDetailCard>
      </PrivateRoutes>
    ),
    loader:({params})=>fetch(`https://recipe-book-server-rose.vercel.app/recipes/${params._id}`),
    hydrateFallbackElement:<Loading></Loading>
  },
  {
    path:"/updateprofile/:email",
    element: (
      <PrivateRoutes>
        <ProfileCard></ProfileCard>
      </PrivateRoutes>
    ),
    loader:({params})=>fetch(`https://recipe-book-server-rose.vercel.app/users/${params.email}`),
    hydrateFallbackElement:<Loading></Loading>
  },
  {
    path:"/profile",
    element: (
      <PrivateRoutes>
        <MyProfile></MyProfile>
      </PrivateRoutes>
    ),
  },

  {
    path: "/*",
    element:<Error404></Error404>,
  }
]);
