import React,{useState,useEffect,useRef} from "react";
import './ImageEditor.css';
const ReactCrop = require('react-image-crop');
function ImageEditor(){
    const [image,setImage] = useState(null);
    const [crop,setCrop] = useState({aspect:1/1});
    const [completedCrop,setCompletedCrop] = useState(null);
    const [croppedImage,setCroppedImage] = useState(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    useEffect(()=>{
        if(!completedCrop || !previewCanvasRef.current || !imgRef.current){
            return;
        }
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;
        const scaleX = image.naturalWidth/image.width;
        const scaleY = image.naturalHeight/image.height;
        const ctx = canvas.getContext('2d');
        canvas.width = crop.width;
        canvas.height = crop.height;
        ctx.drawImage(
            image,
            crop.x*scaleX,
            crop.y*scaleY,
            crop.width*scaleX,
            crop.height*scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
    },[completedCrop]);
    function onSelectFile(event){
        if(event.target.files && event.target.files.length > 0){
            const reader = new FileReader();
            reader.addEventListener('load',()=>{
                setImage(reader.result);
            });
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    function onImageLoaded(image){
        imgRef.current = image;
    }
    function onCropComplete(crop){
        setCompletedCrop(crop);
    }
    function showCroppedImage(){
        console.log("Cropped Image: ", croppedImage);
        // Display the cropped image in a modal
        // Use the Modal component from react-modal library
    }
    return(
        <div className="image-editor">
            <input type="file" accept="image/*" onChange={onSelectFile}/>
            {image && (
                <React.Fragment>
                    <div className="crop-container">

                        <ReactCrop
                            src={image}
                            onImageLoaded={onImageLoaded}
                            crop={crop}
                            onChange={setCrop}
                            onComplete={onCropComplete}
                        />
                    </div>
                    <div className="preview-container">
                        <canvas ref={previewCanvasRef}/>
                        <button onClick={showCroppedImage}>Show Cropped Image</button>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}
export default ImageEditor;