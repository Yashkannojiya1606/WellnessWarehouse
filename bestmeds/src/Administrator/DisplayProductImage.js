import React, { useState,useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import { Grid, TextField, Button, Avatar,InputLabel,FormControl,MenuItem,Select } from '@mui/material'
import { borderRadius } from '@mui/system';
import { getData,postDataImage,postData } from '../Administrator/FetchNodeServices';
import { DropzoneArea } from 'material-ui-dropzone';
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
function Categories(props) {
    const classes = useStyles();
    const [categoryid,setCategoryid] = useState('')
    const [subcategoryid,setSubCategoryid] = useState('')
    const [brandid, setBrandid] = useState('')
    const [productid,setProductid] = useState('')
    const [listcategory,setListCategory] = useState([])
    const [listsubcategory,setListSubCategory] = useState([])
    const [listbrand,setListBrand] = useState([])
    const [listproduct,setListProduct] = useState([])
    const [uploadfiles,setFiles]= useState([])
     
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
        fetchAllSubCategories(event.target.value)
      };

      
      const fillCategory=()=>{
        return listcategory.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        }) 
      }

      const fetchAllSubCategories = async (categoryid) => {
        var result = await postData("subcategories/displaysubcategorybycategoryid", { categoryid: categoryid })
    
        setListSubCategory(result.result)
      }
     
      const handleSubCategory = (event) => {
        setSubCategoryid(event.target.value);
        fetchAllBrands(event.target.value)
        };
    
      const fillSubCategory= () => {
        return (listsubcategory.map((item) => {
          return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)
        })
        )
      }

      
      const fetchAllBrands = async (subcategoryid) => {
        var result = await postData("brands/displaybrandbysubcategoryid", { subcategoryid: subcategoryid })
    
        setListBrand(result.result)
      }
    
      const handleBrand = (event) => {
        setBrandid(event.target.value);
        fetchAllProducts(event.target.value)
       
      };
    
      const fillBrand= () => {
        return (listbrand.map((item) => {
          return (<MenuItem value={item.brandid}>{item.brandname}</MenuItem>)
        })
        )
      }

      const fetchAllProducts = async (brandid) => {
        var result = await postData("products/displayproductbybrandid", { brandid: brandid,subcategoryid:subcategoryid })
    
        setListProduct(result.result)
      }
    
      const handleProduct = (event) => {
        setProductid(event.target.value);
       
      };
    
      const fillProduct= () => {
        return (listproduct.map((item) => {
          return (<MenuItem value={item.productid}>{item.productname}</MenuItem>)
        })
        )
      }
    
      const handleImage=(files)=>{
       setFiles(files);
      }


    
  
    const handleSubmit = async () => {
      
      var formData = new FormData()
      formData.append('categoryid',categoryid)
      formData.append('subcategoryid',subcategoryid)
      formData.append('brandid', brandid)
      formData.append('productid',productid)
      uploadfiles.map((file,index)=>{
        formData.append("image"+index,file)
      })

      var result = await postDataImage('productimages/saveproductimages', formData)
      if(result.result)
      {
        Swal.fire({
          title: "BESTMEDS",
          text: 'Product Submitted Successfully..',
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
          text: 'Fail To Submit Product',
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
             Product Image
              {/* <div style={{marginLeft:"auto"}}>
                   <Button onClick={()=>props.setView(<DisplayAllProducts/>)} style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant="contained" >List Products</Button>
      </div> */}
            </Grid>

            <Grid item xs={6}  style={{display:'flex',alignItems:'center', fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>
             
                      <FormControl fullWidth>
                      <InputLabel  style={{ color: "#FFF" }}  id="demo-simple-select-label">category</InputLabel>
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


               <Grid item xs={6}>
                      <FormControl fullWidth>
                      <InputLabel  style={{ color: "#FFF" }}  id="demo-simple-select-label">Subcategory</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={subcategoryid}
                         label="SubCategory"
                        onChange={handleSubCategory}
                          >
                           {fillSubCategory()}
                             </Select>
                          </FormControl>
                      </Grid>
                   
                      <Grid item xs={6}>
                      <FormControl fullWidth>
                      <InputLabel  style={{ color: "#FFF" }}  id="demo-simple-select-label">Brand</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={brandid}
                         label="Brand"
                        onChange={handleBrand}
                          >
                           {fillBrand()}
                             </Select>
                          </FormControl>
                      </Grid>
              

                      <Grid item xs={6}>
                      <FormControl fullWidth>
                      <InputLabel  style={{ color: "#FFF" }}  id="demo-simple-select-label">Product</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={productid}
                         label="Product"
                        onChange={handleProduct}
                          >
                           {fillProduct()}
                             </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <DropzoneArea
                         acceptedFiles={['image/jpeg','image/png','image/bmp']}
                         filesLimit={6}
                         maxFileSize={500000}
                         onChange={handleImage}
                         

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
  
  export default Categories;
  