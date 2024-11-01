// src/components/ImageDetection.jsx
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
        <div className="detection-module flex flex-col items-center gap-4 p-6 border rounded-lg">
            <h2 className="text-2xl font-bold">Detección de Imagen</h2>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input mt-4"
            />
            
            {selectedImage && (
                <>
                    <img src={selectedImage} alt="Imagen seleccionada" className="w-full h-auto rounded mt-4" />
                    <button onClick={analyzeImage} className="analyze-button bg-blue-600 text-white py-2 px-4 rounded mt-4">
                        Analizar Imagen
                    </button>
                </>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {analysisResult && (
                <div className="result mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="text-xl">Resultados del Análisis</h3>
                    <p>Color Dominante: {analysisResult.dominantColor}</p>
                    <p>Rojos: {analysisResult.redCount}</p>
                    <p>Verdes: {analysisResult.greenCount}</p>
                    <p>Azules: {analysisResult.blueCount}</p>
                </div>
            )}
        </div>
    );
};

export default ImageDetection;
