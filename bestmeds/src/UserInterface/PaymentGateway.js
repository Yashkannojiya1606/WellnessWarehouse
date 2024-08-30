import React, { Component, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { ServerURL,getData,postData } from '../Administrator/FetchNodeServices';

import { makeStyles } from '@material-ui/core/styles';
import Image from 'react-image-resizer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Footer from "./Footer";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import Header from "./Header";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    backgroundColor: '#f3f3f3',
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  margin: {
    marginRight: '80%',
    paddingLeft: ''
  },
  button: {
    margin: theme.spacing.unit,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});


const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    flexDirection: 'row',
    color: '#707070',
    fontFamily: 'Calibri'
  },
  paper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: 'rgb(0 0 0 / 20%) 0px 1px 5px 0px',
    borderRadius: 0
  },
  grow: {
    flexGrow: 1,
  },
  paperPayment: {
    display: 'flex', flexDirection: 'row', padding: 0
  },
  rowStart: {
    fontSize: 14, padding: 5, display: 'flex', justifyContent: 'flex-start', width: 300
  },
  rowEnd: {
    fontSize: 14, padding: 5, display: 'flex', justifyContent: 'flex-end', width: 300
  },
  divider: {
    //width: '100%',
    margin: '10px -20px 0px -20px'
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
  hover: {
    "&:hover": {
      //background: "#de011b",
      background: "#FFC312",
      transform: "scale(1)",
      //transition: "all 0.5s ease 0s",
      color: "#000",
    },
  },
  span: {
    fontWeight: 550,
    color: 'grey',
    fontSize: 13, paddingTop: 14, paddingLeft: 7,
    fontFamily: 'Calibri'
  },
  heading: {
    fontSize: 17,
    color: '#212121',
    fontWeight: 600
  },
  image: {
    // width: 150,
    // height: 150,
    // borderColor: 'red',
    // borderWidth: 2,
    borderRadius: 5,
    border: '1px solid #dfe6e9',
  },
}));
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// const styles = (theme) => ({
//   root: {
//     width: "100%",
//     marginTop: theme.spacing.unit * 3,
//     overflowX: "auto",
//   },
//   table: {
//     minWidth: 700,
//   },
//   icon: {
//     margin: theme.spacing.unit,
//     fontSize: 32,
//   },
//   margin: {
//     marginRight: "80%",
//     paddingLeft: "",
//   },
//   button: {
//     margin: theme.spacing.unit,
//   },

//   rightIcon: {
//     marginLeft: theme.spacing.unit,
//   },
// });

