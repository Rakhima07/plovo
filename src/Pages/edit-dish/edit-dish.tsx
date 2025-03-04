import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DishForm from '../../components/dish-form/Dish-form';
import { IDishShort } from '../../types/types';
import axiosApi from '../../Api/AxiosApi';
import { CircularProgress } from '@mui/material';

const EditDish = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [dish, setDish] = useState<IDishShort | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
  
    useEffect(() => {
      const fetchDish = async () => {
        try {
          setLoading(true);
          const { data } = await axiosApi.get<IDishShort>(`/dishes/${id}.json`);
          setDish(data);
        } finally {
          setLoading(false);
        }
      };
      
      if (id) {
        fetchDish();
      }
    }, [id]);
  
    if (loading) {
      return <CircularProgress />;
    }
  
    const handleSubmit = async (dishData: IDishShort) => {
      try {
        setLoadingEdit(true);
        await axiosApi.put(`/dishes/${id}.json`, dishData);
        navigate('/');
      } catch (error) {
        console.error('Error updating dish:', error);
      } finally {
        setLoadingEdit(false);
      }
    };
  
    return (
      <div>
        {dish && <DishForm dish={dish} onSubmit={handleSubmit} loading={loadingEdit} />}
      </div>
    );
  };
  
  export default EditDish;