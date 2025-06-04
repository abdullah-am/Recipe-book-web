import React from 'react';
import MostLiked from '../Components/Body/MostLiked';
import { useLoaderData } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';


const Home = () => {
  const topRecipes = useLoaderData();
  return (
    <div className='w-full mx-auto min-h-screen px-4 sm:px-6 lg:px-8'>
      <div className='text-center text-2xl font-bold pt-4'>
        <Typewriter
          words={['Make your own dish']}
          loop={1}
          cursor
          cursorStyle='|'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>
      <div className='flex justify-center items-center mt-3'>
        <div className='space-y-4 md:grid md:grid-cols-2 md:gap-3 lg:grid lg:grid-cols-4 max-h-screen overflow-y-auto mt-4'>
          {topRecipes.length > 0 ? (
              topRecipes.map((recipe) => (
                <MostLiked key={recipe._id} recipe={recipe} />
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-4">
                No recipes available.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;

