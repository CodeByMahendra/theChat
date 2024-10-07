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
