import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiExternalLink } from "react-icons/fi";
import { logout } from "../../lib/api";
import { RESOURCES } from "./fields";
import ResourceManager from "./ResourceManager";

const TABS = Object.keys(RESOURCES); // ["projects","experience","skills","education"]

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("projects");

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">
            Portfolio <span className="text-indigo-600">Admin</span>
          </h1>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition"
            >
              <FiExternalLink /> View Site
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm hover:bg-red-100 transition"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {TABS.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                active === key
                  ? "border-indigo-600 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {RESOURCES[key].label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <ResourceManager config={RESOURCES[active]} />
      </main>
    </div>
  );
};

export default AdminDashboard;
