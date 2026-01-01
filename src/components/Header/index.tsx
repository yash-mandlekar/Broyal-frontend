"use client";
import React, { useState, useEffect, useRef } from "react";
import CustomSelect from "./CustomSelect";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  RotateCcw,
  Menu,
  X,
  LogOut,
  UserCircle,
  Package,
  Settings,
} from "lucide-react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logoutAdmin } from "@/redux/features/auth/auth-slice"; // Update path as needed

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openCartModal } = useCartModalContext();

  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen]);

  const menuItems = [
    {
      title: "Popular",
      path: "/",
    },
    {
      title: "Shop",
      path: "/shop",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];

  const userMenuItems = [
    {
      title: "My Profile",
      path: "/my-account",
      icon: <UserCircle size={16} />,
    },
    {
      title: "My Orders",
      path: "/orders",
      icon: <Package size={16} />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings size={16} />,
    },
  ];

  const handleOpenCartModal = () => {
    openCartModal();
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
    setUserDropdownOpen(false);
  };

  return (
    <header
      className={`fixed left-0 top-0 w-full z-50 bg-white transition-all duration-300 ${
        stickyMenu ? "shadow-bw-medium" : "shadow-bw-soft"
      }`}
    >
      {/* Top Bar */}
      <div
        className={`transition-all duration-300 ${
          stickyMenu ? "py-3" : "py-4 md:py-6"
        }`}
      >
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-bold text-black hover:text-black-light transition-colors">
                Broyal
              </h1>
            </Link>

            {/* Search Bar - Full Width on Mobile */}
            <div className="w-full md:flex-1 md:mx-6 lg:mx-8 flex items-center rounded-lg overflow-hidden border-[1px] border-gray-300 shadow-sm hover:shadow-bw-soft transition-all">
              <input
                type="search"
                placeholder="Search Jackets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 md:py-3.5 outline-none text-sm md:text-base bg-white text-black placeholder-gray-500"
              />
              <button className="px-4 md:px-5 py-3 md:py-3.5 flex items-center justify-center text-black hover:text-gray-700 transition-colors">
                <Search size={18} />
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 md:gap-5 lg:gap-6 justify-between md:justify-end flex-1">
              {/* Account */}
              {user ? (
                <div className="relative hidden md:block" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 transition-all hover:opacity-70"
                  >
                    <div className="w-9 md:w-10 h-9 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-soft hover:bg-gray-300 transition-colors">
                      <User size={16} className="text-black" />
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-2xs uppercase text-gray-600">
                        Account
                      </p>
                      <p className="font-semibold text-xs md:text-sm text-black truncate max-w-[100px]">
                        {user.name || user.email}
                      </p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-bw-strong border border-gray-200 overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-semibold text-sm text-black truncate">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs truncate text-gray-600">
                          {user.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {userMenuItems.map((item, index) => (
                          <Link
                            key={index}
                            href={item.path}
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-soft transition-colors"
                          >
                            <span className="text-black">{item.icon}</span>
                            <span className="text-sm text-black">
                              {item.title}
                            </span>
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-200">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-soft transition-colors"
                        >
                          <LogOut size={16} className="text-black" />
                          <span className="text-sm text-black">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="hidden md:flex items-center gap-2 transition-all hover:opacity-70"
                >
                  <div className="w-9 md:w-10 h-9 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-soft hover:bg-gray-300 transition-colors">
                    <User size={16} className="text-black" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-2xs uppercase text-gray-600">Account</p>
                    <p className="font-semibold text-xs md:text-sm text-black">
                      Sign In
                    </p>
                  </div>
                </Link>
              )}

              {/* Mobile Search Toggle */}
              <button className="md:hidden p-2">
                <Search size={20} className="text-black" />
              </button>

              {/* Cart */}
              <button
                onClick={handleOpenCartModal}
                className="relative flex items-center transition-all hover:opacity-70"
              >
                <div className="w-9 md:w-10 h-9 md:h-10 rounded-full flex items-center justify-center relative flex-shrink-0 bg-gray-soft hover:bg-gray-300 transition-colors">
                  <ShoppingCart size={18} className="text-black" />
                  {items.length > 0 && (
                    <span className="flex items-center justify-center font-semibold text-2xs absolute -right-2 -top-2 w-5 h-5 rounded-full text-white bg-black">
                      {items.length > 9 ? "..." : items.length}
                    </span>
                  )}
                </div>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setNavigationOpen(!navigationOpen)}
                className="md:hidden p-2"
              >
                {navigationOpen ? (
                  <X size={24} className="text-black" />
                ) : (
                  <Menu size={24} className="text-black" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t-2 border-gray-200">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
          <div className="flex items-center justify-between">
            {/* Main Navigation */}
            <nav
              className={`${
                navigationOpen
                  ? "absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 z-50 visible md:relative md:shadow-none md:rounded-none md:p-0"
                  : "hidden md:block"
              }`}
            >
              <ul className="flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-8">
                {menuItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="relative group block py-3 md:py-5 text-xs md:text-sm font-semibold text-black hover:text-gray-700 transition-colors"
                    >
                      {item.title}
                      <span className="absolute bottom-2 md:bottom-3 lg:bottom-4 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}

                {/* Mobile User Menu */}
                {user && (
                  <li className="md:hidden border-t pt-2 mt-2">
                    <div className="space-y-1">
                      {userMenuItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.path}
                          onClick={() => setNavigationOpen(false)}
                          className="flex items-center gap-3 py-2 text-xs font-semibold text-black hover:text-gray-700 transition-colors"
                        >
                          <span className="text-black">{item.icon}</span>
                          {item.title}
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          handleLogout();
                          setNavigationOpen(false);
                        }}
                        className="flex items-center gap-3 py-2 text-xs font-semibold text-black hover:text-gray-700 transition-colors w-full text-left"
                      >
                        <LogOut size={16} className="text-black" />
                        Logout
                      </button>
                    </div>
                  </li>
                )}
              </ul>
            </nav>

            {/* Right Links */}
            <div className="hidden lg:flex items-center gap-6 py-5">
              <Link
                href="/wishlist"
                className="flex items-center gap-2 text-black hover:text-gray-700 transition-all text-sm font-semibold"
              >
                <Heart size={16} />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
