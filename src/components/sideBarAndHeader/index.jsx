/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const SideBarHeader = ({
  tags,
  newTagName,
  setNewTagName,
  addTag,
  handleRemoveTag,
  handleFileSelect,
  setSelectedTagId,
  handleImageDelete,
}) => {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [tempTagId, setTempTagId] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddTag = () => {
    if (newTagName.trim() !== "") {
      addTag(newTagName);
      setNewTagName("");
      setIsAddingTag(false);
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleDeleteSelectedImages = () => {
    handleImageDelete(tempTagId, selectedImages);
    setSelectedImages([]);
  };

  const handleSelectAllImages = () => {
    const allImageIndices =
      tags
        .find((tag) => tag.id === tempTagId)
        ?.images.map((_, index) => index) || [];
    setSelectedImages(allImageIndices);
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <div className="flex items-center ms-3 text-white ">
                <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Train
                </button>
              </div>
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
              <div className="p-2 mt-2">
                <input
                  type="text"
                  className="p-2 w-full rounded-lg dark:bg-gray-800 dark:text-white"
                  placeholder="Filter tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => {
                  const isActive = tag.id === tempTagId;
                  return (
                    <div key={tag.id} className="flex items-center p-2">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          isActive
                            ? "bg-blue-100 text-blue-600 ring-blue-500/10"
                            : "bg-gray-50 text-gray-600 ring-gray-500/10"
                        }`}
                        onClick={() => {
                          setTempTagId(tag.id);
                          setSelectedTagId(tag.id); // Set the selected tag ID
                        }}
                      >
                        {tag.name}{" "}
                        <IoCloseCircleOutline
                          size={18}
                          className="ms-2 cursor-pointer"
                          onClick={() => handleRemoveTag(tag.id)}
                        />
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="p-2 text-gray-500 dark:text-gray-400">
                  No tags found
                </p>
              )}
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-8 sm:ml-64 mt-12">
        {tags.length > 0 && tempTagId && (
          <>
            <div className="flex items-center mb-4 p-4">
              <FaPlus className="mt-1 me-1" />
              <label className="cursor-pointer">
                Add Image
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, tempTagId)}
                />
              </label>
              {tags.find((tag) => tag.id === tempTagId)?.images.length > 0 && (
                <>
                  <label
                    className="cursor-pointer flex items-center ms-4"
                    onClick={handleSelectAllImages}
                  >
                    <FaCheck size={24} />
                    <span className="ml-2">Select All</span>
                  </label>
                  {selectedImages.length > 0 && (
                    <label
                      className="cursor-pointer flex items-center ms-4"
                      onClick={handleDeleteSelectedImages}
                    >
                      <MdDelete size={24} />
                      <span className="ml-2">Delete</span>
                    </label>
                  )}
                </>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {tags
                .find((tag) => tag.id === tempTagId)
                ?.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      selectedImages.includes(index)
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                    onClick={() => handleImageSelect(index)}
                  >
                    <img
                      src={image}
                      alt={`tag-${index}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarHeader;
