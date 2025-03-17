import React, { useState, useEffect } from "react";
import axios from "axios";

const ImagePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);

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
        const imageUrls = response.data.images.map((img: { image_url: string }) => img.image_url);
        setImages(imageUrls);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Image Upload & Gallery</h1>

      <input type="file" onChange={handleFileChange} className="text-white p-2" />
      <button onClick={handleUpload} className="ml-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded">
        Upload
      </button>

      <div className="grid grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt="Uploaded image" className="w-40 h-40 rounded object-cover" />
          ))
        ) : (
          <p className="text-gray-400">No images uploaded yet.</p>
        )}
      </div>    </div>
  );
};

export default ImagePage;