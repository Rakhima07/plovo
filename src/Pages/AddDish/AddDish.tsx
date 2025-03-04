 import styles from './styles.module.css';
import DishForm from '../../components/dish-form/Dish-form';
import { useState } from 'react';
import { IDishShort } from '../../types/types';
import axiosApi from '../../Api/AxiosApi';
import { useNavigate } from 'react-router-dom';

const AddDish = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onAddDishClick = async (dishData: IDishShort) => {
    setLoading(true);
    try {
      await axiosApi.post('/dishes.json', dishData);
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  return (
    <div className={styles.wrapper}>
      <DishForm onSubmit={onAddDishClick} loading={loading} />
    </div>
  );
};

export default AddDish;
