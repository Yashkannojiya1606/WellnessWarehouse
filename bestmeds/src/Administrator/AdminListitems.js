import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Brands from "./Brands";
import Products from "./Products";
import DisplayProductImage from "./DisplayProductImage";
import Banner from '../UserInterface/Banner';
export default function   AdminListitems(props)
{
  const handleClick=(v)=>{
    props.setView(v)
  }
  return(
  <div>
    <ListItem button onClick={()=>handleClick(<Categories setView={props.setView}/>)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<SubCategories setView={props.setView}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="SubCategories" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Brands  setView={props.setView}/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Brands" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Products  setView={props.setView}/>)}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
    <ListItem  button onClick={()=>handleClick(<DisplayProductImage  setView={props.setView}/>)}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Multiple ProductImage" />
    </ListItem>
    <ListSubheader inset>Saved reports</ListSubheader>
   
    <ListItem button onClick={()=>handleClick(<Banner  setView={props.setView}/>)}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Banner" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
)
}