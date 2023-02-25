import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, SinglePlace,CreatePlace,UserPlaces,Bookings } from "./pages/index";
import { Headers, ProtectedRoute } from "./components/index";
const App = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <BrowserRouter>
        <Headers />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createPlace"
            element={
              <ProtectedRoute>
                <CreatePlace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/place/:placeId"
            element={
              <ProtectedRoute>
                <SinglePlace/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/userPlaces"
            element={
              <ProtectedRoute>
                <UserPlaces/>
              </ProtectedRoute>
            }
          />


          <Route
            path="/Bookings"
            element={
              <ProtectedRoute>
                <Bookings/>
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
