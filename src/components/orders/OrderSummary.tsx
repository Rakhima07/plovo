import { Box, Button, Typography } from "@mui/material";
import { IBasketState } from "../../types/types";

interface OrderSummaryProps {
  basketState: IBasketState;
  handleQuantityChange: (dishId: string, delta: number) => void;
}

const OrderSummary = ({ basketState, handleQuantityChange }: OrderSummaryProps) => {
  return (
    <Box sx={{ textAlign: "center", maxWidth: 400, margin: "0 auto" }}>
      {basketState.items.map((item, index) => (
        <Box key={item.dish.id} display="flex" justifyContent="space-between" alignItems="center" my={1}>
          <Typography>
            {index + 1}. {item.dish.name} <strong>кол-во:</strong> {item.count}
          </Typography>
          <Box>
            <Button
              variant="contained"
              size="small"
              sx={{ mx: 0.5 }}
              onClick={() => handleQuantityChange(item.dish.id, -1)}
              disabled={item.count === 1}
            >
              -
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ mx: 0.5 }}
              onClick={() => handleQuantityChange(item.dish.id, 1)}
            >
              +
            </Button>
          </Box>
        </Box>
      ))}
      <Typography variant="h6" mt={2}>Общее кол-во: {basketState.totalCount}</Typography>
      <Typography variant="h6">Общая сумма: {basketState.totalPrice} сом</Typography>
    </Box>
  );
};

export default OrderSummary;

