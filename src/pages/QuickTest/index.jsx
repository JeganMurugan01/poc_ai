import { useState } from "react";

export const QuickTest = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
      <div className="md:col-span-8 p-5 ">
        <div className="border-2 border-gray-300 w-10/12 h-64 md:h-3/6 flex items-center justify-center">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Test"
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="text-gray-500">Test image will show up here</p>
          )}
        </div>
      </div>

      <div className="md:col-span-4 p-5 flex flex-col">
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white font-medium py-2 text-center px-4 md:px-[8%] rounded-lg hover:bg-blue-600 w-full mb-4 cursor-pointer"
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
