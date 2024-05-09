import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./carousel.css";

export const Carousel = ({ data, onDeleteAll, onResetUpload }) => {
  const [slide, setSlide] = useState(0);
  const [classifications, setClassifications] = useState(
    data.map((item) => ({
      name: item.name,
      url: item.url,
      category: null,
      file: item.file,
      type: item.type,
    }))
  );
  const categories = [
    "airplane",
    "automobile",
    "bird",
    "cat",
    "deer",
    "dog",
    "frog",
    "horse",
    "ship",
    "truck",
  ];
  const [allClassified, setAllClassified] = useState(false);

  useEffect(() => {
    const allClassifiedUpdate = classifications.every(
      (item) => item.category !== null
    );
    setAllClassified(allClassifiedUpdate);
    console.log("All classified:", allClassifiedUpdate);
    console.log("Classifications:", classifications);
  }, [classifications]);

  const handleClassification = (index, category) => {
    const updatedClassifications = [...classifications];
    const imageData = updatedClassifications[index].file;
    const blob = new Blob([imageData], {
      type: updatedClassifications[index].type,
    });
    updatedClassifications[index].file = blob;
    updatedClassifications[index].category = category;
    setClassifications(updatedClassifications);
    console.log("Updated classifications:", classifications);
  };
  const handleSubmit = async () => {
    if (!allClassified) {
      alert("Please classify all images before submitting.");
      return;
    }
    try {
      console.log("Submitting classifications:", classifications);
      const formData = new FormData();
      classifications.forEach((item) => {
        formData.append("files", item.file, item.name);
        formData.append("categories", item.category);
        formData.append("types", item.type);
      });
      console.log("formData goinf to be submitted:", formData);
      const response = await fetch("/classify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Classification response:", responseData);
        onDeleteAll();
        onResetUpload();
      } else {
        console.error(
          "Failed to submit classifications. Server error:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Failed to submit classifications:", error);
    }
  };

  return (
    <>
      <div className="carousel">
        <BsArrowLeftCircleFill
          onClick={() => setSlide(slide === 0 ? data.length - 1 : slide - 1)}
          className="arrow arrow-left"
        />
        {data.map((item, idx) => (
          <img
            src={item.url}
            alt={item.name}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
            style={{ marginLeft:"80px", 
            width: "300px",
            height: "200px", 
            }}
          />
        ))}
        <BsArrowRightCircleFill
          onClick={() => setSlide(slide === data.length - 1 ? 0 : slide + 1)}
          className="arrow arrow-right"
        />

       
      </div>

      <div className="classification-buttons" style={{height:"40px"}}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleClassification(slide, category)}
            className={`button-64 active ${
              classifications[slide].category === category ? "active" : ""
            }`}
            style={{ width: "70px" }}
          >
            {category}
          </button>
        ))}
         {allClassified && (
          <button onClick={handleSubmit} className="button-64" style={{ width: "70px" }}>
            Submit
          </button>
        )}
      </div>
    </>
  );
};
