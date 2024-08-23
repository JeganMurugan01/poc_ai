/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Descriptions } from "../../utils/constant";
import { PropagateLoader } from "react-spinners";
import ProgressBar from "@ramonak/react-progress-bar";
import "../../App.css";
export const QuickTest = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [testResult, setTestResult] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  let normalizedTagName;
  let descriptionKey;
  const handleFileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    const trainingEndpoint = import.meta.env.VITE_TRAINING_ENDPOINT;
    const trainingKey = import.meta.env.VITE_TRAINING_KEY;
    const projectId = import.meta.env.VITE_PROJECT_ID;
    const formData = new FormData();
    formData.append("imageData", e.target.files[0]);

    setLoading(true);

    try {
      let results = await fetch(
        `${trainingEndpoint}customvision/v3.3/Training/projects/${projectId}/quicktest/image?iterationId=46b47cc6-0ea1-4387-ad7b-9bafa13d0f85
 `,
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
      normalizedTagName = data.tagName.replace(/\s+/g, "").toLowerCase();
      descriptionKey = Object.keys(Descriptions).find(
        (key) => key.toLowerCase() === normalizedTagName
      );
      setDescription(
        Descriptions[descriptionKey] || "No description available for this tag."
      );
      setTestResult(predictions);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Welcome and Intro Section */}
      <div className="mb-6">
        <h1 className="text-white m-0 mb-5 text-3xl mt-3">
          Welcome Back Jagan!
        </h1>
        <p className="text-white mb-2">
          This page is dedicated to testing the predictive capabilities of our
          AI model for skin diseases. Upload an image of a skin condition, and
          let Azure Custom Vision AI analyze and predict the disease with
          accuracy. Whether you're a healthcare professional or just exploring
          the technology, this page provides quick and reliable results to
          assist in early detection and diagnosis.
        </p>
        <h2 className="text-red-600 font-medium text-2xl mb-5 text-center font-bold mt-2 ">
          Warning: Severe symptoms detected—seek immediate medical attention!
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-1"></div>
        <div className="md:col-span-5">
          <div className="border-2 border-gray-300 flex items-center justify-center min-h-80">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Test"
                className="object-cover w-full"
              />
            ) : (
              <p className="text-gray-500">Test image will show up here</p>
            )}
          </div>
        </div>
        <div className="md:col-span-1"></div>
        <div className="md:col-span-4 flex flex-col">
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
          <p className="text-sm text-gray-500 mb-2">
            File formats accepted: jpg, png.
          </p>
          {loading ? (
            <div className="ms-28 mt-24">
              <PropagateLoader color="#ffffff" />
            </div>
          ) : (
            <>
              {testResult.length > 0 && (
                <div>
                  <div className="mt-5">
                    <label className="font-extrabold text-sky-400">
                      Prediction Result :{" "}
                    </label>
                    {testResult.map((result) => (
                      <div className="mt-4" key={result.id}>
                        <p className="text-white">{result.tagName}</p>
                        <ProgressBar
                          completed={(result.probability * 100).toFixed(2)}
                          bgColor={
                            result.probability * 100 > 90 &&
                            result.tagName === "Severe Chickenpox"
                              ? "#FF0000"
                              : "#007fff"
                          }
                          labelColor="#ffffff"
                          animateOnRender
                          labelAlignment={"outside"}
                          padding={0}
                          dir="auto"
                          customLabel={`${(result.probability * 100).toFixed(
                            2
                          )}%`}
                        />{" "}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Description Section */}
      {console.log(
        descriptionKey,
        description,
        normalizedTagName,
        "description"
      )}
      <div className="mt-6">
        {testResult.length > 0 && (
          <>
            <p className="text-white mt-3">
              <span
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </p>
          </>
        )}
      </div>
    </div>
  );
};
