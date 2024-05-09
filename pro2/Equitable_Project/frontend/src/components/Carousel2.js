import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./carousel.css";

export const Carousel2 = ({ data,onChangeCategory,onDeleteImage }) => {

    // console.log("Carousel data:", data)
    const categories = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"];
    const [slide, setSlide] = useState(0);
    const [changes,setChanges] = useState([]);

    const handleCategoryChange = (category) => {
        const updatedChanges = [...changes];
        const existingChangeIndex = updatedChanges.findIndex(change => change.id === data[slide].id);
        if (existingChangeIndex !== -1) {
            updatedChanges.splice(existingChangeIndex, 1);
        }
        updatedChanges.push({ id: data[slide].id, category: category });
        setChanges(updatedChanges);
        console.log("Updated changes:", changes);
        data[slide].category = category;
    };

    const handleDelete = () => {
        onDeleteImage(data[slide].id);
    };
    const handleChange=()=>{
        onChangeCategory(changes);
    }
    // Early return if data is not available
    if (!data || data.length === 0) {
        return <p>No images to display or data is loading...</p>;
    }

    return (
        <>
        <div className="carousel">
            <BsArrowLeftCircleFill
                onClick={() => setSlide(slide === 0 ? data.length - 1 : slide + 1)}
                className="arrow arrow-left"
            />
            {data.map((item, idx) => (
                <img
                    src={item.image}
                    alt={item.name}
                    key={idx}
                    className={slide === idx ? "slide" : "slide slide-hidden"}
                    style={{ marginLeft:"80px", 
            width: "700px",
            height: "300px",
            fontFamily:"monospace",
            flex:"justifly-center" 
            }}
                />
            ))}
            <BsArrowRightCircleFill
                onClick={() => setSlide(slide === data.length - 1 ? 0 : slide + 1)}
                className="arrow arrow-right"
            />
        </div>
        <div className="classification-buttons">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`classification-button ${
                        data[slide].category === category ? "active" : ""
                    }` }
                >
                    {category}
                </button>
            ))}
        </div>
        <div className="flex justify-center">
        <button onClick={handleDelete} className="border-2 border-gray-200 p-1 hover:bg-gray-200">DELETE IMAGE</button>

        <button onClick={handleChange} className=" mx-7 border-2 border-gray-200 p-1 hover:bg-gray-200">CHANGE</button>
        
        </div>
        <hr className="my-4 border-gray-600 w-full" />

            </>   
        
    );
};