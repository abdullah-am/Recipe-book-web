import React from 'react';
import { Zoom } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

const MostLiked = ({ recipe }) => {
  return (
    <Zoom>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-sm">
        <img
          src={recipe.image || 'https://via.placeholder.com/300x200'}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{recipe.title || 'Untitled Recipe'}</h3>
          <p className="text-gray-600 text-sm">Cuisine Type: {recipe.cuisineType || 'Unknown'}</p>
          <p className="text-gray-600 text-sm">Categories: {recipe.categories?.join(', ') || 'None'}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-600 text-sm">{recipe.likeCount || 0} likes</span>
            </div>
          </div>
          <Link
            to={`/recipedetailcard/${recipe._id}`}
            className="mt-3 inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </Zoom>
  );
};

export default MostLiked;