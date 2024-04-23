// Import necessary packages and components
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Define your functional component
const BookImageUpload = () => {
    // Define state variables
    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 3 / 4 });

    // Handle image selection from file input
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle saving the cropped image
    const handleSaveCrop = () => {
        // Perform any necessary actions with the cropped image
        alert('Cropped image saved successfully!');
    };

    // Return the JSX for rendering the component
    return (
        <div>
            {/* File input for selecting an image */}
            <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                required
            />

            {/* Render ReactCrop component if image is selected */}
            {selectedImage && (
                <div>
                    <h2>Crop Image</h2>
                    <ReactCrop src={selectedImage} crop={crop} onChange={setCrop} />
                    <button onClick={handleSaveCrop}>Save Cropped Image</button>
                </div>
            )}
        </div>
    );
};

// Export the component for use elsewhere
export default BookImageUpload;
