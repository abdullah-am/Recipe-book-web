import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Body/Navbar';
import Footer from '../Components/Body/Footer';

const RecipeDetailCard = () => {
  const recipe = useLoaderData();
  const navigate = useNavigate();

  const {
    title,
    image,
    cuisineType,
    preparationTime,
    ingredients,
    instructions,
    categories,
    likeCount,
  } = recipe;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow container mx-auto p-4 bg-[#f0ece2]">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-3xl mx-auto">
          {/* Image Section */}
          <img
            src={image || 'https://via.placeholder.com/600x300'}
            alt={title || 'Recipe Image'}
            className="w-full h-64 object-cover"
          />
          {/* Details Section */}
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{title || 'Untitled Recipe'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Cuisine Type:</span> {cuisineType || 'Unknown'}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Preparation Time:</span> {preparationTime ? `${preparationTime} minutes` : 'Not specified'}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Categories:</span>{' '}
                  {Array.isArray(categories) && categories.length > 0 ? categories.join(', ') : 'None'}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Likes:</span> {likeCount || 0}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mt-4">Ingredients</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">
                {ingredients || 'No ingredients provided.'}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mt-4">Instructions</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">
                {instructions || 'No instructions provided.'}
              </p>
            </div>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm py-2 px-4 rounded mt-4"
            >
              Back
            </button>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RecipeDetailCard;