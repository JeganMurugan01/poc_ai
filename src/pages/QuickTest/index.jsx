import { useState } from "react";

export const QuickTest = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = () => {
    const source = imageUrl || selectedFile?.name;
    if (source) {
      console.log(`Processing image from ${imageUrl ? "URL" : "local file"}: ${source}`);
    }
  };

  return (
    <div className="h-screen grid grid-cols-12 gap-4 p-6">
      <div className="col-span-8 p-5 flex items-center justify-center">
        <div className="border-2 border-gray-300 w-full h-full flex items-center justify-center">
          {imageUrl || selectedFile ? (
            <img
              src={imageUrl || URL.createObjectURL(selectedFile)}
              alt="Test"
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="text-gray-500">Test image will show up here</p>
          )}
        </div>
      </div>

      <div className="col-span-4 p-5">
        <label className="block mb-2 font-semibold">Image URL</label>
        <input
          type="text"
          placeholder="Enter Image URL"
          value={imageUrl}
          onChange={handleInputChange(setImageUrl)}
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 w-full mb-4"
        >
          Submit
        </button>
        <p className="mb-4 text-center text-gray-500">or</p>
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white font-medium py-2 px-[104px] rounded-lg hover:bg-blue-600 w-full mb-4 cursor-pointer"
        >
          Browse local files
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <p className="text-sm text-gray-500 mb-2 mt-5">
          File formats accepted: jpg, png, bmp
        </p>
        <p className="text-sm text-gray-500 mb-4">
          File size should not exceed: 4mb
        </p>
      </div>
    </div>
  );
};
