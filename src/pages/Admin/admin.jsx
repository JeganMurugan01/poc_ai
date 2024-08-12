/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Admin = ({
  tagImages,
  tempTagId,
  handleFileSelect,
  handleImageDelete,
  selectedTagId,
  setTagImages,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  console.log(tagImages, "tagImages");

  const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT;
  const trainingKey = import.meta.env.VITE_TRAINING_KEY;
  const projectId = import.meta.env.VITE_PROJECT_ID;

  const handleImageSelect = (index) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
    console.log(selectedImages);
  };

  const fetchTagImages = async () => {
    try {
      const response = await fetch(
        `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/images`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Training-key": trainingKey,
          },
        }
      );
      console.log(response, "response from admin page");
      let result = await response.json();
      console.log(result, "result from API in Admin page");

      if (selectedTagId) {
        result = result.filter((item) => item.tags[0]?.tagId === selectedTagId);
      }

      setTagImages(result);
    } catch (error) {
      console.error("Error fetching tag images:", error);
    }
  };
  useEffect(() => {
    console.log(tagImages, "Updated tagImages after fetch");
  }, [tagImages]); 
  useEffect(() => {
    console.log("useEffect triggered");
    fetchTagImages();
  }, [selectedTagId]);

  const handleDeleteSelectedImages = () => {
    handleImageDelete(tempTagId, selectedImages);
    setSelectedImages([]);
  };

  const handleSelectAllImages = () => {
    const allImageIndices = tagImages.map((_, index) => index) || [];
    setSelectedImages(allImageIndices);
  };

  return (
    <>
      <div className="flex items-center mb-4 p-4">
        {tempTagId && (
          <>
            <FaPlus size={24} className="mt-1 me-1 text-white" />
            <label className="cursor-pointer text-white ms-2">
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
        {console.log(tagImages, "tagImages before mapping")}
        {tagImages.length > 0 && (
          <div className="flex">
            <label
              className="cursor-pointer flex items-center ms-4"
              onClick={() => handleSelectAllImages()}
            >
              <FaCheck size={24} className="text-white" />
              <span className="ml-2 text-white">Select All</span>
            </label>
            <label
              className="cursor-pointer flex items-center ms-4"
              onClick={handleDeleteSelectedImages}
            >
              <MdDelete size={24} className="text-white" />
              <span className="ml-2 text-white">Delete</span>
            </label>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {tagImages &&
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
  );
};
