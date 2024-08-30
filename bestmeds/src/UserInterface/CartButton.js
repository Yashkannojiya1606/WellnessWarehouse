import React, { useState, useEffect, createRef } from 'react';
import { Grid, makeStyles, Avatar, Button } from "@material-ui/core"


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { fontFamily } from '@mui/system';

const useStyles = makeStyles({
    root: {

        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'


    },
    subdiv: {

        padding: 15,
        width: 250,
        marginTop: 50,
        height: 300,
        border: '0.5px solid #95a5a6',
        borderRadius: 2,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
})


export default function CartButton(props) {
    const classes = useStyles();

    const [qty, setQty] = React.useState(props.value)

    const handlePlus = () => {
        var v = qty + 1;
        if (v < 10)
            setQty(v)
        props.onChange(v)

    }

    const handleMinus = () => {
        var v = qty - 1;
        if (v >= 0)
            setQty(v)
        props.onChange(v)

    }

    return (
        <>
            {qty == 0 ? <div style={{ display: 'flex', alignItems: 'center', padding: 5, margin: 2 }}><Button fullWidth style={{ width: '230px', background: '#000', color: '#fff' }} onClick={() => handlePlus()} variant='contained' >Add to Cart</Button></div> :
                <div style={{ display: 'flex', alignItems: 'center', padding: 5, margin: 1 }}>
                    <Avatar style={{ background: '#333', color: '#fff', marginRight: 10, borderRadius: 5 }} onClick={() => handleMinus()} variant="square">
                        -
                    </Avatar>
                    <span>
                        {qty}
                    </span>

                    <Avatar style={{ background: '#333', color: '#fff', marginLeft: 10, borderRadius: 5 }} onClick={() => handlePlus()} variant="square">
                        +
                    </Avatar>
                </div>}
        </>
    )
}