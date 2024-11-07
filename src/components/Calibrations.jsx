import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import TourGuide from './TourCalibracion';

const CalibracionComponente = () => {
  const [diferenciaColor, setDiferenciaColor] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const referenciaImgRef = useRef(null);

  useEffect(() => {
    iniciarCamara();
  }, []);

  const iniciarCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError(null);
    } catch (err) {
      console.error("Error al iniciar la cámara:", err);
      setError("No se pudo iniciar la cámara. Verifica los permisos.");
    }
  };

  const capturarImagen = () => {
    if (videoRef.current && canvasRef.current) {
      setCargando(true);
      setProgreso(25);

      const canvas = canvasRef.current;
      const video = videoRef.current;

      // Ajusta el tamaño del canvas al tamaño del video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setProgreso(50);

      // Realizar análisis de color promedio con TensorFlow.js
      analizarColorConTensorFlow(canvas);
    }
  };

  const analizarColorConTensorFlow = async (canvas) => {
    try {
      const colorPromedio = await obtenerColorPromedioConTensorFlow(canvas);
      console.log("Color promedio detectado en TensorFlow:", colorPromedio);

      // Calcula la diferencia con el círculo cromático de referencia
      const referenciaColor = obtenerColorPromedio(referenciaImgRef.current);
      const diferencia = calcularDiferenciaColor(referenciaColor, colorPromedio);
      setDiferenciaColor(diferencia ? diferencia.toFixed(2) : 'Sin resultado');
      setProgreso(100);
    } catch (error) {
      console.error("Error en el análisis de color con TensorFlow:", error);
      setError("Error en el análisis de color.");
    } finally {
      setCargando(false);
    }
  };

  const obtenerColorPromedioConTensorFlow = async (canvas) => {
    // Convertimos el canvas a un tensor
    const tensor = tf.browser.fromPixels(canvas);
    const resizedTensor = tf.image.resizeBilinear(tensor, [100, 100]); // Redimensiona para reducir carga
    const meanTensor = resizedTensor.mean([0, 1]); // Calcula el promedio en los canales RGB

    const [r, g, b] = await meanTensor.data(); // Extrae los valores RGB promedio
    tensor.dispose();
    resizedTensor.dispose();
    meanTensor.dispose();

    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  };

  const obtenerColorPromedio = (elemento) => {
    const ctx = elemento.getContext('2d');
    const data = ctx.getImageData(0, 0, elemento.width, elemento.height).data;
    let r = 0, g = 0, b = 0;
    const step = 32; // Procesar un subconjunto de píxeles para mejorar el rendimiento
    const length = data.length;

    for (let i = 0; i < length; i += step * 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    const numPixels = length / (step * 4);
    return {
      r: Math.round(r / numPixels),
      g: Math.round(g / numPixels),
      b: Math.round(b / numPixels)
    };
  };

  const calcularDiferenciaColor = (color1, color2) => {
    if (!color1 || !color2) return NaN;
    return Math.abs(color1.r - color2.r) + Math.abs(color1.g - color2.g) + Math.abs(color1.b - color2.b);
  };

  return (
    <div className='app-container'>
        <TourGuide />
        <div className="nb-introduction">
            <h1 className="nb-title">Componente de Calibración de Imagen</h1>
        </div>
        <div className="nb-container">
            <p className="nb-description">La calibración de la cámara es esencial para garantizar la precisión y la fiabilidad en los resultados que obtienes. 
            Sin una calibración adecuada, los colores y detalles capturados pueden variar, lo que afecta la calidad y la exactitud de tus análisis.
            </p>
            <div className="nb-calibracion">
                <div className="nb-flex">
                    <div className="card">
                        <video ref={videoRef} autoPlay playsInline className="nb-video"></video>
                    </div>
                    <div className="card">
                        <img
                        ref={referenciaImgRef}
                        src="/images/circulo.webp"
                        alt="Círculo Cromático"
                        className="nb-image"
                        />
                    </div>
                </div>

                <button
                    onClick={capturarImagen}
                    className={`nb-button orange ${cargando ? 'disabled' : ''}`}
                    disabled={cargando}
                >
                    {cargando ? 'Capturando...' : 'Calibrar Camara'}
                </button>

                {/* Barra de Progreso */}
                {cargando && (
                    <div className="nb-progress-bar">
                    <div className="nb-progress" style={{ width: `${progreso}%` }}>
                        {progreso}%
                    </div>
                    </div>
                )}

                {diferenciaColor && (
                    <p className="nb-result">
                    Diferencia de color promedio: {diferenciaColor}
                    </p>
                )}

                {error && (
                    <p className="nb-error">
                    {error}
                    </p>
                )}
            </div>
        </div>
    </div>
  );
};

export default CalibracionComponente;
