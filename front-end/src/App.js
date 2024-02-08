import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className="w-full pl-10 pr-10 mt-3">
        <div>
          <h1>Welcome to IB Shop</h1>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
