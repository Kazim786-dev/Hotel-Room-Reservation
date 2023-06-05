import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import RoomList from './components/RoomList';
import UpdateRoomPage from './components/UpdateRoomPage';
import { HotelNRoomProvider } from './components/HotelNRoomProvider';
import { BookingCalendar } from './components/BookingCalendar'
import { ReservationForm } from './components/ReserveRoom';
import { AddRoomForm } from './components/AddRoom';
import { AddHotelForm } from './components/Hotel/AddHotel';
import { AvailableRooms } from '../src/components/Hotel/TodayAvailableRooms';

const App = () => {
  const token = localStorage.getItem('token');
  const[isValid,setIsvalid] = useState( false)
  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/verifytoken', {
            headers: {
              token: token
            }
          });
          
          if (response.ok) {
            setIsvalid(true)
          }
          else  {
            setIsvalid(false)
          }
        } catch (error) {
          setIsvalid(false)
        }
      } else {
        setIsvalid(false)
      }
    };
    console.log("response= "+isValid)
    
    checkTokenValidity();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isValid && <Route exact path="/hotel/add" element={<AddHotelForm />} />}
        {isValid && <Route exact path="/hotel/today-available-rooms" element={<HotelNRoomProvider><AvailableRooms /></HotelNRoomProvider>} />}
        {isValid && <Route exact path="/hotel/rooms" element={<HotelNRoomProvider><RoomList /></HotelNRoomProvider>} />}
        {isValid && <Route exact path="/room/update" element={<HotelNRoomProvider><UpdateRoomPage /></HotelNRoomProvider>} />}
        {isValid && <Route exact path="/room/bookings" element={<HotelNRoomProvider><BookingCalendar /></HotelNRoomProvider>} />}
        {isValid && <Route exact path="/room/reserve" element={<HotelNRoomProvider><ReservationForm /></HotelNRoomProvider>} />}
        {isValid && <Route exact path="/room/add" element={<HotelNRoomProvider><AddRoomForm /></HotelNRoomProvider>} />}
        {!isValid &&<Route path="*" element={<h1>Page Not found Or You are not authorized.</h1>} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
