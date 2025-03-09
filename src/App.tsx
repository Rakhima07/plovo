import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Header from './components/header/Header';
import AddDish from './Pages/AddDish/AddDish';
import Home from './Pages/home/Home';
import DishDetail from './Pages/dish-detail/dish-detail';
import EditDish from './Pages/edit-dish/edit-dish';
import { IBasketState, IDish } from './types/types';  
import { addDishToBasket, syncBasketWithDishes } from './utils/basketHelpers';  
import { STORAGE_KEY } from './constants';



function App() {
 
  const [basketState, setBasketState] = useState<IBasketState>(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : { items: [], totalPrice: 0, totalCount: 0 };
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(basketState));
  }, [basketState]);

  const handleAddDish = (dish: IDish) => {
    setBasketState(currentState => addDishToBasket(currentState, dish));
  };
  const handleSyncBasketWithDishes = (dishes: IDish[]) => {
    setBasketState(currentState => syncBasketWithDishes(currentState, dishes));
    };

  return (
      <>
        <Header totalCount={basketState.totalCount} /> {/* Передаем totalCount в Header */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home addDishToBasket={handleAddDish} handleSyncBasketWithDishes={handleSyncBasketWithDishes} />} />
            <Route path="/add-dish" element={<AddDish />} />
            <Route path="/dishDetail" element={<DishDetail />} />
            <Route path="/edit-dish" element={<EditDish />} />
          </Routes>
        </div>
      </>
    );
  }
  
  export default App;