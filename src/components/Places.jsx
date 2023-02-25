import React from "react";
import "./Places.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllPlaces } from "../features/placeSlice";
import Place from "./Place";

const Places = () => {
  let dispatch = useDispatch();
  let { Places, isLoading } = useSelector((state) => state.place);
  React.useEffect(() => {
    dispatch(getAllPlaces());
  }, []);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="div-center-90 grid-22" style={{ marginTop: "50px" }}>
      {Places.map((place) => {
        return <Place place={place} />;
      })}
    </div>
  );
};

export default Places;
