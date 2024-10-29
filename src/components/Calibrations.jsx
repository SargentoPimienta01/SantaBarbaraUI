// src/components/CameraCalibration.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';

function CameraCalibration() {
    const [image, setImage] = useState(null);
    const [calibratedImage, setCalibratedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleCapture = async () => {
        // Acceder a la cámara
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Capturar un frame de la cámara
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setImage(imageUrl);

        // Detener la transmisión de la cámara
        stream.getTracks().forEach(track => track.stop());
    };

    const handleCalibration = () => {
        if (!image) return;

        // Cargar la imagen en un contexto de canvas para procesarla
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const img = new Image();
        img.src = image;

        img.onload = () => {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Ejemplo de ajuste básico de color: brillo y contraste
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = data[i] * 1.1; // Ajuste de brillo en canal rojo
                data[i + 1] = data[i + 1] * 1.05; // Ajuste de brillo en canal verde
                data[i + 2] = data[i + 2] * 1.05; // Ajuste de brillo en canal azul
            }

            context.putImageData(imageData, 0, 0);
            const calibratedImageUrl = canvas.toDataURL('image/jpeg');
            setCalibratedImage(calibratedImageUrl);
        };
    };

    const handleUpload = async () => {
        if (!calibratedImage) return;

        // Convertir el Data URL en un archivo blob para enviar
        const blob = await fetch(calibratedImage).then(res => res.blob());
        const formData = new FormData();
        formData.append('file', blob, 'calibrated_image.jpg');

        try {
            const response = await axios.post('/upload-image/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Respuesta de la API:', response.data);
        } catch (error) {
            console.error('Error al enviar la imagen:', error);
        }
    };

    return (
        <div>
            <h1>Captura y Calibración de Imagen</h1>
            <video ref={videoRef} style={{ display: 'none' }}></video>
            <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }}></canvas>
            <button onClick={handleCapture}>Capturar Imagen</button>
            {image && (
                <>
                    <h3>Imagen Capturada</h3>
                    <img src={image} alt="Imagen Capturada" width="200" />
                    <button onClick={handleCalibration}>Calibrar Imagen</button>
                </>
            )}
            {calibratedImage && (
                <>
                    <h3>Imagen Calibrada</h3>
                    <img src={calibratedImage} alt="Imagen Calibrada" width="200" />
                    <button onClick={handleUpload}>Enviar a la API</button>
                </>
            )}
        </div>
    );
}

export default CameraCalibration;
