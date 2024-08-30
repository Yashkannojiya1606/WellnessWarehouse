import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Badge, Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from "react-redux";
import Paper from '@material-ui/core/Paper';

import SearchIcon from '@mui/icons-material/Search';
import { postData, getData, ServerURL } from '../Administrator/FetchNodeServices';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Person from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { getDateRangePickerDayUtilityClass } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header(props) {
  var theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const [category, setCategory] = React.useState([])
  const [anchorE1, setAnchorE1] = React.useState(null);
  const [panchorEl, setPAnchorEl] = React.useState(null);
  const [subcategory, setSubCategory] = React.useState([])
  const [getUserName, setUserName] = useState('Sign In / Sign Up');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  var products = useSelector((state) => state.product)
  var navigate = useNavigate()
  var keys = Object.keys(products).length
  var listproducts = Object.values(products)
  var totalamount = listproducts.reduce(calculatetotal, 0)

  var offeramount = listproducts.reduce(calculateoffer, 0)
  function calculateoffer(p, n) {
    return (p + (n.offerprice * n.qty))
  }

  function calculatetotal(p, n) {
    return (p + (n.price * n.qty))
  }
  const handleLogin = () => {
    // props.history.push({ pathname: `/cartreview` });
    if (localStorage.getItem('user')) {
      var user = Object.values(JSON.parse(localStorage.getItem('user')))
      navigate('/useraccount/accountinformation')
    }
    else {
      navigate('/signin')
    }
  };
  const open = Boolean(anchorE1);

  const handlePopoverOpen = (event) => {
    setPAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setPAnchorEl(null);
  }
  const openp = Boolean(panchorEl);
  const showCartItems = () => {
    return listproducts.map((item, index) => {
      return (<>
        {index < 2 ? <>
          <Grid item xs={8}>
            <span style={{ fontWeight: 'normal', letterSpacing: 2 }}> {item.productname}</span>
          </Grid>

          <Grid item xs={4}>
            <span style={{ fontWeight: 'normal', display: 'flex', justifyContent: 'right' }}> Rs.{item.price}x{item.qty}</span>
          </Grid>
        </> : <></>}
      </>)
    })
  }

  const cartPopup = () => {
    return (
      <div>

        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={openp}
          anchorEl={panchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div style={{ width: 400, padding: 20 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <span style={{ fontWeight: 'lighter', letterSpacing: 2 }}> Order Summary</span>
              </Grid>

              <Grid item xs={4}>
                <span style={{ fontWeight: 'lighter', display: 'flex', justifyContent: 'right' }}> ({keys}) Items</span>
              </Grid>

              {showCartItems()}
              <Grid item xs={8}></Grid>
              <Grid item xs={4} style={{ display: 'flex', justifyContent: 'right' }}>{`+${keys - 2}More Items`}</Grid>
              <Grid item xs={8}><div style={{ display: 'flex', flexDirection: 'column' }}><div style={{ color: '#ef4281', fontWeight: 'bold' }}>{`Rs.${offeramount}`}</div><div style={{ color: 'green' }}>{`You save Rs.${totalamount - offeramount}`}</div></div></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </div>
        </Popover>
      </div>
    );
  }

  const fetchAllCategories = async () => {
    var result = await getData('categories/displayall')
    setCategory(result.result)

  }
  const fetchAllSubCategories = async (categoryid) => {
    var result = await postData('subcategories/displaysubcategorybycategoryid', { categoryid: categoryid })
    setSubCategory(result.result)
  }

  // const CheckSession = async () => {
  //   if (localStorage.getItem("user")) {
  //     var user = Object.values(JSON.parse(localStorage.getItem("user")))[0];
  //     // alert(JSON.stringify(user))
  //     var name = user.firstname
  //     setUserName(name);
  //      dispatch({ type: "ADD_USER", userdata: [user.mobileno, user] });
  //   }
  // };
  const CheckSession = async () => {
    if (localStorage.getItem("user")) {
      var user = Object.values(JSON.parse(localStorage.getItem("user")))[0];
      var name = user.firstname
      setUserName(name);
      dispatch({ type: "ADD_USER", userdata: [user.mobileno, user] });
    }
  };
  useEffect(function () {
    fetchAllCategories()
    CheckSession()
  }, [])

  const handleClick = (event, categoryid) => {
    setAnchorE1(event.currentTarget);
    fetchAllSubCategories(categoryid)
  }
  const handleClose = () => {
    setAnchorE1(null)
  }

  const handleSubCategoryProductList = (item) => {
    // alert(JSON.stringify({ state: { item: item } }))
    navigate('/productlist', { state: { subcategory: item } })
  }


  const showSubCategories = () => {
    return subcategory.map((item) => {
      return (
        <MenuItem onClick={() => handleSubCategoryProductList(item)}>{item.subcategoryname}</MenuItem>
      )
    })
  }

  const nextApp = () => {
    return category.map((item, index) => {

      return <> {index >= 4 ?
        <div style={{ marginRight: 50, color: '#FFF' }}>
          {item.categoryname}
        </div> : <></>}</>
    })
  }


  const showMainCategories = () => {
    return category.map((item, index) => {
      return (<>
        {index <= 3 ?
          <div style={{ marginRight: 50 }}>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(event) => handleClick(event, item.categoryid)}
              style={{ color: '#000' }}  >{item.categoryname}</Button>
          </div> : <></>}</>)
    })
  }
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const list = (anchor) => (

    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {category.map((item, index) => (
          <ListItem button key={item.categoryname}>
            <ListItemText primary={item.categoryname} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit" position='relative' >
        <Toolbar>
          {matches ?
            <IconButton
              size="large"
              // edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              style={{display:'flex',justifyContent:'left',alignItems:'left'}}
            >
              <MenuIcon onClick={toggleDrawer('left', true)} />
            </IconButton> : <></>}

           {matches ? <></> : <><div>
            <img src='/logo.png' onClick={() => navigate('/home')} width="75" />
          </div>
         
            <div style={{ display: 'flex', justifyContent: 'center', width: '70%' }}>
              {showMainCategories()}
              {/* <Menu
                id="basic-menu"
                anchorEl={anchorE1}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {showSubCategories()}
              </Menu> */}
              <Menu
              id="simple-menu"
              anchorEl={anchorE1}
              getContentAnchorEl={null}
              keepMounted
              open={Boolean(anchorE1)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              style={{ marginTop: 20, padding: 0 }}
            >
              {showSubCategories()}
            </Menu>
            </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Medicine Here...."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Badge badgeContent={keys} color="secondary">
              <ShoppingCartIcon onClick={() => navigate('/showcart')} color="action" aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose} />
            </Badge>
            <div onClick={() => handleLogin()} style={{ padding: 10, color: '#000', flexDirection: 'row', display: 'flex', cursor: 'pointer' }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: 'center',
                }}
              >
                <Person style={{ fontSize: 18 }} />
              </div>
              <div style={{ width: '100%', display: 'flex', fontWeight: 'bold', fontFamily: 'Roboto,Arial,sans-serif', justifyContent: 'flex-end', alignItems: 'flex-end', fontSize: 12 }} >
                {getUserName == "Sign In / Sign Up" ? getUserName : <span>Hi {getUserName}</span>}
              </div>
            </div>
            {/* {getUserName == "Sign In / Sign Up" ? <></> : <Grid container spacing={0} >
              <Grid item xs={12} sm={12} onClick={() => props.history.push({ pathname: `/cartreview`, path: 3 })}>
                <Paper>
                  <div style={{ fontSize: 14, padding: 15, cursor: 'pointer' }}>
                    Order History
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} style={{ marginTop: 1 }} >
                <Paper>
                  <div style={{ fontSize: 14, padding: 15, cursor: 'pointer' }}>
                    Log Out
                  </div>
                </Paper>
              </Grid>
            </Grid>} */}
            {/* <Person style={{ marginLeft: '20' }} /> */}
          </div>
          {cartPopup()}
          </>}
        </Toolbar>
        
      </AppBar>
      {/* {matches ? <></> : <div style={{ height: 50, width: '100%', background: '#000', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
        {nextApp()}
      </div>} */}
      <div>
        <React.Fragment key={'left'}>
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
      </div>

    </Box>
  );
}