import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import { AuthContext } from '../../Context/AuthContext';


const RecipeCard = ({ recipe }) => {
  const { user } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(recipe.likeCount || 0);
  const [isLiking, setIsLiking] = useState(false);
  const canLike = user && recipe.creatorId && user.uid !== recipe.creatorId;

  const handleLike = () => {
    if (!canLike || isLiking) return;

    setIsLiking(true);
    const newLikeCount = likeCount + 1;
    setLikeCount(newLikeCount);

    fetch(`https://recipe-book-server-rose.vercel.app/recipes/${recipe._id}/like`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ likeCount: newLikeCount }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('after like update', data);
        if (!data.modifiedCount) {
          setLikeCount(likeCount);
        }
      })
      .catch((err) => {
        console.error('Error updating like count:', err);
        setLikeCount(likeCount);
      })
      .finally(() => {
        setIsLiking(false);
      });
  };

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
                className="w-5 h-5 text-red-500 mr-1"
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
              <span className="text-gray-600 text-sm">{likeCount} likes</span>
            </div>
            {canLike && (
              <button
                onClick={handleLike}
                className="flex items-center text-sm text-gray-700 hover:text-red-500"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Like
              </button>
            )}
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

export default RecipeCard;