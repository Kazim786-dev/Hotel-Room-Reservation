import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { HotelNRoomContext } from './HotelNRoomProvider';

const UpdateRoomPage = () => {
  const { roomId } = useContext(HotelNRoomContext);
  const [type, setType] = useState('');
  const [availability, setAvailability] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [price, setPrice] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  
  const handleUpdateType = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/rooms/update-room-type`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({ type, roomId }),
      });
      if (!response.error) {
        const updatedRoom = await response.json();
        setType(updatedRoom.type);
        setUpdateStatus('Room type updated successfully.');
      } else {
        // Handle error response
        setUpdateStatus('Error updating room type.');
      }
    } catch (error) {
      // Handle network error
      setUpdateStatus('Network error occurred.');
    }
  };

  const handleUpdateAvailability = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/rooms/update-room-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({ availability, roomId }),
      });
      if (!response.error) {
        const updatedRoom = await response.json();
        setAvailability(updatedRoom.availability);
        setUpdateStatus('Room availability updated successfully.');
      } else {
        // Handle error response
        setUpdateStatus('Error updating room availability.');
      }
    } catch (error) {
      // Handle network error
      setUpdateStatus('Network error occurred.');
    }
  };

  const handleUpdateAmenities = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/rooms/update-room-amenities`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({ amenities, roomId }),
      });
      if (!response.error) {
        const updatedRoom = await response.json();
        setAmenities(updatedRoom.amenities);
        setUpdateStatus('Room amenities updated successfully.');
      } else {
        // Handle error response
        setUpdateStatus('Error updating room amenities.');
      }
    } catch (error) {
      // Handle network error
      setUpdateStatus('Network error occurred.');
    }
  };

  const handleUpdatePrice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/rooms/update-room-price`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({ price: parseInt(price), roomId }), // Parse price as an integer
      });
      if (!response.error) {
        const updatedRoom = await response.json();
        setPrice(updatedRoom.price);
        setUpdateStatus('Room price updated successfully.');
      } else {
        // Handle error response
        setUpdateStatus('Error updating room price.');
      }
    } catch (error) {
      // Handle network error
      setUpdateStatus('Network error occurred.');
    }
  };


  const handleAmenityChange = (amenity) => {
  if (amenities.includes(amenity)) {
    // Remove the amenity from the list if it's already selected
    setAmenities(amenities.filter((a) => a !== amenity));
  } else {
    // Add the amenity to the list if it's not already selected
    setAmenities([...amenities, amenity]);
  }
};


  return (
    <div>
      <h2>Update Room</h2>

      {updateStatus && <p>{updateStatus}</p>}

      <Form onSubmit={handleUpdateType}>
        <Form.Group>
          <Form.Label>Type:</Form.Label>
          <Form.Control type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Type
        </Button>
      </Form>

      <Form onSubmit={handleUpdateAvailability}>
        <Form.Group>
          <Form.Label>Availability:</Form.Label>
          <Form.Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="">Select Availability</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Availability
        </Button>
      </Form>

      <Form onSubmit={handleUpdateAmenities}>
      <Form.Group>
  <Form.Label>Amenities:</Form.Label>
  <div>
    <Form.Check
      type="checkbox"
      id="amenity-wifi"
      label="WiFi"
      value="WiFi"
      checked={amenities.includes("WiFi")}
      onChange={(e) => handleAmenityChange(e.target.value)}
    />
    <Form.Check
      type="checkbox"
      id="amenity-tv"
      label="TV"
      value="TV"
      checked={amenities.includes("TV")}
      onChange={(e) => handleAmenityChange(e.target.value)}
    />
    <Form.Check
      type="checkbox"
      id="amenity-ac"
      label="AC"
      value="AC"
      checked={amenities.includes("AC")}
      onChange={(e) => handleAmenityChange(e.target.value)}
    />
    {/* Add more checkboxes for additional amenities */}
  </div>
</Form.Group>

        <Button variant="primary" type="submit">
          Update Amenities
        </Button>
      </Form>

      <Form onSubmit={handleUpdatePrice}>
        <Form.Group>
          <Form.Label>Price:</Form.Label>
          <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Price
        </Button>
      </Form>
    </div>
  );
};

export default UpdateRoomPage;
