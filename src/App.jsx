import { useState } from "react";
import "./App.css";
import SideBarHeader from "./components/sideBarAndHeader";

function App() {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState(""); // Manage new tag name
  const [selectedTagImages, setSelectedTagImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [userName, setUserName] = useState();

  const handleFileSelect = (event, tagId) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setTags((prevTags) => {
      const updatedTags = prevTags.map((tag) => {
        if (tag.id === tagId) {
          return { ...tag, images: [...tag.images, ...previews] };
        }
        return tag;
      });
      return updatedTags;
    });
  };

  const handleRemoveTag = (tagId) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
  };

  const addTag = (name) => {
    if (name.trim() === "") return;
    setTags((prevTags) => [
      ...prevTags,
      { id: Date.now(), name: name.trim(), images: [] },
    ]);
  };

  const removeImageFromModal = (index) => {
    const updatedImages = [...selectedTagImages];
    updatedImages.splice(index, 1);
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.id === selectedTagId ? { ...tag, images: updatedImages } : tag
      )
    );
    setSelectedTagImages(updatedImages);
  };

  return (
    <>
      <SideBarHeader
        tags={tags}
        newTagName={newTagName}
        setNewTagName={setNewTagName}
        addTag={addTag}
        handleRemoveTag={handleRemoveTag}
      />
    </>
  );
}

export default App;
