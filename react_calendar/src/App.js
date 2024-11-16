import React, { useState, useEffect, Suspense } from "react";
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
import PaymentSuccess from "./orderPaymentSuccess";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Suspense
        fallback={
          <div class="loading">
            <img src="/images/hotel/loading.gif" alt="Loading..." />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reserve/:roomId" element={<WebCalendar />} />

          <Route path="/choose-room" element={<ChooseRoom />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/order/payment/success" element={<PaymentSuccess />} />
          <Route
            path="/admin/categories-features"
            element={<UploadCategoryFeature />}
          />
          <Route path="/admin/all-rooms" element={<AllRooms />} />
          <Route path="/admin/upload-room" element={<UploadRooms />} />
          <Route path="/admin/update-room/:id?" element={<UpdateRoom />} />
          <Route path="/admin/guests-orders" element={<GuestsOrders />} />
          <Route
            path="/admin/guests-orders/update/:id?"
            element={<OrderForm />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
