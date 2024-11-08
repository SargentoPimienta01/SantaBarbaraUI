import React, { useState, useRef } from 'react';

const ImageDetection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const canvasRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setAnalysisResult(null);  // Limpiar resultados previos
        }
    };

    const analyzeImage = () => {
        if (!selectedImage) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const img = new Image();
        img.src = selectedImage;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            const imageData = context.getImageData(0, 0, img.width, img.height);
            const analysis = analyzeColorData(imageData);
            setAnalysisResult(analysis);
        };
    };

    const analyzeColorData = (imageData) => {
        const { data, width, height } = imageData;
        let colorAnalysis = {
            redCount: 0,
            greenCount: 0,
            blueCount: 0,
        };

        // Recorre cada píxel
        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];

            // Contabilizar color dominante
            if (red > green && red > blue) colorAnalysis.redCount++;
            else if (green > red && green > blue) colorAnalysis.greenCount++;
            else if (blue > red && blue > green) colorAnalysis.blueCount++;
        }

        return {
            dominantColor: Object.keys(colorAnalysis).reduce((a, b) =>
                colorAnalysis[a] > colorAnalysis[b] ? a : b
            ),
            ...colorAnalysis,
        };
    };

    return (
        <div className="">
            <div className="nb-bagde-container">
                <div className="nb-tri-badge">
                    <div class="badge bg-blue text-white">
                        <div class="badge-inner">
                            <p class="badge-text">Granja</p>
                        </div>
                    </div>

                    <div class="badge bg-blue text-white">
                        <div class="badge-inner">
                            <p class="badge-text">Santa</p>
                        </div>
                    </div>

                    <div class="badge bg-blue text-white">
                        <div class="badge-inner">
                            <p class="badge-text">Barbara</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="nb-title-container">
                <h1 className="nb-title">Detección de Inviabilidad</h1>
            </div>

            <div className="cuerpo-container">
                <select class="dropdown bg-blue" id="incubator-select">
                    <option value="">Seleccione la incubadora</option>
                    <option value="option1">1</option>
                    <option value="option2">2</option>
                    <option value="option3">3</option>
                    <option value="option4">4</option>
                    <option value="option5">5</option>
                    <option value="option6">6</option>
                </select>

                <div className="nb-video">
                <div className="card">
                    <video autoPlay playsInline className='nb-video-s'></video>
                </div>

                <button class="nb-button blue" id="detection-button"> Hacer Deteccion </button>
                </div>

                <input className="nb-input blue" placeholder="Maple" id="maple-input"/>
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

export default ImageDetection;
