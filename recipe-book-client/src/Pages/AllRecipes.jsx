import React from 'react';
import { useLoaderData } from 'react-router';
import RecipeCard from '../Components/Body/RecipeCard';
import Footer from '../Components/Body/Footer';
import Navbar from '../Components/Body/Navbar';

const AllRecipes = () => {

    const presentRecipes = useLoaderData();
    

    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='min-h-screen bg-[#f0ece2]'>
                <div className='flex justify-center items-center mt-3'>
                    <div className='space-y-4 md:grid md:grid-cols-2 md:gap-3 lg:grid lg:grid-cols-3 max-h-screen overflow-y-auto mt-4'>
                        {
                            presentRecipes.map(recipe =><RecipeCard 
                            key={recipe._id}
                            recipe={recipe}
                            ></RecipeCard>)
                        }
                    </div>
                    
                </div>
            </main>
            <footer className='max-h-screen'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AllRecipes;