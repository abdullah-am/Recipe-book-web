import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "./Loading";

const Navbar = () => {
  const { user, signoutuser } = useContext(AuthContext);
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          const response = await fetch(`https://recipe-book-server-rose.vercel.app/users/${user.email}`);
          const data = await response.json();
          if (data) {
            setLoading(false);
            setMongoUser(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleSignout = () => {
    signoutuser()
      .then(() => {
        console.log("sign out successful");
        setMongoUser(null);
        setTimeout(() => navigate('/'), 1000);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="navbar bg-base-100 flex justify-between items-center px-4 max-w-screen-2xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow flex flex-col gap-3"
          >
            <NavLink to="/" className={({ isActive }) => (isActive ? "underline" : "")}>Home</NavLink>
            <NavLink to="/allrecipe" className={({ isActive }) => (isActive ? "underline" : "")}>AllRecipe</NavLink>
            <NavLink to="/addrecipe" className={({ isActive }) => (isActive ? "underline" : "")}>AddRecipe</NavLink>
            <NavLink to="/myrecipe" className={({ isActive }) => (isActive ? "underline" : "")}>My Recipe</NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? "underline" : "")}>My Profile</NavLink>
            <NavLink to="/comments" className={({ isActive }) => (isActive ? "underline" : "")}>Comments</NavLink>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-2">
          <img
            className="w-12 rounded-sm"
            src="https://i.ibb.co/WvTxv7VX/Chat-GPT-Image-May-24-2025-11-24-34-PM.png"
            alt=""
          />
          <h2 className="font-bold text-xl text-[#0A2A66]">Recipe Book</h2>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-semibold text-[#0A2A66] gap-3">
          <NavLink to="/" className={({ isActive }) => (isActive ? "underline" : "")}>Home</NavLink>
          <NavLink to="/allrecipe" className={({ isActive }) => (isActive ? "underline" : "")}>AllRecipe</NavLink>
          <NavLink to="/addrecipe" className={({ isActive }) => (isActive ? "underline" : "")}>AddRecipe</NavLink>
          <NavLink to="/myrecipe" className={({ isActive }) => (isActive ? "underline" : "")}>My Recipe</NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "underline" : "")}>My Profile</NavLink>
          <NavLink to="/comments" className={({ isActive }) => (isActive ? "underline" : "")}>Comments</NavLink>
        </ul>
      </div>
      <div className="navbar-end flex items-center gap-3">
        <div className="relative group">
          <img
            className="w-8 rounded-full cursor-pointer"
            src={`${mongoUser ? mongoUser.photo : "https://i.ibb.co/mFX8x0Fw/user.png"}`}
            alt={`${mongoUser ? mongoUser.name || mongoUser._id : "Guest"}`}
            title={`${mongoUser ? mongoUser.name || mongoUser._id : "Guest"}`}
          />
          {mongoUser && (
            <span className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {mongoUser.name || mongoUser._id}
            </span>
          )}
        </div>
        {user ? (
          <a onClick={handleSignout} className="btn btn-primary px-6">
            SignOut
          </a>
        ) : (
          <div className="flex gap-3">
            <Link to="/auth/login" className="btn btn-primary px-6">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-primary px-6">
              Registration
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;