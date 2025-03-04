import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IDish } from '../../types/types';
import axiosApi from '../../Api/AxiosApi';
import { Button, Typography, Box } from '@mui/material';

const DishDetail = () => {
  const [dish, setDish] = useState<IDish | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axiosApi.get<IDish>(`/dishes/${id}.json`);
        setDish({ ...response.data, id: id! });
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosApi.delete(`/dishes/${id}.json`);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete dish:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!dish) {
    return <Typography>Dish not found.</Typography>;
  }

  return (
    <Box sx={{ padding: '24px' }}>
      <Typography variant="h4">{dish.name}</Typography>
      <Typography variant="body1">{dish.description}</Typography>
      <Typography variant="h6">${dish.price}</Typography>
      
    
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/edit-dish/${id}`} 
      >
        Edit Dish
      </Button>
      
     
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  );
};

export default DishDetail;
