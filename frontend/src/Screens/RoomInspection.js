import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import BookInspectionScheduleModal from '../Modals/BookInspectionScheduleModal';

const RoomInspection = () => {
  const [inspectionSchedule, setInspectionSchedule] = useState([]);
  const [showModal, setShowModal] = useState(false);
  var rooms=[1,2,3,4,5]

  useEffect(() => {
    fetchInspectionSchedule();
  }, []);

  const fetchInspectionSchedule = async () => {
    try {
      const response = await fetch('http://localhost:3001/inspection/get-inspections');
      if (response.ok) {
        const data = await response.json();
        setInspectionSchedule(data);
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
      const response = await fetch('http://localhost:3001/inspection/book-inspection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomNumber, date }),
      });

      if (response.ok) {
        alert('Room inspection schedule booked successfully');
        fetchInspectionSchedule();
      } else {
        throw new Error('Failed to book room inspection schedule');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
    }
  };

  const handleMarkComplete = async (roomId) => {
    try {
        const response = await fetch(`http://localhost:3001/inspection/mark-inspection-complete/${roomId}`, {
          method: 'GET',
        });
    
        if (response.ok) {
          alert('Room inspection marked as complete');
          fetchInspectionSchedule();
        } else {
          throw new Error('Failed to mark room inspection as complete');
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div>
      <h2 className="text-center">Room Inspection Schedule</h2>
      <Button variant="primary" onClick={()=>{
                setShowModal(true);
             }}>
                Book Inspection
      </Button>
      {showModal && (
                <BookInspectionScheduleModal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirmBooking} roomNumbers={rooms} 
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
          {inspectionSchedule.map((schedule) => (

            
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

export default RoomInspection;
