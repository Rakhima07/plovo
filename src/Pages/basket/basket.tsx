import { Box, Container, Typography, List, ListItem, ListItemText, Divider, Link } from '@mui/material';
import { IBasketState } from '../../types/types';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  basketState: IBasketState;
}

const Basket = ({ basketState }: Props) => {
  const { items, totalPrice, totalCount } = basketState;

  if (items.length === 0) {
    return (
      <Container>
        <Typography variant="h5" align="center" component="div" sx={{ mt: 4 }}>
          Basket is empty
        </Typography>
        <Typography variant="h5" align="center" component="div" sx={{ mt: 4 }}>
          <Link to="/" component={RouterLink}>Go to home page</Link>
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Basket
        </Typography>
        <List>
          {items.map((item, index) => (
            <Box key={item.dish?.id || index}>
              <ListItem>
                {item.dish ? (
                  <ListItemText
                    primary={item.dish.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {item.dish.description}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Price: {item.dish.price} som
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Count: {item.count}
                        </Typography>
                      </>
                    }
                  />
                ) : (
                  <ListItemText primary="Unknown item" />
                )}
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Typography variant="h6">
            Total items: {totalCount}
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Total price: {totalPrice} som
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Basket;
