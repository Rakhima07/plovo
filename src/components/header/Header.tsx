import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { Link, useNavigate } from "react-router";
interface Props {
    totalCount: number
}
const Header = ({ totalCount }: Props) => {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate("/");
    };
    return (
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleHomeClick}>
              <FoodBankIcon fontSize="large" sx={{ mr: 1 }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Plovo App
            </Typography>
    
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              Items in basket: {totalCount}
            </Typography>
    
            <Link to="/add-dish" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" component="div" sx={{ cursor: "pointer" }}>
                Add dish
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      );
    };
    
    export default Header;