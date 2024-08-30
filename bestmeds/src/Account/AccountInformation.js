import React, { useState } from 'react';
import { Grid } from "@material-ui/core";
import { useSelector,useDispatch } from 'react-redux';
import Person from '@mui/icons-material/Person';
// import EditProfile from './EditProfile';
import { Routes, useLocation, useNavigate, Route } from 'react-router-dom';
// import ChangePassword from './ChangePassword';


export default function AccountInformation() {
    const location = useLocation()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user);
    console.log(userData)
    const user = Object.values(userData)[0]
    console.log(user)
    const [customer,setCustomer]=useState(Object.values(JSON.parse(localStorage.getItem("user")))[0])
    
    return (
       
                    
                    <Grid container style={{ display: 'flex'}}>
                       

                        <Grid item xs={12} style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                            <Grid container style={{ display: 'flex',justifyContent:'center' }}>
                                <Grid item xs={6} style={{ padding: 20 }}>
                                    Login Information
                                    <Grid style={{ padding: 10 }}>
                                        <Grid style={{ padding: 10,color:'#24AEB1' }}>
                                            EMAIL
                                            <Grid style={{color:'black'}}>
                                               {customer?.emailid}
                                            </Grid>
                                        </Grid>
                                        <Grid style={{ padding: 10,color:'#24AEB1' }}>
                                            MOBILE NUMBER
                                            <Grid style={{color:'black'}}>
                                                {customer?.mobileno}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} style={{ padding: 20 }}>
                                    Personal Information
                                    <Grid style={{ padding: 10 }}>
                                        <Grid style={{ padding: 10,color:'#24AEB1' }}>
                                            FULL NAME
                                            <Grid style={{color:'black'}}>
                                                {customer?.firstname}{customer?.lastname}
                                            </Grid>
                                        </Grid>
                                        <Grid style={{ padding: 10,color:'#24AEB1' }}>
                                            GENDER
                                            <Grid style={{color:'black'}}>
                                                No-data
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
              
            
    )
}