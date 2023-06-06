import React, { useState,useContext } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { HotelNRoomContext } from '../Room/HotelNRoomProvider';
import { RoomCards } from '../Room/RoomCards';


const AvailableRooms = () => {
  const [error, setError] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const token = localStorage.getItem('token');
  const { hotelId } = useContext(HotelNRoomContext);
  const { updateRoomId } = useContext(HotelNRoomContext);

  const handleGetAvailableRooms = async () => {
    try {
      const response = await fetch(`http://localhost:3001/hotels/${hotelId}/available-rooms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableRooms(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setAvailableRooms([]);
      }
    } catch (error) {
      setError('Failed to retrieve available rooms');
      setAvailableRooms([]);
    }
  };

  return (
    <div>
      <h2>Get Available Rooms</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {availableRooms.length > 0 && <RoomCards rooms={availableRooms} updateRoomId={updateRoomId}/> }
      <Button variant="primary" onClick={handleGetAvailableRooms}>
        Get Available Rooms
      </Button>
    </div>
  );
};

export { AvailableRooms };
