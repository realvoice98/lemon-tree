// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const ServerContext = createContext();

export function ServerProvider({ children }) {
  const [server, setServer] = useState('http://localhost:8001');
  // lemontree.cafe24app.com
  // http://localhost:8001
  return (
    <ServerContext.Provider value={{ server, setServer }}>
      {children}
    </ServerContext.Provider>
  );
}

export function useServer() {
  return useContext(ServerContext);
}