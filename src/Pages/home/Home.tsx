import { useCallback, useEffect, useState } from 'react';
import { IDish, IDishesList } from '../../types/types';
import axiosApi from '../../Api/AxiosApi';

const Home = () => {
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDishes();
  }, [fetchDishes]);

  return (
    <div>
      <h1>Home Page</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {dishes.map(dish => (
            <li key={dish.id}>
              <strong>{dish.name}</strong> - {dish.description} (${dish.price})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
