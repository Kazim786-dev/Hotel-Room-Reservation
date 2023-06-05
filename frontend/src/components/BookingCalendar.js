import React, { useEffect, useState, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { HotelNRoomContext } from './HotelNRoomProvider';

const BookingCalendar = () => {
  const [bookingCalendar, setBookingCalendar] = useState([]);
  const [error, setError] = useState(null);
  const { roomId } = useContext(HotelNRoomContext);
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  const [roomNumber, setRoomNumber] = useState();

  useEffect(() => {
    const fetchBookingCalendar = async () => {
      try {
        const response = await fetch(`http://localhost:3001/rooms/${roomId}/getBookingCalendar`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBookingCalendar(data.bookingCalendar);
          setRoomNumber(data.roomNumber);
        } else {
          const errorData = await response.json();
          setError(errorData.error);
        }
      } catch (error) {
        setError('Failed to retrieve booking calendar');
      }
    };

    fetchBookingCalendar();
  }, [roomId, token]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Booking Calendar for Room {roomNumber}</h2>
      <ListGroup>
        {bookingCalendar.map((booking) => (
          <ListGroup.Item key={`${booking.checkInDate}-${booking.checkOutDate}`}>
            Check-in: {new Date(booking.checkInDate).toLocaleDateString()} {new Date(booking.checkInDate).toLocaleTimeString()}<br/>
            Check-out: {new Date(booking.checkOutDate).toLocaleDateString()} {new Date(booking.checkOutDate).toLocaleTimeString()}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export { BookingCalendar};
