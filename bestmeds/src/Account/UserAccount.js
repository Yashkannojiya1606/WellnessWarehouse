import React, { useState } from 'react';
import { Grid } from "@material-ui/core";
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Routes, useLocation, useNavigate, Route } from 'react-router-dom';
import AccountInformation from './AccountInformation';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../UserInterface/Header';
import { useTheme } from '@mui/material/styles'
import Deliveryaddress from './DeliveryAddress';
import MyOrders from './MyOrders'
export default function UserAccount() {
  var theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  var dispatch = useDispatch()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const userData = useSelector((state) => state.user);
  console.log(userData)
  const user = Object.values(userData)[0]
  console.log(user)
  const [customer, setCustomer] = useState(Object.values(JSON.parse(localStorage.getItem("user")))[0]);

  console.log(Object.values(JSON.parse(localStorage.getItem("user")))[0]);

  const handleLogout = () => {
    dispatch({ type: "CLEAR_ALL_DATA" })
    localStorage.removeItem("user")
    navigate("/home")
  }
  return (

    <div style={{ backgroundColor: '#F6F6F7',fontFamily:'Arial' }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid style={{ width: '80%' }}>
          <div style={{ fontSize: 28, fontWeight: '700', paddingLeft: 30, paddingTop: 30 }}>
            Your Account
          </div>
          <Grid container style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: 15 }}>
            {matches ? <Grid item xs={12} style={{ backgroundColor: 'white', borderRadius: 8 }}>
              <div style={{ flexDirection: 'row', display: 'flex', padding: 10 }}>
                <div style={{ alignItems: 'center' }}>
                  <img src="/category.png" style={{ width: 50, height: 50 }} />
                </div>
                <div style={{ marginLeft: 20, alignItems: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: '700' }}>
                    {customer?.firstname}{customer?.lastname}
                  </div>
                  <div style={{ fontSize: 12, color: 'grey' }}>
                    {customer?.emailid}
                  </div>
                  <div style={{ fontSize: 12, color: 'grey' }}>
                    +91-{customer?.mobileno}
                  </div>
                </div>
              </div>
            </Grid>
              : <Grid item xs={4} style={{ backgroundColor: 'white', borderRadius: 8 }}>
                <div style={{ flexDirection: 'row', display: 'flex', padding: 20 }}>
                  <div style={{ alignItems: 'center' }}>
                    <img src="/category.png" style={{ width: 50, height: 50 }} />
                  </div>
                  <div style={{ marginLeft: 20, alignItems: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: '700' }}>
                      {customer?.firstname}{customer?.lastname}
                    </div>
                    <div style={{ fontSize: 12, color: 'grey' }}>
                      {customer?.emailid}
                    </div>
                    <div style={{ fontSize: 12, color: 'grey' }}>
                      +91-{customer?.mobileno}
                    </div>
                  </div>
                </div>
              </Grid>}

            {matches ? <Grid item xs={12} style={{ backgroundColor: '#fff', borderRadius: 8, marginTop: 10, padding: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <img src="/payment.png" style={{ width: 50, height: 50 }} />

                <img src="/orders.png" style={{ width: 50, height: 50 }} />

                <img src="/rewards.png" style={{ width: 50, height: 50 }} />

              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                <div>Payment methods</div>
                <div>Medicine orders</div>
                <div>My rewards</div>
              </div>
            </Grid>
              : <Grid item xs={7} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <img src="/payment.png" style={{ width: 50, height: 50 }} />

                  <img src="/orders.png" style={{ width: 50, height: 50 }} />

                  <img src="/rewards.png" style={{ width: 50, height: 50 }} />

                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                  <div>Payment methods</div>
                  <div>Medicine orders</div>
                  <div>My rewards</div>
                </div>
              </Grid>}
          </Grid>


          <Grid container style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: 15 }}>
            {matches ? <Grid item xs={12} style={{ backgroundColor: 'white', borderRadius: 12 }}>
            <div>
    <ListItem button  onClick={() => navigate("/useraccount/accountinformation")}
    style={{ backgroundColor: location.pathname == "/useraccount/accountinformation" ? "#ced6e0" : "", width: '100%', borderRadius: 8 }}
    >
    
      <ListItemText primary="Account Information" />
    </ListItem>
    <ListItem button onClick={() => navigate("/useraccount/order")}
    style={{ backgroundColor: location.pathname == "/useraccount/order" ? "#ced6e0" : "", width: '100%', borderRadius: 8 }}
    >
      
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button onClick={() => navigate("/useraccount/deliveryaddress")}
    style={{ backgroundColor: location.pathname == "/useraccount/deliveryaddress" ? "#ced6e0" : "", width: '100%', borderRadius: 8 }}
    >
     
      <ListItemText primary="Delivery Address" />
    </ListItem>
    <ListItem button >
     
      <ListItemText primary="Help" />
    </ListItem>
    <ListItem  button onClick={handleLogout}
    >
     
      <ListItemText primary="Logout" />
    </ListItem>
   
   
    
  </div>
            </Grid> : <Grid item xs={4} style={{ backgroundColor: 'white', borderRadius: 8 }}>
            <div>
    <ListItem button  onClick={() => navigate("/useraccount/accountinformation")}
    style={{ backgroundColor: location.pathname == "/useraccount/accountinformation" ? "#ced6e0" : "", width: '100%', borderRadius: 5 }}
    >
    
      <ListItemText primary="Account Information" />
    </ListItem>
    <ListItem button onClick={() => navigate("/useraccount/order")}
    style={{ backgroundColor: location.pathname == "/useraccount/order" ? "#ced6e0" : "", width: '100%', borderRadius: 8 }}
    >
      
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button onClick={() => navigate("/useraccount/deliveryaddress")}
    style={{ backgroundColor: location.pathname == "/useraccount/deliveryaddress" ? "#ced6e0" : "", width: '100%', borderRadius: 8 }}
    >
     
      <ListItemText primary="Delivery Address" />
    </ListItem>
    <ListItem button >
     
      <ListItemText primary="Help" />
    </ListItem>
    <ListItem  button onClick={handleLogout}
    >
     
      <ListItemText primary="Logout" />
    </ListItem>
   
   
    
  </div>
              
            </Grid>}
            {matches ? <Grid item xs={12} style={{ backgroundColor: '#fff', borderRadius: 8, marginTop: 10 }}>
              <Routes>
                <Route element={<AccountInformation />} path={"/accountinformation"} />
                <Route element={<Deliveryaddress />} path={"/deliveryaddress"} />
                <Route element={<MyOrders />} path={"/order"} />
              </Routes>
            </Grid> : <Grid item xs={7} style={{ backgroundColor: '#fff', borderRadius: 8 }}>
              <Routes>
                <Route element={<AccountInformation />} path={"/accountinformation"} />
                <Route element={<Deliveryaddress />} path={"/deliveryaddress"} />
                <Route element={<MyOrders />} path={"/order"} />
              </Routes>
            </Grid>}
          </Grid>
          
        </Grid>
      </div>
    </div>

  )
}