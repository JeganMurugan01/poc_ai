import { useEffect, useState } from "react";
import "./App.css";
import SideBarHeader from "./components/sideBarAndHeader";

function App() {
  const [tags, setTags] = useState([]);
  const [tagImages, setTagImages] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [selectedTagId, setSelectedTagId] = useState(null);
  
  const projectId = import.meta.env.VITE_PROJECT_ID;
  const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT;
  const trainingKey = import.meta.env.VITE_TRAINING_KEY;

  const fetchTags = async () => {
    try {
      const response = await fetch(
        `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/tags`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
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

  const fetchTagImages = async () => {
    try {
      const response = await fetch(
        `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/images`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Training-key": trainingKey,
          },
        }
      );
      let results = await response.json();
      if (selectedTagId) {
        results = results.filter(
          (item) => item.tags[0]?.tagId === selectedTagId
        );
      }
      setTagImages(results);
    } catch (error) {
      console.error("Error fetching tag images:", error);
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
              "Content-type": "application/json;charset=UTF-8",
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
              "Content-type": "application/json",
              "Training-key": trainingKey,
            },
          }
        );

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
              "Content-type": "application/json",
              "Training-key": trainingKey,
            },
          }
        );
        fetchTagImages();
      } catch (error) {
        console.error("Error deleting images:", error);
      }
    }
  };

  const addTag = () => {
    fetchTags();
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchTagImages();
  }, [selectedTagId]);

  return (
    <SideBarHeader
      tags={tags}
      tagImages={tagImages}
      newTagName={newTagName}
      setNewTagName={setNewTagName}
      addTag={addTag}
      handleRemoveTag={handleRemoveTag}
      handleFileSelect={handleFileSelect}
      setSelectedTagId={setSelectedTagId}
      handleImageDelete={handleImageDelete}
    />
  );
}

export default App;
