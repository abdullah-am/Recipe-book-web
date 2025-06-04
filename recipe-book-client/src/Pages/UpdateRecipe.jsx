import React from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import Navbar from '../Components/Body/Navbar';
import Footer from '../Components/Body/Footer';

const cuisineTypes = ['Italian', 'Mexican', 'Bangladeshi', 'Chinese', 'Others'];
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan'];

const UpdateRecipe = () => {
  const { _id, title, image, cuisineType, preparationTime, ingredients, instructions, categories: initialCategories } = useLoaderData();

  const handleupdateRecipe = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updateRecipe = Object.fromEntries(formData.entries());
    updateRecipe.categories = formData.getAll('categories');


    fetch(`https://recipe-book-server-rose.vercel.app/recipes/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateRecipe),
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
        } else {
          console.log('No modifications made:', data);
        }
      })
      .catch(err => {
        console.error('Error updating recipe:', err);
      });
  };

  return (
    <div className=''>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <div className="container mx-auto p-4 bg-[#f0ece2] min-h-screen font-sans">
          <form onSubmit={handleupdateRecipe}>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mx-auto max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-7xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 text-center mb-3 sm:mb-4">
                Update the Recipe
              </h2>
              <p className="text-gray-600 text-center text-xs sm:text-sm mb-4 sm:mb-6">
                Share your culinary masterpiece with the world! Fill in the details below to add your recipe to our collection.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full sm:w-1/2 mb-3 sm:mb-0">
                    <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={title}
                      placeholder="Enter recipe title"
                      className="input input-bordered w-full text-xs sm:text-sm p-2 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      defaultValue={image}
                      placeholder="Enter image URL"
                      className="input input-bordered w-full text-xs sm:text-sm p-2 border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full sm:w-1/2 mb-3 sm:mb-0">
                    <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1">
                      Cuisine Type
                    </label>
                    <select
                      name="cuisineType"
                      defaultValue={cuisineType}
                      className="input input-bordered w-full text-xs sm:text-sm p-2 border-gray-300 rounded"
                      required
                    >
                      {cuisineTypes.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                          {cuisine}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1">
                      Preparation Time (minutes)
                    </label>
                    <input
                      type="number"
                      name="preparationTime"
                      defaultValue={preparationTime}
                      placeholder="Enter preparation time"
                      className="input input-bordered w-full text-xs sm:text-sm p-2 border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1">
                    Ingredients
                  </label>
                  <textarea
                    name="ingredients"
                    defaultValue={ingredients}
                    placeholder="Enter recipe ingredients"
                    className="input input-bordered w-full text-xs sm:text-sm p-2 border-gray-300 rounded h-24"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1">
                    Instructions
                  </label>
                  <textarea
                    name="instructions"
                    defaultValue={instructions}
                    placeholder="Enter recipe instructions"
                    className="input input-bordered w-full text-xs sm:text-sm p-2 border-gray-300 rounded h-24"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center text-xs sm:text-sm">
                        <input
                          type="checkbox"
                          name="categories"
                          value={category}
                          defaultChecked={initialCategories?.includes(category) || false}
                          className="mr-2"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn w-full bg-[#c19a6b] hover:bg-[#a87a50] text-white text-xs sm:text-sm py-2 rounded mt-3 sm:mt-4"
                >
                  Update Recipe
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <footer className=''>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default UpdateRecipe;