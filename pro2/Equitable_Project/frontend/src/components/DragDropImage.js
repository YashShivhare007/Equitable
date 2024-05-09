import React, { useState, useRef } from 'react';
// import Cropper from 'react-easy-crop';
// import { getCroppedImg } from './cropImage'; // Utility function to perform the actual cropping
import './DragDropImage.css';
import { Carousel } from './Carousel';
function DragDropImage() {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadClicked, setUploadClicked] = useState(false);
    const fileInputRef = useRef(null);

    function selectFiles() {
        fileInputRef.current.click();
    }

    function onFileSelect(event) {
        const files = event.target.files;
        console.log("files on selecting: ", files);
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            console.log("files[i]: ", files[i].type);
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                const url = URL.createObjectURL(files[i]);
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: url,
                        file: files[i],
                        type: files[i].type,
                    },
                ]);
            };
        }
    }
    function deleteAllImages() {
        setImages([]);
    }    
    function deleteImage(index) {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = 'copy';
    }

    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }

    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        console.log("files on dropping: ", files)
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                const url = URL.createObjectURL(files[i]);
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: url,
                        file: files[i],
                        type: files[i].type,
                    },
                ]);
            };
        }
    }

    function handleUpload() {
        console.log("images: ", images);
        setUploadClicked(true);
    }

    return (
        <div>
            <div className="card">
                <div className="top">
                    <p>Drag and Drop the Images to Upload</p>
                </div>
                <div
                    className="drag-area"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    {isDragging ? (
                        <span className="select">Drop Here</span>
                    ) : (
                        <>
                            Drag and Drop Image Here or{' '}
                            <span className="select" role="button" onClick={selectFiles}>
                                Browse
                            </span>
                        </>
                    )}
                    <input
                        name="file"
                        type="file"
                        className="file"
                        multiple
                        ref={fileInputRef}
                        onChange={onFileSelect}
                    />
                </div>

                <div className="container">
                    {images.map((image, index) => (
                        <div className="image" key={index}>
                            <span className="Delete" onClick={() => deleteImage(index)}>
                                &times;
                            </span>
                            <img src={image.url} alt={image.name} />
                        </div>
                    ))}
                </div>

                <button type="button" onClick={handleUpload} className='hover:border border-2 ' style={{ textAlign: 'center', display: 'block', margin: 'auto', width:"100px" }}>
                    Upload
                </button>

                {uploadClicked && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh',padding:'10vh' }}>
                        <Carousel data={images} onDeleteAll={deleteAllImages} onResetUpload={() => setUploadClicked(false)} />
                    </div>
                )}
            </div>
        </div>
    );
}
export default DragDropImage;
