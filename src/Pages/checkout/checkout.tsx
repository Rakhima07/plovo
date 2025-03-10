import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const initialCart = [
  { id: 1, name: "Плов", price: 200, quantity: 5 },
  { id: 2, name: "Пицца", price: 350, quantity: 2 },
  { id: 3, name: "Шаурма", price: 180, quantity: 4 },
];

const CheckoutPage = () => {
  const [cart, setCart] = useState(initialCart);
  const [orderData, setOrderData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const order = {
      cart,
      ...orderData,
    };

    try {
      await axios.post("https://your-firebase-url/orders.json", order);
      alert("Заказ отправлен!");
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Корзина</Typography>

      {cart.map((item) => (
        <Box key={item.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ flex: 1 }}>{item.name} - {item.quantity}</Typography>
          <IconButton onClick={() => updateQuantity(item.id, -1)}><Remove /></IconButton>
          <IconButton onClick={() => updateQuantity(item.id, 1)}><Add /></IconButton>
        </Box>
      ))}

      <Typography variant="h6">Общая сумма: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} сом</Typography>

      <Typography variant="h6" gutterBottom>Детали доставки</Typography>
      <TextField label="Имя" name="name" value={orderData.name} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Адрес" name="address" value={orderData.address} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Телефон" name="phone" value={orderData.phone} onChange={handleChange} fullWidth margin="normal" />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
        Оформить заказ
      </Button>
    </Box>
  );
};

export default CheckoutPage;