const PaymentGateway = (props) => {
  const classes = useStyles();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#36D7B7");
  const location=useLocation()
  var user = useSelector(state => state.user)
  var userdetails = Object.values(user)
var dispatch=useDispatch()
  var products = useSelector((state) => state.product)
  var listproducts = Object.values(products)
  var length = Object.keys(products).length;
  const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);
  const [getStatus, setStatus] = useState(true)
  const [getMsg, setMsg] = useState('')
  const [getCart, setCart] = useState([])
  const [getUser, setUser] = useState([])
  const [getTotal, setTotal] = useState(total)
  const [getSavings, setSavings] = useState(totalsavings)
  const [getCouponDiscount, setCouponDiscount] = useState(0)
  const [getPayment, setPayment] = useState('')
  const [getdis, setdis] = useState(false)
  var totalamount = listproducts.reduce(calculatetotal, 0)
  
  var offeramount = listproducts.reduce(calculateoffer, 0)
  
  function calculateoffer(p, n) {
    return (p + (n.offerprice * n.qty))
  }
  function calculatetotal(p, n) {
    console.log(n)
    return (p + (n.price * n.qty))
  }
  var total = listproducts.reduce(calculate, 0)
  console.log("ci",listproducts)
  console.log("total==,",total)
  var totalsavings = listproducts.reduce(calculatesavings, 0)
  const [delivery, setDelivery] = useState(0)
  const [open, setOpen] = useState(false)
  var na=numberFormat(offeramount + parseInt(delivery) - parseInt(getCouponDiscount))
  function calculate(a, b) {
    var price = a + ((b.offerprice != 0 ? b.offerprice : b.price) * b.qty)
    return price
  }
  function calculatesavings(a, b) {
    var saveprice = a + ((b.price - b.offerprice) * b.qty)
    return saveprice
  }
  
  const OnlineMethod = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    setTimeout(() => {
      openPayModal()
    }, 1500)
  }

  const confirmOrder = () => {
    if (getPayment == 'Online') {
      setStatus(false)
      OnlineMethod()
    }
    else {
      AddPurchaseDetails('')
    }
    handleClose()
  }


  const handleClose = () => {
    setOpen(false);
  };

  const Order = () => {
    return (
      <div>
        <div className={classes.center}>
          <div style={{ width: "98%", margin: "10px 5px" }}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Grid item xs={12} sm={12} className={classes.center}>
                    <Grid item xs={12} sm={3}>
                      <ShoppingCartIcon style={{ color: "#212121", fontSize: 20, }} />
                      <span style={{ fontWeight: 500, fontSize: 18, color: '#212121' }}>Your Cart</span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Divider style={{ marginRight: 20 }} />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.center}>
                      <PaymentIcon style={{ color: "#212121", fontSize: 20 }} />
                      <span style={{ fontWeight: 500, fontSize: 18, color: '#212121' }}>Payment</span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Divider style={{ marginRight: 20 }} />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.center}>
                      <AssignmentTurnedInIcon style={{ color: "#212121", fontSize: 20 }} />
                      <span style={{ fontWeight: 500, fontSize: 18, color: '#212121' }}>Order Summary</span>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Paper elevation={0} className={classes.paper}>
                  <Grid item xs={12} sm={12} className={classes.center}>
                    <Grid item xs={12} sm={10}>
                      <div
                        style={{
                          fontSize: 17,
                          display: "flex",
                          color: '#444444',
                          fontWeight: 'bold'
                        }}
                      >
                        Your Order ({getCart.length} items)
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={2} style={{ alignItems: 'center', justifyContent: 'right', justifyItems: 'right' }}>
                      <div style={{ fontSize: 17, color: '#009432', fontWeight: 500, float: 'right' }}>
                        Total: {numberFormat(getTotal)}
                      </div>
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider} />
                  <Grid item xs={12} sm={12} style={{ position: 'sticky' }}>
                    {ShowCartItems()}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container spacing={1} style={{ position: 'sticky', top: 78 }}>
                  <Grid item xs={12} md={12}>
                    {ShowCoupon()}
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ display: 'flex', justifycontent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                    <div>{getMsg == '' ? <></> : getMsg == 'Your Order has been Placed' ? <Image src="/images/check.png" width={30} height={30} /> :
                      <Image src="/images/wrong.png" width={30} height={30} />}</div><div><b>{getMsg}</b></div></Grid>
                </Grid>
              </Grid>

            </Grid>
          </div>
        </div>
      </div>
    )
  }


  const ShowCartItems = () => {
    return listproducts.map(function (item, key) {
      var save = item.price - item.offerprice;
      var discount = Math.ceil((save / item.price) * 100);
      return (
        <div>
          <div
            // container
            // spacing={0}
            style={{
              padding: "10px 0px 10px 0px",
              display: "flex",
              justifyContent: "space-between",
              // alignItems: "flex-start",
            }}
          >
            <div style={{ width: '90px' }}>
              {/* <div style={{ width: 100, height: 100 }}> */}
              {" "}
              <img
                src={`${ServerURL}/images/${item.picture}`}
                // width={100}
                // height={100}
                style={{ width: 85, height: 100 }}
              />
              {/* </div> */}
            </div>
            <div style={{ width: '90%', paddingLeft: 10 }}
            // style={{
            //   padding: "0px 0px 10px 10px", margin: 0
            // }}
            >
              <div>
                <span style={{ display: 'block', fontSize: 16, fontWeight: 600, fontFamily: 'Calibri' }}>{item.productname}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'grey', }}>Size: {item.size != "none" ? <font>
                  {item.size}
                </font> : <></>}</span>
              </div>
              {/* {item.size != "none" ?  <div style={{ fontSize: 15, padding: "3px 7px" }}>
                <b>Size -</b> {item.size}
              </div>:<></>} */}
              <div style={{ display: 'block', fontSize: 18, color: '#FF2341', fontWeight: 500, display: 'flex', flexDirection: 'column' }}>
                <small style={{ display: 'block', color: 'grey', fontSize: 12 }}>
                  M.R.P. <s> {numberFormat(item.price)}</s>
                </small>
                <span >Price: {numberFormat(item.offerprice)}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#009432', }}>

                You Save {numberFormat(save)} ({discount}%off)

              </div>
              <div style={{ fontSize: 13, color: 'grey', fontWeight: 550, }}>Qty : {item.qty}</div>
            </div>
          </div>
          {length != key + 1 ? <Divider /> : <div></div>}
        </div>
      )
    })
  }
  const ShowCoupon = () => {
    // alert("")
    return (
      <div>
         <Paper elevation={0} className={classes.paper}>
          <div className={classes.heading}><b>Payment Details</b></div>
          <Divider className={classes.divider} />
          <div className={classes.paperPayment}>
            <div className={classes.rowStart}>M.R.P</div>
            <div className={classes.rowEnd}>
              {numberFormat(totalamount )}
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
              <b>{numberFormat(offeramount + parseInt(delivery))}</b>
            </div>
          </div>
          {getCouponDiscount ? <> <Divider />
            <div className={classes.paperPayment}>
              {/* <div className={classes.rowStart}><b>Coupon Applied ({getCouponApply})</b></div> */}
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
              <b style={{ fontSize: 18 }}>{na}</b>
            </div>
          </div>
          <Divider />
          <div
            style={{ display: "flex", justifyContent: "flex-start", color: '#009432', fontWeight: 500, fontSize: 16, padding: '10px 0px 5px 0px', }} >
            You will save {numberFormat(totalamount + parseInt(getCouponDiscount))} on this order
          </div>
          <Divider className={classes.divider} />
         
        </Paper>
        {/* <Paper elevation={0} className={classes.paper}> */}
        {getMsg == '' ? <Paper elevation={0} className={classes.paper}>
          <div className={classes.heading}><b>Choose Payment Method</b></div>
          <Divider className={classes.divider} />
          <Grid container spacing={0} >
            <Grid item xs={12} sm={12}>{ChooseMethod()}</Grid>
          </Grid>
        </Paper> : <></>}
        {/* </Paper> */}
      </div>
    )
  }

  const ChooseMethod = () => {
    return (
      <div>

        <Radio
          checked={getPayment === 'Offline'}
          onChange={handleChange}
          value="Offline"
          style={{ color: '#000' }}
          inputProps={{ 'aria-label': 'Offline' }}
          disabled={getdis}
        />
        <span> Cash on Delivery</span>

        <Radio
          checked={getPayment === 'Online'}
          onChange={handleChange}
          value="Online"
          style={{ color: '#000' }}
          inputProps={{ 'aria-label': 'Online' }}
          disabled={getdis}
        />
        <span> Online Payment</span>

        {getPayment != '' ? <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }} >
          <Button fullWidth
            style={{ padding: 8, backgroundColor: '#212121', color: '#fff', fontSize: 20, WebkitBoxShadow: '0 5px 19px 2px rgba(0,0,0,0)', }} onClick={() => setOpen(true)}>
            Confirm Order
          </Button>
        </div> : <></>}
      </div>

    )
  }
  const handleChange = (event) => {
    setPayment(event.target.value);
  };
  const AddPurchaseDetails = async (transactionid) => {
    // alert(JSON.stringify(total - location.state.couponapply))
    var paymentstatus = ''
    if (getPayment == 'Online') {
      paymentstatus = 'Online Paid'
    }
    else {
      paymentstatus = 'Cash On Delivery'
    }
    // console.log("fesss", userdetails, "Hhhh", user)
    console.log("kria", location.state.userdetails)
    var date = new Date()
    let d = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    var t = date.getHours() + ':' + date.getMinutes()
    var data = await getData('users/generateorderno')
    if (data) {
      var ord;
      if (data[0].orderno == null) {
        ord = 'BMA1';
      } else {
        let sn = data[0].orderno + 1;
        ord = 'BMA' + sn;
      }
      var body = []
      var user = Object.values(JSON.parse(localStorage.getItem('user')))[0]
      listproducts.map(function (item, key) {
        var arr = {
          orderno: ord, orderdate: d, price: item.price, quantity: item.qty, amount: item.price, discount: item.offerprice,
          emailaddress: user.emailid, mobileno: user.mobileno, ordertime: t, productid: item.productid,
          outletid: 5, tid: transactionid, amountpaid: na, deliverycharges: delivery, 
           deliveryaddress: location.state.userdetails.address1 + "," + location.state.userdetails.address2 + "," + location.state.userdetails.city + "," + location.state.userdetails.state + "," + location.state.userdetails.zipcode
          , orderstatus: "Home Delivery", deliverystatus: 'Not Delivered',  notes: paymentstatus, status: 'Active'}
        body.push(arr)
      })
      var result = await postData('users/purchase', body)
      if (!result.RESULT) {
        setMsg("Your Order has not been Placed , Please try again")
      }
      else {
        let add = { orderno: ord, address: location.state.userdetails.address1 + "," + location.state.userdetails.address2 + "," + location.state.userdetails.city + "," + location.state.userdetails.state + "," + location.state.userdetails.zipcode };
        var resultadd = await postData('users/orderAddress', add);
        if (resultadd.RESULT) {
          setCart(listproducts)
          setTotal(total)
          setSavings(totalsavings)
          dispatch({ type: "REMOVE_ALL_CART" })
          setMsg("Your Order has been Placed")
          setdis(true)
        }
        else {
          setMsg("Your Order has not been Placed , Please try again")
        }
      }
    }
    else {
      setMsg("Your Order has not been Placed , Please try again")
    }
  }
  
  const options = {
    // key: 'rzp_test_1DP5mmOlF5G5ag',
    key: 'rzp_test_qPOfPOdzrtddEv',
    amount: total * 100, //  = INR 1
    name: 'BestMeds',
    // description: 'some description',

    image: '/images/bestmeds.png',
    handler: function (response) {
      AddPurchaseDetails(response.razorpay_payment_id)
      setStatus(true)
    },
    notes: {
      address: 'some address'
    },
    theme: {
      color: '#212121',
      hide_topbar: false
    },
    //onClose:
  };
  
 
  // const options = {
    
  //   key: "rzp_test_GQ6XaPC6gMPNwH",
  //   amount: userData.totalamount * 100, //  = INR 1
  //   name: "BestMeds.com",
  //   // description: 'some description',
  //   image:
  //     `${ServerURL}/images/logo.jpg`,
  //   handler: function (response) {
  //     // handleRazorpay(response.razorpay_payment_id)
  //     // props.addnewrecord()
  //     AddPurchaseDetails(response.razorpay_payment_id)
  //     alert(response.razorpay_payment_id);

  //   },
  //   prefill: {
  //     name: userData.firstname + " " + userData.lastname,
  //     contact: userData.mobileno,
  //     email: userData.emailid
  //   },
  //   notes: {
  //     address: "some address",
  //   },
  //   theme: {
  //     color: "blue",
  //     hide_topbar: false,
  //   },
  // };
  const gotoRazorpay = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ fontSize: 30, fontWeight: 'bold', color: 'GrayText', padding: 20 }}>Redirecting to Razorpay pls wait........</div>
        <div className="sweet-loading">
          <SyncLoader color={color} loading={loading} css={override} size={25} />
          {openPayModal()}
        </div>
      </div>
    )
  }

  const openPayModal = async () => {
    var rzp1 = new window.Razorpay(options);
    await rzp1.open()
    setLoading(!loading)

  }
  const confirmOrdeDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Order<Divider className={classes.divider} /> </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to confirm this order ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button fullWidth style={{ border: '1px solid #212121', color: '#000' }} onClick={handleClose}>
              No
            </Button>
            <Button fullWidth style={{ border: '1px solid #212121', color: '#000' }} onClick={() => confirmOrder()} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

  }, []);

  // const { classes } = props;

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!getStatus ? <center style={{ margin: '150px 0px' }}>
          <img src="/images/transfer.jpeg" />
          <h1>Transferring to Razorpay...</h1>
        </center> : <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            {Order()}
          </Grid>
        </Grid>}
      </div>
      {confirmOrdeDialog()}
      <Footer history={props.history} />
    </div>
  );
};

export default withStyles(styles)(PaymentGateway);
