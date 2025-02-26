import { Route, Routes } from 'react-router';
import Header from './components/header/Header';
import AddDish from './Pages/AddDish/AddDish';
import Home from './Pages/home/Home';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-dish" element={<AddDish />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
