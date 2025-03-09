import { useCallback, useEffect, useState } from 'react';
import { IDish, IDishesList } from '../../types/types';
import axiosApi from '../../Api/AxiosApi';
import DishCard from '../../components/dishCard/DishCard';
import { CircularProgress, Box } from '@mui/material';

interface Props {
  addDishToBasket: (dish: IDish) => void;
  handleSyncBasketWithDishes: (dishes: IDish[]) => void;
}

const Home = ({ addDishToBasket, handleSyncBasketWithDishes }: Props) => {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      const dishesResponse = await axiosApi.get<IDishesList | null>('/dishes.json');
      const dishesData = dishesResponse.data;
      if (!dishesData) return;

      const newDishes: IDish[] = Object.keys(dishesData).map(key => ({
        ...dishesData[key],
        id: key,
      }));

      setDishes(newDishes);
      handleSyncBasketWithDishes(newDishes); 
    } finally {
      setLoading(false);
    }
  }, [handleSyncBasketWithDishes]);

  useEffect(() => {
    void fetchDishes();
  }, [fetchDishes]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {dishes.map(dish => (
        <DishCard key={dish.id} dish={dish} addDishToBasket={addDishToBasket} />
      ))}
    </div>
  );
};

export default Home;
