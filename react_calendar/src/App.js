import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import WebCalendar from "./Calendar";
import Navigation from "./Nav";
import Orders from "./guestOrder";
import About from "./About";
import Home from "./Home";
import Admin from "./adminDashboard";
import UploadCategoryFeature from "./uploadCategoryFeature";
import UploadRooms from "./uploadRooms";
import UpdateRoom from "./updateRoom";
import AllRooms from "./allRooms";
import GuestsOrders from "./guestsOrders";
import ChooseRoom from "./chooseRoom";
import OrderForm from "./addOrEditOrder";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reserve/:roomId" element={<WebCalendar />} />
        <Route path="/choose-room" element={<ChooseRoom />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/categories-features"
          element={<UploadCategoryFeature />}
        />
        <Route path="/admin/all-rooms" element={<AllRooms />} />
        <Route path="/admin/upload-room" element={<UploadRooms />} />
        <Route path="/admin/update-room/:id?" element={<UpdateRoom />} />
        <Route path="/admin/guests-orders" element={<GuestsOrders />} />
        <Route
          path="/admin/guests-orders/update"
          element={<OrderForm id={"65f55b69489c98a37c525e3c"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
