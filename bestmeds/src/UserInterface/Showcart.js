import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Badge, Grid, TextField, Paper, Divider } from '@mui/material';
import { makeStyles } from "@material-ui/core"
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import { postData, getData, ServerURL } from '../Administrator/FetchNodeServices';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import CartButton from './CartButton';
import Header from './Header';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { BorderBottom } from '@mui/icons-material';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import QtyCtrl from './QtyCtrl';
const theme = createMuiTheme({
  status: {
    danger: '#e57373',
  },
  palette: {
    primary: {
      main: '#343434',
      light: '#ff9800',
      darker: '#e65100',
      contrastText: '#fff',
    },
    neutral: {
      main: '#e57373',
      contrastText: '#fff',
    },
  },
});
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Crimson',
    background: '#f6f6f7',

  },
  subdiv: {

    padding: 20,
    width: 1200,
    marginTop: 50,
  },
  one: {

    padding: 20,
    width: '95%',
    marginTop: 10,
    background: '#fff',
    borderRadius: '8px',


  },
  two: {

    padding: 20,
    width: '100%',
    background: '#fff',
    height: 100,
    borderRadius: '20px',
    fontFamily: 'Poppins',
    marginLeft: 20,

  },
  three: {
    borderRadius: '20px',
    padding: 20,
    marginTop: 20,
    width: '95%',
    background: '#fff',
    paddingLeft: 50,
    // height:200,
    fontFamily: 'Poppins',
    marginLeft: 20,
  },
  four: {
    textAlign: 'left',
    paddingLeft: 20,
    fontFamily: 'Poppins',
    // marginLeft: 20,
  },

  paper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: 'rgb(0 0 0 / 20%) 0px 1px 5px 0px',
    borderRadius: 20
    // padding: 20,
    // margin: 10,
    // backgroundColor: "#FFFFFF",
    // boxShadow:'rgb(0 0 0 / 20%) 0px 1px 5px 0px',
    // borderRadius:0
  },
  grow: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 17,
    color: '#212121',
    fontWeight: 600
  },
  paperPayment: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  rowStart: {
    fontSize: 14,
    paddingTop: 10,
    fontWeight: 500,
    display: "flex",
    justifyContent: "flex-start",
    width: 300,
  },
  rowEnd: {
    fontSize: 14,
    padding: 10,
    display: "flex",
    justifyContent: "flex-end",
    width: 300,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    color: '#707070',
    fontFamily: 'Calibri',
  },
  span: {
    fontWeight: 450,

    fontFamily: 'Calibri'
  },
  hover: {
    "&:hover": {
      //background: "#de011b",
      background: "#FFC312",
      transform: "scale(1)",
      //transition: "all 0.5s ease 0s",
      color: "#000",
    },
  },
  divider: {
    //width: '100%',
    margin: '10px -20px 0px -20px',
    borderBottomWidth: 'inherit !important'
  },
});
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

