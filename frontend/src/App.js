
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomList from './components/RoomList';
import UpdateRoomPage from './components/UpdateRoomPage';
import { HotelNRoomProvider } from './components/HotelNRoomProvider';
import {BookingCalendar} from './components/BookingCalendar'
import { ReservationForm } from './components/ReserveRoom';
import {AddRoomForm} from './components/AddRoom';

const App = () => {


  const token = localStorage.getItem('token');

  if (!token) {
    return <h2>Error: You are not logged in</h2>;
  }

  return (
    <BrowserRouter>
      
        <Routes>
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
