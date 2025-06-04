import { useState } from 'react';
import { useLocation } from 'react-router';

const ForgotPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setSuccess(true);
    setTimeout(() => {
      window.location.href = 'https://mail.google.com';
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-bold text-2xl text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="card-body">
          <fieldset className="fieldset">
            <label className="label font-semibold text-xl">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Your Email"
              required
            />
            <button type="submit" className="btn btn-neutral mt-4">Reset Password</button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">Reset link sent! Redirecting to Gmail...</p>}
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;