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
import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Hidden from '@material-ui/core/Hidden'
import { useDispatch } from 'react-redux';
const theme = createTheme();
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ecf0f1',
  },
  subdiv: {

    background: '#fff',
    width: '86%',


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
export default function CustomerLogin() {
  var navigate = useNavigate()
  var classes = useStyles()
  var theme = useTheme()
  var dispatch = useDispatch()
  var location = useLocation()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [emailid, setEmailId] = React.useState('')
  const [firstname, setFirstName] = React.useState('')
  const [lastname, setLastName] = React.useState('')
  const [OTP, setOTP] = React.useState('');
  const [mobileno, setMobileno] = useState(location.state.mobileno)
  const [gOtp, setGOtp] = useState('')
  const [message, setMessage] = React.useState('')

  const handleSubmit = async () => {
    if (OTP == gOtp) {
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

  const generateOtp = () => {
    var otp = parseInt(Math.random() * 899999) + 100000
    alert(otp)
    setGOtp(otp)
    return (otp)
  }

  useEffect(function () {
    generateOtp()
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={2} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Hidden smDown>
            <Grid item xs={6}>
              <img src='/signinimage.png' width="100%" />
            </Grid>

            <Grid item xs={6}>
              <div style={{ fontFamily: 'Poppins', textAlign: 'left', fontWeight: "bolder", fontSize: 20, paddingTop: 20 }}>
                Create Account
              </div>

              <div style={{ paddingTop: 5, color: '#000' }}>
                <CssTextField fullWidth onChange={(event) => setEmailId(event.target.value)} label="EMAIL ID" variant="outlined" />
              </div>

              <div style={{ paddingTop: 5 }}>
                <CssTextField fullWidth variant="outlined" label="FIRST NAME" onChange={(event) => setFirstName(event.target.value)} />
              </div>

              <div style={{ paddingTop: 5 }} >
                <CssTextField fullWidth variant="outlined" label="LAST NAME" onChange={(event) => setLastName(event.target.value)} />
              </div>
              <div style={{ fontSize: 20, fontWeight: "500", fontFamily: 'Poppins', marginTop: 5 }}>
                VERIFYING NUMBER
              </div>
              <div style={{ fontSize: 12, fontWeight: "500", fontFamily: 'Poppins' }}>
                We have sent 6 digit OTP on +91{location.state.mobileno}
              </div>
              <div>
                <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                <ResendOTP onResendClick={() => console.log("Resend clicked")} />
              </div>

              <div style={{ paddingTop: 5, justifyContent: 'center' }}>
                <Button fullWidth onClick={() => handleSubmit()} variant="contained" style={{ borderRadius: 5, color: '#fff', background: '#000' }}>Verify</Button>
              </div>
            </Grid>
          </Hidden>

          <Hidden mdUp>
            {/* <Grid item xs={6}>
       <img src='/signinimage.png' width="100%"/>
         </Grid> */}

            <Grid item xs={12}>
              <div style={{ fontFamily: 'Poppins', textAlign: 'left', fontWeight: "bolder", fontSize: 20, paddingTop: 20 }}>
                Create Account
              </div>

              <div style={{ paddingTop: 5, color: '#000' }}>
                <CssTextField fullWidth onChange={(event) => setEmailId(event.target.value)} label="EMAIL ID" variant="outlined" />
              </div>

              <div style={{ paddingTop: 5 }}>
                <CssTextField fullWidth variant="outlined" label="FIRST NAME" onChange={(event) => setFirstName(event.target.value)} />
              </div>

              <div style={{ paddingTop: 5 }} >
                <CssTextField fullWidth variant="outlined" label="LAST NAME" onChange={(event) => setLastName(event.target.value)} />
              </div>
              <div style={{ fontSize: 20, fontWeight: "500", fontFamily: 'Poppins', marginTop: 5 }}>
                VERIFYING NUMBER

              </div>
              <div style={{ fontSize: 10, marginTop: 5 }}>{`We have sent 6 digits otp on +91${mobileno}`}</div>

              <div>
                <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
                <ResendOTP onResendClick={() => console.log("Resend clicked")} />
              </div>

              <div style={{ paddingTop: 5, justifyContent: 'center' }}>
                <Button fullWidth onClick={() => handleSubmit()} variant="contained" style={{ borderRadius: 5, color: '#fff', background: '#000' }}>Verify</Button>
              </div>
            </Grid>
          </Hidden>

        </Grid>
      </div>
    </div>


  )
}