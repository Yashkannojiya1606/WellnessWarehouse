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
        width: 900,
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


export default function DisplayAllBrands(props){
    var classes=useStyles()
   const [listbrand,setListBrand]=useState([])
   const [listsubcategory, setListSubCategory] = useState([])
   const [listcategory, setListCategory] = useState([])
   const [open, setOpen] = useState(false)
   const [categoryid, setCategoryId] = useState('')
   const [subcategoryid, setSubCategoryId] = useState('')
   const [brandid,setBrandId] = useState('')
   const [brandname, setBrandName] = useState('')
   const [status, setStatus] = useState('')
   const [icon, setIcon] = useState({ bytes: '', filename: '/image.png' })
   const [tempicon, setTempIcon] = useState({ bytes: '', file: `${ServerURL}/images/${icon}` })
   const [btnState, setBtnState] = useState(false)
   const [showButton,setShowButton] = useState(true)



   const fetchAllCategory = async () => {
    var result = await getData("categories/displayall")
    setListCategory(result.result)

  }

  const fetchAllSubCategory = async () => {
    var result = await getData("subcategories/DisplayAll")
    setListSubCategory(result.result)
  }
    
  const fetchAllBrands=async()=>{
       var result=await getData("brands/DisplayAll")
       setListBrand(result.result) 
   }
   const handleDeleteData=async(brandid,icon)=>{
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
 
       var body={brandid:brandid,icon:icon}
       var result=await postData("brands/deletebrand",body)
       if(result.result)
       Swal.fire(
         'Deleted!',
         'Brand has been deleted.',
         'success'
       )
     }
     else 
     Swal.fire(
       'Deleted!',
       'Fail to Delete Brand .',
       'error'
     )
     fetchAllBrands()
   })
 

    }
  
    useEffect(function(){

    fetchAllBrands()
    fetchAllCategory()
    fetchAllSubCategory()

    },[])
    const handleClose = () => {
    setOpen(false)

  }
  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };
  const fillCategory = () => {
    return listcategory.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
  }
  const handleSubCategory = (event) => {
    setSubCategoryId(event.target.value);
   
  };

  const fillSubCategory= () => {
    return (listsubcategory.map((item) => {
      return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)
    })
    )
  }




  const handleCancel = (brandid) => {

    setIcon({ bytes: '', file: `${tempicon.file}` })
    setShowButton(true)
    setBtnState(false)
  }

  const handleEditData = async () => {


    var body = { categoryid: categoryid, subcategoryid: subcategoryid, brandname:brandname,status: status, brandid: brandid }
    var result = await postData("brands/editbrand", body)
    //console.log(result)
    setOpen(false)
    if (result.result) {
      Swal.fire({
        title: "BESTMEDS",
        text: 'Brand Edited Successfully',
        imageUrl: '/category.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'success'
      })
    }
    else {
      Swal.fire({
        title: "BESTMEDS",
        text: 'Fail to Edit Brand',
        imageUrl: '/category.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'error'
      })


    }
    fetchAllBrands()

  }

  const handleEditIcon = async () => {

    var formData = new FormData()
    formData.append('brandid', brandid)
    formData.append('icon', icon.bytes)

    var result = await postDataImage("brands/editicon", formData)
    //console.log(result)
    setOpen(false)
    if (result.result) {
      Swal.fire({
        title: "BESTMEDS",
        text: 'Icon Edited Successfully',
        imageUrl: '/category.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'success'
      })
    }
    else {
      Swal.fire({
        title: "BESTMEDS",
        text: 'Fail to Edit Icon',
        imageUrl: '/category.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'error'
      })
    }
    setBtnState(false)
    fetchAllBrands()
    setShowButton(true)

  }

  const handleEdit = (rowData) => {
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setBrandId(rowData.brandid)
    setBrandName(rowData.brandname)
    setStatus(rowData.status)
    setIcon({ bytes: '', file: `${ServerURL}/images/${rowData.icon}` })
    setTempIcon({ bytes: '', file: `${ServerURL}/images/${rowData.icon}` })
    setOpen(true)
  }
  
  const handleIconChange = (event) => {

    setIcon({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
    setShowButton(false)
    setBtnState(true)
  }
  const showDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <div className={classes.root}>
  
  <div className={classes.subdiv}>
    <Grid container spacing={2} >
    <Grid item xs={12} style={{display:'flex',alignItems:'center', fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>
    <img src="/category.png" style={{width:50,height:50}}/>
        Brands Interface

      </Grid>

      <Grid item xs={12}>
                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">category</InputLabel>
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
             
      <Grid item xs={12}>
        <CssTextField variant="outlined" InputLabelProps={{
          style: { color: '#FFF' },
        }} inputProps={{ style: { color: "#FFF" } }} value={brandname} label=" Brands Name" onChange={(event) => setBrandName(event.target.value)} fullWidth />

      </Grid>

      <Grid item xs={12}>
        <CssTextField variant="outlined" InputLabelProps={{
          style: { color: '#FFF' },
        }} inputProps={{ style: { color: "#FFF" } }} value={status} label="Status" onChange={(event) => setStatus(event.target.value)} fullWidth />

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
                  {btnState ? <><Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} onClick={() => handleEditIcon()} >Save</Button><Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} onClick={() => handleCancel()} >Cancel</Button></> : <></>}
                  <Avatar
                    alt="Upload Image"
                    src={icon.file}
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
            title="List of Brands"
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: 'Brand', field: 'brandname' },
              { title: 'Icon', field: 'icon',
              render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{width: 50, borderRadius: '50%'}}/>
            },
              
            ]}
            data={listbrand}     
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brand ',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Brand ',
                onClick: (event, rowData) => handleDeleteData(rowData.brandid,rowData.icon)
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


    