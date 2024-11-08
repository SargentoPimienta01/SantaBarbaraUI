import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TourGuide from './TourUpload';

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
        <div className="image-upload-container" id="image-upload-container">
            <TourGuide />
            <div className="marquee bg-white">
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
                <div div className="nb-datos">
                    <select className="dropdown" id="incubator-select">
                        <option value="">Seleccione la incubadora</option>
                        <option value="option1">1</option>
                        <option value="option2">2</option>
                        <option value="option3">3</option>
                        <option value="option4">4</option>
                        <option value="option5">5</option>
                        <option value="option6">6</option>
                    </select>
                    <input className="nb-input default" placeholder="Maple" id="maple-input"/>
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
                                    src={selectedImage}
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
                <p className="nb-texto">Cuando subes una imagen de los huevos, estás iniciando un proceso avanzado que utiliza inteligencia artificial para evaluar su viabilidad. La tecnología detrás de este análisis combina dos redes neuronales diseñadas específicamente para interpretar los datos visuales de manera precisa y confiable.
                Primero, la imagen pasa por una red neuronal convolucional encargada de preprocesar y segmentar cada huevo en la imagen. Esta etapa asegura que cada huevo sea detectado individualmente, independientemente de su posición o agrupación, y que los datos visuales relevantes se aíslen para un análisis efectivo.
                A continuación, la imagen procesada pasa a una segunda red neuronal, especializada en analizar la colorimetría y otros factores visuales de cada huevo. Esta red está entrenada para reconocer patrones específicos en la variante de huevo Cobb 500, que es conocida por sus características de alta eficiencia en la industria avícola. La Cobb 500 
                es una variedad que, con un manejo adecuado, tiende a tener tasas elevadas de fertilidad y crecimiento, pero también puede presentar ciertos desafíos de viabilidad que es crucial identificar a tiempo para asegurar la calidad en la incubación.
                Al completar este proceso, el sistema genera un análisis que muestra el porcentaje de inviabilidad de cada huevo basado en su color, textura, y otros factores internos detectados en la imagen. Este resultado te permite tomar decisiones informadas y proactivas sobre el manejo de los huevos y su potencial para incubación.</p>
            </div>
            
            <div className="nb-deteccion">
                <button className="nb-button default" id="detection-button"> Hacer Deteccion </button>
            </div>

        </div>
    );
};

export default ImageUploader;