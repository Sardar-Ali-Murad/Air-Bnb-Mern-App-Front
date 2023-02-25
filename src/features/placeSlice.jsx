import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  showAlert: "",
  alertType: "",
  alertText: "",
  Description: "",
  Address: "",
  Title: "",
  Photos: [],
  extraInfo: "",
  Price: 0,
  totalGuests: 0,
  Radio: false,
  Pets: false,
  Wifi: false,
  privateEntrance: false,
  TV: false,
  freeParking: false,
  Places: [],
  singlePlace: {},
  userPlaces: [],
  editPlace: false,
  editPlaceId: "",
  userBookings:[]
};

import {
  addPlace,
  getPlaces,
  singlePlace,
  userPlaces,
  editSinglePlace,
  edditingPlace,
  makeBook,
  getUserBookings,
  deleteBooking
} from "./placeThunk";

import { v4 as uuidv4 } from "uuid";

import { placeImage } from "./placeThunk";

export const uploadPlaceImage = createAsyncThunk(
  "place/placeImage",
  async (event, thunkAPI) => {
    return placeImage(event, thunkAPI);
  }
);

export const createPlaceFun = createAsyncThunk("place/addPlace", addPlace);

export const editPlaceFun = createAsyncThunk(
  "place/edditingPlace",
  edditingPlace
);

export const getAllPlaces = createAsyncThunk("place/getPlaces", getPlaces);

export const getCurrentUserPlaces = createAsyncThunk(
  "place/userPlaces",
  userPlaces
);

export const getSinglePlace = createAsyncThunk(
  "place/singlePlace",
  async (placeId, thunkAPI) => {
    return singlePlace(placeId, thunkAPI);
  }
);
export const getEditSinglePlace = createAsyncThunk(
  "place/editSinglePlace",
  async (placeId, thunkAPI) => {
    return editSinglePlace(placeId, thunkAPI);
  }
);

export const createBooking = createAsyncThunk(
  "place/makeBook",
  async (payload, thunkAPI) => {
    return makeBook(payload, thunkAPI);
  }
);

export const delBooking = createAsyncThunk(
  "place/deleteBooking",
  async (bookingId, thunkAPI) => {
    return deleteBooking(bookingId, thunkAPI);
  }
);


export const getBookings = createAsyncThunk(
  "place/getUserBookings",getUserBookings);

let placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    changeSatate: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    delImage: (state, action) => {
      console.log(action.payload);
      state.Photos = state.Photos.filter(
        (image) => image.id !== action.payload.id
      );
    },
    handleCheckInput: (state, action) => {
      state[action.payload.name] = action.payload.checked;
    },
    removeAlert: (state) => {
      state.showAlert = false;
      state.alertText = "";
      state.alertType = "";
    },

    editPlace: (state, action) => {
      state.editPlace = true;
      state.editPlaceId = action.payload.id;
    },
  },
  extraReducers: {
    [uploadPlaceImage.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadPlaceImage.fulfilled]: (state, { payload }) => {
      state.Photos.push({ id: uuidv4(), image: payload.data.secure_url });
      state.isLoading = false;
    },
    [createPlaceFun.rejected]: (state, payload) => {
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = payload.payload;
    },
    [createPlaceFun.fulfilled]: (state, payload) => {
      state.showAlert = true;
      state.alertText = "The Place is added successfully";
      state.alertType = "success";
      state.Title = "";
      state.Address = "";
      state.Description = "";
      state.extraInfo = "";
      state.Price = 0;
      state.totalGuests = 0;
      state.Photos = [];
      state.TV = false;
      state.Wifi = false;
      state.Pets = false;
      state.Radio = false;
      state.privateEntrance = false;
      state.freeParking = false;
    },

    [getAllPlaces.pending]: (state) => {
      state.isLoading = true;
    },
    [editPlaceFun.rejected]: (state, payload) => {
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = payload.payload;
    },
    [editPlaceFun.fulfilled]: (state, payload) => {
      state.showAlert = true;
      state.alertText = "The Place is editted successfully";
      state.alertType = "success";
      state.Title = "";
      state.Address = "";
      state.Description = "";
      state.extraInfo = "";
      state.Price = 0;
      state.totalGuests = 0;
      state.Photos = [];
      state.TV = false;
      state.Wifi = false;
      state.Pets = false;
      state.Radio = false;
      state.privateEntrance = false;
      state.freeParking = false;
    },

    [editPlaceFun.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPlaces.fulfilled]: (state, { payload }) => {
      state.Places = payload.data.Places;
      state.isLoading = false;
    },
    [getAllPlaces.rejected]: (state, payload) => {
      console.log(payload);
      state.isLoading = false;
    },
    [getSinglePlace.pending]: (state) => {
      state.isLoading = true;
    },
    [getSinglePlace.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.singlePlace = payload.data.singlePlace;
    },
    [getSinglePlace.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
    [getCurrentUserPlaces.pending]: (state) => {
      state.isLoading = true;
    },
    [getCurrentUserPlaces.fulfilled]: (state, { payload }) => {
      state.userPlaces = payload.data.userPlaces;
      state.isLoading = false;
    },
    [getCurrentUserPlaces.rejected]: (state, payload) => {
      console.log(payload);
      state.isLoading = false;
    },

    [getEditSinglePlace.fulfilled]: (state, { payload }) => {
      let {
        Title,
        Description,
        Address,
        Photos,
        extraInfo,
        Pets,
        Price,
        totalGuests,
        Wifi,
        TV,
        freeParking,
        privateEntrance,
        Radio,
      } = payload.data.singlePlace;
      console.log(payload.data.singlePlace);
      state.Title = Title;
      state.Address = Address;
      state.Description = Description;
      state.extraInfo = extraInfo;
      state.Price = Price;
      state.totalGuests = totalGuests;
      state.Photos = Photos;
      state.TV = TV;
      state.Wifi = Wifi;
      state.Pets = Pets;
      state.Radio = Radio;
      state.privateEntrance = privateEntrance;
      state.freeParking = freeParking;
    },
    [createBooking.fulfilled]: (state, { payload }) => {
        state.showAlert=true
        state.alertText="The booking is completed successfully"
        state.alertType="success"
    },
    [createBooking.rejected]: (state, payload) => {
      state.showAlert=true
      state.alertText=payload.payload
      state.alertType="danger"
    },

    [getBookings.pending]:(state)=>{
      state.isLoading=true
    },
    [getBookings.fulfilled]:(state,{payload})=>{
      state.isLoading=false
      state.userBookings=payload.data.userBookings
    },
    [getBookings.rejected]:(state,payload)=>{
      state.isLoading=false
    },
    [delBooking.rejected]:(state,payload)=>{
      console.log(payload)
    }
  },
});

export const {
  changeSatate,
  delImage,
  handleCheckInput,
  removeAlert,
  editPlace,
} = placeSlice.actions;

export default placeSlice.reducer;
