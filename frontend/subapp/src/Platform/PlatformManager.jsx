import React, { useEffect, useState } from "react";
import axios from "axios";

const PlatformManager = () => {
  const [platforms, setPlatforms] = useState([]);
  const [newPlatform, setNewPlatform] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const token = localStorage.getItem("token"); 

      setLoading(true); 
      try {
        const response = await axios.get("https://subscriptionapp-10.onrender.com/api/platforms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Platforms fetched:", response.data);
        setPlatforms(response.data); 
      } catch (err) {
        console.error("Error fetching platforms:", err);
        if (err.response && err.response.status === 401) {
          setError("Unauthorized access. Please log in.");
        } else {
          setError("Failed to fetch platforms.");
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchPlatforms(); 
  }, []); 

  const handleAddPlatform = async (e) => {
    e.preventDefault();
    setError(null); 

    const trimmedPlatform = newPlatform.trim();
    if (!trimmedPlatform) {
      setError("Platform name is required.");
      return;
    }

    if (platforms.includes(trimmedPlatform)) {
      setError("Platform already exists.");
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem("token"); 

    try {
      const response = await axios.post(
        "https://subscriptionapp-10.onrender.com/api/platforms",
        {
          name: trimmedPlatform,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      setPlatforms([...platforms, response.data.name]);
      setNewPlatform("");
      setError(null); // Clear any error messages
    } catch (err) {
      console.error("Error adding platform:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while adding the platform.");
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-md mt-4 mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
        User Platforms
      </h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <ul className="list-disc pl-5 mb-4">
        {platforms.length > 0 ? (
          platforms.map((platform) => (
            <li
              key={platform}
              className="text-gray-700 flex justify-between items-center mb-2"
            >
              <span>{platform}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">
            No platforms found. Add your first platform!
          </p>
        )}
      </ul>

      <form
        onSubmit={handleAddPlatform}
        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
      >
        <input
          type="text"
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
          className="flex-grow border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new platform"
          required
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default PlatformManager;
