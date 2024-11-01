// src/components/ImageUploader.jsx
import React, { useState } from 'react';

const ImageUploader = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    return (
        <div className="flex justify-center items-center flex-col gap-4 w-full max-w-md mx-auto p-6 border-2 border-dashed border-gray-400 rounded-lg transition-colors duration-300 ease-in-out hover:border-blue-500">
            <div
                className={`upload-area w-full p-6 text-center rounded-lg transition ${
                    isDragging ? 'bg-blue-100 border-blue-500' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {!selectedImage ? (
                    <>
                        <p className="text-gray-700">Arrastra y suelta una imagen aquí o</p>
                        <label
                            htmlFor="file-upload"
                            className="mt-2 inline-block bg-blue-600 text-white py-2 px-4 rounded cursor-pointer transition hover:bg-blue-700"
                        >
                            Selecciona una imagen
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </>
                ) : (
                    <div className="preview flex flex-col items-center">
                        <img
                            src={selectedImage}
                            alt="Vista previa de la imagen cargada"
                            className="mt-4 w-full h-auto rounded-lg"
                        />
                        <button
                            onClick={handleRemoveImage}
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
