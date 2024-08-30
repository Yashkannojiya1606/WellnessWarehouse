import React, { useState,useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import { Button, Grid, TextField, Avatar,MenuItem,FormControl,InputLabel,Select } from "@material-ui/core";
import MaterialTable from "@material-table/core";
import { borderRadius } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { ServerURL, postDataImage, getData, postData } from "./FetchNodeServices";
import Swal from "sweetalert2";
import { SecurityUpdateWarning } from '@mui/icons-material';

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
      background: '#7ed6df',
      padding: 20,
      width: 1500,
      marginTop: 50
  
    },
    croot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    csubdiv: {
      background: '#7ed6df',
      padding: 20,
      width: 1200,
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
export default function DisplayAllBrands(props){
    var classes=useStyles()
   const [listproduct,setListProduct]=useState([])
   const [categoryid,setCategoryId] = useState('')
   const [subcategoryid,setSubCategoryId] = useState('')
   const [brandid, setBrandId] = useState('')
   const [productid,setProductId] = useState('')
   const [productname,setProductname] = useState('')
   const [description,setDescription] = useState('')
   const [price,setPrice] = useState('')
   const [offerprice,setOfferprice] = useState('')
   const [offertype,setOffertype] =  useState ('')
   const [stock,setStock] = useState('')
   const [status,setStatus] = useState('')
    const [salestatus,setSaleStatus] = useState('')
    const [rating,setRating] = useState('')
   const [picture, setPicture] = useState({ bytes: '', filename: '/image.png' })
   const [tempicon, setTempIcon] = useState({ bytes: '', file: `${ServerURL}/images/${picture}` })
   const [btnState, setBtnState] = useState(false)
   const [listcategory,setListCategory] = useState([])
   const [listsubcategory,setListSubCategory] = useState([])
   const [listbrand,setListBrand] = useState([])
   const [open, setOpen] = useState(false)
   const [showButton,setShowButton] = useState(true)

   const fetchAllCategory=async()=>
   {
     var result=await getData("categories/displayall")
     setListCategory(result.result)

   }

   useEffect(function(){

     fetchAllCategory()
     fetchAllSubCategories()
     fetchAllBrands()
     fetchAllProducts()

     },[])
     const handleClose = () => {
      setOpen(false)
  
    }

 const handleCategoryChange = (event) => {
     setCategoryId(event.target.value);
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
     setSubCategoryId(event.target.value);
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
     setBrandId(event.target.value);
    
   };
 
   const fillBrand= () => {
     return (listbrand.map((item) => {
       return (<MenuItem value={item.brandid}>{item.brandname}</MenuItem>)
     })
     )
   }

      const fetchAllProducts=async()=>{
       var result=await getData("products/DisplayAll")
       setListProduct(result.result) 

  }
  const handleDeleteData=async(productid,picture)=>{
    Swal.fire({
     title: 'Are you sure?',
     text: "You won't be able to revert this!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, delete it!'
   }).then(async(result) => {
     if (result.isConfirmed) {
 
       var body={productid:productid,picture:picture}
       var result=await postData("products/deleteproduct",body)
       if(result.result)
       Swal.fire(
         'Deleted!',
         'SubCategory has been deleted.',
         'success'
       )
     }
     else 
     Swal.fire(
       'Deleted!',
       'Fail to Delete SubCategory .',
       'error'
     )
     fetchAllProducts()
   })
   
   
    }

    const handleCancel = (productid) => {

      setPicture({ bytes: '', file: `${tempicon.file}` })
      setBtnState(false)
      setShowButton(true)
    }
  
    const handleEditData = async () => {
  
      var body = { categoryid: categoryid, subcategoryid: subcategoryid, brandid:brandid,productname:productname,description:description,price:price,offerprice:offerprice,offertype:offertype,stock:stock,status:status,salestatus:salestatus,rating:rating, productid: productid }
      var result = await postData("products/editproduct", body)
      //console.log(result)
      setOpen(false)
      if (result.result) {
        Swal.fire({
          title: "BESTMEDS",
          text: 'Product Edited Successfully',
          imageUrl: '/category.png',
          imageWidth: '150',
          imageHeight: '150',
          icon: 'success'
        })
      }
      else {
        Swal.fire({
          title: "BESTMEDS",
          text: 'Fail to Edit Product',
          imageUrl: '/category.png',
          imageWidth: '150',
          imageHeight: '150',
          icon: 'error'
        })
  
  
      }
      fetchAllProducts()
  
    }
  
    const handleEditIcon = async () => {
  
      var formData = new FormData()
      formData.append('productid', productid)
      formData.append('picture', picture.bytes)
  
      var result = await postDataImage("products/editicon", formData)
      //console.log(result)
      setOpen(false)
      if (result.result) {
        Swal.fire({
          title: "BESTMEDS",
          text: 'Picture Edited Successfully',
          imageUrl: '/category.png',
          imageWidth: '150',
          imageHeight: '150',
          icon: 'success'
        })
      }
      else {
        Swal.fire({
          title: "BESTMEDS",
          text: 'Fail to Edit Picture',
          imageUrl: '/category.png',
          imageWidth: '150',
          imageHeight: '150',
          icon: 'error'
        })
      }
      setBtnState(false)
      fetchAllProducts()
      setShowButton(true)
  
  
    }
  
    const handleEdit = (rowData) => {
      setCategoryId(rowData.categoryid)
      fetchAllSubCategories(rowData.categoryid)
      setSubCategoryId(rowData.subcategoryid)
      fetchAllBrands(rowData.subcategoryid)
      setBrandId(rowData.brandid)
      setProductId(rowData.productid)
      setProductname(rowData.productname)
      setDescription(rowData.description)
      setPrice(rowData.price)
      setOfferprice(rowData.offerprice)
      setOffertype(rowData.offertype)
      setStock(rowData.stock)
      setStatus(rowData.status)
      setSaleStatus(rowData.salestatus)
      setRating(rowData.setrating)
      setPicture({ bytes: '', file: `${ServerURL}/images/${rowData.picture}` })
      setTempIcon({ bytes: '', file: `${ServerURL}/images/${rowData.picture}` })
      setOpen(true)
    }
    const handleIconChange = (event) => {
  
      setPicture({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
      setBtnState(true)
      setShowButton(false)
    }
    const showDialog = () => {
      return (
        <Dialog 
        
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth='S'
        >
          <DialogContent>
          <div className={classes.croot}>
           
        <div className={classes.csubdiv}>
          <Grid container spacing={2} >
          <Grid item xs={12} style={{display:'flex',alignItems:'center', fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>
          <img src="/category.png" style={{width:50,height:50}}/>
              Products Interface
  
            </Grid>

            <Grid item xs={6}  style={{display:'flex',alignItems:'center', fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>
             
                      <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">category</InputLabel>
                        <Select
                         id="demo-simple-select"
                        
                        labelId="demo-simple-select-label"
                        
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
                       <InputLabel id="demo-simple-select-label">Subcategory</InputLabel>
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
                       <InputLabel id="demo-simple-select-label">Brand</InputLabel>
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
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label=" Product Name" value={productname} onChange={(event) => setProductname(event.target.value)} fullWidth />
  
            </Grid>

            <Grid item xs={12}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="Description" value={description} onChange={(event) => setDescription(event.target.value)} fullWidth />
  
            </Grid>

            <Grid item xs={6}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="Price" value={price} onChange={(event) => setPrice(event.target.value)} fullWidth />
  
            </Grid>

            <Grid item xs={6}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="Offer Price" value={offerprice} onChange={(event) => setOfferprice(event.target.value)} fullWidth />
  
            </Grid>

            <Grid item xs={6}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="Offer Type"value={offertype} onChange={(event) => setOffertype(event.target.value)} fullWidth />
  
            </Grid>

            <Grid item xs={6}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="Stock" value={stock} onChange={(event) => setStock(event.target.value)} fullWidth />
  
            </Grid>
            <Grid item xs={6}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="status" onChange={(event) => setStatus(event.target.value)} fullWidth />
  
            </Grid>
            <Grid item xs={6}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="Salestatus" onChange={(event) => setSaleStatus(event.target.value)} fullWidth />
  
            </Grid>
            <Grid item xs={6}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="Rating" onChange={(event) => setRating(event.target.value)} fullWidth />
  
            </Grid>
            <Grid item xs={6} style={{ justifyContent: 'center', alignItems: 'center' }}>
              {showButton?<>
                  <label htmlFor="contained-button-file">
                    <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>
                      Upload
                    </Button>
                  </label></>:<></>}
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                  {btnState ? <><Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold', margin:'left' }} onClick={() => handleEditIcon()} >Save</Button><Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold',margin:'left' }} onClick={() => handleCancel()} >Cancel</Button></> : <></>}
                  <Avatar
                    alt="Upload Image"
                    src={picture.file}
                    variant="rounded"
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>

          </Grid>
  
        </div>
  
      </div>

  
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} onClick={() => handleEditData()} >Edit</Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
  
      )
  
    }
  
    function displayAll() {
        return (
          <MaterialTable
            title="List of Products"
            columns={[
              { title: 'Product Id', field: 'productid' },
              { title: 'Product Name', field: 'productname' },
              { title: 'Description', field: 'description' },
              { title: 'Price', field: 'price' },
              { title: 'Offer Price', field: 'offerprice' },
              { title: 'Offer Type', field: 'offertype' },
              { title: 'Stock', field: 'stock' },
              { title: 'Status', field: 'status' },
              { title: 'Salestatus', field: 'salestatus' },
              { title: 'Rating', field: 'rating' },
              { title: 'Picture', field: 'picture',
              render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{width: 50, borderRadius: '50%'}}/>
            },
              
            ]}
            data={listproduct}     
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product ',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Product ',
                onClick: (event, rowData) => handleDeleteData(rowData.productid,rowData.picture)
              }
            ]}
          />
        )
      }


   return(
     <div className={classes.root}>
         <div className={classes.subdiv}>
         {displayAll()}
         {showDialog()}
         </div>
     </div>

   )

}


    