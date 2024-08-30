import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  divContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
    width: 100,
    padding: 8,
    cursor: 'pointer',
  },
  blue: {
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16
  },
  blue2: {
    width: 10,
    cursor: 'pointer'
    // color: '#000',
    // backgroundColor: '#ffffff',
    // width: 25,
    // height: 25,
    // fontSize: 20,
    // margin: '0px 5px',
    // border: '1px solid #000',
    // cursor: 'pointer',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'baseline'
  },
  counting: {
    marginTop: 0,
    // padding: '2px 20px 0px 20px',
    // border: '1px solid #000'
  }
}));
function QtyCtrl(props) {
  const classes = useStyles()
  const [counter, setCounter] = useState(0)
  //console.log("Counter-", counter)
  useEffect(() => {
    setCounter(props.value)
  })
  const handleIncrement = () => {
    var qty = counter + 1
    setCounter(qty)
    props.onChange(qty)
  }
  const handleDecrement = () => {
    if (counter >= 1) {
      var qty = counter - 1
      //alert(qty)
      if (qty != 0) { setCounter(qty) }
      props.onChange(qty)
    }
  }
  return (
    <div className={classes.divContainer}>
      <RemoveIcon className={classes.blue} onClick={() => handleDecrement()} />
      <span className={classes.blue}>{counter}</span>
      <AddIcon className={classes.blue} onClick={() => handleIncrement()} />
    </div>
  )
}
export default QtyCtrl;