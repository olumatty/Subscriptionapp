import React, { useEffect, useState } from "react";
import axios from "axios";

const SubscriptionTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [sortType, setSortType] = useState("month"); // Default sort type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get("https://subscriptionapp-10.onrender.com/api/subscriptions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setSubscriptions(response.data);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setError("Failed to fetch subscriptions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const calculateDaysLeft = (startDate, renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const start = new Date(startDate);

    if (isNaN(start) || isNaN(renewal)) {
      console.error("Invalid date:", startDate, renewalDate);
      return 0;
    }

    const totalDuration = renewal - start; 
    const elapsedTime = today - start; 

    const totalDays = Math.ceil(totalDuration / (1000 * 3600 * 24)); // Convert to days
    const elapsedDays = Math.ceil(elapsedTime / (1000 * 3600 * 24)); // Convert to days

    const daysLeft = totalDays - elapsedDays;

    return daysLeft >= 0 ? daysLeft : 0; 
  };

  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    if (sortType === "month") {
      return new Date(a.renewalDate) - new Date(b.renewalDate);
    } else if (sortType === "cost") {
      return a.cost - b.cost;
    }
  });

  if (loading) return <div className="text-center">Loading subscriptions...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (subscriptions.length === 0) return <div className="text-center">No subscriptions found.</div>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Subscription List</h2>
      <div className="mb-4">
        <label htmlFor="sortType" className="block mb-2 text-gray-700">
          Sort by:
        </label>
        <select
          id="sortType"
          className="border border-gray-300 rounded-md p-2"
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="month">Sort by Month</option>
          <option value="cost">Sort by Cost</option>
        </select>
      </div>
      <div className="overflow-x-auto"> {/* Allow horizontal scrolling */}
        <table className="min-w-full mt-4 bg-white rounded-md overflow-hidden">
          <thead className="bg-blue-400">
            <tr>
              <th className="py-2 px-4 text-left whitespace-nowrap">Name</th>
              <th className="py-2 px-4 text-left whitespace-nowrap">Cost</th>
              <th className="py-2 px-4 text-left whitespace-nowrap">Days Left</th> {/* Keep Days Left */}
            </tr>
          </thead>
          <tbody>
            {sortedSubscriptions.map((subscription) => (
              <tr key={subscription._id} className="border-t hover:bg-blue-100">
                <td className="py-2 px-4">{subscription.name}</td>
                <td className="py-2 px-4">${subscription.cost}</td>
                <td className="py-2 px-4">
                  {calculateDaysLeft(subscription.startDate, subscription.renewalDate)} days
                </td> {/* Only display Days Left */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionTable;
