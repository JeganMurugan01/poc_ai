import { useEffect, useState } from "react";
import "./App.css";
import SideBarHeader from "./components/sideBarAndHeader";

function App() {
  const [tags, setTags] = useState([]);
  const [tagImages, setTagImages] = useState([]);
  const [newTagName, setNewTagName] = useState(""); // Manage new tag name
  const [selectedTagId, setSelectedTagId] = useState(null);

  const handleFileSelect = async(event, tagId) => {
    const projectId =  import.meta.env.VITE_PROJECT_ID;
    const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT
    const trainingKey = import.meta.env.VITE_TRAINING_KEY
    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('imageData', file);
    });
    // formData.append('imageData', files);

    let results = await fetch(`${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/images?tagIds=${tagId}`,
    {
      method: 'POST',
      headers: {"Training-key":trainingKey},
      body: formData
    }
    );

   await results.json();
    fetchTagImages();


    // const files = Array.from(event.target.files);
    // const previews = files.map((file) => URL.createObjectURL(file));

    // setTags((prevTags) => {
    //   const updatedTags = prevTags.map((tag) => {
    //     if (tag.id === tagId) {
    //       return { ...tag, images: [...tag.images, ...previews] };
    //     }
    //     return tag;
    //   });
    //   return updatedTags;
    // });
  };

  const handleRemoveTag = async(tagId) => {
    // setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
    if(!tagId){
      alert('Tag not selected')
      return;
    }
    const projectId =  import.meta.env.VITE_PROJECT_ID;
    const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT
    const trainingKey = import.meta.env.VITE_TRAINING_KEY


    if(window.confirm('Are you sure you want to delete this tag?')){
   await fetch(`${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/tags/${tagId}`,
      {
        method: "DELETE",
        headers: {"Content-type": "application/json;charset=UTF-8","Training-key":trainingKey}
      }
      );
  
      // results =  await results.json();
      // console.log(results);

      const imagIds = tagImages.filter((item)=> item.tags[0]?.tagId == tagId).map(item => item.id);
console.log(imagIds);
  await fetch(`${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/images?imageIds=${imagIds}`,
      {
        method: 'DELETE',
        headers: {"Content-type": "application/json","Training-key":trainingKey},
      }
      );
  
    //  results1 = await results1.json();
    //  console.log(results1);
      fetchTags();
      console.log('calling')
      setSelectedTagId(null);
      fetchTagImages();
    }
  };

  const addTag = (name) => {
    // if (name.trim() === "") return;
    // setTags((prevTags) => [
    //   ...prevTags,
    //   { id: Date.now(), name, images: [] },
    // ]);
    fetchTags();
  };

  const handleImageDelete = async(tagId, imageIndices) => {
    console.log('selected images',imageIndices)
    // setTags((prevTags) =>
    //   prevTags.map((tag) =>
    //     tag.id === tagId
    //       ? {
    //           ...tag,
    //           images: tag.images.filter(
    //             (_, index) => !imageIndices.includes(index)
    //           ),
    //         }
    //       : tag
    //   )
    // );
    if(imageIndices.length  === 0){
      alert('please select images for delete')
      return;
    }

    if(window.confirm('Are you sure you want to delete this image')){
      const projectId =  import.meta.env.VITE_PROJECT_ID;
      const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT
      const trainingKey = import.meta.env.VITE_TRAINING_KEY
      // formData.append('imageData', files);
  
    await fetch(`${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/images?imageIds=${imageIndices}`,
      {
        method: 'DELETE',
        headers: {"Content-type": "application/json","Training-key":trainingKey},
      }
      );
  
    //  results = await results.json();
    //  console.log(results);
      fetchTagImages();
    }


  };

  const fetchTags = async ()=>{
    const projectId =  import.meta.env.VITE_PROJECT_ID;
    const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT
    const trainingKey = import.meta.env.VITE_TRAINING_KEY
    let results = await fetch(`${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/tags`,
    {
      method: "GET",
      headers: {"Content-type": "application/json;charset=UTF-8","Training-key":trainingKey}
    }
    );

    results =  await results.json();
    // console.log(results);
    setTags(results);

  }

  const fetchTagImages = async ()=>{
    const projectId =  import.meta.env.VITE_PROJECT_ID;
    const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT
    const trainingKey = import.meta.env.VITE_TRAINING_KEY
    let results = await fetch(`${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/images`,
    {
      method: "GET",
      headers: {"Content-type": "application/json;charset=UTF-8","Training-key":trainingKey}
    }
    );

    results =  await results.json();
    console.log('fetch',selectedTagId)
    if(!selectedTagId){
      setTagImages(results);
    }else{
      results = results.filter((item)=> item.tags[0]?.tagId == selectedTagId);
      setTagImages(results);
    }

  }
  useEffect(()=>{
    fetchTags();
  },[selectedTagId]);

  useEffect(()=>{
    fetchTagImages();
  },[selectedTagId]);

  return (
    <>
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
    </>
  );
}

export default App;
