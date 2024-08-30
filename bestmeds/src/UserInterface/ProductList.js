import React, { useState, useEffect, createRef } from 'react';
import { makeStyles } from "@material-ui/core"
import { postData, getData, ServerURL } from '../Administrator/FetchNodeServices';
import { Grid, Divider, Paper, Hidden } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import Header from "./Header"
import Footer from "./Footer"
import CartButton from './CartButton';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SideBar from "./SideBar";

var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 5,
  slidesToScroll: 1,
  //autoplay: true,
  //autoplaySpeed: 2000,
};
var bannersettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const useStyles = makeStyles((theme) => ({
  root: {

    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'


  },
  subdiv: {

    padding: 15,
    width: 230,
    marginTop: 50,
    height: 300,
    border: '0.5px solid #95a5a6',
    borderRadius: 2,
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    backgroundColor: "#fff",
    //margin: "20px 0px",
    height: "auto",
    position: "sticky",
    //top: 120,
  },
  span: {
    fontSize: 15,
    fontFamily: 'Calibri',
    textDecoration: 'none',
    color: '#535c68'
  },
  paper: {

    backgroundColor: "#FFFFFF",
    boxShadow: 'rgb(0 0 0 / 20%) 0px 1px 5px 0px',
    borderRadius: 0,
  },
  grow: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: "#f3f3f3",
  },
  scardview: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 10,
  },
  productAction: {
    display: "flex",
    justifyContent: "flex-start",
    margin: 7,
    flexDirection: "column",
    color: "#747d8c",
  },
  ImageView: {
    display: "flex",
    border: '1px solid #f1f2f6',
    "&:hover": {
      // background: "#747d8c",
      // transform: "scale(1.035)",
      // transition: "all 0.1s ease 0s",
    },
    // backgroundColor: "#f1f2f6",
    borderRadius: 5,
  },
  divStyle: {
    margin: "0px 20px 20px",
    borderRadius: 5,
  },
  filterStyleHeading: {
    fontSize: 22,
    fontWeight: 600,
    fontFamily: 'Calibri',
    color: '#000000',

    padding: 10
  },
  filterStyle: {
    fontSize: 15,
    fontFamily: 'Calibri',
    color: '#000000',
    fontWeight: 550,
    padding: "10px 10px 5px 14px",
  },
  sidenavheading: {
    fontSize: 15, fontWeight: 550, fontFamily: 'Calibri', color: '#000000'
  },
  FormControlLabel: {
    marginTop: -25,
    marginBottom: 15,
  },
  hover: {
    "&:hover": {
      background: "#747d8c",
      transform: "scale(1)",
      transition: "all 0.5s ease 0s",
      color: "#fff",
    },
  },
  hoverimg: {
    // opacity: 1,maxWidth:'100%',height:'auto',
    "&:hover": {
      //background: "#de011b",
      //background: "#000000",
      // transform: "rotateY(360deg)",
      transition: "all 0.5s ease 0.1s",
      transform: "translateY(-12px)",

      // color: "#fff",
    },
  },
}));
export default function ProductList(props) {

  const classes = useStyles();
  var navigate = useNavigate()
  console.log("navigate", navigate)
  var location = useLocation()
  console.log("LOcation", location)

  var categoriesSlider = createRef()
  var brandSlider = createRef()
  const [category, setCategory] = React.useState([])
  const [brand, setBrand] = React.useState([])
  const [banner, setBanner] = React.useState([])
  const [subcategory, setSubCategory] = React.useState([])
  const [trending, setTrending] = React.useState([])
  const [refresh, setRefresh] = React.useState(false)
  var dispatch = useDispatch()
  const [name, setName] = React.useState('')
  // alert(JSON.stringify(location.state.subcategory.subcategoryid))
  const fetchAllTrending = async () => {
    var result = await postData('products/displayallproductsbycategoryid', { categoryid: location.state.category.categoryid })
    setTrending(result.result)
    setName(location.state.category.categoryname)
  }

  const fetchAllBrandByProduct = async () => {
    var result = await postData('products/displayallproductsbybrandid', { brandid: location.state.brand.brandid })
    setTrending(result.result)
    setName(location.state.brand.brandname)
  }

  const fetchAllSubCategoryByProduct = async () => {
    var result = await postData('products/displayallproductsbysubcategoryid', { subcategoryid: location.state.subcategory.subcategoryid })
    setTrending(result.result)
    setName(location.state.subcategory.subcategoryname)
  }

  useEffect(function () {
    fetchAllTrending()
    fetchAllBrandByProduct()
    fetchAllSubCategoryByProduct()
  }, [])

  const showTrending = () => {
    return trending.map((item, index) => {
      return (
        <div className={classes.productAction}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', width: 250 }} >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} >
                <Paper elevation={3}>
                  {/* <div class="show" > */}
                  <div
                    style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", cursor: 'pointer', padding: 10, }}
                  // onClick={() => handleShowProductView(item.productid, item.modelid)}
                  >
                    <Hidden mdUp>
                      <img
                        width={187}
                        height={220}
                        // style={{ opacity: o, borderRadius: 100 }}
                        alt={item.productname}
                        className={classes.hoverimg}
                        src={`${ServerURL}/images/${item.picture}`}
                      // style={{maxWidth:'100%',maxHeight:'100%'}}
                      // onClick={() => handleShowProductView(item.productid)}
                      />

                    </Hidden>
                    <Hidden smDown>
                      <img
                        width="200" height="220"
                        // style={{}}
                        alt={item.productname}
                        // className={classes.hoverimg}
                        // class="img2"
                        src={`${ServerURL}/images/${item.picture}`}
                      // onClick={() => handleShowProductView(item.productid)}
                      />
                      {/* <StyleRoot>
                        <div style={style}>
                          <div style={{color:'#fff',fontWeight:500}}><p style={{fontSize:16}}>{discount}<small>%</small></p><small>Off</small></div>
                        </div>
                    </StyleRoot> */}

                    </Hidden>

                  </div>
                  {/* </div> */}
                  <div

                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderTop: "1px solid #dcdde1",
                      padding: 10,
                      maxWidth: '250px'
                    }}
                  >

                    <Hidden smDown>
                      <div style={{ fontSize: 14, padding: "3px 0px", }}>
                        {item.productname.length >= 30
                          ? item.productname.toString().substring(0, 27) + "..."
                          :
                          item.productname}
                        {/* {item.productname} */}
                      </div>
                    </Hidden>
                    <Hidden mdUp>
                      <div style={{
                        fontSize: 14, padding: "3px 0px", overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {item.productname.length >= 30
                          ? item.productname.toString().substring(0, 25) + "..."
                          :
                          item.productname}
                        {/* {item.productname} */}
                      </div>
                    </Hidden>
                    <div>
                      {item.offerprice > 0 ? <div style={{ display: 'flex', flexDirection: 'column' }}><div>Price: &#8377; {item.price - item.offerprice}  <s style={{ color: '#ff4757' }}>&#8377; {item.price}</s> </div><div style={{ color: '#2ed573' }}>You Save:&#8377; {item.offerprice} </div></div> : <></>}
                    </div>

                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 0,
                    }}
                  >
                    <CartButton fullWidth value={0} onChange={(value) => handleQtyChange(value, item)} />
                  </div>
                </Paper>
              </Grid>
            </Grid>

          </div>
        </div>


      )

    })

  }


  const handleQtyChange = (value, item) => {
    item['qty'] = value
    if (value > 0) {
      dispatch({ type: 'ADD_PRODUCT', payload: [item.productid, item] })
    }
    else {
      dispatch({ type: 'DEL_PRODUCT', payload: [item.productid] })
    }

    setRefresh(!refresh)
  }

  return (<div>
    <Header style={{ width: '100%' }} />
    {/*/////////Products/////////*/}
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* <div style={{fontFamily:'Sarabun',fontSize:32,fontWeight:'bold'}}>{location.state.category.categoryname}</div> */}
      <Grid container spacing={0}>
        <Grid item xs={12} md={2}>
          <div style={{ margin: "10px 10px", boxShadow: 'rgb(0 0 0 / 20%) 0px 1px 5px 0px' }}>
            <SideBar />
          </div></Grid>
        <Grid item xs={12} md={10} style={{ padding: 10 }}>
          <Paper elevation={0} className={classes.paper}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: 'flex-start'
                //margin: "20px 10px",

              }}
            >
              {/* <div className={classes.divStyle}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={`${ServerURL}/images/${getBrand.ad}`}
                      alt={getBrand.brandname}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={`${ServerURL}/images/${getBrand.ad}`}
                      alt={getBrand.brandname}
                    />
                  </Grid>
                </Grid>
              </div> */}

              <div style={{ display: "flex", padding: 11, }}>
                <div style={{ width: "100%" }}>

                  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link className={classes.span} style={{ textDecoration: 'none' }}>
                      {name}
                    </Link>
                    {/* <Typography color="textPrimary" className={classes.span}>dfgdg</Typography> */}
                  </Breadcrumbs>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", textAlign: "center", width: "100%", padding: '5px 10px 0px 0px', }}>
                  {/* <span className={classes.span}>Showing{" "}<b>{getPage.length}{" "}/{" "}{getFilterList.length}</b>{" "}items</span> */}
                </div>
                <div
                  className={classes.hover}
                  style={{
                    borderRadius: 20,
                    background: '#212121',
                    color: '#fff',
                    padding: "5px 10px",
                    width: 200,
                    //height:20,
                    cursor: "pointer",
                    textAlign: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontFamily: 'Calibri'
                  }}
                // onClick={() => fetchData()}
                >
                  All Products
                </div>
              </div>
              <Divider />
              <div className={classes.scardview}>
                {showTrending()}
              </div>
              {/* {getFilterList.length == 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
              <img src={`/images/empty.png`} />
            </div>
          ) : (
            <div className={classes.scardview}>
              {showTrending()}
            </div>
          )}

          {getFilterList.length / 20 <= 1 ? (
            <></>
          ) : (
            <div className={classes.center} style={{ width: "100%" }}>
              <Pagination
                count={Math.ceil(getFilterList.length / 20)}
                variant="outlined"
                shape="rounded"
                onChange={(event, page) => handlePages(event, page)}
              />
            </div>
          )} */}
            </div>
          </Paper>
          {/* <div style={{display:'flex',flexWrap:'wrap', justifyContent:'center'}}>
      
 {showTrending()}
</div> */}
        </Grid>
      </Grid>
    </div>
    {/*/////////////////////////////////////*/}
    <Footer />
  </div>)
}