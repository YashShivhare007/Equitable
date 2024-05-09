import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Carousel2 } from '../../components/Carousel2';

function ManagerAnalysis() {
    const [categorizedImages, setCategorizedImages] = useState([]);
    useEffect(() => {
        fetchImages();
    }, []);
    const fetchImages = async () => {
        try {
            const response = await fetch("/get_all_classifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ userId: localStorage.getItem("userId") }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch images");
            }
            const data = await response.json();
            console.log("Got The data from the Backend:", data);

            const categories = data.reduce((acc, item) => {
                if (!acc[item.category]) {
                    acc[item.category] = [];
                }
                acc[item.category].push(item);
                return acc;
            }, {});

            const categorizedArray = Object.keys(categories).map(category => ({
                category,
                images: categories[category]
            }));

            console.log("Categorized images:", categorizedArray);
            setCategorizedImages(categorizedArray);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };
    const handleDeleteImage = async (imageId) => {
        const response = await fetch("/delete_image", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ imageId }),
        });
        if (response.ok) {
            console.log("Image deleted successfully");
            fetchImages();

        }
    };
    const handleChangeCategory = async(data)=>{
        const response = await fetch("/change_category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            fetchImages();
        }
    }
    return (
        <>
            <Navbar />
            MANAGER ANALYSIS PAGE
            {categorizedImages.length > 0 ? (
                categorizedImages.map((category, index) => (
                        <div key={index} style={{justifyContent:'center'}}>
                            <h2 style={{ textAlign: 'center',}}>
                                {category.category} ({category.images.length} images)
                            </h2>
                            <Carousel2 data={category.images} onChangeCategory={handleChangeCategory} onDeleteImage={handleDeleteImage}/>
                        </div>
                ))
            ) : (
                <p>Loading Images...</p>
            )}
        </>
    );
}

export default ManagerAnalysis;