import React, { createContext, useContext, useState } from 'react';

export const CityContext = createContext();

export const useCity = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
  const [cityId, setCityId] = useState();

  return (
    <CityContext.Provider value={{ cityId, setCityId }}>
      {children}
    </CityContext.Provider>
  );
};
