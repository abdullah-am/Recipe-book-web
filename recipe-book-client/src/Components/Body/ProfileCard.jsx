import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProfileCard = () => {
    const {email,name,photo}=useLoaderData();
    const navigate = useNavigate();

 const handleupdateProfile = (e) => {
     e.preventDefault();
     const form = e.target;
     const formData = new FormData(form);
     const updateProfile = Object.fromEntries(formData.entries());
 
 
     fetch(`https://recipe-book-server-rose.vercel.app/users/${email}`, {
       method: 'PUT',
       headers: {
         'content-type': 'application/json',
       },
       body: JSON.stringify(updateProfile),
     })
       .then(res => res.json())
       .then(data => {
         console.log('after update', data);
         if (data.modifiedCount === 1) {
           Swal.fire({
             position: "top-end",
             icon: "success",
             title: "Your work has been saved",
             showConfirmButton: false,
             timer: 1500,
           });
        navigate(-1);
         } else {
           console.log('No modifications made:', data);
         }
       })
       .catch(err => {
         console.error('Error updating profile:', err);
       });
   };   

  return (
    <div className="">
      <header>
        <nav>
          <Navbar/>
        </nav>
      </header>
      <main className="flex justify-center items-center min-h-screen">
        <section className="main flex w-full max-w-4xl gap-6 py-8">
          <div className="w-full bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
            <form onSubmit={handleupdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={name}
                  className="input input-bordered w-full"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photo"
                  defaultValue={photo}
                  className="input input-bordered w-full"
                  placeholder="Photo URL"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Save Changes
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer className="">
        <Footer/>
      </footer>
    </div>
  );
};

export default ProfileCard;
