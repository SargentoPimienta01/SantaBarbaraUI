import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TourGuide from './TourUpload';

const ImageUploader = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [mapleData, setMapleData] = useState(null);
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

    const uploadImageToApi = async () => {
        const idIncubadora = document.getElementById("incubator-select").value;
        const mapleSerial = document.getElementById("maple-input").value;

        if (!selectedImage) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, seleccione una imagen antes de iniciar la detección.',
                icon: 'error',
            });
            return;
        }
        
        if (!idIncubadora || !mapleSerial) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, complete los campos de incubadora y serie del maple antes de continuar.',
                icon: 'error',
            });
            return;
        }

        const formData = new FormData();
        formData.append("id_incubadora", idIncubadora); // ID de la incubadora
        formData.append("serial_maple", mapleSerial); // Serie del maple
        formData.append("file", selectedImage); // Archivo de imagen

        // Para depuración: verificar el contenido de formData
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/maple/procesar", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                setMapleData(data);
                Swal.fire({
                    title: 'Análisis Completo',
                    text: 'El análisis de los huevos ha sido completado con éxito.',
                    icon: 'success',
                });
            } else {
                throw new Error('Error al procesar la imagen');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
            });
        }
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
            setSelectedImage(file);
            showAlert();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            showAlert();
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setMapleData(null);
    };

    return (
        <div className="image-upload-container" id="image-upload-container">
            <TourGuide />
            <div className="marquee bg-white h-24 content-center">
                <div className="marquee-content">
                    <span>Coman</span>
                    <span>Mas</span>
                    <span>Pollo</span>
                    <span></span>
                    <span>-</span>
                    <span></span>
                    <span>Coman</span>
                    <span>Menos</span>
                    <span>Pollo</span>
                </div>
            </div>
            <div className="nb-header">
                <h1 className="nb-title" id="upload-title">Carga y Previsualización de Imágenes</h1>
                <div className="nb-datos">
                    <select className="dropdown" id="incubator-select">
                        <option value="">Seleccione la incubadora</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <input className="nb-input default" placeholder="Maple" id="maple-input" />
                </div>
            </div>

            <div className="nb-carga">
                <div id="upload-area" className="relative flex justify-center items-center flex-col gap-4 w-full max-w-md mx-auto p-6 border-2 border-dashed border-gray-400 rounded-lg transition-colors duration-300 ease-in-out hover:border-blue-500 bg-white shadow-md">
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
                                <label
                                    htmlFor="file-upload"
                                    className="nb-button blue"
                                    id="file-upload"
                                >
                                    Selecciona una imagen
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </>
                        ) : (
                            <div className="preview flex flex-col items-center">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Vista previa de la imagen cargada"
                                    className="nb-image-preview"
                                />
                                <button
                                    onClick={handleRemoveImage}
                                    className="nb-button orange"
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <p className="nb-texto">
                    Cuando subes una imagen de los huevos, estás iniciando un proceso avanzado que utiliza inteligencia artificial para evaluar su viabilidad...
                </p>
            </div>

            <div className="nb-deteccion">
                <button onClick={uploadImageToApi} className="nb-button default" id="detection-button">Hacer Deteccion</button>
            </div>

            <div className="maple-grid-container">
                <h2>Maple de Huevos (10 x 15)</h2>
                <div className="maple-grid">
                    {Array.from({ length: 150 }).map((_, index) => (
                        <div key={index} className="egg-slot"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;