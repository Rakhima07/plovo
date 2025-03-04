import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Header from './components/header/Header';
import AddDish from './Pages/AddDish/AddDish';
import Home from './Pages/home/Home';
import DishDetail from './Pages/dish-detail/dish-detail';
import EditDish from './Pages/edit-dish/edit-dish';
import { IBasketState, IDish } from './types/types';  
import { addDishToBasket } from './utils/basketHelpers';  

function App() {
 
  const [basketState, setBasketState] = useState<IBasketState>({
    items: [],
    totalPrice: 0,
    totalCount: 0
  });

  const handleAddDish = (dish: IDish) => {
    setBasketState(currentState => addDishToBasket(currentState, dish));
  };

  return (
      <>
        <Header totalCount={basketState.totalCount} /> {/* Передаем totalCount в Header */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home addDishToBasket={handleAddDish} />} />
            <Route path="/add-dish" element={<AddDish />} />
            <Route path="/dishDetail" element={<DishDetail />} />
            <Route path="/edit-dish" element={<EditDish />} />
          </Routes>
        </div>
      </>
    );
  }
  
  export default App;