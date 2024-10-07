
// import Signup from './components/Signup'; 

// import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
// import Login from './components/Login';
// import { useEffect, useState } from 'react';
// import {useSelector,useDispatch} from "react-redux";
// import io from "socket.io-client";
// import { setSocket } from './redux/socketSlice';
// import { setOnlineUsers } from './redux/userSlice';
// import { BASE_URL } from '.';
// import HomePage from './components/HomePage';
// import Final from './components/Final';

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element:<Login/>
//   },
//   {
//     path:"/chat",
//     element:<HomePage/>
//   },
//   {
//     path:'/msg',
//     element:<Final/>
//   },
//   {
//     path:"/signup",
//     element:<Signup/>
//   },

// ]);

// function App() { 

//   const {authUser} = useSelector(store=>store.user);
//   const {socket} = useSelector(store=>store.socket);
//   const dispatch = useDispatch();

//   const backendUrl = process.env.REACT_APP_BACKEND_URL;
// console.log('All environment variables:', process.env);
// console.log('Backend URL:', backendUrl);


//   useEffect(()=>{
//     if(authUser){
//       const socketio = io(`${process.env.REACT_APP_BACKEND_URL}`, {
//           query:{
//             userId:authUser._id
//           }
//       });
//       dispatch(setSocket(socketio));

//       socketio?.on('getOnlineUsers', (onlineUsers)=>{
//         dispatch(setOnlineUsers(onlineUsers))
//       });
//       return () => socketio.close();
//     }else{
//       if(socket){
//         socket.close();
//         dispatch(setSocket(null));
//       }
//     }
//   },[authUser]);

//   return (
//     <div className="p-4 h-screen flex items-center justify-center">
//       {authUser ? (
//         <RouterProvider router={router}/>
//       ) : (
//         <Navigate to="/signup" />
//       )}
//     </div>
//   );
// }

// export default App;


// // import Signup from './components/Signup'; 
// // import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
// // import { useEffect } from 'react';
// // import { useSelector, useDispatch } from "react-redux";
// // import io from "socket.io-client";
// // import { setSocket } from './redux/socketSlice';
// // import { setOnlineUsers } from './redux/userSlice';

// // import Login from './components/Login';
// // import HomePage from './components/HomePage';
// // import Final from './components/Final';

// // // Create a protected route component to check user authentication
// // const ProtectedRoute = ({ element, authUser }) => {
// //   return authUser ? element : <Navigate to="/signup" />;
// // };

// // const router = (authUser) => createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <Login />
// //   },
// //   {
// //     path: "/chat",
// //     element: <ProtectedRoute element={<HomePage />} authUser={authUser} />
// //   },
// //   {
// //     path: '/msg',
// //     element: <ProtectedRoute element={<Final />} authUser={authUser} />
// //   },
// //   {
// //     path: "/signup",
// //     element: <Signup />
// //   },
// // ]);

// // function App() {
// //   const { authUser } = useSelector(store => store.user);
// //   const { socket } = useSelector(store => store.socket);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     if (authUser) {
// //       const socketio = io(`http://localhost:3005`, {
// //         query: {
// //           userId: authUser._id
// //         }
// //       });
// //       dispatch(setSocket(socketio));

// //       socketio.on('getOnlineUsers', (onlineUsers) => {
// //         dispatch(setOnlineUsers(onlineUsers));
// //       });

// //       return () => socketio.close();
// //     } else {
// //       if (socket) {
// //         socket.close();
// //         dispatch(setSocket(null));
// //       }
// //     }
// //   }, [authUser, socket, dispatch]);

// //   return (
// //     <div className="p-4 h-screen flex items-center justify-center">
// //       <RouterProvider router={router(authUser)} />
// //     </div>
// //   );
// // }

// // export default App;


import Signup from './components/Signup'; 
import Login from './components/Login';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from './redux/userSlice';
import { BASE_URL } from '.';
import HomePage from './components/HomePage';
import Final from './components/Final';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/chat",
    element: <HomePage />
  },
  {
    path: '/msg',
    element: <Final />
  },
  {
    path: "/signup",
    element: <Signup />
  },
]);

function App() { 
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let socketio;

    if (authUser) {
      socketio = io(`${process.env.REACT_APP_BACKEND_URL}`, {
        query: {
          userId: authUser._id
        }
      });

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Cleanup function to close socket connection when component unmounts
      return () => {
        socketio.close();
      };
    }

  }, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {authUser ? (
        <RouterProvider router={router} />
      ) : (
        <Navigate to="/signup" />
      )}
    </div>
  );
}

export default App;
