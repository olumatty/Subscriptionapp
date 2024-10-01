import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components for ChartJS
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const ExpenseChart = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTotalExpense(response.data.totalExpense);
      setExpenses(response.data.expenses);

      // Calculate expenses by category
      const categoryExpenses = response.data.expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.cost;
        return acc;
      }, {});

      setCategoryData(categoryExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subscriptions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSubscriptions();
  }, []);

  const calculateDaysLeft = (startDate, renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const start = new Date(startDate);

    if (isNaN(start) || isNaN(renewal)) {
      return 0;
    }

    const totalDuration = renewal - start;
    const elapsedTime = today - start;

    const totalDays = Math.ceil(totalDuration / (1000 * 3600 * 24));
    const elapsedDays = Math.ceil(elapsedTime / (1000 * 3600 * 24));

    const daysLeft = totalDays - elapsedDays;

    return daysLeft >= 0 ? daysLeft : 0;
  };

  const chartData = {
    labels: expenses.map((exp) => exp.name),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map((exp) => exp.cost),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Subscriptions',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cost ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto p-4"
    >
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">Total Expenses</h2>
              <p className="text-2xl font-semibold">${totalExpense}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">Category Breakdown</h2>
              <ul className="space-y-2">
                {Object.entries(categoryData).map(([category, cost]) => (
                  <li key={category} className="flex justify-between py-1 border-b">
                    <span className="text-sm md:text-base">{category}</span>
                    <span className="text-sm md:text-base">${cost.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* New Cards for Category and Renewal Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {subscriptions.map((subscription) => (
              <div key={subscription._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2">{subscription.name}</h3>
                <p className="text-sm">
                  Renewal Date: {new Date(subscription.renewalDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  Start Date:{new Date(subscription.startDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          <div className="relative w-full h-72 mb-4">
            <Line data={chartData} options={options} />
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ExpenseChart;
