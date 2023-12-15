import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { refreshAccessToken } from './authService'; 

const Home = () => {
    const id = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
   
   
    useEffect(() => {
        if (!id) {
            navigate('/');
        } else {
            fetchUsers();
        }
    }, []);

    let fetchUsers = async () => {
        try {
            let userData = await axios.get(`http://localhost:8000/users/user/${id}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem('token')}`
                }
            });
            setUserList([userData.data]);
            setIsLoading(false);
            console.log('User data:', userData.data);
        } catch (error) {
            console.log(error.response.data.message);
            if (error.response.data.message === 'Token expired') {
                try {
                    const newAccessToken = await refreshAccessToken(id);
                    if (newAccessToken) {
                        const newData = await fetchUsers();
                        console.log('Refreshed token. New data:', newData);
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                }
            } else {
                console.error('Error fetching protected data:', error);
            }
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {isLoading ? (
                <h1 className="text-4xl font-bold">Loading...</h1>
            ) : (
                <>
                    {userList.map((user, index) => (
                        <>
                        <div key={index} className="max-w-md bg-slate-50 border border-blue-400 text-black px-4 py-3 rounded mb-8" role="alert">
                            <p className="font-bold text-2xl mb-4">Welcome, {user.name}!</p>
                            <p className="text-xl mb-2">Email: {user.email}</p>
                            <p className="text-xl mb-2">Phone Number: {user.phone || 'None'}</p>
                        </div>
                        
                         <button
                         onClick={handleLogout}
                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                     >
                         Logout <FiLogOut className="inline-block ml-2" />
                     </button>
                     </>
                    ))}
                   
                </>
            )}
        </div>
    );
};

export default Home;
