import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen px-4 py-6">
      <h2 className="text-xl font-semibold mb-6">Student Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="block hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/history" className="block hover:bg-gray-700 p-2 rounded">
            History
          </Link>
        </li>
        <li>
          <Link to="/form" className="block hover:bg-gray-700 p-2 rounded">
            Form
          </Link>
        </li>
        <li>
          <Link to="/logout" className="block hover:bg-gray-700 p-2 rounded">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
