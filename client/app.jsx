import React from 'react';
import { Navbar } from './components/Navbar';
import { Catalog } from './components/Catalog';
import { Carasouel } from './components/Carasouel';

const App = () => {
  return (
    <div>
      < Navbar />
      < Carasouel />
      < Catalog />
    </div>
  );
};

export default App;
