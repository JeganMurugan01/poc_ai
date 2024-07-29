/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";

const SideBarHeader = ({
  tags,
  newTagName,
  setNewTagName,
  addTag,
  handleRemoveTag,
}) => {
  const [isAddingTag, setIsAddingTag] = useState(false);

  const handleAddTag = () => {
    if (newTagName.trim() !== "") {
      addTag(newTagName);
      setNewTagName(""); // Clear input field
      setIsAddingTag(false); // Close input box
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  AI poc
                </span>
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3"></div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white">
                <span className="me-12">Tags</span>
                <FaPlus
                  className="ms-28 mt-2 cursor-pointer"
                  onClick={() => setIsAddingTag(true)}
                />
              </p>
              {isAddingTag && (
                <div className="flex items-center p-2 mt-2 border rounded-lg bg-gray-100 dark:bg-gray-700">
                  <input
                    type="text"
                    className="p-2 w-full rounded-lg dark:bg-gray-800 dark:text-white"
                    placeholder="Enter tag name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                  />
                  <button
                    className="p-2 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handleAddTag}
                  >
                    Add
                  </button>
                  <button
                    className="p-2 ml-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => setIsAddingTag(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {tags &&
                tags.length > 0 &&
                tags.map((tag) => {
                  return (
                    <div key={tag.id} className="flex items-center p-2 ">
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {tag.name}{" "}
                        <IoCloseCircleOutline
                          size={18}
                          className="ms-2 cursor-pointer"
                          onClick={() => {
                            handleRemoveTag(tag.id);
                          }}
                        />
                      </span>
                    </div>
                  );
                })}
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 mt-12">
        <div className="grid grid-flow-col auto-cols-max">
          <div className="p-3">Add Image</div>
        
        </div>
      </div>
    </>
  );
};

export default SideBarHeader;
