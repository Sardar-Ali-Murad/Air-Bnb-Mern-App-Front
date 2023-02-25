import React from "react";
import "./CreatePlace.css";
import FormRow from "../components/FormRow";
import { useSelector, useDispatch } from "react-redux";
import { changeSatate } from "../features/placeSlice";
import { uploadPlaceImage,removeAlert } from "../features/placeSlice";
import Card from "@mui/material/Card";
import { FcDeleteColumn } from "react-icons/fc";
import {
  delImage,
  handleCheckInput,
  createPlaceFun,
} from "../features/placeSlice";
import Checkbox from "@mui/material/Checkbox";
import {editPlaceFun}  from "../features/placeSlice"
import Alert from "../components/PlaceAlert"

const createPlace = () => {
  let dispatch = useDispatch();
  let place = useSelector((state) => state.place);
  function handleChange(event) {
    dispatch(
      changeSatate({ name: event.target.name, value: event.target.value })
    );
  }

  function handleImage(event) {
    dispatch(uploadPlaceImage(event));
  }

  function del(id) {
    dispatch(delImage({ id }));
  }

  function handleCheck(event) {
    dispatch(
      handleCheckInput({
        name: event.target.name,
        checked: event.target.checked,
      })
    );
  }

  let main = React.useRef();

  function add() {
    dispatch(createPlaceFun());
    main.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  }

  function edit() {
    dispatch(editPlaceFun());
    main.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  }


  return (
    <div className="div-center-80" style={{ marginTop: "50px" }} ref={main}>
      <h3 className="text-center">
        {place.editPlace ? "Edit Place" : "Create Place"}
      </h3>
      {place.showAlert && <Alert />}
      <FormRow
        name="Title"
        label="Title"
        value={place.Title}
        placeholder="Enter the title"
        handleChange={handleChange}
      />
      <FormRow
        name="Address"
        value={place.Address}
        placeholder="Enter the Address"
        handleChange={handleChange}
      />
      {place.isLoading && <p>Loading...</p>}
      <input
        type="file"
        className="form-font"
        id="image"
        accept="image/*"
        onChange={handleImage}
        style={{ margin: "30px 0px" }}
      />
      {place?.Photos?.length > 0 && (
        <Card style={{ padding: "10px", marginBottom: "20px" }}>
          {place.Photos.map((image) => {
            return (
              <div
                id={image.id}
                style={{
                  display: "flex",
                  gap: "40px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "20px 0px",
                }}
              >
                <img src={image.image} className="image" />
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <FcDeleteColumn
                    className="icon"
                    onClick={() => del(image.id)}
                  />
                </div>
              </div>
            );
          })}
        </Card>
      )}

      <textarea
        name="Description"
        className="form-textarea form-label"
        value={place.Description}
        placeholder="Enter the description"
        onChange={handleChange}
        style={{ height: "300px" }}
      ></textarea>

      <FormRow
        name="extraInfo"
        value={place.extraInfo}
        placeholder="Enter Some ExtraInfo"
        handleChange={handleChange}
      />

      <FormRow
        name="Price"
        value={place.Price}
        placeholder="Enter Some Price"
        handleChange={handleChange}
        type="Number"
      />
      <FormRow
        name="totalGuests"
        value={place.totalGuests}
        type="Number"
        placeholder="Enter Some TotalGuest"
        handleChange={handleChange}
      />

      <h5>Some Checks</h5>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20pxs" }}>
          <p>Wifi</p>
          <Checkbox
            checked={place.Wifi}
            onChange={handleCheck}
            inputProps={{ "aria-label": "controlled" }}
            name="Wifi"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20pxs" }}>
          <p>TV</p>
          <Checkbox
            checked={place.TV}
            onChange={handleCheck}
            inputProps={{ "aria-label": "controlled" }}
            name="TV"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20pxs" }}>
          <p>Radio</p>
          <Checkbox
            checked={place.Radio}
            onChange={handleCheck}
            inputProps={{ "aria-label": "controlled" }}
            name="Radio"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20pxs" }}>
          <p>Pets</p>
          <Checkbox
            checked={place.Pets}
            onChange={handleCheck}
            inputProps={{ "aria-label": "controlled" }}
            name="Pets"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20pxs" }}>
          <p>freeParking</p>
          <Checkbox
            checked={place.freeParking}
            onChange={handleCheck}
            inputProps={{ "aria-label": "controlled" }}
            name="freeParking"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20pxs" }}>
          <p>privateEntrance</p>
          <Checkbox
            checked={place.privateEntrance}
            onChange={handleCheck}
            inputProps={{ "aria-label": "controlled" }}
            name="privateEntrance"
          />
        </div>
      </div>

      {
       !place.editPlace ?
        <button
        className="btn"
        style={{
          width: "200px",
          height: "40px",
          padding: "5px",
          marginTop: "30px",
        }}
        onClick={add}
        >
        Add
      </button>:
        <button
        className="btn"
        style={{
          width: "200px",
          height: "40px",
          padding: "5px",
          marginTop: "30px",
        }}
        onClick={edit}
        >
        Edit
      </button>
      }
    </div>
  );
};

export default createPlace;
