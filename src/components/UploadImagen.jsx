// src/components/ImageUploader.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ImageUploader = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const MySwal = withReactContent(Swal);

    const showAlert = () => {
        MySwal.fire({
            title: 'Advertencia de Fiabilidad',
            text: 'Nota: Puede haber una mayor probabilidad de error en la detección. Para una mejor fiabilidad, use la opción de detección directa.',
            icon: 'warning',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6',
            background: '#fff',
            color: '#333',
        });
    };

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
            showAlert();  // Mostrar la alerta
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            showAlert();  // Mostrar la alerta
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    return (
        <div className="relative flex justify-center items-center flex-col gap-4 w-full max-w-md mx-auto p-6 border-2 border-dashed border-gray-400 rounded-lg transition-colors duration-300 ease-in-out hover:border-blue-500 bg-white shadow-md">
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
                        <p className="text-gray-700 font-medium">Arrastra y suelta una imagen aquí o</p>
                        <label
                            htmlFor="file-upload"
                            className="mt-2 inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded cursor-pointer shadow-lg transition hover:from-blue-700 hover:to-blue-600"
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
                            className="mt-4 w-full h-auto rounded-lg shadow-lg border"
                        />
                        <button
                            onClick={handleRemoveImage}
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 shadow-lg transition-colors duration-200"
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