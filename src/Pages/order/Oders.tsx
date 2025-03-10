import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";

const ORDERS_URL = "https://your-firebase-url/orders.json";

interface Order {
  id: string;
  name: string;
  address: string;
  phone: string;
  cart: { name: string; quantity: number }[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(ORDERS_URL);
        if (response.data) {
          const fetchedOrders = Object.entries(response.data).map(([key, value]: [string, any]) => ({
            id: key,
            ...value,
          }));
          setOrders(fetchedOrders);
        }
      } catch (error) {
        console.error("Ошибка при загрузке заказов:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await axios.delete(`https://your-firebase-url/orders/${orderId}.json`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Ошибка при удалении заказа:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Список заказов</Typography>
      {orders.length === 0 ? (
        <Typography>Заказов пока нет</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Заказ от: {order.name}</Typography>
              <Typography>Телефон: {order.phone}</Typography>
              <Typography>Адрес: {order.address}</Typography>
              <Typography variant="body1">Состав заказа:</Typography>
              {order.cart.map((item, index) => (
                <Typography key={index}>
                  {item.name} — {item.quantity} шт.
                </Typography>
              ))}
              <Button variant="contained" color="success" onClick={() => handleCompleteOrder(order.id)} sx={{ mt: 1 }}>
                Завершить заказ
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Orders;
