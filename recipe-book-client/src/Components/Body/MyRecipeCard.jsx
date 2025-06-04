import React from "react";
import { Zoom } from "react-awesome-reveal";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyRecipeCard = ({recipeData, myRecipesData, setMyRecipesData}) => {
    const {_id,title,image,cuisineType,categories}=recipeData

    const displayCategories = Array.isArray(categories) && categories.length > 0 ? categories.join(', ') : 'None';


    const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://recipe-book-server-rose.vercel.app/recipes/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after dte", data);
            if (data.deletedCount === 1) {
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Your coffee has been deleted.",
                    icon: "success",
                });

                const remainingRecipes = myRecipesData.filter((recipe) => recipe._id !== _id);
                setMyRecipesData(remainingRecipes);
            }
          });
      }
    });
  };

  return (
    <Zoom>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-sm">
        <img
          src={image || 'https://via.placeholder.com/300x200'}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{title || 'Untitled Recipe'}</h3>
          <p className="text-gray-600 text-sm">Cuisine Type: {cuisineType || 'Unknown'}</p>
          <p className="text-gray-600 text-sm">Categories: {displayCategories}</p>
          <div className="mt-2">
            <div className="join join-vertical lg:join-horizontal">
              <Link to={`/updaterecipe/${_id}`}>
                <button className="btn join-item border-0 rounded-2xl hover:bg-gray-400">
                  <MdEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(_id)}
                className="btn join-item border-0 rounded-2xl hover:bg-red-600"
              >
                <MdDelete />
              </button>
              <Link to={`/recipedetailcard/${_id}`}>
                <button className="btn join-item bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default MyRecipeCard;
