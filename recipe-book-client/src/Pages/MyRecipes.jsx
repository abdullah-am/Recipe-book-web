import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import MyRecipeCard from "../Components/Body/MyRecipeCard";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../Components/Body/Navbar";
import Footer from "../Components/Body/Footer";

const MyRecipes = () => {
  
    const allRecipes = useLoaderData();
  const { user } = useContext(AuthContext);
  const myRecipes = allRecipes.filter(recipe => recipe.creatorId === user?.uid);
  const [myRecipesData, setMyRecipesData] = useState(myRecipes);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  

  useEffect(() => {
    try {
      // Validate that allRecipes is an array
      const recipes = Array.isArray(allRecipes) ? allRecipes : [];
      const filteredRecipes = recipes.filter(recipe => recipe.creatorId === user?.uid);
      setMyRecipesData(filteredRecipes);
      setLoading(false);
    } catch (err) {
      setError("Failed to load recipes. Please try again.",err);
      setLoading(false);
    }
  }, [allRecipes, user]);

  if (error) {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <main className="min-h-screen bg-[#f0ece2] flex justify-center items-center">
          <p className="text-red-600 text-center">{error}</p>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className='min-h-screen bg-[#f0ece2]'>
        <div className="flex justify-center items-center mt-3">
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-3 lg:grid lg:grid-cols-3 max-h-screen overflow-y-auto mt-4">
            {myRecipesData.length > 0 ? (
              myRecipesData.map((recipeData) => (
                <MyRecipeCard
                  key={recipeData._id}
                  myRecipesData={myRecipesData}
                  setMyRecipesData={setMyRecipesData}
                  recipeData={recipeData}
                />
              ))
            ) : (
              <p className="text-gray-600 text-center">You haven't added any recipes yet.</p>
            )}
          </div>
        </div>
      </main>
      <footer className="max-h-screen">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MyRecipes;
