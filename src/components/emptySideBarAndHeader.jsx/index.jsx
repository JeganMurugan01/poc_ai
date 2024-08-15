/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmptySideBarHeader = () => {

    const nav = useNavigate();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full  border-b border-gray-200 bg-gray-800 border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <p className="flex ms-2 md:me-24">
                <span
                  onClick={() => {
                    nav("/");
                  }}
                  className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white cursor-pointer"
                >
                  AI poc
                </span>
              </p>
          </div>
          <div className="flex items-center">
              <div className="flex items-center ms-3 text-white ">
              <button
                  onClick={() => nav("/Admin")}
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 bg-gray-800 border-gray-700"
        aria-label="Sidebar"
      >
      </aside>

    </>
  );
};

export default EmptySideBarHeader;
