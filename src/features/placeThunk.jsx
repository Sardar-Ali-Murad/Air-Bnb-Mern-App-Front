import axios from "axios";
import { getAllPlaces,getBookings } from "./placeSlice";

export const placeImage = async (event, thunkAPI) => {
  try {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "zkkzikta");
    let data = await axios.post(
      "https://api.cloudinary.com/v1_1/dvaodl5k8/image/upload",
      formData
    );
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
};

export const addPlace = async (_, thunkAPI) => {
  try {
    let token = thunkAPI.getState().store.token;
    let {
      Address,
      Title,
      Description,
      extraInfo,
      Price,
      totalGuests,
      Photos,
      TV,
      Wifi,
      Radio,
      Pets,
      freeParking,
      privateEntrance,
    } = thunkAPI.getState().place;
    let data = await axios.post(
      "http://localhost:5000/api/v1/place",
      {
        Address,
        Title,
        Description,
        extraInfo,
        Price: Number(Price),
        totalGuests: Number(totalGuests),
        Photos,
        TV,
        Wifi,
        Radio,
        Pets,
        freeParking,
        privateEntrance,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(getAllPlaces());
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getPlaces = async (_, thunkAPI) => {
  try {
    let token = thunkAPI.getState().store.token;
    let data = await axios.get("http://localhost:5000/api/v1/place", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const singlePlace = async (placeId, thunkAPI) => {
  try {
    let token = thunkAPI.getState().store.token;
    let data = await axios.get(
      `http://localhost:5000/api/v1/place/${placeId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const userPlaces = async (placeId, thunkAPI) => {
  try {
    let token = thunkAPI.getState().store.token;
    let data = await axios.get(
      `http://localhost:5000/api/v1/place/currentUserPlaces`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};


export const editSinglePlace = async (id, thunkAPI) => {
  try {
    let token = thunkAPI.getState().store.token;
    let data = await axios.get(
      `http://localhost:5000/api/v1/place/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};




export const edditingPlace = async (_, thunkAPI) => {
  try {
    let token = thunkAPI.getState().store.token;
    let {editPlaceId} = thunkAPI.getState().place;
    let {
      Address,
      Title,
      Description,
      extraInfo,
      Price,
      totalGuests,
      Photos,
      TV,
      Wifi,
      Radio,
      Pets,
      freeParking,
      privateEntrance,
    } = thunkAPI.getState().place;
    let data = await axios.patch(
      `http://localhost:5000/api/v1/place/${editPlaceId}`,
      {
        Address,
        Title,
        Description,
        extraInfo,
        Price: Number(Price),
        totalGuests: Number(totalGuests),
        Photos,
        TV,
        Wifi,
        Radio,
        Pets,
        freeParking,
        privateEntrance,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(getAllPlaces());
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};


export const makeBook = async (payload, thunkAPI) => {
  try {
    let token = thunkAPI.getState().store.token;
    let data = await axios.post(
      `http://localhost:5000/api/v1/book`,
      {place:payload.place,startDate:payload.startDate,endDate:payload.endDate,totalGuests:Number(payload.totalGuests)},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};



export const getUserBookings = async (_, thunkAPI) => {
  try {
    let token = thunkAPI.getState().store.token;
    let data = await axios.get(
      `http://localhost:5000/api/v1/book/currentUserBookings`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};


export const deleteBooking = async (bookingId, thunkAPI) => {
  try {
    let token = thunkAPI.getState().store.token;
    let data = await axios.delete(
      `http://localhost:5000/api/v1/book/${bookingId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(getBookings())
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
