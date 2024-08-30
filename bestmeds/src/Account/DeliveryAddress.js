import React, { useState } from 'react';

import { Grid, TextField, Button, Avatar } from '@mui/material'
// import { Box, Grid, TextField, Dialog,DialogActions, Button } from "@material-ui/core";
import {MenuItem,FormControl,InputLabel,Select } from "@material-ui/core";

import { useSelector,useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
// import { Add } from '@mui/icons-material';

export default function Deliveryaddress() {
    const location = useLocation()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user);
    console.log(userData)
    const user = Object.values(userData)[0]
    console.log(user)
    const [customer,setCustomer]=useState(Object.values(JSON.parse(localStorage.getItem("user")))[0])
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
const handleDialog=()=>{
    return(
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <div >
  
  <div >
    <Grid container spacing={2} >
    <Grid item xs={12} style={{display:'flex',alignItems:'center', fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>
    
        Brands Interface

      </Grid>

     

        
             
      <Grid item xs={12}>
        <TextField variant="outlined" label=" Brands Name" fullWidth />

      </Grid>

      <Grid item xs={12}>
        <TextField variant="outlined"  label="Status"  fullWidth />

      </Grid>



     
    </Grid>

  </div>

</div>

        </DialogContent>
        <DialogActions>
        
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
}
//     const handleDialog=()=>{
//         return(
//         <Dialog
//           fullScreen={false}
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="responsive-dialog-title"
//         >
          
//           <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//          <TextField variant="outlined"  label="Pincode"  fullWidth />


// <TextField variant="outlined" label="Pincode"  fullWidth />

// <TextField variant="outlined" label="Pincode"  fullWidth />

//           {/* <TextField id="standard-basic" label="Pincode" variant="standard" />
//           <TextField id="standard-basic" label="State" variant="standard" />
//           <TextField id="standard-basic" label="City" variant="standard" />
//           <TextField id="standard-basic" label="Firstname" variant="standard" />
//           <TextField id="standard-basic" label="Lastname" variant="standard" />
//           <TextField id="standard-basic" label="Address" variant="standard" />
//           <TextField id="standard-basic" label="Phone number" variant="standard" /> */}
//           </Box>
//           <DialogActions>
           
//             <Button onClick={handleClose}  style={{alignItems:'center'}}>
//               Submit
//             </Button>
//           </DialogActions>
//         </Dialog>
      
//         )
//     }
    return (
       
                    
                    <Grid container style={{ display: 'flex'}}>
                       

                        <Grid item xs={12} style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                            <Grid container style={{ display: 'flex',justifyContent:'center' }}>
                                <Grid item xs={6} style={{ padding: 20 }}>
                                    Delivery Address
                                    <Grid style={{ paddingTop: '5%',paddingLeft:10 }}>
                                        <div style={{height:50,border:'1px solid black',alignItems:'center',display:'flex',justifyContent:'space-around',borderRadius:7,cursor:'pointer'}} onClick={handleClickOpen}>
                                         <AddIcon/>
                                        <div style={{display:'flex',justifyContent:'center'}}>
                                          Add New Address
                                          </div>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} style={{paddingTop:'8%',paddingRight:20}}>
                                   
                                    <Grid>
                                        <div style={{display:'flex',border:'1px solid black',borderRadius:6,flexDirection:'column',padding:20}}>
                                          <div style={{fontSize:20,fontWeight:'bold',alignItems:'center'}}>
                                            ADITYA JAIN
                                          </div>
                                          <div>
                                            Thatipur
                                            </div>
                                            <div>
                                                Gwalior - 474006,Madhya Pradesh 
                                            </div>
                                            <div>
                                                +91-8462054552
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {handleDialog()}
                        </Grid>
                    </Grid>
              
            
    )
}