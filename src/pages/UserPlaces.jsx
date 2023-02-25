import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserPlaces } from "../features/placeSlice";
import Card from '@mui/material/Card';
import "./UserPlaces.css"
import { Link } from "react-router-dom";
import {editPlace,getEditSinglePlace}  from "../features/placeSlice"
const UserPlaces = () => {
    let {userPlaces,isLoading}=useSelector((state)=>state.place)
  let dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCurrentUserPlaces());
  }, []);
  function edit(id){
    dispatch(editPlace({id}))
    dispatch(getEditSinglePlace(id))
  }

  if(isLoading){
    return <h3>Loading...</h3>
  }
  if(userPlaces.length<1){
    return <h2>There is Nothing to show here by now...</h2>
}

  return <div className="div-center-80">
       {
        userPlaces.map((place)=>{
            return(
               <Link to="/createPlace">
                <Card className="singleUserPlace" onClick={()=>edit(place._id)}>
                <img src={place.Photos[0].image} style={{height:"100%",width:"100%"}}/>
                <div>
                <h4>{place.Title}</h4>
                <p>{place.Description.slice(0,300)}...</p>
                </div>
            </Card>
               </Link>
        )
        })
       }
  </div>;
};

export default UserPlaces;
