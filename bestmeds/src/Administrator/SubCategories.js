import React, { useState,useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import { Grid, TextField, Button, Avatar,InputLabel,FormControl,MenuItem,Select } from '@mui/material'
import { borderRadius } from '@mui/system';
import DisplayAllSubCategories from './DisplayAllSubCategories';
import { getData,postDataImage } from './FetchNodeServices';
import Swal from "sweetalert2";
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 700,
    marginTop: 50

  },
});
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1.5px solid #FFF',
      borderRadius: 0
    },
    '&:hover fieldset': {
      borderColor: '#FFF',

    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFF',

    },

  },
});
const Input = styled('input')({
  display: 'none',
});
function SubCategories(props) {
    const classes = useStyles();
    const [categoryid,setCategoryid] = useState('')
    const [subcategoryName, setSubCategoryName] = useState('')
    const [description,setDescription] = useState('')
    const [icon, setIcon] = useState({ bytes: '', filename: '/image.png' })
    const [listcategory,setListCategory] = useState([])
     
    const fetchAllCategory=async()=>
      {
        var result=await getData("categories/displayall")
        setListCategory(result.result)

      }

      useEffect(function(){

        fetchAllCategory()
 
        },[])

    const handleCategoryChange = (event) => {
        setCategoryid(event.target.value);
      };

      
      const fillCategory=()=>{
        return listcategory.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        }) 
      }

    
    const handleIconChange = (event) => {
  
      setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
  
    }
  
    const handleSubmit = async () => {
      var formData = new FormData()
      formData.append('categoryid',categoryid)
      formData.append('subcategoryname', subcategoryName)
      formData.append('description',description)
      formData.append('icon', icon.bytes)
      var result = await postDataImage('subcategories/savesubcategories', formData)
      if(result.result)
    {
      Swal.fire({
        title: "BESTMEDS",
        text: 'SubCategory Submitted Successfully..',
        imageUrl: '/image.png',
        imageWidth: 150,
        imageHeight: 150,
        icon:'success'
      })
    }
    else
    {
      Swal.fire({
        title: "BESTMEDS",
        text: 'Fail To Submit SubCategory',
        imageUrl: '/image.png',
        imageWidth: 150,
        imageHeight: 150,
        icon:'error'
      })
    }

  
  
  
    }
    return (
  
      <div className={classes.root}>
  <style jsx>
      {`
        fieldset.MuiOutlinedInput-notchedOutline {
          border-color: white !important;
        }
        svg.MuiSvgIcon-root {
          color: white !important;
        }
        
        div.MuiOutlinedInput-input.MuiSelect-select{
          color:#FFF !important
        }
        
      `}
    </style>
        <div className={classes.subdiv}>
          <Grid container spacing={2} >
          <Grid item xs={12} style={{display:'flex',alignItems:'center', fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>
          <img src="/category.png" style={{width:50,height:50}}/>
              Sub Category Interface
              <div style={{marginLeft:"auto"}}>
                   <Button onClick={()=>props.setView(<DisplayAllSubCategories/>)}  style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant="contained" >List SubCategories</Button>
               </div>
            </Grid>
           
            <Grid item xs={12}>
              
                      <FormControl fullWidth>
                        
                       <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">category</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={categoryid}
                         label="Category"
                        onChange={handleCategoryChange}
                          >
                           {fillCategory()}
                             </Select>
                          </FormControl>
                      </Grid>
                      
            <Grid item xs={12}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label=" SubCategory Name" onChange={(event) => setSubCategoryName(event.target.value)} fullWidth />
  
            </Grid>

            <Grid item xs={12}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="Description" onChange={(event) => setDescription(event.target.value)} fullWidth />
  
            </Grid>

            <Grid item xs={6} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <label htmlFor="contained-button-file">
                <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                <Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>
                  Upload
                </Button>
              </label>
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                alt="Remy Sharp"
                src={icon.filename}
                variant="rounded"
                sx={{ width: 70, height: 70 }}
              />
            </Grid>
  
            <Grid item xs={6}>
              <Button onClick={() => handleSubmit()} style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Submit</Button>
  
            </Grid>
            <Grid item xs={6}>
              <Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Reset</Button>
            </Grid>
  
          </Grid>
  
        </div>
  
      </div>
    );
  }
  
  export default SubCategories;
  