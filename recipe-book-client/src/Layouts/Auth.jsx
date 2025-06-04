import React from 'react';
import { Outlet } from 'react-router';

const Auth = () => {
    return (
        <div className='bg-base-200 min-h-screen'>
            <section>
                <main className='w-11/12 mx-auto py-4'>
                <Outlet></Outlet>
                </main>
            </section>
        </div>
    );
};

export default Auth;