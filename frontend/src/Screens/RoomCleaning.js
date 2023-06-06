import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import BookCleaningScheduleModal from '../Modals/BookCleaningScheduleModal';

const RoomCleaning = () => {
  const [cleaningSchedule, setCleaningSchedule] = useState([]);
  const [showModal, setShowModal] = useState(false);
  var rooms=[1,2,3,4,5]

  useEffect(() => {
    fetchCleaningSchedule();
  }, []);

  const fetchCleaningSchedule = async () => {
    try {
      const response = await fetch('http://localhost:3001/cleaning/get-cleaning-schedule');
      if (response.ok) {
        const data = await response.json();
        setCleaningSchedule(data);
      } else {
        throw new Error('Failed to fetch cleaning schedule');
      }
    } catch (error) {
      console.error(error);
    }
  };

 
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmBooking = async (roomNumber, date) => {
    try {
      const response = await fetch('http://localhost:3001/cleaning/book-cleaning-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomNumber, date }),
      });

      if (response.ok) {
        alert('Room cleaning schedule booked successfully');
        fetchCleaningSchedule();
      } else {
        throw new Error('Failed to book room cleaning schedule');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
    }
  };

  const handleMarkComplete = async (roomId) => {
    try {
        const response = await fetch(`http://localhost:3001/cleaning/mark-cleaning-complete/${roomId}`, {
          method: 'GET',
        });
    
        if (response.ok) {
          alert('Room cleaning marked as complete');
          fetchCleaningSchedule();
        } else {
          throw new Error('Failed to mark room cleaning as complete');
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div>
      <h2 className="text-center">Room Cleaning Schedule</h2>
      <Button variant="primary" onClick={()=>{
                setShowModal(true);
             }}>
                Book Schedule
      </Button>
      {showModal && (
                <BookCleaningScheduleModal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirmBooking} roomNumbers={rooms} 
              />
            )}
       <br/><br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cleaningSchedule.map((schedule) => (

            
            <tr key={schedule._id}>
              <td>{schedule.roomNumber}</td>
              <td>{schedule.date.substring(0, 10)}</td>
              <td>{schedule.status}</td>
              <td>
                { (
                  <Button variant="success" onClick={() => handleMarkComplete(schedule._id)}>
                    Mark as Complete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RoomCleaning;
