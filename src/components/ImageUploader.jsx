// components/ImageUploader.js
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showEditIcon, setShowEditIcon] = useState(false);

    const handleDrop = (acceptedFiles) => {
        const imageFile = acceptedFiles[0];
        setSelectedImage(imageFile);
    };

    const handleRemoveImage = (e) => {
        // Prevent the click event from propagating to the parent div
        e.stopPropagation();
        setSelectedImage(null);
    };

    return (
        <div className="image-uploader">
            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        className={`dropzone ${
                            selectedImage ? "has-image" : ""
                        }`}
                        onMouseEnter={() => setShowEditIcon(true)}
                        onMouseLeave={() => setShowEditIcon(false)}
                    >
                        <input {...getInputProps()} />
                        {selectedImage ? (
                            <>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Uploaded"
                                    style={{
                                        maxWidth: "300px",
                                        maxHeight: "300px",
                                    }}
                                />
                                {showEditIcon && (
                                    <div className="edit-overlay">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </div>
                                )}
                                <button
                                    className="btn remove-button"
                                    onClick={handleRemoveImage}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </>
                        ) : (
                            <p>
                                Drag and drop an image here or click to select
                                one.
                            </p>
                        )}
                    </div>
                )}
            </Dropzone>
        </div>
    );
};

export default ImageUploader;
