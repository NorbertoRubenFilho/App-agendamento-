import React, {createContext, useReducer} from 'react';
import {initialState, UserReducer} from '../Reducers/UserReducers';

export const UserContext = createContext();

export default({children}) => {
const [state, dispatch] = useReducer(UserReducer, initialState);
 return(
    <UserContext.Provider value={{state, dispatch}}>
          {children}
    </UserContext.Provider>
  );
}