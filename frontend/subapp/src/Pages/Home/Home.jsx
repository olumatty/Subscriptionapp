import React from "react";
import ExpenseChart from "./Expensechart.jsx";
import Sidebar from "./Navbar.jsx";
import Header from "./Header.jsx";
import CategoryBreakdown from "./CategoryBreakdown.jsx";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row ">
        <Sidebar />
      <div className="flex-1 flex flex-col p-4 md:p-8 bg-gray-100">
        <Header />
          <div className="flex-1  ounded-lg p-4">
            <ExpenseChart />
          </div>
          <div className="  rounded-lg p-4">
            <CategoryBreakdown />
          </div>
        </div>
      </div>
  );
};

export default Home;
