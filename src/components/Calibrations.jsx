import React, { useState, useEffect, useRef } from 'react';

const CameraCalibration = () => {
    const [cameraAvailable, setCameraAvailable] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [deviceType, setDeviceType] = useState("computadora"); // Estado para el tipo de dispositivo
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Verifica si hay una cámara disponible y define el tipo de dispositivo
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setCameraAvailable(videoDevices.length > 0);

                // Si hay más de una cámara, asumimos que la segunda es externa
                if (videoDevices.length > 1) {
                    setDeviceType("dispositivo móvil conectado");
                } else if (videoDevices.length === 1) {
                    setDeviceType("computadora");
                }
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
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL('image/png');
        setCapturedImage(imageData);
        // Aquí puedes realizar la comparación de color con la imagen de referencia
        calibrateColor(context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    };

    const calibrateColor = (imageData) => {
        // Implementación para analizar y calibrar el color
        console.log("Iniciando calibración de color...");
        // Aquí iría el código de comparación con la referencia de color
    };

    return (
        <div className="calibration-container flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Calibración de la Cámara</h2>
            <p className="text-sm text-gray-600 mb-2">
                Calibración en curso utilizando la cámara de {deviceType}.
            </p>

            {cameraAvailable ? (
                <>
                    <video ref={videoRef} autoPlay className="rounded-lg shadow-md max-w-full h-auto" style={{ maxWidth: '500px' }}></video>
                    <button 
                        onClick={captureImage} 
                        className="capture-button mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-full shadow-md hover:from-green-600 hover:to-teal-600 transition duration-300"
                    >
                        Capturar Imagen para Calibración
                    </button>
                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    {capturedImage && (
                        <div className="captured-image mt-6">
                            <h3 className="text-lg font-semibold text-gray-700">Imagen Capturada:</h3>
                            <img src={capturedImage} alt="Imagen capturada" className="rounded-lg shadow-md mt-2 max-w-full h-auto" />
                        </div>
                    )}
                </>
            ) : (
                <p className="text-gray-600 mt-4">
                    No se detectó una cámara. Conecta una cámara externa para calibrar.
                </p>
            )}
        </div>
    );
};

export default CameraCalibration;
