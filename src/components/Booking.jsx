import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import {FcDeleteColumn}  from "react-icons/fc"
import Button from '@mui/joy/Button';
import {delBooking} from "../features/placeSlice"
import { useDispatch } from 'react-redux';


const Booking = ({Booking}) => {
let dispatch=useDispatch()
    
  const startDate = new Date(Booking.startDate)
  const formattedDateStart = startDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
  
  
  const endDate = new Date(Booking.endDate)
  const formattedDateEnd = endDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
  
  
  return (
    <div>
       <Card variant="outlined" sx={{ width: 320 }}>
            <Typography level="h1" fontSize="md" sx={{ mb: 2 }} style={{fontSize:'20px'}}>
              {Booking.place.Title}
            </Typography>
            <Typography level="body2">{formattedDateStart} to {formattedDateEnd}</Typography>
            <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
              <img
                src={Booking.place.Photos[0].image}
                srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <Box sx={{ display: 'flex' }}>
              <div>
                <Typography level="body3">Total price:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  ${Booking.place.Price}
                </Typography>
              </div>
              <Button
              onClick={()=>dispatch(delBooking(Booking._id))}
                variant="solid"
                size="sm"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', fontWeight: 600 }}
              >
              <FcDeleteColumn className='icon'/>
              </Button>
            </Box>
          </Card>
    </div>
  )
}

export default Booking
