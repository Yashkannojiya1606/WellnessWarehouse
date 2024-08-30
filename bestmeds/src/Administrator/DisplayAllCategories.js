import React, { useEffect, useState } from "react"
import MaterialTable from "@material-table/core";
import { styled, makeStyles } from '@mui/styles';
import { Button, Grid, TextField, Avatar } from "@material-ui/core";
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



export default function DisplayAllCategories(props) {
  var classes = useStyles()
  const [listcategory, setListCategory] = useState([])
  const [open, setOpen] = useState(false)
  const [categoryid, setCategoryId] = useState('')
  const [categoryname, setCategoryName] = useState('')
  const [icon, setIcon] = useState({ bytes: '', filename: '/image.png' })
  const [tempicon, setTempIcon] = useState({ bytes: '', file: `${ServerURL}/images/${icon}` })
  const [btnState, setBtnState] = useState(false)
  const [showButton,setShowButton] = useState(true)

  const fetchAllCategory = async () => {
    var result = await getData("categories/displayall")
    setListCategory(result.result)
  }



  const handleDeleteData = async (categoryid, icon) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        var body = { categoryid: categoryid, icon: icon }
        var result = await postData("categories/deletecategory", body)
        if (result.result)
          Swal.fire(
            'Deleted!',
            'Category has been deleted.',
            'success'
          )
      }
      else
        Swal.fire(
          'Deleted!',
          'Fail to Delete Category .',
          'error'
        )
      fetchAllCategory()
    })

  }
  useEffect(function () {

    fetchAllCategory()

  }, [])

  const handleClose = () => {
    setOpen(false)

  }

  const handleCancel = (categoryid) => {

    setIcon({ bytes: '', file: `${tempicon.file}` })
    setShowButton(true)
    setBtnState(false)
  }

  const handleEditData = async () => {


    var body = { categoryname: categoryname, categoryid: categoryid }
    var result = await postData("categories/editcategory", body)
    //console.log(result)
    setOpen(false)
    if (result.result) {
      Swal.fire({
        title: "BESTMEDS",
        text: 'Category Edited Successfully',
        imageUrl: '/category.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'success'
      })
    }
    else {
      Swal.fire({
        title: "BESTMEDS",
        text: 'Fail to Edit Category',
        imageUrl: '/category.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'error'
      })


    }
    fetchAllCategory()

  }

  const handleEditIcon = async () => {

    var formData = new FormData()
    formData.append('categoryid', categoryid)
    formData.append('icon', icon.bytes)

    var result = await postDataImage("categories/editicon", formData)
    //console.log(result)
    setOpen(false)
    if (result.result) {
      Swal.fire({
        title: "LMS",
        text: 'Icon Edited Successfully',
        imageUrl: '/category.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'success'
      })
    }
    else {
      Swal.fire({
        title: "LMS",
        text: 'Fail to Edit Icon',
        imageUrl: '/category.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'error'
      })
    }
    setBtnState(false)
    fetchAllCategory()
    setShowButton(true)


  }

  const handleEdit = (rowData) => {
    setCategoryId(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setIcon({ bytes: '', file: `${ServerURL}/images/${rowData.icon}` })
    setTempIcon({ bytes: '', file: `${ServerURL}/images/${rowData.icon}` })
    setOpen(true)
  }
  const handleIconChange = (event) => {

    setIcon({ bytes: event.target.files[0], myfilename: URL.createObjectURL(event.target.files[0]) })
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
          <div className={classes.croot}>

            <div className={classes.csubdiv}>
              <Grid container spacing={2} >
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>
                  <img src="/category.png" style={{ width: 50, height: 50 }} />
                  Edit Category

                </Grid>
                <Grid item xs={12}>
                  <CssTextField variant="outlined" InputLabelProps={{
                    style: { color: '#FFF' },
                  }} inputProps={{ style: { color: "#FFF" } }} label="Category Name" value={categoryname} onChange={(event) => setCategoryName(event.target.value)} fullWidth />

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
                  {btnState ? <><Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} onClick={() => handleEditIcon()} >Save</Button><Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }}  onClick={() => handleCancel()} >Cancel</Button></> : <></>}
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
          <Button  onClick={() => handleEditData()} >Edit</Button>
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
        title="List of Categories"
        columns={[
          { title: 'Category Id', field: 'categoryid' },
          { title: 'Category', field: 'categoryname' },
          {
            title: 'Icon', field: 'icon',
            render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 50, borderRadius: '50%' }} />
          },

        ]}
        data={listcategory}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category ',
            onClick: (event, rowData) => handleEdit(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Category ',
            onClick: (event, rowData) => handleDeleteData(rowData.categoryid, rowData.icon)
          }
        ]}
      />
    )
  }


  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        {displayAll()}
        {showDialog()}
      </div>
    </div>

  )

}


