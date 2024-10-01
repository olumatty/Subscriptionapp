import { useEffect, useState } from "react";
import SubscriptionForm from "./SubscriptionForm";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const fetchSubscriptions = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log("Fetching subscriptions with token:", token);

    try {
      const response = await fetch("http://localhost:5000/api/subscriptions", {
        headers: getHeaders(),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching subscriptions:", errorData);
        throw new Error("Failed to fetch subscriptions");
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSubscription = async (subscription) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/subscriptions", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(subscription),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding subscription:", errorData);
        throw new Error("Failed to add subscription");
      }
      fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateSubscription = async (subscription) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/subscriptions/${editingSubscription._id}`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(subscription),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating subscription:", errorData);
        throw new Error("Failed to update subscription");
      }
      setEditingSubscription(null);
      fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteSubscription = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/subscriptions/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting subscription:", errorData);
        throw new Error("Failed to delete subscription");
      }
      fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      deleteSubscription(id);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchSubscriptions();
    } else {
      setError("You need to be logged in to view subscriptions.");
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4 text-blue-600">
        Subscription Manager
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && (
        <div className="text-blue-500 mb-4">Loading subscriptions...</div>
      )}
      {editingSubscription ? (
        <SubscriptionForm
          subscription={editingSubscription}
          onSubmit={updateSubscription}
          onCancel={() => setEditingSubscription(null)}
        />
      ) : (
        <SubscriptionForm onSubmit={addSubscription} />
      )}
      <ul className="list-none mt-4">
        {subscriptions.map((subscription) => (
          <li
            key={subscription._id}
            className="flex justify-between items-center mb-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white"
          >
            <div>
              <h2 className="text-lg font-bold">{subscription.name}</h2>
              <p className="text-gray-700">
                Cost:{" "}
                <span className="font-semibold">${subscription.cost}</span> |
                Renewal Date:{" "}
                <span className="font-semibold">
                  {new Date(subscription.renewalDate).toLocaleDateString()}
                </span>{" "}
                | Start Date:{" "}
                <span className="font-semibold">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </span>{" "}
                | Category:{" "}
                <span className="font-semibold">{subscription.category}</span>
              </p>
            </div>
            <div>
              <button
                onClick={() => setEditingSubscription(subscription)}
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(subscription._id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200 ml-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;
