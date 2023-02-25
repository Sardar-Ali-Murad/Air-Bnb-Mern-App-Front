import React from "react";
import "./SinglePlace.css";
import { useParams } from "react-router-dom";
import { getSinglePlace } from "../features/placeSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlinePets } from "react-icons/md";
import { IoTvSharp } from "react-icons/io5";
import { BiRadio } from "react-icons/bi";
import { AiOutlineWifi } from "react-icons/ai";
import Card from "@mui/material/Card";
import FormRow from "../components/FormRow";
import {GoLocation}  from "react-icons/go"
import {createBooking,removeAlert}  from "../features/placeSlice"
import Alert from "../components/PlaceAlert"

const SinglePlace = () => {
  let dispatch = useDispatch();
  let { singlePlace, isLoading ,showAlert} = useSelector((state) => state.place);
  let { placeId } = useParams();
  React.useEffect(() => {
    dispatch(getSinglePlace(placeId));
  }, []);




  let [startDate,setStartDate]=React.useState(null)
  let [endDate,setEndDate]=React.useState(null)
  let [totalGuests,setTotalGuests]=React.useState(null)

  function Book(){
    dispatch(createBooking({place:placeId,startDate,endDate,totalGuests}))
    setTimeout(()=>{
      dispatch(removeAlert())
    },3000)
  }
 

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div style={{ marginTop: "30px" }} className="div-center-90 singleMain">
      <h4>{singlePlace.Title}</h4>
      <div style={{display:"flex",alignItems:"center",margin:"20px 0px",gap:"20px"}}>
        <GoLocation className="icon"/>
        <p style={{textDecoration:"underline"}}>{singlePlace.Address}</p>
      </div>
      <div className="imageGrid">
        <div>
          {singlePlace?.Photos?.slice(0, 1)?.map((image) => {
            return <img src={image.image} />;
          })}
        </div>
        <div className="grid-14">
          {singlePlace?.Photos?.slice(1)?.map((image) => {
            return <img src={image.image} />;
          })}
        </div>
      </div>

      <div className="contents">
        <div className="des">
          <h4>Description</h4>
          <p>{singlePlace?.Description?.slice(0, 1000)}...</p>
          <div style={{ marginTop: "20px" }} className="checks">
            <div className={`${singlePlace.Wifi ? "tickha" : "crossha"}`}>
              <AiOutlineWifi className="icon" />
            </div>
            <div className={`${singlePlace.Pets ? "tickha" : "crosshs"}`}>
              <MdOutlinePets className="icon" />
            </div>
            <div className={`${singlePlace.TV ? "tickha" : "crossha"}`}>
              <IoTvSharp className="icon" />
            </div>
            <div className={`${singlePlace.Radio ? "tickha" : "crossha"}`}>
              <BiRadio className="icon" />
            </div>
          </div>
        </div>

        <div className="book">
            {showAlert && <Alert/>}
          <Card style={{ padding: "10px" }}>
            <h4>Price ${singlePlace.Price}/PerNight</h4>
            <Card style={{ border: "2px solid gray", padding: "4px" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                <div>
                  <h6>Check In</h6>
                  <input type="date" onChange={(e)=>setStartDate(new Date(e.target.value))} />
                </div>
                <div>
                  <h6>Check Out</h6>
                  <input type="date"  onChange={(e)=>setEndDate(new Date(e.target.value))} />
                </div>
              </div>
              <div
                className="line"
                style={{ width: "100%", marginTop: "7px" }}
              ></div>
              <FormRow label="No Of Guests" placeholder="Amout Of Guests" type="Number" handleChange={(e)=>setTotalGuests(e.target.value)} value={totalGuests}/>
              <button className="btn" style={{ width: "100%" }} onClick={Book}>
                Book Me
              </button>
            </Card>
          </Card>
        </div>
      </div>

      <Card style={{ padding: "10px", marginTop: "30px" }}>
        <h4>ExtaInfo</h4>
        <p>{singlePlace.extraInfo}</p>
      </Card>
    </div>
  );
};

export default SinglePlace;
