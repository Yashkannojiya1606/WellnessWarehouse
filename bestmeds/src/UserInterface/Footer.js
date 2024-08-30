import React, { useState,useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import { Button, Grid, TextField, Avatar,MenuItem,FormControl,InputLabel,Select } from "@material-ui/core";
import { IconButton } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp'
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { postData,getData,ServerURL } from '../Administrator/FetchNodeServices';
const Input = styled('input')({
    display: 'none',
  });
  const useStyles = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    subdiv: {
   
      padding: 20,
      width: 1200,
      marginTop: 50
  
    },
  
    croot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    csubdiv: {
      background: 'inherit',
      padding: 20,
      width: 1500,
      // height:300,
      marginTop: 50
  
    },
  });
  
  export default function Footer(props) {
      var classes=useStyles()
      const [category,setCategory]=React.useState([])
      const fetchAllCategories=async()=>{
       var result=await getData('categories/displayall')
       setCategory(result.result)
     
      }
      useEffect(function(){
        fetchAllCategories()
        
         },[])
        
        const showMainCategories=()=>{
        return category.map((item)=>{
        return (<div style={{marginRight:50}}>
          
          <Button style={{color:'#000'}}>{item.categoryname}</Button>
          </div>)
        
        
        })
        
        
        }
    return(
        <div className={classes.croot}>
         <div className={classes.csubdiv}>
         <Grid container spacing={2}>
            <Grid item xs={4}>
            <img src='/logo.png' width="150"/>
       </Grid>
       <Grid item xs={8}>
           <h3 style={{textAlign:"center"}}>Bestmeds.com, India Ki Pharmacy
           , is brought to you by the Aditya & Company –<br/> one of India’s most trusted pharmacies,
            with over 100 years’ experience in dispensing quality medicines.</h3>
       </Grid>
       </Grid>
     
       <Grid container spacing={2}>
       <Grid item xs={3}>
           <Grid >
               <h4 style={{ fontSize:20}}>Company</h4>
               <div  style={{fontSize:17,marginBottom:'10px'}}> About Bestmeds</div>
               <div  style={{fontSize:17,marginBottom:'10px'}}>Customers Speak</div>
               <div  style={{fontSize:17,marginBottom:'10px'}}>In the News</div>
               <div  style={{fontSize:17,marginBottom:'10px'}}>Terms and Conditions</div>
               <div  style={{fontSize:17,marginBottom:'10px'}}>Privacy Policy</div>
               <div  style={{fontSize:17,marginBottom:'10px'}}>Contact</div>
           </Grid>
           </Grid>
           <Grid item xs={3}>
           <Grid>
               <h4 style={{ fontSize:20}}>Shopping</h4>
               <div  style={{fontSize:17,marginBottom:'10px'}}>Browse by A-Z</div>
               <div  style={{fontSize:17,marginBottom:'10px'}}>Health Articles</div>
               <div  style={{fontSize:17,marginBottom:'10px'}}>Offers/Coupons</div>
               <div  style={{fontSize:17,marginBottom:'10px'}}>FAQs</div>
           </Grid>
           </Grid>
           <Grid item xs={2}>
           <Grid>
               <h4 style={{ fontSize:20}}>Categories</h4>
               <div  style={{fontSize:17,marginBottom:'10px'}}>{showMainCategories()}</div>
               
           </Grid>
           </Grid>
           <Grid item xs={2}>
           <Grid >
           <h4 style={{ fontSize:20}}>Social</h4>
               <div style={{fontSize:17,marginBottom:'10px'}}>Patient Alike</div>
               <div style={{fontSize:17,marginBottom:'10px'}}>Facebook <FacebookSharpIcon/></div>
               <div style={{fontSize:17,marginBottom:'10px'}}>Twitter<TwitterIcon/></div>
               <div style={{fontSize:17,marginBottom:'10px'}}>Youtube  <YouTubeIcon/></div>
               <div style={{fontSize:17,marginBottom:'10px'}}>Refer&Earn</div>
           </Grid>
           </Grid>
           <Grid item xs={2}>
           <Grid>
           <h4 style={{  textAlign: "center"
        }}>SUBSCRIBE TO OUR NEWSLETTER </h4>
        <h4 style={{ marginTop: "10px"
        }}> Get a free subscription to our health and
        fitness tip and stay tuned to our latest
        offers</h4>
        <TextField
            className="username"
            name="username"
           placeholder="Enter Your mail Address"
            type="text"
            variant="standard"></TextField>
            
               <IconButton>
                     <MailIcon />
                  </IconButton>
           </Grid>
           {/* <img src='/googleplay.png'  width='100' style={{marginBottom:"36px",display:'flex'}} />
              
              <img src='/iosapp.png'  width='100' style={{display:'flex'}} /> */}
           </Grid>
           <Grid item xs={2}>
               <h7>Wellness</h7>
           </Grid>
           <Grid item xs={2}>
               <h7>LabTests</h7>
           </Grid>
           <Grid item xs={2}>
               <h7>Beauty</h7>
           </Grid>
           <Grid item xs={2}>
               <h7>Consult a doctor</h7>
           </Grid>
           <Grid item xs={2}>
               <h7>Store near you</h7>
           </Grid>
           <Grid item xs={2}>
               <h8>Copyright© 2022 Bestmeds Marketplace Ltd.</h8>
           </Grid>
           </Grid>
       </div>
       </div>
    )

  }  
