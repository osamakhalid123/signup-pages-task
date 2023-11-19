import React from 'react'
import { Typography } from '@mui/material'

function Footer() {
  return (
    <div style={{display:"flex", justifyContent:"space-between",margin:"15px 0"}}>
        <div>
            <Typography variant='h5'>© Markatty 2022</Typography>
        </div>

        <div style={{display:"flex",alignItems:"center"}}>
            <img src="/images/mail-01.svg" alt="mail" />
            <Typography variant='h5'>support@markatty.com</Typography>

        </div>
    </div>
  )
}

export default Footer