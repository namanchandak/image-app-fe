import React, { useState, useEffect } from "react";
import axios from "axios";

const ImagePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<{ imageUrl: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const token = localStorage.getItem("token"); // Get token from local storage
    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token, // Send token in header
        },
      });

      console.log("Upload response:", response.data);
      alert("Upload successful!");
      fetchImages();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const fetchImages = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:5000/images", {
        headers: {
          Authorization: token, // Send token in header
        },
      });

      if (response.data.images) {
        setImages(response.data.images.map((img: { image_url: string }) => ({ imageUrl: img.image_url })));
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  const analyzeImage = async (imageUrl: string) => {
    setLoading(true);
    setAnalysis(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", { image_url: imageUrl }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error("Image analysis failed:", error);
      alert("Image analysis failed. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="flex flex-col items-center h-[100%] w-[100%] bg-gray-900 text-white ">
      <h1 className="text-3xl font-bold mb-6 mt-4 text-blue-400">Image Upload & Gallery</h1>
       <div className="flex flex-row justify-center">

      <input type="file" onChange={handleFileChange} className="text-white p-2" />
      <button onClick={handleUpload} className="ml-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded">
        Upload
      </button>
        </div>

      <div className="grid grid-cols-4 gap-4 mt-4 overflow-y-auto mb-10">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.imageUrl}

                alt="Uploaded image"
                className="w-[200px] h-[200px] rounded object-cover cursor-pointer"
                onClick={() => setSelectedImage(image.imageUrl)}
              />
              {selectedImage === image.imageUrl && (
                <button
                  onClick={() => analyzeImage(image.imageUrl)}
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded opacity-90 hover:opacity-100"
                >
                  Analyze
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No images uploaded yet.</p>
        )}
      </div>

      {loading && <p className="mt-4 text-yellow-500">Analyzing image...</p>}
      {analysis && (
        <div className="mt-4 bg-gray-800 p-4 rounded">
          <h2 className="text-xl text-blue-400">Analysis Result:</h2>
          <p className="text-gray-300">{JSON.stringify(analysis)}</p>
        </div>
      )}
    </div>
  );
};

export default ImagePage;
