import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { Typewriter } from "react-simple-typewriter";

const Login = () => {
  const { loginUser, googlelogin } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [success, setSuccess] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccess(false);

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      setErrorMessage(
        "Password must be at least 6 characters with uppercase and lowercase letters."
      );
      return;
    }

    loginUser(email, password)
      .then(() => {
          setTimeout(
              () => navigate(location?.state || "/"),
              1000
            );
            setSuccess(true);
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const handlegooglelogin =()=>{
      googlelogin()
        .then((result) => {
          console.log(result.user)
          navigate(location?.state || '/')
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-bold text-2xl text-center">
          <Typewriter
                    words={['Login your Account']}
                    loop={1}
                    cursor
                    cursorStyle='|'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
        </h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label font-semibold text-xl">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Email"
              required
            />
            <label className="label font-semibold text-xl">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Password"
              required
            />
            <div>
              <Link
                to="/auth/forgot-password"
                state={{ email }}
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
            <button onClick={handlegooglelogin} className="btn bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
            <p className="font-semibold text-center mt-2">
              don't have account ?{" "}
              <Link className="text-blue-500 underline" to="/auth/register">
                Register
              </Link>
            </p>
            {errormessage && <p className="text-red-500">{errormessage}</p>}
            {success && <p className="text-green-500">login succesfully</p>}
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
