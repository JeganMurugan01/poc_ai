/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./App.css";
import SideBarHeader from "./components/sideBarAndHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ tagImages, setTagImages }) {
  const [tags, setTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const projectId = import.meta.env.VITE_PROJECT_ID;
  const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT;
  const trainingKey = import.meta.env.VITE_TRAINING_KEY;
  const predictionKey = import.meta.env.VITE_PREDICTION_RESOURCE_ID;

  const publishTraining = async (iterationID, name) => {
    try {
      const response = await fetch(
        `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/iterations/${iterationID}/publish?publishName=${name}&predictionId=${predictionKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Training-key": trainingKey,
          },
        }
      );
      const result = await response.json();
      if (response.status === 400) {
        toast.error(result.message);
        return result;
      }
      toast.success("Training Published");
      return result;
    } catch (error) {
      console.error("Error publishing training:", error);
    }
  };

  const trainingResults = async () => {
    try {
      const response = await fetch(
        `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/iterations`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Training-key": trainingKey,
          },
        }
      );
      const result = await response.json();
      if (response.status === 400) {
        toast.error(result.message);
        return result;
      }
      const trainRes = result.filter((r) => r.status === "Training");
      setIsTraining(trainRes.length > 0);

      if (trainRes.length === 0) {
        const latestRecord = result.sort(
          (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
        )[0];
        if (!latestRecord.publishName) {
          publishTraining(latestRecord.id, latestRecord.name);
        }
      }
    } catch (error) {
      console.error("Error fetching training results:", error);
    }
  };

  const handleTrainModule = async () => {
    if (window.confirm("Are you sure you want to train?")) {
      try {
        const response = await fetch(
          `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/train`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Training-key": trainingKey,
            },
          }
        );
        const result = await response.json();
        if (response.status === 400) {
          toast.error(result.message);
        } else {
          setIsTraining(true);
          toast.success(
            "Training Started. It will take a few minutes to complete."
          );
        }
      } catch (error) {
        console.error("Error starting training:", error);
      }
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(
        `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/tags`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Training-key": trainingKey,
          },
        }
      );
      const result = await response.json();
      setTags(result);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleFileSelect = async (event, tagId) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach((file) => formData.append("imageData", file));

    try {
      await fetch(
        `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/images?tagIds=${tagId}`,
        {
          method: "POST",
          headers: {
            "Training-key": trainingKey,
          },
          body: formData,
        }
      );
      fetchTagImages();
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleRemoveTag = async (tagId) => {
    if (!tagId) {
      alert("Tag not selected");
      return;
    }

    if (window.confirm("Are you sure you want to delete this tag?")) {
      try {
        await fetch(
          `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/tags/${tagId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Training-key": trainingKey,
            },
          }
        );

        const imageIds = tagImages
          .filter((item) => item.tags[0]?.tagId === tagId)
          .map((item) => item.id);

        await fetch(
          `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/images?imageIds=${imageIds}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Training-key": trainingKey,
            },
          }
        );

        toast.success("Tag removed successfully");
        setSelectedTagId(null);
        fetchTags();
        fetchTagImages();
      } catch (error) {
        console.error("Error removing tag:", error);
      }
    }
  };

  const handleImageDelete = async (tagId, imageIndices) => {
    if (imageIndices.length === 0) {
      alert("Please select images for deletion");
      return;
    }

    if (window.confirm("Are you sure you want to delete these images?")) {
      try {
        await fetch(
          `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/images?imageIds=${imageIndices}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Training-key": trainingKey,
            },
          }
        );
        toast.success("Image deleted successfully");
        fetchTagImages();
      } catch (error) {
        console.error("Error deleting images:", error);
      }
    }
  };
  const addTag = () => {
    fetchTags();
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
      let result = await response.json();
      if (selectedTagId) {
        result = result.filter((item) => item.tags[0]?.tagId === selectedTagId);
      }
      setTagImages(result);
    } catch (error) {
      console.error("Error fetching tag images:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    trainingResults();
    const intervalId = setInterval(() => {
      if (isTraining) trainingResults();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [isTraining]);

  useEffect(() => {
    fetchTagImages();
  }, [selectedTagId]);

  return (
    <div>
      <SideBarHeader
        tags={tags}
        tagImages={tagImages}
        addTag={addTag}
        handleRemoveTag={handleRemoveTag}
        handleFileSelect={handleFileSelect}
        setSelectedTagId={setSelectedTagId}
        handleImageDelete={handleImageDelete}
        handleTrainModule={handleTrainModule}
        isTraining={isTraining}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
