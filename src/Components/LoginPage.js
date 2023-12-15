
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const data = localStorage.getItem('ID');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
   
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (values) => {
            let error = {};
            if (!values.email) {
              error.email = 'Please enter your Email';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              error.email = 'Email a valid Email';
          }
          if (!values.password) {
              error.password = 'Please enter Password';
          } else if (values.password.length < 8) {
              error.password = 'Length should be more than 8 Characters';
          }
            return error;
        },
        onSubmit: async (values) => {
            try {
              setIsSubmitting(true);
                let userData = await axios.post('https://funnelassignment-backend.onrender.com/users/login', values);
                console.log(userData.data.user._id);
                window.localStorage.setItem('token', userData.data.token);
                window.localStorage.setItem('id', userData.data.user._id);
                alert('Login Success');
                navigate(`/users/home`);
            } catch (error) {
                alert('Invalid user/password');
                setIsSubmitting(false);
               
            }
        }
    });
    const googleAuth = async () => {
        try {
          // Redirect to the backend endpoint for Google authentication
          window.location.href = 'https://funnelassignment-backend.onrender.com/auth/google';
        } catch (error) {
          console.error(error);
        }
      };
      
      useEffect(() => {
        // Function to extract query parameters from the URL
        const getQueryParam = (name) => {
          const params = new URLSearchParams(window.location.search);
          return params.get(name);
        };
    
        // Get the token and user ID from the URL
        const token = getQueryParam('token');
        const userId = getQueryParam('userId');
    
        if (token && userId) {
          // Store token and user ID in local storage
          localStorage.setItem('token', token);
          localStorage.setItem('id', userId);
          navigate('/users/home');
        } else {
          console.log('Token or user ID not found in the URL');
        }
      }, [navigate]);


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-3xl text-center mb-8">Welcome!</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Username
                        </label>
                        <input
                            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.errors.email ? 'border-red-500' : ''}`}
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="Enter your email"
                        />
                        {formik.errors.email &&   <span style={{ color: 'red' }}>{formik.errors.email}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${formik.errors.password ? 'border-red-500' : ''}`}
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            placeholder="Enter your password"
                        />
                        {formik.errors.password &&   <span style={{ color: 'red' }}>{formik.errors.password}</span>}
                    </div>
                   
                    <div className="flex items-center mb-2">
    <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isSubmitting}
    >
        {isSubmitting ? 'Logging in...' : 'Log in'}
    </button>
    
    <button className="google-button ml-3"
    type='button'
    onClick={googleAuth} >
      <div className="google-button__icon">
        <img
          src="https://th.bing.com/th/id/OIP.S3ZsU5iH6e3Z2K7lXlES7AHaFj?w=225&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Google logo"
          
        />
      </div>
      <div className="google-button__text">Sign in with Google</div>
    </button>
   
</div>

    <div className="text-right">
        <div className="block mb-2 sm:mb-0">
            <Link
                to="/users/register"
                className="font-bold text-sm text-blue-500 hover:text-blue-800"
            >
                Create Account
            </Link>
        </div>
        
    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
