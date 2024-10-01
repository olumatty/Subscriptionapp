import { FaSuitcase } from "react-icons/fa";
import { TbUser } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [activeLinks, setActiveLinks] = useState(0);

  const handleLinkClick = (index) => {
    setActiveLinks(index);
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/", name: "Dashboard", icon: FaSuitcase },
    { id: 2, path: "/subscription", name: "Subscriptions", icon: TbUser },
    { id: 3, path: "/platform", name: "Platforms", icon: FaSuitcase },
  ];

  return (
    <div className="w-full md:w-56 h-auto bg-primary text-white pt-8 px-4">
      <h3 className="text-lg font-semibold mb-6">Arch</h3>
      <ul className="mt-6 space-y-4">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={link.id}
            className={`font-medium rounded-md py-2 px-5 transition-colors duration-200 ease-in-out 
              ${activeLinks === index ? "bg-blue-600 text-white" : "hover:bg-gray-500 hover:text-indigo-100"}
            `}
            onClick={() => handleLinkClick(index)}
          >
            <Link to={link.path} className="flex justify-start items-center">
              <span className="text-lg">{link.icon()}</span>
              <span className="text-sm ml-3 block">{link.name}</span> {/* Show text on mobile */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
