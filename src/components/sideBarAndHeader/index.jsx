/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SideBarHeader = ({
  tags,
  tagImages,
  newTagName,
  setNewTagName,
  addTag,
  handleRemoveTag,
  handleFileSelect,
  setSelectedTagId,
  handleImageDelete,
  handleTrainModule,
  isTraining,
  Page,
}) => {
  const nav = useNavigate();
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [tempTagId, setTempTagId] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const handleAddTag = async () => {
    // if (newTagName.trim() !== "") {
    //   addTag(newTagName);
    //   setNewTagName("");
    //   setIsAddingTag(false);
    // }

    if (!newTagName) {
      alert("please enter a tag name");
      return;
    }

    const projectId = import.meta.env.VITE_PROJECT_ID;
    const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT;
    const trainingKey = import.meta.env.VITE_TRAINING_KEY;
    let results = await fetch(
      `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/tags?name=${newTagName}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          "Training-key": trainingKey,
        },
      }
    );

    results = await results.json();
    console.log(results);
    toast.success("Tag Added Successfully");
    addTag(newTagName);
    setNewTagName("");
    setIsAddingTag(false);
  };

  const handleImageSelect = (index) => {
    // setSelectedImages((prevSelected) => {
    //   if (prevSelected.includes(index)) {
    //     return prevSelected.filter((i) => i !== index);
    //   } else {
    //     return [...prevSelected, index];
    //   }
    // });
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
    console.log(selectedImages);
  };

  const handleDeleteSelectedImages = () => {
    handleImageDelete(tempTagId, selectedImages);
    setSelectedImages([]);
  };

  const handleSelectAllImages = () => {
    const allImageIndices = tagImages.map((_, index) => index) || [];
    setSelectedImages(allImageIndices);
  };

  const filteredTags =
    tags &&
    tags.length &&
    tags.filter((tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
    <>
      <nav className="fixed top-0 z-50 w-full  border-b border-gray-200 bg-gray-800 border-gray-700 ">
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
                {location.pathname === "/Admin" ? (
                  <div>
                    <button
                      onClick={() => nav("/")}
                      className="text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleTrainModule}
                      disabled={isTraining}
                      className="text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                    >
                      {isTraining === false
                        ? "Train"
                        : "Training in progress ....."}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => nav("/Admin")}
                    className="text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                  >
                    Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full  border-r border-gray-200 sm:translate-x-0 bg-gray-800 border-gray-700"
        aria-label="Sidebar"
      >
        {location.pathname === "/Admin" ? (
          <div className="h-full px-3 pb-4 overflow-y-auto  bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <p className="flex items-center p-2 text-gray-900 rounded-lg text-white">
                  <span className="me-12">Tags</span>
                  <FaPlus
                    className="ms-28 mt-2 cursor-pointer text-green-600"
                    onClick={() => setIsAddingTag(true)}
                  />
                </p>
                {isAddingTag && (
                  <div className="flex items-center p-2 mt-2 border rounded-lg bg-gray-100 bg-gray-700">
                    <input
                      type="text"
                      className="p-2 w-full rounded-lg bg-gray-800 text-white"
                      placeholder="Enter Tag Name"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                    />
                    <button
                      className="p-2 ml-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                      onClick={handleAddTag}
                    >
                      Add
                    </button>
                    <button
                      className="p-2 ml-2 bg-red-500 text-white  text-sm rounded-lg hover:bg-red-600"
                      onClick={() => setIsAddingTag(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <div className="p-2 mt-2">
                  <input
                    type="text"
                    className="p-2 w-full rounded-lg bg-gray-800 text-white"
                    placeholder="Filter tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {filteredTags && filteredTags.length > 0 ? (
                  filteredTags.map((tag) => {
                    const isActive = tag.id === tempTagId;
                    return (
                      <div key={tag.id} className="flex items-center p-2 ">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-md font-medium ring-1 ring-inset cursor-pointer ${
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
                            color="red"
                            size={18}
                            className="ms-2 cursor-pointer"
                            onClick={() => handleRemoveTag(tag.id)}
                          />
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="p-2 text-gray-500 text-gray-400">
                    No tags found
                  </p>
                )}
              </li>
            </ul>
          </div>
        ) : null}
      </aside>
      <div className="p-8 sm:ml-64 mt-12 bg-gray-700  min-h-screen	">
        {location.pathname === "/Admin" && !Page ? (
          <>
            <div className="flex items-center mb-4 p-4 ">
              {tempTagId && (
                <>
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
                </>
              )}

              {Array.isArray(tagImages) && tagImages.length > 0 && (
                <>
                  <label
                    className="cursor-pointer flex items-center ms-4 "
                    onClick={handleSelectAllImages}
                  >
                    <FaCheck className="text-white" size={24} />
                    <span className="ml-2 text-white">Select All</span>
                  </label>
                  <label
                    className="cursor-pointer flex items-center ms-4"
                    onClick={handleDeleteSelectedImages}
                  >
                    <MdDelete className="text-white" size={24} />
                    <span className="ml-2 text-white">Delete</span>
                  </label>
                </>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4  ">
              {Array.isArray(tagImages) &&
                tagImages &&
                tagImages.length > 0 &&
                tagImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      selectedImages.includes(image.id)
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                    onClick={() => handleImageSelect(image.id)}
                  >
                    <LazyLoadImage
                      src={image.thumbnailUri}
                      alt={`tag-${index}`}
                      className="w-full h-60 object-cover rounded-md"
                      effect="blur"
                      wrapperProps={{
                        style: { transitionDelay: "0.1s" },
                      }}
                    />
                  </div>
                ))}
            </div>
          </>
        ) : (
          Page && <Page />
        )}
      </div>
    </>
  );
};

export default SideBarHeader;
