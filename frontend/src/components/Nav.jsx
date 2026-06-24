import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import { ChevronDown } from "lucide-react";


const moreMenuItems = [
  { name: "Events", path: "/events" },
  { name: "Hackathons", path: "/hackathon-highlights" },
  { name: "careers", path: "/careers" },
  { name: "Verify Certificate", path: "/verify-certificate" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileHomeDropdownOpen, setMobileHomeDropdownOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userInitial = user ? (user.fullName || user.userName || "User")[0].toUpperCase() : null;

  // Close mobile menu on route change — subscribe via location object, read inside effect
  useEffect(() => {
    setIsOpen(false);
  }, [location]); // location object reference changes on every navigation

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50  transition-all ${
        scrolled ? "backdrop-blur bg-slate-900/80 shadow-lg" : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${scrolled ? "h-14" : "h-16"}`}>
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-10 w-auto" src="/logo.png" alt="Nova Coders logo" />
              <span className="ml-3 text-xl font-bold font-roboto bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-400 bg-clip-text text-transparent">
                Nova Coders
              </span>
            </Link>
          </div>


          <div className="hidden md:flex space-x-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "text-emerald-400 font-semibold bg-slate-700/50"
                  : "text-slate-100 hover:text-emerald-400 hover:bg-slate-700/30"
              }`
            }
          >
            Home
          </NavLink>
         
            <NavLink to="/about" className={({ isActive }) =>
              `hover:text-emerald-400 transition-colors ${
                isActive ? "text-emerald-500 font-semibold" : ""
              }`
            }>
              About
            </NavLink>
            <NavLink to="/services" className={({ isActive }) =>
              `hover:text-emerald-400 transition-colors ${
                isActive ? "text-emerald-500 font-semibold" : ""
              }`
            }>
              Services
            </NavLink>
            <NavLink to="/portfolio" className={({ isActive }) =>
              `hover:text-emerald-400 transition-colors ${
                isActive ? "text-emerald-500 font-semibold" : ""
              }`
            }
          >
            Portfolio
          </NavLink>

          {/* More Dropdown */}
          <div className="relative group">
            <button className="inline-flex items-center gap-1 px-3 py-2 rounded-md text-slate-100 hover:text-emerald-400 hover:bg-slate-700/30 transition-all duration-200 focus:outline-none">
              <span>More</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute right-0 z-10 mt-0 w-56 overflow-hidden rounded-md bg-slate-800 shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {moreMenuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm text-slate-100 transition-all duration-150 hover:bg-slate-700 hover:text-emerald-300 ${
                      isActive ? "text-emerald-400 font-semibold bg-slate-700/50" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "text-emerald-400 font-semibold bg-slate-700/50"
                  : "text-slate-100 hover:text-emerald-400 hover:bg-slate-700/30"
              }`
            }
          >
            Contact
          </NavLink>

          {isAuthenticated && (user?.role === 'admin' || user?.email?.includes('admin') || user?.isAdmin) && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "text-emerald-400 font-semibold bg-slate-700/50"
                    : "text-slate-100 hover:text-emerald-400 hover:bg-slate-700/30"
                }`
              }
            >
              Admin
            </NavLink>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white shadow-lg hover:shadow-emerald-500/50 transition-shadow duration-200">
                <span aria-label={`Logged in as ${user?.fullName || user?.userName || 'User'}`}>
                  {userInitial}
                </span>
              </div>
              <LogoutButton className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-600/50">
                Logout
              </LogoutButton>
            </div>
          ) : null}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((s) => !s)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-3 pt-2 pb-3 space-y-1 bg-slate-900/95 backdrop-blur-md max-h-96 overflow-y-auto">
          {/* Home Dropdown Mobile */}
         

          <Link
            to="/"
            className="block px-3 py-2 rounded hover:bg-slate-800 transition-all duration-150 text-slate-100 hover:text-emerald-400"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="block px-3 py-2 rounded hover:bg-slate-800 transition-all duration-150 text-slate-100 hover:text-emerald-400"
          >
            About Us
          </Link>

          <Link
            to="/services"
            className="block px-3 py-2 rounded hover:bg-slate-800 transition-all duration-150 text-slate-100 hover:text-emerald-400"
          >
            Services
          </Link>

          <Link
            to="/portfolio"
            className="block px-3 py-2 rounded hover:bg-slate-800 transition-all duration-150 text-slate-100 hover:text-emerald-400"
          >
            Portfolio
          </Link>


       
           <div>
            <button
              onClick={() => setMobileHomeDropdownOpen(!mobileHomeDropdownOpen)}
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded hover:bg-slate-800 transition-all duration-150 text-slate-100 hover:text-emerald-400"
            >
              <span>More</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  mobileHomeDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileHomeDropdownOpen && (
              <div className="pl-4 space-y-1">
                {moreMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileHomeDropdownOpen(false)}
                    className="block px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-700 hover:text-emerald-400 transition-all duration-150"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
             <Link
            to="/contact"
            className="block px-3 py-2 rounded hover:bg-slate-800 transition-all duration-150 text-slate-100 hover:text-emerald-400"
          >
            Contact
          </Link>

          {isAuthenticated && (user?.role === 'admin' || user?.email?.includes('admin') || user?.isAdmin) && (
            <Link
              to="/admin"
              className="block px-3 py-2 rounded hover:bg-slate-800 transition-all duration-150 text-slate-100 hover:text-emerald-400"
            >
              Admin
            </Link>
          )}

          {isAuthenticated && (
            <div className="space-y-3 px-3 py-2 mt-4 border-t border-slate-700 pt-4">
              <div className="flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white shadow-lg">
                  {userInitial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{user?.fullName || user?.userName || 'User'}</p>
                  <p className="text-xs text-slate-400">Logged in</p>
                </div>
              </div>
              <LogoutButton className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200">
                Logout
              </LogoutButton>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
