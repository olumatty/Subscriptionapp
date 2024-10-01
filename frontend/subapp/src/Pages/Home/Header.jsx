// Header.jsx
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        
        navigate("/"); 
    }

    return (
        <div className="flex justify-between items-center p-1 mb-4 text-gray-600">
            <h1 className="text-lg font-bold truncate">Welcome to Subscription Tracker</h1>
            <button 
                onClick={handleLogout} 
                className="flex items-center space-x-2 hover:bg-blue-200 transition-colors rounded-md p-2"
            >
                <FaSignOutAlt />
                <span className="hidden md:inline">Logout</span>
            </button>
        </div>
    );
};

export default Header;
