
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const RoomCards = ({rooms, updateRoomId}) => {

  const handleUpdateRoom = (id) => {
    updateRoomId(id);
  };

    return (
        <>
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
        </>
    );


}

export {RoomCards}