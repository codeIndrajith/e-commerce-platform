import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Header />
      <main className="w-full pl-10 pr-10 mt-3">
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
