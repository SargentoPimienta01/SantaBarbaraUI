import React, { useState, useEffect, useRef } from 'react';

const CameraCalibration = () => {
    const [cameraAvailable, setCameraAvailable] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Verifica si hay una cámara disponible
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setCameraAvailable(videoDevices.length > 0);
            })
            .catch(error => console.error("Error al verificar dispositivos:", error));
    }, []);

    // Inicia la cámara si está disponible
    useEffect(() => {
        if (cameraAvailable) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                })
                .catch(error => console.error("Error al acceder a la cámara:", error));
        }
    }, [cameraAvailable]);

    const captureImage = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL('image/png');
        setCapturedImage(imageData);
        // Aquí puedes realizar la comparación de color con la imagen de referencia
        calibrateColor(context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    };

    const calibrateColor = (imageData) => {
        // Implementación para analizar y calibrar el color
        // Toma la imagen capturada y compara los colores del círculo de referencia
        console.log("Iniciando calibración de color...");
        // Aquí iría el código de comparación con la referencia de color
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Calibración de la Cámara</h2>
            {cameraAvailable ? (
                <>
                    <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '400px' }}></video>
                    <button onClick={captureImage} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#29b546', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}>
                        Capturar Imagen para Calibración
                    </button>
                    <canvas ref={canvasRef} width="400" height="300" style={{ display: 'none' }}></canvas>
                    {capturedImage && <img src={capturedImage} alt="Imagen capturada" style={{ marginTop: '10px', maxWidth: '100%' }} />}
                </>
            ) : (
                <p>No se detectó una cámara. Conecta una cámara externa para calibrar.</p>
            )}
        </div>
    );
};

export default CameraCalibration;
