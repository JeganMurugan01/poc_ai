import { useState } from "react";
import { Descriptions } from "../../utils/constant";
import { PropagateLoader } from "react-spinners";

export const QuickTest = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [testResult, setTestResult] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const data = "Optional fdic Chaining buttonConfig?.length  Checks if buttonConfig is defined and has a length greater thancolorConfig?.length  Checks if colorConfig is defined and has a length greater than Buttons and color pickers are only rendered if their respective arrays are defined and not empty. The question-section displays a message based on whether there are any buttons or color pickers available.This approach ensures that your component sa";
  const length = data.length;
  const half = Math.floor(length / 2);
  
  const data_1 = data.slice(0, half);
  const data_2 = data.slice(half);
  
  console.log("First half (data_1):", data_1);
  console.log("Second half (data_2):", data_2);
  
  const handleFileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT;
    const trainingKey = import.meta.env.VITE_TRAINING_KEY;
    const projectId = import.meta.env.VITE_PROJECT_ID;
    const formData = new FormData();
    formData.append("imageData", e.target.files[0]);

    setLoading(true); // Set loading to true before API call

    try {
      let results = await fetch(
        `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/quicktest/image?iterationId=f5599dca-7410-4958-a1b2-bcff89e6362f`,
        {
          method: "POST",
          headers: {
            "Training-key": trainingKey,
          },
          body: formData,
        }
      );
      results = await results.json();
      const predictions = results.predictions;
      const highestProbabilityIndex = predictions.reduce(
        (maxIndex, current, index, array) => {
          return current.probability > array[maxIndex].probability
            ? index
            : maxIndex;
        },
        0
      );
      const data = predictions[highestProbabilityIndex];
      setDescription(Descriptions[data.tagName] || "No description available");
      setTestResult(predictions);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
      <div className="md:col-span-3 p-5">
        <div className="border-2 border-gray-300 w-5/7 h-full md:h-3/6 flex items-center justify-center">
          {selectedFile ? (
           <div>
             <img
              src={URL.createObjectURL(selectedFile)}
              alt="Test"
              className="object-cover w-full h-full"
            />
           </div>
          ) : (
            <p className="text-gray-500">Test image will show up here</p>
          )}
        </div>
        <div className="text-white">{data_2}</div>
      </div>
      <div className="md:col-span-5">
        <div className="mt-5">
          {loading ? (
            <div className=" ms-28 mt-24">
              <PropagateLoader color="#ffffff" />
            </div>
          ) : (
            <>
              {testResult.length > 0 && (
                <>
                  {testResult.map((result) => (
                    <p className="text-white" key={result.id}>
                      {result.tagName} - {(result.probability * 100).toFixed(2)}
                      %
                    </p>
                  ))}
                  <p className="text-white mt-3">
                    <label className="font-extrabold text-sky-400">
                      Description :{" "}
                    </label>
                    <span>
                      {data_1}
                    </span>
                  </p>
                </>
              )}
              {testResult.length === 0 && !loading && (
                <p className="text-gray-500">No results available</p>
              )}
            </>
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
          File formats accepted: jpg, png.
        </p>
      </div>
    </div>
  );
};
