
import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import {useSelector} from "react-redux";


const OtherUsers = () => {
   
    // Custom hook
    useGetOtherUsers();
    const {otherUsers} = useSelector(store=>store.user);
    if (!otherUsers) return; // early return in case no users available

    return (
        <div className='overflow-y-auto h-full'>
            {otherUsers?.map((user)=>(
                <OtherUser key={user._id} user={user}/>
            ))}
        </div>
    )
}

export default OtherUsers;
