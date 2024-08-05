// import React, { createContext, useState, useEffect } from 'react';
// import FetchUserModules from './FetchUserModules';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [userModules, setUserModules] = useState([]);

//     useEffect(() => {
//         const loadUserModules = async () => {
//             if (user) {
//                 const modules = await FetchUserModules();
//                 setUserModules(modules);
//             }
//         };

//         loadUserModules();
//     }, [user]);

//     return (
//         <UserContext.Provider value={{ user, setUser, userModules }}>
//             {children}
//         </UserContext.Provider>
//     );
// };