import { useState } from "react";
import axios from "axios"; // Don't forget to import axios
import Password from "../Components/Input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../utils/helper";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    setError(null); 

    if (!username) {
      setError('Please enter your username');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid Email Address');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setLoading(true); 

    try {
     
      const response = await axios.post('https://subscriptionapp-10.onrender.com/api/auth/signup', { username, email, password });
      const { token, userId } = response.data;

      
      localStorage.setItem("token", token);
      console.log("Signup successful, user ID:", userId,"token:", token);

      setUserName("");
      setEmail("");
      setPassword("");
      
    } catch (err) {
      console.error('Signup error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-7">Sign Up</h4>

          <input
            type="text"
            placeholder="Username"
            className="input-box"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
