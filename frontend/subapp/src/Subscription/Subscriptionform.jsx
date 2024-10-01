import { useState } from "react";

const SubscriptionForm = ({ subscription, onSubmit, onCancel }) => {
  const [name, setName] = useState(subscription ? subscription.name : "");
  const [cost, setCost] = useState(subscription ? subscription.cost : "");
  const [renewalDate, setRenewalDate] = useState(
    subscription ? subscription.renewalDate.split("T")[0] : ""
  );
  const [startDate, setStartDate] = useState(
    subscription ? subscription.startDate.split("T")[0] : ""
  ); // Add state for start date
  const [category, setCategory] = useState(
    subscription ? subscription.category : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, cost:parseFloat(cost), renewalDate, startDate, category }); // Include start date in the submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        {subscription ? "Edit Subscription" : "Add Subscription"}
      </h2>

      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor="subscriptionName"
      >
        Subscription Name
      </label>
      <input
        id="subscriptionName"
        type="text"
        placeholder="Subscription Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-gray-300 mb-4 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />

      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor="cost"
      >
        Cost
      </label>
      <input
        id="cost"
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        required
        className="border border-gray-300 mb-4 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />

      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor="startDate"
      >
        Start Date
      </label>
      <input
        id="startDate"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)} // Handle change for start date
        required
        className="border border-gray-300 mb-4 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />

      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor="renewalDate"
      >
        Renewal Date
      </label>
      <input
        id="renewalDate"
        type="date"
        value={renewalDate}
        onChange={(e) => setRenewalDate(e.target.value)}
        required
        className="border border-gray-300 mb-4 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />

      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor="category"
      >
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border border-gray-300 mb-4 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      >
        <option value="">Select Category</option>
        <option value="Films & Serials">Films & Serials</option>
        <option value="Music & Podcast">Music & Podcast</option>
        <option value="Gaming">Gaming</option>
        <option value="Cloud">Cloud</option>
        <option value="Delivery">Delivery</option>
        <option value="Health & Fitness">Health & Fitness</option>
        <option value="TV">TV</option>
        <option value="Internet">Internet</option>
        <option value="Education">Education</option>
        <option value="Banking">Banking</option>
        <option value="Media">Media</option>
        <option value="Work">Work</option>
        <option value="Software">Software</option>
        <option value="Other">Other</option>
      </select>

      <div className="flex flex-col md:flex-row justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200 w-full md:w-auto"
        >
          {subscription ? "Update" : "Add"} Subscription
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="mt-2 md:mt-0 md:ml-4 text-gray-500 hover:text-red-600 transition duration-200 w-full md:w-auto"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubscriptionForm;
