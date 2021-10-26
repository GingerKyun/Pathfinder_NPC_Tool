import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ShowNPC from './pages/showNPCPage.js';
import CreateNPC from './pages/createNPCPage.js';
import Home from './pages/home.js';
import useStyles from './styles.js';
import './App.css';

//Styling for the search bar in the NavBar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

//The Search Icon in the NavBar
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

//Styling for the Search Text Input Field
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

//setting the item height for the dropdown list
const ITEM_HEIGHT = 48;

function App() {

  const classes = useStyles();

  //onClick events for dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Router>

    {/*Navigation Bar*/}
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <Link to="/pages/createnpc" className={classes.link}>
        <MenuItem onClick={() => {
          handleClose();
        }}>
          Create NPC
        </MenuItem>
        </Link>
        <Link to="/pages/shownpc" className={classes.link}>
        <MenuItem onClick={() => {
          handleClose();
        }}>
          NPC List
        </MenuItem>
        </Link>
      </Menu>
          <Link to="/" className={classes.link}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            NPC Tool Home
          </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </Toolbar>
          </AppBar>
          </Box>
          
          {/*This handles the routes for the webpage*/}
          <Box style={{padding: '50px'}}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/pages/shownpc">
              <ShowNPC />
            </Route>
            <Route path="/pages/createnpc">
              <CreateNPC />
            </Route>
          </Switch>
          </Box>
          </Router>
  );
}

export default App;