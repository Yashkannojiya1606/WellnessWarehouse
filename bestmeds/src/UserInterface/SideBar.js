import React, { useEffect, useState, createRef } from "react";
import { makeStyles, styled } from "@mui/styles";

import { getData, postDataImage, postData } from '../Administrator/FetchNodeServices';
import { Paper, Divider, Box, Checkbox } from "@mui/material";
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KeyboardArrowUp } from "@mui/icons-material";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const PrettoSlider = styled(Slider)({
  color: '#212121',
  height: 4,
  '& .MuiSlider-track': {
    border: 'none',
    color: '#212121',
  },
  '& .MuiSlider-thumb': {
    height: 14,
    width: 14,
    backgroundColor: '#fff',
    color: '#212121',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
      backgroundColor: '#fff',
      color: '#212121',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: '#212121',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#212121',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      backgroundColor: '#212121',
    },
    '& > *': {
      transform: 'rotate(45deg)',
      backgroundColor: '#212121',
    },
  },

});
const useStyles = makeStyles((theme) => ({
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
    fontSize: 15, fontWeight: 550, fontFamily: 'Calibri', color: '#000'
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
export default function SideBar(props) {
  const classes = useStyles()
  const [value1, setValue1] = useState([100, 7000]);
  const [value, setValue] = useState(false);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);
  const [state, setState] = useState(false)
  const [state1, setState1] = useState(false)
  const [state2, setState2] = useState(false)
  const [listBrand, setListBrand] = useState([])
  const [minPrice, setMinPrice] = useState(100)
  const [maxPrice, setMaxPrice] = useState(7000)

  const fetchAllBrands = async () => {
    var result = await getData('brands/DisplayAll')
    setListBrand(result.data)
  }

  useEffect(function () {
    fetchAllBrands()
  }, [])

  function subMenu() {
    return (
      <div>
        <RadioGroup
          aria-label="Discount"
          defaultValue="discount"
          name="radio-buttons-group"
        >
          {listBrand.map((item) => {
            return (
              <FormControlLabel className={classes.FormControlLabel}
                value={item.brandname}
                control={<Radio style={{ color: "#212121" }} size="small" />}
                label={<span style={{ fontSize: 13, fontFamily: 'Calibri' }}>{item.brandname}</span>}
              />
              // <FormControlLabel value={item.brandname} control={<Radio />} label={item.brandname} />
            )
          })}
        </RadioGroup>
      </div>
    );
  }

  const minDistance = 10;
  const handleChange1 = async (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      setMinPrice(value1[0])
      await props.fetchAllProductByPrice(value1[0], value1[1])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      setMaxPrice(value1[1])
      await props.fetchAllProductByPrice(value1[0], value1[1])
    }

  };
  const handleClick = () => {
    setValue(!value)
    setState(!state)
  }
  const handleClick1 = () => {
    setValue2(!value2)
    setState1(!state1)
  }
  const handleClick2 = () => {
    setValue3(!value3)
    setState2(!state2)
  }
  const handleArrowClick = () => {
    setValue3(!value3)
    setState2(!state2)
    fetchAllBrands()
  }
  const SortBy = () => {
    return (
      <RadioGroup aria-label="Sort By"
        defaultValue="female"
        name="radio-buttons-group">
        <FormControlLabel className={classes.FormControlLabel}
          value="Low to High"
          control={<Radio style={{ color: "#212121" }} size="small" />}
          label={<span style={{ fontSize: 13, fontFamily: 'Calibri' }}>Low to High</span>}
        />
        <FormControlLabel className={classes.FormControlLabel}
          value="High to Low"
          control={<Radio style={{ color: "#212121" }} size="small" />}
          label={<span style={{ fontSize: 13, fontFamily: 'Calibri' }}>High to Low</span>}
        />
        <FormControlLabel className={classes.FormControlLabel}
          value="Oldest to Newest"
          control={<Radio style={{ color: "#212121" }} size="small" />}
          label={<span style={{ fontSize: 13, fontFamily: 'Calibri' }}>Oldest to Newest</span>}
        />
        <FormControlLabel className={classes.FormControlLabel}
          value="Newest to Oldest"
          control={<Radio style={{ color: "#212121" }} size="small" />}
          label={<span style={{ fontSize: 13, fontFamily: 'Calibri' }}>Newest to Oldest</span>}
        />
      </RadioGroup>
    );
  };

  const Discount = () => {
    return (
      <div>
        <RadioGroup
          aria-label="Sort By"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel className={classes.FormControlLabel}
            value="40% or more"
            control={<Radio style={{ color: "#212121" }} size="small" />}
            label={<span style={{ fontSize: 13, fontFamily: 'Calibri' }}>40% or more</span>}
          />
          <FormControlLabel className={classes.FormControlLabel}
            value="30% or more"
            control={<Radio style={{ color: "#212121" }} size="small" />}
            label={<span style={{ fontSize: 13, fontFamily: 'Calibri' }}>30% or more</span>}
          />
          <FormControlLabel className={classes.FormControlLabel}
            value="20% or more"
            control={<Radio style={{ color: "#212121" }} size="small" />}
            label={<span style={{ fontSize: 13, fontFamily: 'Calibri' }}>20% or more</span>}
          />
          <FormControlLabel className={classes.FormControlLabel}
            value="10% or more"
            control={<Radio style={{ color: "#212121" }} size="small" />}
            label={<span style={{ fontSize: 13, fontFamily: 'Calibri' }}>10% or more</span>}
          />
        </RadioGroup>
      </div>
    );
  };
  return (

    <div className={classes.center} style={{ position: 'sticky', top: 81,color:'black' }} >
      <Paper elevation={0} className={classes.paper}>
        <div className={classes.filterStyleHeading}>
          FILTERS
        </div>
        <Divider />
        <div style={{ padding: 10 }}>
          <PrettoSlider
            getAriaLabel={() => 'Minimum distance'}
            value={value1}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            disableSwap
            min={1}
            max={10000}
          />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            <div style={{ fontSize: 12 }}>Min<br />{minPrice}</div>
            <div style={{ marginLeft: 150, fontSize: 12 }}>Max<br />{maxPrice}</div>
          </div>
        </div>
        <Divider />
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.sidenavheading}
            
          >
            SORT BY
          </AccordionSummary>
          <AccordionDetails>{SortBy()}</AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.sidenavheading}
          >
            DISCOUNT
          </AccordionSummary>
          <AccordionDetails>{Discount()}</AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.sidenavheading}
          >
            BRANDS
          </AccordionSummary>
          <AccordionDetails>{subMenu()}</AccordionDetails>
        </Accordion>
        <Divider />
        <div >
          <div style={{ fontWeight: 'bold', padding: 10, letterSpacing: 1, fontSize: 15 }}>Availability</div>
          <Checkbox {...label} />In Stock
        </div>
      </Paper>
    </div>

  )
}