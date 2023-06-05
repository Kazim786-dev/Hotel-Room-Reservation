import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { HotelNRoomContext } from './HotelNRoomProvider';

const RoomList = () => {
  const { updateRoomId } = useContext(HotelNRoomContext);
  const { hotelId } = useContext(HotelNRoomContext);
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  useEffect(() => {
    const fetchRooms = async () => {
      try {

        const response = await fetch(`http://localhost:3001/hotels/${hotelId}/rooms`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token':token
          },
        });
        if (response) {
          const roomsData = await response.json();
          setRooms(roomsData);
        } else {
          // Handle error response
        }
      } catch (error) {
        // Handle network error
      }
    };

    fetchRooms();
  }, [hotelId,token]);


  const handleUpdateRoom = (id) => {
    updateRoomId(id);
  };


  return (
    <div>
      <h2>All Rooms</h2>
      {rooms.map((room) => (
        <Card key={room._id}>
          <Card.Body>
            <Card.Title>Room Number: {room.roomNumber}</Card.Title>
            <Card.Text>
              <>
                <p>Type: {room.type}</p>
                <p>Price: {room.price}</p>
                <p>Available: {room.availability}</p>
                <p>Capacity: {room.capacity}</p>
                <p>Amenities: 
                  {room.amenities.map((amenity) => (
                    <span key={amenity}>{` ${amenity}, `}</span>
                  ))}
                </p>
              </>
            </Card.Text>

            <Button onClick={() => handleUpdateRoom(room._id)}>
              <Link to="/room/update">Update Room</Link>
            </Button>&nbsp;
            <Button onClick={() => handleUpdateRoom(room._id)}>
              <Link to="/room/bookings">Bookings</Link>
            </Button>&nbsp;
            <Button onClick={() => handleUpdateRoom(room._id)}>
              <Link to="/room/reserve">Reserve</Link>
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default RoomList;
