import { TextField, Button, Typography, Box } from "@mui/material";

interface OrderFormProps {
  orderData: { name: string; address: string; phone: string };
  setOrderData: React.Dispatch<React.SetStateAction<{ name: string; address: string; phone: string }>>;
  onSubmit: () => void;
}

const OrderForm = ({ orderData, setOrderData, onSubmit }: OrderFormProps) => {
  return (
    <Box sx={{ textAlign: "center", maxWidth: 400, margin: "20px auto" }}>
      <Typography variant="h5" mb={2}>Детали доставки</Typography>
      <TextField
        label="Имя"
        fullWidth
        margin="normal"
        value={orderData.name}
        onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
      />
      <TextField
        label="Адрес"
        fullWidth
        margin="normal"
        value={orderData.address}
        onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
      />
      <TextField
        label="Телефон"
        fullWidth
        margin="normal"
        value={orderData.phone}
        onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
      />
      <Button variant="contained" color="primary" fullWidth onClick={onSubmit} sx={{ mt: 2 }}>
        Оформить заказ
      </Button>
    </Box>
  );
};

export default OrderForm;
