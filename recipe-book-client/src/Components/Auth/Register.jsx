import React, { useContext, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUpperCase && hasLowerCase && isLongEnough;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const {email,password,...others}= Object.fromEntries(formData.entries());

    const userProfileinfo = {
        email,
        ...others
    }


     const terms = e.target.terms.checked;

    setSuccess(false);
    setErrorMessage('');

    if (!terms) {
      setErrorMessage('Please accept terms and conditions');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        'Password must have at least 6 characters, one uppercase, and one lowercase letter.'
      );
      return;
    }

    createUser(email, password,userProfileinfo)
      .then(() => {
        fetch('https://recipe-book-server-rose.vercel.app/users',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(userProfileinfo)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log('afteradd',data)
                    if(data.insertedId){
                        setSuccess(true);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "registration successfull",
                            showConfirmButton: false,
                            timer: 1500
                            });
                        setTimeout(() => navigate('/auth/login'), 1000);
                    }
                })
                .catch((error) => {
                setErrorMessage(error.message);
                });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-bold text-2xl text-center">Register Your Account</h2>
        <form onSubmit={handleRegister} noValidate className="card-body">
          <fieldset className="fieldset">
            <label className="label font-semibold text-xl">Your Name</label>
            <input name="name" type="text" className="input" placeholder="Name" required />

            <label className="label font-semibold text-xl">Photo URL</label>
            <input name="photo" type="url" className="input" placeholder="Photo URL" required />

            <label className="label font-semibold text-xl">Email</label>
            <input name="email" type="email" className="input" placeholder="Email" required />

            <label className="label font-semibold text-xl">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="input w-full"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            <label className="label mt-4">
              <input type="checkbox" name="terms" className="checkbox" />
              Accept <span className="font-semibold">Terms and Conditions</span>
            </label>

            <button type="submit" value="Submit" className="btn btn-neutral mt-4">Register</button>
            
            <p className="font-semibold text-center mt-2">
              Already have an account?{' '}
              <Link className="text-blue-500 underline" to="/auth/login">
                Login
              </Link>
            </p>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {success && <p className="text-green-500">Registered successfully</p>}
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;