import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <Header />
      <main className="w-full pl-10 pr-10 mt-3">
        <div>
          <HomeScreen />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
