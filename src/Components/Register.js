
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

function Register() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            phone: ''
        },
        validate: (values) => {
            let errors = {};
            if (!values.name) {
                errors.name = 'Please enter your Name';
            } else if (values.name.length <= 3) {
                errors.name = 'Please enter a valid Name';
            }
            if (!values.email) {
                errors.email = 'Please enter your Email';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Email a valid Email';
            }
            if (!values.password) {
                errors.password = 'Please enter Password';
            } else if (!/(?=.*[a-z])/.test(values.password)) {
                errors.password = 'Password should contain at least one lowercase letter';
            } else if (!/(?=.*[A-Z])/.test(values.password)) {
                errors.password = 'Password should contain at least one uppercase letter';
            } else if (!/(?=.*\d)/.test(values.password)) {
                errors.password = 'Password should contain at least one number';
            } else if (!/(?=.*[@$!%*?&])/.test(values.password)) {
                errors.password = 'Password should contain at least one special character';
            }else if (values.password.length < 8) {
                errors.password = 'Length should be more than 8 Characters';
            }
            if (!values.phone) {
                errors.phone = 'Please enter Phone Number';
            }
            return errors;
        },
        onSubmit: async (values) => {
            console.log(JSON.stringify(values, null, 2));
            setIsSubmitting(true); 
            try {
                let userData = await axios.post('http://localhost:8000/users/register', values);
                window.localStorage.setItem('my_token', userData.data.token);
                alert('Registered Successfully');
                formik.resetForm();
                navigate('/');
            } catch (error) {
                console.log(error);
                setIsSubmitting(false); 
            }
        }
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md bg-pink-200 shadow-md rounded p-8 mt-5">
                <h3 className="text-center text-2xl font-cursive text-blue-900 mb-4">Registration Form</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-m mb-2" >Name</label>
                        <input
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            type="text"
                            placeholder="Enter your Name"
                            className={`border rounded w-full py-2 px-3 ${formik.errors.name ? 'border-red-500' : 'border-green-500'}`}
                        />
                        <span style={{ color: 'red' }}>{formik.errors.name}</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-m mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="Enter your Email"
                            className={`border rounded w-full py-2 px-3 ${formik.errors.email ? 'border-red-500' : 'border-green-500'}`}
                        />
                        <span style={{ color: 'red' }}>{formik.errors.email}</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-m mb-2">Phone Number</label>
                        <input
                            name="phone"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.phone}
                            placeholder="Enter your phone Number"
                            className={`border rounded w-full py-2 px-3 ${formik.errors.phone ? 'border-red-500' : 'border-green-500'}`}
                        />
                        <span style={{ color: 'red' }}>{formik.errors.phone}</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-m mb-2">Password</label>
                        <input
                            name="password"
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            placeholder="Enter your password"
                            className={`border rounded w-full py-2 px-3 ${formik.errors.password ? 'border-red-500' : 'border-green-500'}`}
                        />
                        <span style={{ color: 'red' }}>{formik.errors.password}</span>
                    </div>
                                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                        <NavLink
                            to={'/'}
                            className= "bg-slate-800  hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
                        >
                            Login
                        </NavLink>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Register;
