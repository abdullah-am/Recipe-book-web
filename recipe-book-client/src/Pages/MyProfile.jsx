import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Body/Navbar";
import Footer from "../Components/Body/Footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [mongoUser, setMongoUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          const response = await fetch(`https://recipe-book-server-rose.vercel.app/users/${user.email}`);
          const data = await response.json();
          if (data) {
            setMongoUser(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main className="flex-grow flex justify-center items-center p-4 min-h-screen">
        <section className="w-full max-w-lg">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Profile</h2>
            <div className="flex flex-col items-center mb-8">
              <img
                src={mongoUser?.photo || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 border-4 border-gray-200 shadow-sm object-cover"
              />
              <h3 className="text-2xl font-semibold text-gray-800">{mongoUser?.name || "User"}</h3>
              <p className="text-gray-500 text-sm">{mongoUser?.email || "No email available"}</p>
            </div>
            <Link to={`/updateprofile/${user?.email}`}>
              <button className="w-full btn btn-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200">
                Update Profile
              </button>
            </Link>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MyProfile;
