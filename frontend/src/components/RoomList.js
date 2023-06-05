import React, { useEffect, useState, useContext } from 'react';
import { HotelNRoomContext } from './HotelNRoomProvider';
// import { Row, Col } from 'react-bootstrap'; // Import Row and Col from react-bootstrap
import { RoomCards } from './RoomCards';

const RoomList = () => {
  const { updateRoomId } = useContext(HotelNRoomContext);
  const { hotelId } = useContext(HotelNRoomContext);
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`http://localhost:3001/hotels/${hotelId}/rooms`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        });
        if (response.ok) {
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
  }, [hotelId, token]);

  return (
    <>
      <h2>All Rooms</h2>
      {/* <Row>
        <Col> */}
          {rooms.length > 0 ? (
            <RoomCards rooms={rooms} updateRoomId={updateRoomId} />
          ) : (
            <p>No rooms available.</p>
          )}
        {/* </Col>
      </Row> */}
    </>
  );
};

export default RoomList;
