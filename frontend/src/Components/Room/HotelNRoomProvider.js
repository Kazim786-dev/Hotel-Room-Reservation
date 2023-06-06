import React, { createContext, useState } from 'react';

export const HotelNRoomContext = createContext();

export const HotelNRoomProvider = ({ children }) => {
  const [roomId, setRoomId] = useState(null);
  const [hotelId, setHotelId] = useState("647f061f8c12042b16cfb683");

  const updateRoomId = (id) => {
    setRoomId(id);
  };

  const updateHotelId = (id) => {
    setHotelId(id);
  };

  return (
    <HotelNRoomContext.Provider value={{ roomId, hotelId, updateRoomId, updateHotelId }}>
      {children}
    </HotelNRoomContext.Provider>
  );
};
