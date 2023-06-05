
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomList from './components/RoomList';
import UpdateRoomPage from './components/UpdateRoomPage';
import { HotelNRoomProvider } from './components/HotelNRoomProvider';
import {BookingCalendar} from './components/BookingCalendar'
import { ReservationForm } from './components/ReserveRoom';
import {AddRoomForm} from './components/AddRoom';
import { AddHotelForm } from './components/Hotel/AddHotel';
import { AvailableRooms } from '../src/components/Hotel/TodayAvailableRooms';


const App = () => {


  const token = localStorage.getItem('token');

  if (!token) {
    return <h2>Error: You are not logged in/authorized</h2>;
  }

  return (
    <BrowserRouter>
      
        <Routes>
          <Route exact path="hotel/add" element={<AddHotelForm/>} />
          <Route exact path="hotel/today-available-rooms" element={<HotelNRoomProvider><AvailableRooms/></HotelNRoomProvider>} />
          <Route exact path="hotel/rooms" element={<HotelNRoomProvider><RoomList/></HotelNRoomProvider>} />
          <Route exact path="/room/update" element={<HotelNRoomProvider><UpdateRoomPage/></HotelNRoomProvider>} />
          <Route exact path="/room/bookings" element={<HotelNRoomProvider><BookingCalendar/></HotelNRoomProvider>} />
          <Route exact path="/room/reserve" element={<HotelNRoomProvider><ReservationForm/></HotelNRoomProvider>} />
          <Route exact path="/room/add" element={<HotelNRoomProvider><AddRoomForm/></HotelNRoomProvider>} />
          <Route path="*" element={<h1>Page Not found</h1>} />
          {/* <Route path="*" element={<Navigate to="/hotel/rooms" />} /> */}
        </Routes>
      
    </BrowserRouter>
  );
};

export default App;
