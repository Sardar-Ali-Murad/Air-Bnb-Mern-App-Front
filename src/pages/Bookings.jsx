import * as React from 'react';
import { useDispatch,useSelector } from 'react-redux'
import {getBookings}  from "../features/placeSlice"
import SingleBooking from '../components/Booking';


export default function BasicCard() {
    let dispatch=useDispatch()
        React.useEffect(()=>{
         dispatch(getBookings())
        },[])

        let {userBookings,isLoading}=useSelector((state)=>state.place)

        if(isLoading){
            return <h2>Loading...</h2>
        }

        if(userBookings.length<1){
            return <h2>There is Nothing to show here by now...</h2>
        }
    
  return (
      <div className='div-center-80 grid-22' style={{marginTop:"30px"}}>
        {userBookings.map((Booking)=>{
            return  <SingleBooking Booking={Booking}/> 
        })}
      </div>
  );
}