export default function Productview(props) {
  const classes = useStyles();
  var month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
  var date = new Date()
  var newdate = new Date()
  newdate.setDate(date.getDate() + 3)
  const [refresh, setRefresh] = React.useState(false)
  var dispatch = useDispatch()
  const [banner, setBanner] = React.useState([])
  const [getButtonStatus, setButtonStatus] = useState(0);
  const [getMsg, setMsg] = useState("");
  var products = useSelector((state) => state.product)
  var length = Object.keys(products).length;
  
  var account = JSON.parse(localStorage.getItem('user'))
  var navigate = useNavigate()
  var listproducts = Object.values(products)
  var totalamount = listproducts.reduce(calculatetotal, 0)
  // alert(JSON.stringify(products))
  var offeramount = listproducts.reduce(calculateoffer, 0)

  const [getCount, setCount] = useState(false);
  const [getCoupon, setCoupon] = useState([]);
  const [delivery, setDelivery] = useState(0);
  const [getNetAmount, setNetAmount] = useState();
  const getcoupon = localStorage.getItem("getcoupon")
  const [getCouponApply, setCouponApply] = useState(getcoupon != "" && getcoupon);
  const [getCouponDiscount, setCouponDiscount] = useState(0);
  const [getCouponStatus, setCouponStatus] = useState(0);

  function calculateoffer(p, n) {
    return (p + (n.offerprice * n.qty))
  }
  function calculatetotal(p, n) {
    return (p + (n.price * n.qty))
  }
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  const showCartItems = () => {
    return listproducts.map((item, key) => {
      return (<>
        <div>
          <div
            container
            spacing={0}
            style={{
              padding: "10px 0px 0px 0px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: 'Poppins'
            }}
          >
            <div style={{ width: '120px', }}>
              {/* <div style={{ width: 100, height: 100 }}> */}
              <img
                src={`${ServerURL}/images/${item.picture}`}
                // width={100}
                // height={100}
                style={{ width: 120, height: 120, border: '1px solid #A1A1A1', borderRadius: 10 }}
              />
              {/* </div> */}

            </div>
            <div style={{ width: '40%', paddingLeft: 10, }}>
              <div>
                <span style={{ display: 'block', color: '#585757', fontSize: 20, fontWeight: 600, fontFamily: 'Calibri' }}>{item.productname}</span>
              </div>
              <div style={{ display: 'block', fontSize: 18, color: '#FF2341', fontWeight: 500, display: 'flex', flexDirection: 'column' }}>
                <small style={{ display: 'block', color: '#969696', fontSize: 14 }}>
                  Mfr: {item.brandname}
                </small>
                <span style={{ fontSize: 14 }}>M.R.P.: &#8377; {numberFormat(item.price)}</span>
                <span style={{ fontSize: 18, color: '#00BA34' }}>Price: &#8377; {numberFormat(item.offerprice)}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#00BA34', }}>Only {item.stock} Left In Stock</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '30%', fontWeight: 600, letterSpacing: 1.3, justifyContent: 'space-between' }}>
              <div style={{ fontSize: 14, color: '#A1A1A1' }}> &#8377;{item.offerprice > 0 ? ((item.price - item.offerprice)).toFixed(2) : (item.price).toFixed(2)} x {item.qty}</div>
              <div style={{ fontSize: 14, color: '#ef4281' }}> &#8377;{item.offerprice > 0 ? ((item.price - item.offerprice) * item.qty).toFixed(2) : (item.price * item.qty).toFixed(2)}</div>
            </div>
            <div style={{ display: "flex", flexDirection: 'column', padding: "5px 0px 5px 5px", justifyContent: "flex-end", alignItems: 'flex-end', width: '15%' }} >
              {/* <CartButton value={item.qty} 

              onChange={(value) => handleQtyChange(value, item)} /> */}
              {item.cartstatus == 1 ? (
                <QtyCtrl
                  value={item.qty}
                  onChange={(value) => handleQtyChange(value, item, key)}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          {/* {length != key + 1 ? <Divider className={classes.divider} /> : <div></div>} */}
        </div >
        {/* <div style={{ display: 'flex', justifyContent: 'left', marginTop: 10, padding: 20 }}>
          <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 50, height: 50 }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right', fontFamily: 'Poppins', marginLeft: 10, marginTop: 10 }}>
            <div> {item.productname}</div>
            <div style={{ fontSize: 12, fontWeight: 100 }}><i>Only {item.stock} Left In Stock</i></div>
            <div style={{ fontSize: 12, fontWeight: 100 }}>Mfr: {item.brandname}</div>
          </div>
        </div> */}
        {/* <div style={{ display: 'flex', flexDirection: 'row', color: "#ef4281", fontWeight: 'bold', fontFamily: 'Crimson Pro', marginTop: 20, fontSize: 20, marginLeft: 50 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 14, color: '#000' }}> &#8377;{item.offerprice > 0 ? ((item.price - item.offerprice)).toFixed(2) : (item.price).toFixed(2)} x {item.qty}</div>

            <div> &#8377;{item.offerprice > 0 ? ((item.price - item.offerprice) * item.qty).toFixed(2) : (item.price * item.qty).toFixed(2)}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}><CartButton value={item.qty} onChange={(value) => handleQtyChange(value, item)} /></div>
        </div> */}

        <div style={{ fontSize: 14, fontFamily: 'Poppins', display: 'flex', color: '#333333', alignItems: 'center', justifyContent: 'space-between' }}>
          Delivery between {month[new Date().getMonth()]} {date.getDate()}-{month[newdate.getMonth()]} {newdate.getDate()}
          {/* <div style={{display:'flex',justifyContent:'right'}}>
             Qty
            </div> */}

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: '#A1A1A1' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#A1A1A1', fontWeight: 500, padding: 10 }}>
              <FavoriteIcon style={{ fontSize: 24 }} /><div>Save</div>
            </div>
            |
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#A1A1A1', fontWeight: 500 }}>
              <DeleteIcon style={{ fontSize: 24 }} /><div>Delete</div>
            </div>
          </div>
        </div>
        <Divider className={classes.divider} />
      </>)
    })
  }

  const fetchAllBanners = async () => {
    var result = await getData('cartbanner/displayallbanner')
    setBanner(result.result)
  }

  const showAllBanners = () => {
    return banner.map((item, index) => {
      return (
        <img src={`${ServerURL}/images/${item.bannerpicture}`} />
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
  const handleUserLogin = () => {

    if (!localStorage.getItem("user")) {
     navigate('/signin')
    } else {
      var user = JSON.parse(localStorage.getItem("user"));
      // props.history.push(
      //   { pathname: "/showcartreview" },
      //   { mobileno: user.mobileno, data: user, cartdata: listproducts }
      // );
      navigate('/showcartreview',{mobileno: user.mobileno, data: user, cartdata: listproducts})
    }
  };
  const handleProducts = () => {
    props.history.push({ pathname: "/home" });
  };
  const CheckSession = async () => {
    if (localStorage.getItem('user')) {
      var user = Object.values(JSON.parse(localStorage.getItem('user')))
      // var name = user.username.split(' ')
      // setFirstName(name[0])
      // setLastName(name[1])
      // setEmail(user.emailaddress)
      // setMobile(user.mobileno)
    }
    else {
      navigate('/signin')
    }
  }
  useEffect(function () {
    fetchAllBanners()
    CheckSession()
  }, [])

  // const ShowCoupon = () => {
  //   //fetchdelivery()
  //   return (
  //     <div>
  //       <Paper elevation={0} className={classes.paper}>
  //         <Grid item xs={12} sm={12}>
  //           <div style={{ fontFamily: 'Poppins', alignItems: 'left', color: '#333333', fontSize: 20, fontWeight: 700 }}>
  //             PAYMENT DETAILS
  //           </div>
  //           <Divider className={classes.divider} style={{ marginBottom: 20 }} />
  //           <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
  //             <div >MRP Total</div><div style={{ marginLeft: 'auto', paddingLeft: 60 }}>&#8377; {totalamount}</div>
  //           </div>
  //           <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'black', alignItems: 'left', fontWeight: 'bold' }}>
  //             <div > Total Amount*</div><div style={{ marginLeft: 'auto', paddingLeft: 50 }}>&#8377;{totalamount - offeramount}</div>
  //           </div>
  //           <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'darkgreen', alignItems: 'left', fontWeight: 'bold' }}>
  //             <div > You Save</div><div style={{ marginLeft: 'auto', paddingLeft: 50 }}>&#8377;{offeramount}</div>
  //           </div>
  //           <Divider className={classes.divider} style={{ marginBottom: 20 }} />
  //           <div style={{ display: 'flex', fontFamily: 'Poppins', fontWeight: 'bold', color: 'black', alignItems: 'left' }}>
  //             <div>AMOUNT PAY<br />&#8377;{totalamount - offeramount}</div> <div style={{ marginLeft: 'auto', paddingLeft: 60 }}><Button variant='contained' style={{ background: '#ef4281', color: '#fff' }} onClick={() => navigate('/showcartreview')}> Proceed </Button></div>
  //           </div>
  //         </Grid>
  //       </Paper>
  //       {/* </Grid> */}
  //     </div>
  //   );
  // };
  const handleCouponCancel = () => {
    setButtonStatus(0)
    setCouponDiscount(0)
    setCouponApply("")
    setMsg("")
    localStorage.removeItem("getcoupon")
    // setNetAmount("")
  }
  const ShowCoupon = () => {
    //fetchdelivery()
    return (
      <div>
        
        {/* <Grid container spacing={0}> */}
        <Paper elevation={0} className={classes.paper}>
          <Grid item xs={12} sm={12}>
            <div className={classes.heading}>
              <b>Payment Details</b>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.paperPayment}>
              <div className={classes.rowStart}>M.R.P</div>
              <div className={classes.rowEnd}>
                {numberFormat(totalamount + offeramount)}
              </div>
            </div>
            <Divider />
            <div className={classes.paperPayment}>
              <div className={classes.rowStart}>Product Discount</div>
              <div className={classes.rowEnd}>
                <b style={{ color: '#009432' }}>- {numberFormat(offeramount)}</b>
              </div>
            </div>
            <Divider />
            <div className={classes.paperPayment}>
              <div className={classes.rowStart}>Delivery Charges</div>
              <div className={classes.rowEnd}>
                <b>+ {numberFormat(delivery)}</b>
              </div>
            </div>
            <Divider />
            <div className={classes.paperPayment}>
              <div className={classes.rowStart}>
                <b>Total Amount</b>
              </div>
              <div className={classes.rowEnd}>
                <b>{numberFormat(totalamount + parseInt(delivery))}</b>
              </div>
            </div>
            {getCouponDiscount ? <> <Divider />
              <div className={classes.paperPayment}>
                <div className={classes.rowStart}><b>Coupon Applied ({getCouponApply})</b></div>
                <div className={classes.rowEnd}>
                  <b style={{ color: '#009432' }}>- {numberFormat(getCouponDiscount)}</b>
                </div>
              </div>
              <Divider /></> : <>
              <Divider />
            </>}
            <div className={classes.paperPayment}>
              <div className={classes.rowStart}>
                <b style={{ fontSize: 18 }}>Net Amount</b>
              </div>
              <div className={classes.rowEnd}>
                <b style={{ fontSize: 18 }}>{numberFormat(totalamount + parseInt(delivery) - parseInt(getCouponDiscount))}</b>
              </div>
            </div>
            <Divider />
            <div
              style={{ display: "flex", justifyContent: "flex-start", color: '#009432', fontWeight: 500, fontSize: 16, padding: '10px 0px 5px 0px', }} >
              You will save {numberFormat(offeramount + parseInt(getCouponDiscount))} on this order
            </div>
          </Grid>
          <Divider className={classes.divider} style={{ marginBottom: 20 }} />
          <Grid item xs={12} sm={12}>
          {account ? <> <Button
              fullWidth
              style={{ padding: 8, fontSize: 20, color: '#fff', backgroundColor: '#212121', WebkitBoxShadow: '0 5px 19px 2px rgba(0,0,0,0)', }}
              onClick={() => handleUserLogin()}
            >
              Place Order
            </Button></> : <> <Button
              fullWidth disabled
              style={{ padding: 8, fontSize: 20, color: '#fff', backgroundColor: '#212121', WebkitBoxShadow: '0 5px 19px 2px rgba(0,0,0,0)', }}
              onClick={() => handleUserLogin()}
            >
              Place Order
            </Button></>}

          </Grid>
        </Paper>
        {/* </Grid> */}

      </div>
    );
  };
  return (
    <>
      <Header style={{ width: '100%' }} history={props.history} />
      <div className={classes.center}>
        <div style={{ width: "98%", margin: "10px 5px", }}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                <div style={{ width: '100%' }}>
                  <Slider {...bannersettings}  >
                    {showAllBanners()}
                  </Slider>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper elevation={0} className={classes.paper}>
                <Grid item xs={12} sm={12} className={classes.center}>
                  <Grid item xs={12} md={6}>
                    <div style={{ fontFamily: 'Poppins', alignItems: 'left', color: '#333333', fontSize: 20, fontWeight: 700 }}>
                    My Cart({length})
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} style={{ alignItems: 'center', justifyContent: 'right', justifyItems: 'right' }}>
                    <div style={{ fontSize: 17, color: '#009432', fontWeight: 500, float: 'right' }}>
                      {/* Total: {numberFormat(total)} */}
                    </div>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={12} sm={12}>
                  {showCartItems()}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={1} style={{ position: 'sticky', top: 0 }}>
                <Grid item xs={12} md={12}>
                  <div style={{ position: 'sticky' }}>{ShowCoupon()}</div>
                </Grid>
                <div className={classes.four} style={{ fontFamily: 'Poppins', fontWeight: 'bold', color: 'grey', alignItems: 'left', fontSize: 10, marginTop: 5 }}>
                  Netmeds is a technology platform to facilitate transaction of business. The products and services are offered for sale by the sellers. The user authorizes the delivery personnel to be his agent for delivery of the goods. For details read Terms & Conditions
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      {/* <div className={classes.root}>

        <div className={classes.subdiv}>
          <Grid container spacing={2}>

            <Grid item xs={7}>
              <div style={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'Poppins', }}>
                ORDER SUMMARY
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                <div style={{ width: '100%' }}>
                  <Slider {...bannersettings}  >
                    {showAllBanners()}
                  </Slider>
                </div>
              </div>
              <div className={classes.one} >
                <div style={{ fontFamily: 'Poppins' }}>
                  PRODUCTS
                </div>
                {showCartItems()}
              </div>
            </Grid>
            <Grid item xs={5} >
              <div className={classes.two}>
                <div style={{ fontFamily: 'Poppins', alignItems: 'left', color: 'grey' }}>
                  APPLY PROMOCODE / NMS SUPERCASH
                </div>
              </div>

              <div className={classes.three}>
                <div style={{ fontFamily: 'Poppins', alignItems: 'left', color: 'grey' }}>
                  PAYMENT DETAILS
                </div>
                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
                  <div >MRP Total</div><div style={{ marginLeft: 'auto', paddingLeft: 60 }}>&#8377; {totalamount}</div>
                </div>
                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'black', alignItems: 'left', fontWeight: 'bold' }}>
                  <div > Total Amount*</div><div style={{ marginLeft: 'auto', paddingLeft: 50 }}>&#8377;{totalamount - offeramount}</div>
                </div>
                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'darkgreen', alignItems: 'left', fontWeight: 'bold' }}>
                  <div > You Save</div><div style={{ marginLeft: 'auto', paddingLeft: 50 }}>&#8377;{offeramount}</div>
                </div>
                <div style={{ marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left', fontSize: 14 }}>
                  AMOUNT PAY
                </div>
                <div style={{ display: 'flex', fontFamily: 'Poppins', fontWeight: 'bold', color: 'black', alignItems: 'left' }}>
                  <div>&#8377;{totalamount - offeramount}</div> <div style={{ marginLeft: 'auto', paddingLeft: 60 }}><Button variant='contained' style={{ background: '#000', color: '#fff' }} onClick={() => navigate('/signin')}> Proceed </Button></div>

                </div>

              </div>
              <div className={classes.four} style={{ fontFamily: 'Poppins', fontWeight: 'bold', color: 'grey', alignItems: 'left', fontSize: 10, marginTop: 5 }}>
                Netmeds is a technology platform to facilitate transaction of business. The products and services are offered for sale by the sellers. The user authorizes the delivery personnel to be his agent for delivery of the goods. For details read Terms & Conditions
              </div>
            </Grid>
          </Grid>
        </div>
      </div> */}
      <Footer />
    </>

  )

}

