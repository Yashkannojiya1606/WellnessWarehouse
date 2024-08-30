import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { getData, postData, ServerURL } from '../Administrator/FetchNodeServices'
import Button from '@material-ui/core/Button';
import Header from './Header'
import Footer from './Footer'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { checkRequire, checkMobile, checkPin } from './Checks';
import PaymentIcon from '@material-ui/icons/Payment';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Image from 'react-image-resizer'
import { statecity } from '../Statecity/StateCity';
import EditIcon from '@material-ui/icons/Edit';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { useNavigate } from 'react-router-dom';

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

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: '#f3f3f3',
  },
  paperPayment: {
    display: 'flex', flexDirection: 'row', padding: 0
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
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    flexDirection: 'row',
    color: '#707070',
    fontFamily: 'Calibri'
  },
  divRow: {
    display: 'flex', flexDirection: 'row',
    fontSize: 12,
    margin: '25px 5px 10px'
  },
  list: {
    width: 300,
  },
  subGrid: {
    padding: 5,
    margin: '10px 5px'
  },
  error: {
    color: 'red',
    position: "absolute",
    fontSize: 12,
    margin: '0px 4px'
  },
  delivery: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 13,
    backgroundColor: '#f1f2f6',
    margin: '10px 5px',
    padding: '20px 10px',
    borderRadius: 10,
    cursor: 'pointer'
  },
  divider: {
    //width: '100%',
    margin: '10px -20px 0px -20px'
  },
  heading: {
    fontSize: 17,
    color: '#212121',
    fontWeight: 600
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
}));
export default function ShowCartReview(props) {
  const navigate = useNavigate()
  var products = useSelector((state) => state.product)
  var account = JSON.parse(localStorage.getItem('user'))
  // alert(JSON.parse(localStorage.getItem('user')))
  var length = Object.keys(products).length;
  var listproducts = Object.values(products);
  // var getCouponApply = props.location.state.codecoupon
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch()
  const classes = useStyles();
  var listproducts = Object.values(products)
  var totalamount = listproducts.reduce(calculatetotal, 0)
  var products = useSelector((state) => state.product)
  var length = Object.keys(products).length;

  var account = JSON.parse(localStorage.getItem('user'))
  var offeramount = listproducts.reduce(calculateoffer, 0)
  const [getZipcode, setZipcode] = useState('')
  const [getMobile, setMobile] = useState('')
  const [getName, setName] = useState('')
  const [getCity, setCity] = useState('')
  const [getStates, setStates] = useState('')
  const [getAddress1, setAddress1] = useState('')
  const [getAddress2, setAddress2] = useState('')
  const [getZipcodeMsg, setZipcodeMsg] = useState('')
  const [getCityMsg, setCityMsg] = useState('')
  const [getStateMsg, setStateMsg] = useState('')
  const [getAddress1Msg, setAddress1Msg] = useState('')
  const [getAddress2Msg, setAddress2Msg] = useState('')
  const [getAddressState, setAddressState] = useState(false)

  const getcoupon = localStorage.getItem("getcoupon")
  const [getCouponApply, setCouponApply] = useState(getcoupon != "" && getcoupon);
  const [getMsg, setMsg] = useState("");
  const [getCouponStatus, setCouponStatus] = useState(0);
  const [getCouponDiscount, setCouponDiscount] = useState(0);
  const [getNetAmount, setNetAmount] = useState();
  const [getButtonStatus, setButtonStatus] = useState(0);
  const [getCoupon, setCoupon] = useState([]);
  const [getStateList, setStateList] = useState([])
  const [getCityList, setCityList] = useState([])
  const [getEmail, setEmail] = useState([])
  const [delivery, setDelivery] = useState(0)
  const [addressid, setaddressid] = useState(0)
  const [useradd, setuseradd] = useState({ address1: '', address2: '', zipcode: '', city: '', state: '' })
  const [state, setState] = React.useState({
    right: false, left: false
  });
  function calculateoffer(p, n) {
    return (p + (n.offerprice * n.qty))
  }
  function calculatetotal(p, n) {
    return (p + (n.price * n.qty))
  }
  // console.log('UserDAta',props.location.state.data)
  const [getUserAddress, setUserAddress] = useState([])

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);

  useEffect(function () {
    fetchcoupon()
    fetchdelivery()
    fetchAllAddress()
    fetchStates()
    handleCouponApply()
    window.scrollTo(0, 0)
  }, [totalamount])

  const fetchAllAddress = async () => {
    var u = Object.values(JSON.parse(localStorage.getItem('user')))[0]
    let body = { mobileno: u.mobileno }
    var result = await postData('address/fetchalladdress', body)
    if (result.RESULT == false) { }
    else {
      var arr = []
      result.map((item) => {
        if (item.address_status) {
          arr.push(item)
          fetchCity(item.state)
          // setZipcode(item.zipcode)
          // setAddress1(item.address1)
          // setAddress2(item.address2)
          // setCity(item.city)
          // setStates(item.state)
          setAddressState(true)
          setaddressid(item.addressid)
          setuseradd({ address1: item.address1, address2: item.address2, zipcode: item.zipcode, city: item.city, state: item.state })
        }
      })
      result.map((item) => {
        if (!item.address_status) {
          arr.push(item)
        }
      })
      if (arr.length == 1) {
        setAddressState(true)
        setuseradd({ address1: arr[0].address1, address2: arr[0].address2, zipcode: arr[0].zipcode, city: arr[0].city, state: arr[0].state })
      }
      setUserAddress(arr)
    }

  }

  const fetchdelivery = async () => {

    var result = await getData('deliverycharge/filter/' + totalamount)
    if (result.status) {

      if (result.result.length != 0) {
        setDelivery(result.result[0].charge)
      }
    }

  }

  const fetchcoupon = async () => {
    var result = await getData("coupon/displayallcoupon");
    setCoupon(result.result);
  };
  const checkAddress = async () => {
    var user = Object.values(JSON.parse(localStorage.getItem('user')))[0]
    setName(user.username)
    setMobile(user.mobileno)
    setEmail(user.emailaddress)
  }

  const CheckSession = async () => {
    if (!localStorage.getItem('user')) {
      props.history.replace({ pathname: `/Signin` })
    }
    else {
      if (localStorage.getItem('cart')) {
        var cart = JSON.parse(localStorage.getItem('cart'))
        dispatch({ type: 'SET_ALL_CART', cartItems: cart })
      }
      else {
        props.history.replace({ pathname: `/ShowCart` })

        // props.history.replace({ pathname: `/` })
      }
    }
  }
  useEffect(function () {
    CheckSession()
    checkAddress()
    fetchcoupon()
  }, [])

  const fetchStates = async () => {
    var list = []
    statecity.map(function (item, key) {
      list[key] = item.state
    })
    setStateList(list)
  }
  const fillStates = () => {
    return getStateList.map(function (item, key) {
      return (
        <MenuItem value={item}>
          {item}
        </MenuItem>
      )
    })

  }

  const handleState = (event) => {
    var state = event.target.value
    setStates(state)
    fetchCity(state)
  }

  const fetchCity = async (selectstate) => {
    var list = []
    statecity.map(function (item, key) {
      if (item.state == selectstate) {
        item.districts.map(function (data, key) {
          list[key] = data
        })
      }
    })
    setCityList(list)
  }

  const fillCities = () => {
    return getCityList.map(function (item, key) {
      return (
        <MenuItem value={item}>
          {item}
        </MenuItem>
      )
    })
  }


  function calculate(a, b) {
    ////console.log("calculate-",a,b)
    var price = a + ((b.offerprice != 0 ? b.offerprice : b.price) * b.qty)
    return price
  }
  function calculatesavings(a, b) {
    // //console.log("calculatesavings-",a,b)
    var saveprice = a + ((b.price - b.offerprice) * b.qty)
    return saveprice
  }

  const toggleDrawer = (anchor, open) => (event) => {
    handleReset()
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const ShowCouponApply = () => {
  //   return getCoupon.map((item, key) => {
  //     return (
  //       <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0px 10px 0px' }}>
  //         <LocalOfferIcon style={{ color: '#212121', fontSize: 16 }} />
  //         <div title={"Click to set code"} style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => setCouponApply(item.coupon_code)}>
  //           Flat &#8377;{item.amount_off} off on orders above &#8377;{item.min_price} - <b>({item.coupon_code})</b>
  //         </div>
  //       </div>
  //     )
  //   })
  // }

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


  const handleCouponApply = async () => {
    var totall = listproducts.reduce(calculate, 0);
    if (!!getCouponApply) {
      let body = { coupon_code: getCouponApply };
      let result = await postData("coupon/checkcoupon", body);
      // alert(totall+" "+result.result[0].min_price)
      if (result.result[0].amount_off != 0 && totall >= result.result[0].min_price) {
        var total1 = totall - result.result[0].amount_off
        setNetAmount(total1)
        setCouponDiscount(result.result[0].amount_off)
        setCouponApply(getCouponApply)
        setButtonStatus(1)
        setMsg(<span style={{ marginTop: 10, color: '#4cd137', fontWeight: 600, padding: 5 }}>&#8377;{result.result[0].amount_off} Your coupon ({result.result[0].coupon_code}) was successfully applied.</span>)
      }
      else if (result.result[0].percentage_off != 0 && total1 >= result.result[0].min_price) {
        var total1 = totall - (result.result[0].percentage_off * total1) / 100
        setNetAmount(total1)
        setCouponDiscount((result.result[0].percentage_off * total1) / 100)
        setButtonStatus(1)
        setMsg(<span style={{ marginTop: 10, color: '#4cd137', fontWeight: 600, padding: 5 }}>Your coupon ({result.result[0].coupon_code}) was successfully applied.</span>)
      }
      else {
        setCouponDiscount(0)
        setButtonStatus(0)
        setMsg(<span style={{ marginTop: 10, color: '#EA2027', fontWeight: 600, padding: 5 }}>Shop for &#8377;{result.result[0].min_price} or more to apply this coupon.</span>)
      }
    }
    else {

    }
  }

  const handleCouponCancel = () => {
    setButtonStatus(0)
    setCouponDiscount(0)
    setCouponApply("")
    setMsg("")
    localStorage.removeItem("getcoupon")
    // setNetAmount("")
  }


  const ShowCoupon = () => {
    return (
      <div>
        
        <ThemeProvider theme={theme}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={0} className={classes.paper}>
                <div className={classes.heading} style={{ display: 'flex', alignItems: 'center' }}>
                  {/* <LocalOfferIcon style={{ fontSize: 16 }} /> <div style={{ marginLeft: 10 }}>Have a coupon/referral code?</div>
                  {getMsg} */}
                </div>
                {/* <Divider className={classes.divider} /> */}
                <div style={{ marginTop: 10, display: 'flex' }}>
                  {/* {getButtonStatus ? <>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={9}>
                        <TextField size="small" disabled value={getCouponApply} onChange={(event) => setCouponApply(event.target.value)} fullWidth id="outlined-basic" label="Enter Coupon Code" variant="outlined" />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          fullWidth
                          style={{ padding: 9, fontSize: 12, color: '#fff', backgroundColor: '#212121', WebkitBoxShadow: '0 5px 19px 2px rgba(0,0,0,0)', }}
                          onClick={() => handleCouponCancel()}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </> : <>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={9}>
                        {getCouponApply ? <>
                          <TextField size="small" value={getCouponApply} onChange={(event) => setCouponApply(event.target.value)} fullWidth id="outlined-basic" label="Enter Coupon Code" variant="outlined" /></>
                          :
                          <><TextField size="small" value={getCouponApply} onChange={(event) => setCouponApply(event.target.value)} fullWidth id="outlined-basic" label="Enter Coupon Code" variant="outlined" /></>}
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          fullWidth
                          style={{ padding: 9, fontSize: 12, color: '#fff', backgroundColor: '#212121', WebkitBoxShadow: '0 5px 19px 2px rgba(0,0,0,0)', }}
                          onClick={() => handleCouponApply()}
                        >
                          Apply
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                  } */}
                </div>
                {/* {getButtonStatus ? <div style={{ pointerEvents: 'none', opacity: '0.7' }}>{ShowCouponApply()}</div> : <div>{ShowCouponApply()}</div>} */}
                <Divider className={classes.divider} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* <LocalOfferIcon style={{ fontSize: 16 }} /> <div style={{ marginLeft: 10 }}>Have a coupon/referral code?</div> */}
                  {/* {getMsg} */}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </ThemeProvider>
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
              <b style={{ fontSize: 18 }}>{numberFormat(offeramount + parseInt(delivery) - parseInt(getCouponDiscount))}</b>
            </div>
          </div>
          <Divider />
          <div
            style={{ display: "flex", justifyContent: "flex-start", color: '#009432', fontWeight: 500, fontSize: 16, padding: '10px 0px 5px 0px', }} >
            You will save {numberFormat(totalamount + parseInt(getCouponDiscount))} on this order
          </div>
          <Divider className={classes.divider} />
          {getAddressState ? <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }} >
            <Button fullWidth
              style={{ padding: 8, backgroundColor: '#212121', color: '#fff', fontSize: 20, WebkitBoxShadow: '0 5px 19px 2px rgba(0,0,0,0)', }}
              onClick={() => handleMakePayment()} >Make Payment</Button>
          </div> : <></>
          }
        </Paper>
      </div >
    )
  }
  const handleAddress = async (item) => {
    setaddressid(item.addressid)
    // setZipcode(item.zipcode)
    // setAddress1(item.address1)
    // setAddress2(item.address2)
    // setCity(item.city)
    // setStates(item.state)
    setuseradd({ address1: item.address1, address2: item.address2, zipcode: item.zipcode, city: item.city, state: item.state })
  }

  const handleReset = () => {
    setZipcode("")
    setAddress1("")
    setAddress2("")
    setCity("")
    setStates("")
    setZipcodeMsg('')
    setAddress1Msg('')
    setAddress2Msg('')
    setStateMsg('')
    setCityMsg('')
  }
  const handleClose1 = () => {
    setState({ right: true, left: false })
  }

  const handleAddAddress = async () => {

    //toggleDrawer('right', true)
    var err = false;
    if (!checkRequire(getAddress1)) {
      err = true
      setAddress1Msg('Please enter your Address')
    }
    else {
      setAddress1Msg('')
    }

    if (!checkRequire(getAddress2)) {
      err = true
      setAddress2Msg('Please enter your Address')
    }
    else {
      setAddress2Msg('')
    }

    if (!checkRequire(getCity)) {
      err = true
      setCityMsg('Please enter your City')
    }
    else {
      setCityMsg('')
    }
    if (!checkRequire(getStates)) {
      err = true
      setStateMsg('Please enter your State')
    }
    else {
      setStateMsg('')
    }

    if (!checkRequire(getZipcode)) {
      err = true
      setZipcodeMsg('Please enter your zipcode')
    }
    if (checkRequire(getZipcode)) {
      if (!checkPin(getZipcode)) {
        err = true
        setZipcodeMsg('Please enter valid zipcode')
      }
      else {
        setZipcodeMsg('')
      }
    }
    if (!err) {
      let body = {
        address1: getAddress1, address2: getAddress2, zipcode: getZipcode, city: getCity,
        state: getStates, mobileno: getMobile, country: 'INDIA'
      }

      var result = await postData('address/addAddress', body)

      if (result.affectedRows == 1) {
        handleClose1()
        handleReset()
        fetchAllAddress()
      }
      else {
        alert("Server Error")
      }

    }
  }

  const listadd = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    /*onClick={toggleDrawer(anchor, false)}*/
    //  onKeyDown={toggleDrawer(anchor, false)}
    >
      <ThemeProvider theme={theme}>
        <List style={{ padding: 10 }}>
          <div style={{ fontSize: 17, margin: 5 }}><b>Add Address</b></div>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} className={classes.subGrid}>
              <TextField fullWidth
                label="Zip Code"
                variant="outlined"
                size="small"
                value={getZipcode}
                onChange={(event) => setZipcode(event.target.value)}
              />
              <div className={classes.error}><small>{getZipcodeMsg}</small></div>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.subGrid}>
              <TextField fullWidth
                label="Address 1"
                variant="outlined"
                size="small"
                value={getAddress1}
                onChange={(event) => setAddress1(event.target.value)}
              />
              <div className={classes.error}><small>{getAddress1Msg}</small></div>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.subGrid}>
              <TextField fullWidth
                label="Address 2"
                variant="outlined"
                size="small"
                value={getAddress2}
                onChange={(event) => setAddress2(event.target.value)}
              />
              <div className={classes.error}><small>{getAddress2Msg}</small></div>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.subGrid}>
              <FormControl variant="outlined" fullWidth size="small" >
                <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                <Select
                  value={getStates}
                  onChange={(event) => handleState(event)}
                  label="State"
                >
                  <MenuItem value="">Select State</MenuItem>
                  {fillStates()}
                </Select>
              </FormControl>

              <div className={classes.error}><small>{getCityMsg}</small></div>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.subGrid}>
              <FormControl variant="outlined" fullWidth size="small" >
                <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                <Select
                  value={getCity}
                  onChange={(event) => setCity(event.target.value)}
                  label="City"
                >
                  <MenuItem value="">Select City</MenuItem>
                  {fillCities()}
                </Select>
              </FormControl>
              <div className={classes.error}><small>{getStateMsg}</small></div>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.subGrid}>
              <Button style={{ backgroundColor: '#212121', color: '#fff' }} onClick={() => handleAddAddress()} fullWidth  >Save Address</Button>
            </Grid>
          </Grid>
        </List>
      </ThemeProvider>
    </div>
  );




  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <List style={{ padding: 10 }}>
        <div style={{ fontSize: 20, margin: 5 }}><b>Location</b></div>
        <div className={classes.center} ><img width="180" height="120" src="/images/delivery.png" /></div>
        <div style={{ fontSize: 17, margin: 5 }}><b>Select Delivery Address</b></div>
        {getUserAddress.map((item, key) => {
          return (
            <div className={classes.delivery} onClick={() => handleAddress(item)} >
              <div >
                <FormControlLabel
                  control={<Radio style={{ color: '#747d8c' }} onChange={() => handleAddress(item)} />}
                  checked={addressid == item.addressid}
                /> </div>
              <div>
                <div ><b>{getName}</b></div>
                <div> {item.address1} , {item.address2}</div>
                <div>{item.city} - {item.zipcode} , {item.state}</div>
                <div><b>+91-</b>{getMobile}</div>
                {key == 0 ? <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}><b>Default Address</b></div> : <></>}
              </div>
            </div>
          )
        })}
      </List>
    </div>
  );


  const ShowAddress = () => {
    return (
      <div>
        {getAddressState ?
          <>
            <div>
              <div style={{ padding: '20px 20px 20px 20px', width: 'auto', marginTop: 15, marginBottom: 15, borderRadius: 5, display: 'flex', flexDirection: 'column', backgroundColor: '#f1f2f6', }} >
                <div><b>{getName}</b></div>
                <div> {useradd.address1},{useradd.address2}</div>
                <div>{useradd.city}-{useradd.zipcode} ,{useradd.state}</div>
                <div><b>+91 - </b>{getMobile}</div>
              </div>
            </div>
          </>
          :
          // <div style={{ border: '1px solid #bdc3c7',width: 350,  borderRadius: 5, padding: 10, display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: 15 }}
          //    >
          //   {/* <AddIcon color="primary" style={{}} /> <b>Add New Address</b> */}
          // </div>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', border: '1px dashed #747d8c', padding: '10px 20px', borderRadius: 5, cursor: 'pointer', marginTop: 10 }} onClick={toggleDrawer('left', true)}>
            <AddIcon style={{ fontSize: 75 }} />
            <div><h1>Add New Address</h1></div>
          </div>
        }
      </div>
    )
  }


  const handleMakePayment = () => {
    var userdetails = { mobileno: getMobile, username: getName, address1: useradd.address1, address2: useradd.address2, state: useradd.state, city: useradd.city, zipcode: useradd.zipcode }
    navigate('/PaymentGateway', { state: { 'userdetails': userdetails } })

  }

  return (
    <div>
      <Header history={props.history} />
      <div className={classes.center}>
        <div style={{ width: "98%", margin: "10px 5px" }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={0} className={classes.paper}>
                <Grid item xs={12} sm={12} className={classes.center}>
                  <Grid item xs={12} sm={4} style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                    <ShoppingCartIcon style={{ color: "#212121", fontSize: 18, }} />
                    <span style={{ fontWeight: 500, fontSize: 18, color: '#212121' }}>Your Cart</span>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Divider style={{ marginRight: 60 }} />
                  </Grid>
                  <Grid item xs={12} sm={4} style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                    <PaymentIcon style={{ color: "#212121", fontSize: 18 }} />
                    <span style={{ fontWeight: 500, fontSize: 18, color: '#212121' }}>Payment</span>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Divider style={{ marginRight: 60 }} />
                  </Grid>
                  <Grid item xs={12} sm={4} style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                    <AssignmentTurnedInIcon style={{ color: "#212121", fontSize: 18 }} />
                    <span style={{ fontWeight: 500, fontSize: 18, color: '#212121' }}>Order Summary</span>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper elevation={0} className={classes.paper}>
                <Grid item xs={12} sm={12} className={classes.center}>
                  <Grid item xs={12} sm={12}>
                    <div
                      style={{
                        fontSize: 17,
                        display: "flex",
                        color: '#444444',
                        fontWeight: 'bold'
                      }}
                    >
                      Delivery Address
                    </div>
                  </Grid>
                </Grid>

                <Divider className={classes.divider} />
                <Grid item xs={12} md={12}>
                  <div style={{}}>
                    {/* <div >
                        <FormControlLabel
                        control={<Radio style={{ color: '#747d8c' }} />}
                        checked
                      /> </div> */}
                    {ShowAddress()}
                    <React.Fragment key={'right'}>
                      <SwipeableDrawer
                        anchor={'right'}
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                        onOpen={toggleDrawer('right', true)}
                      >
                        {list('right')}
                      </SwipeableDrawer>
                    </React.Fragment>
                    <React.Fragment key={'left'}>
                      <SwipeableDrawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                        onOpen={toggleDrawer('left', true)}
                      >
                        {listadd('left')}
                      </SwipeableDrawer>
                    </React.Fragment>
                  </div>
                  <Divider className={classes.divider} />
                  <div >
                    {getAddressState ?
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>

                        <Button startIcon={<AddIcon />} onClick={toggleDrawer('left', true)} style={{ backgroundColor: '#212121', color: '#fff' }} > <b>Add New Address</b></Button>
                        <Button startIcon={<EditIcon />} style={{ backgroundColor: '#212121', color: '#fff' }} onClick={toggleDrawer('right', true)}>Change Address</Button></div>
                      : <></>}
                  </div>
                </Grid>

              </Paper>
              <Grid item xs={12} md={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Grid item xs={12} sm={12} className={classes.center}>
                    <Grid item xs={12} sm={5}>
                      <div
                        style={{
                          fontSize: 17,
                          display: "flex",
                          color: '#444444',
                          fontWeight: 'bold'
                        }}
                      >
                        My Cart({length})
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <div style={{ fontSize: 17, fontWeight: 500, }}>
                        Order Summary
                        <small> ({length} items)</small>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={2} style={{ alignItems: 'center', justifyContent: 'right', justifyItems: 'right' }}>
                      <div style={{ fontSize: 17, color: '#009432', fontWeight: 500, float: 'right' }}>
                        Total: {numberFormat(totalamount)}
                      </div>
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider} />
                  <Grid item xs={12} md={12}>
                    {ShowCartItems()}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}  >
              <Grid container spacing={1} style={{ position: 'sticky', top: 78 }}>
                <Grid item xs={12} md={12}>
                  {ShowCoupon()}
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </div>
      </div>
      <Footer history={props.history} />
    </div>
  )
}
