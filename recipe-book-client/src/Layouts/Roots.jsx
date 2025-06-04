import React from 'react';
import Navbar from '../Components/Body/Navbar';
import Banner from '../Components/Body/Banner';
import { Outlet } from 'react-router';
import Footer from '../Components/Body/Footer';

const Roots = () => {
    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <header>
        <nav>
          <Navbar></Navbar>
        </nav>
        <section>
          <Banner></Banner>
        </section>
      </header>
      <main className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <section className=" lg:col-span-10 col-span-1">
          <Outlet></Outlet>
        </section>
      </main>
      <footer className="mt-8">
        <Footer></Footer>
      </footer>
    </div>
    );
};

export default Roots;