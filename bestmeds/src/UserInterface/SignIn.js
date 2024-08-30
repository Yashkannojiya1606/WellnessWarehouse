import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import 'react-phone-number-input/style.css'
import { getData, postDataImage, postData } from '../Administrator/FetchNodeServices';
import Link from '@mui/material/Link';
import PhoneInput from 'react-phone-number-input'
import { useNavigate } from "react-router-dom"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // background: '#ecf0f1',
  },
  subdiv: {
    // background: '#fff',
    paddingTop: 20,
  },
});
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1.5px solid #000',
      borderRadius: 0
    },
    '&:hover fieldset': {
      borderColor: '#000',

    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',

    },

  },
});
const Input = styled('input')({
  display: 'none',
});
export default function CustomerLogin() {
  var navigate = useNavigate()
  var classes = useStyles()
  var dispatch = useDispatch()
  var theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileno, setMobileno] = useState()
  const [data, setData] = useState({})
  const [ROTP, setROTP] = useState("");
  const [OTP, setOTP] = React.useState('');
  const [emailid, setEmailId] = React.useState('')
  const [firstname, setFirstName] = React.useState('')
  const [lastname, setLastName] = React.useState('')
  const [btnStatus, setBtnStatus] = useState(true)
  const [rbtnStatus, setRBtnStatus] = useState(true)
  const [gOtp, setGOtp] = useState('')
  const [rgOtp, setRGOtp] = useState('')
  const user = useSelector((state) => state.user);
  const handleChkOtp = () => {
    if (OTP == gOtp) {
      navigate('/showcart')
      localStorage.setItem('user', JSON.stringify(user))
    }
    else { alert('Invalid otp') }
  }

  const handleVerify = async () => {
    const result = await postData('users/checkmobile', { mobileno: mobileno })
    if (result.result) {
      dispatch({ type: 'ADD_USER', payload: [result.data[0].mobileno, result.data[0]] })
      // alert(JSON.stringify(result.data[0]))
      setBtnStatus(false)
      var t = generateOtp()
      alert(t)
      setGOtp(t)
      //dispatch({type:'ADD_PRODUCT',payload:[item.productid,item]})
    }
    else {
      // <label htmlFor="chk" aria-hidden="true">
      //   Sign up
      // </label>
      var chkbtn = document.getElementById("chk")
      chkbtn.click()
      setMobileno(mobileno)
      setRBtnStatus(false)
      var t = generateOtp()
      alert(t)
      setRGOtp(t)
      // navigate('/signup', { state: { mobileno: mobileno } })
    }
  }

  const generateOtp = () => {
    var otp = parseInt(Math.random() * 899999) + 100000
    return (otp)
  }


  // //////////////////////////////////////////////reg
  const handleSubmit = async () => {
    alert(ROTP)
    alert(rgOtp)
    if (ROTP == rgOtp) {
      var body = { mobileno: mobileno, emailid: emailid, firstname: firstname, lastname: lastname }
      var result = await postData('users/adduser', body)
      alert(result.result)
      dispatch({ type: 'ADD_USER', payload: [mobileno, body] })
      navigate('/cartreview')
    }
    else {
      alert("Invalid Otp")
    }
  }

  // const generateSOtp = () => {
  //   var otp = parseInt(Math.random() * 899999) + 100000
  //   setRGOtp(otp)
  //   return (otp)
  // }

  // useEffect(function () {
  //   generateSOtp()
  // }, [])
  // /////////////////////////////////////////////end reg
  return (
    <div className={classes.root}>
      {/* <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user" />
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name / Email"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock" />
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                />
              </div>
              <button className="button login__submit">
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right" />
              </button>
            </form>
            <div className="social-login">
              <h3>log in via</h3>
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram" />
                <a href="#" className="social-login__icon fab fa-facebook" />
                <a href="#" className="social-login__icon fab fa-twitter" />
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4" />
            <span className="screen__background__shape screen__background__shape3" />
            <span className="screen__background__shape screen__background__shape2" />
            <span className="screen__background__shape screen__background__shape1" />
          </div>
        </div>
      </div> */}

      <div className={classes.subdiv}>
        <Grid container spacing={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {matches ? <></> :
            <Grid item sm={12} md={6} >
              <img src='/signinimage.png' width="100%" />
            </Grid>
          }
          <Grid item xs={12} md={6}>
            <div className="main">
              <input type="checkbox" id="chk" aria-hidden="true" />
              <div className="signup">
                {/* <form> */}
                <label className='label' htmlFor="chk" aria-hidden="true">
                  Sign In / Sign Up
                </label>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <input type="text" onChange={(event) => setMobileno(event.target.value)} placeholder="Mobile No." required="" />
                  {/* <input type="password" name="pswd" placeholder="Password" required="" /> */}
                  <div className="div">
                    {btnStatus ? <button onClick={() => handleVerify()}>Verify</button> : <>
                      <div style={{ margin: 5 }}>VERIFICATION NUMBER</div>
                      <div style={{ fontSize: 10, margin: 5 }}>{`We have sent 6 digits otp on +91${mobileno}`}</div>
                      <OTPInput style={{ marginTop: 10, }} inputStyles={{
                        width: 15,
                        height: 15,
                        marginRight: '5px',
                        fontSize: '1rem',
                        borderRadius: 4,
                        // border: '1px solid rgba(0,0,0,0.3)',
                      }}
                        value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" secure />
                      <button onClick={() => handleChkOtp()} >Verify</button>
                      {/* <Button style={{ background: '#000', color: '#FFF', fontWeight: 'bold', marginTop: 30, width: 400 }} variant='contained' onClick={() => handleChkOtp()} fullWidth>VERIFY</Button> */}
                    </>
                    }
                  </div>
                </div>
                {/* <div className="div" style={{ fontFamily: 'Poppins', fontWeight: "300", fontSize: 16, paddingTop: 10 }}>
                  Sign up or Sign in to access your orders,special offers,health tips or more!!
                </div> */}
                {/* {btnStatus ? <Button style={{ background: '#000', color: '#fff', fontWeight: 'bold', marginTop: 30, width: 400 }} variant='contained' onClick={() => handleVerify()} fullWidth>Verify</Button> : <>
                    <Grid item xs={12} style={{ display: 'flex', marginTop: 30, flexDirection: 'column', justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: '#000' }}>
                      <div>VERIFICATION NUMBER</div>
                      <div style={{ fontSize: 10, marginTop: 5 }}>{`We have sent 6 digits otp on +91${mobileno}`}</div>
                      <OTPInput style={{ marginTop: 10, }} value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                      <Button style={{ background: '#000', color: '#FFF', fontWeight: 'bold', marginTop: 30, width: 400 }} variant='contained' onClick={() => handleChkOtp()} fullWidth>VERIFY</Button>
                    </Grid>

                  </>} */}
                {/* <label htmlFor="chk" aria-hidden="true"> */}

                {/* </label> */}
                {/* </form> */}
              </div>
              <div className="login">
                {/* <form> */}
                <label htmlFor="chk" aria-hidden="true">
                  Sign up
                </label>
                { }
                <input type="text" name="txt" placeholder="First Name" required="" style={{ margin: '10px auto 10px auto' }} />
                <input type="text" name="txt" placeholder="Last Name" required="" style={{ margin: '10px auto 10px auto' }} />
                <input type="email" name="email" placeholder="Email" required="" style={{ margin: '10px auto 10px auto' }} />
                <div className='div' style={{ margin: '10px auto 10px auto' }} >

                  {/* {mobileno} */}
                  {rbtnStatus ? <button onClick={() => handleVerify()} style={{ margin: '10px auto 10px auto' }} >Verify</button> : <>
                    <div style={{ margin: 5 }}>VERIFICATION NUMBER</div>
                    <div style={{ fontSize: 10, margin: 5 }}>{`We have sent 6 digits otp on +91${mobileno}`}</div>
                    <OTPInput style={{ margin: '10px auto 10px auto' }} inputStyles={{
                      width: 15,
                      height: 15,
                      margin: '5px 10px 5px 5px',
                      fontSize: '1rem',
                      borderRadius: 4,
                      // border: '1px solid rgba(0,0,0,0.3)',
                    }}
                      value={ROTP} onChange={setROTP} OTPLength={6} otpType="number" secure />
                    <button onClick={() => handleSubmit()}>Sign up</button>
                  </>
                  }
                </div>
                {/* </form> */}
              </div>
            </div>

            {/* <div style={{ fontFamily: 'Poppins', textAlign: 'left', fontWeight: "bolder", fontSize: 24, paddingTop: 20 }}>
              Sign In/Sign Up
            </div>
            <div style={{ fontFamily: 'Poppins', fontWeight: "300", fontSize: 20, paddingTop: 10 }}>
              Sign up or Sign in to access your orders,special offers,health tips or more!!
            </div>
            <div style={{ paddingTop: 10 }}>
              <CssTextField variant="outlined" type="number" label="Phone No." onChange={(event) => setMobileno(event.target.value)} fullWidth />
            </div>
            <Grid style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, paddingTop: 5 }}>
              {btnStatus ? <Button style={{ background: '#000', color: '#fff', fontWeight: 'bold', marginTop: 30, width: 400 }} variant='contained' onClick={() => handleVerify()} fullWidth>Verify</Button> : <>
                <Grid item xs={12} style={{ display: 'flex', marginTop: 30, flexDirection: 'column', justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: '#000' }}>
                  <div>VERIFICATION NUMBER</div>
                  <div style={{ fontSize: 10, marginTop: 5 }}>{`We have sent 6 digits otp on +91${mobileno}`}</div>
                  <OTPInput style={{ marginTop: 10, }} value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />


                  <Button style={{ background: '#000', color: '#FFF', fontWeight: 'bold', marginTop: 30, width: 400 }} variant='contained' onClick={() => handleChkOtp()} fullWidth>VERIFY</Button>
                </Grid>

              </>}
            </Grid> */}
          </Grid>

        </Grid>
      </div>
    </div>


  )
}