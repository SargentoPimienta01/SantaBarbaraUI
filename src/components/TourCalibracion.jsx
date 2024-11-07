import React, { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import '../css/TourCustume.css'; 

const TourGuide = () => {
    useEffect(() => {
        const tour = new Shepherd.Tour({
            defaultStepOptions: {
                classes: 'shepherd-theme-arrows',
                scrollTo: { behavior: 'smooth', block: 'center' },
                cancelIcon: { enabled: true },
            },
            useModalOverlay: true
        });

        // Paso 1: Bienvenida
        tour.addStep({
            id: 'bienvenida',
            text: '¡Bienvenido! 😊 En esta sección, aprenderás cómo calibrar la cámara para obtener resultados precisos en el análisis de color.',
            attachTo: { element: '.nb-title', on: 'bottom' },
            buttons: [
                {
                    text: 'Siguiente',
                    action: tour.next
                }
            ]
        });

        // Paso 2: Video de Captura
        tour.addStep({
            id: 'video',
            text: 'Aquí capturamos la imagen de referencia. Asegúrate de que la cámara esté bien posicionada para una calibración precisa.',
            attachTo: { element: '.nb-video', on: 'right' },
            buttons: [
                {
                    text: 'Anterior',
                    action: tour.back
                },
                {
                    text: 'Siguiente',
                    action: tour.next
                }
            ]
        });

        // Paso 3: Imagen de Referencia
        tour.addStep({
            id: 'imagen-referencia',
            text: 'Esta es la imagen de referencia para la calibración. Idealmente, utiliza una impresión, pero una imagen en pantalla también funciona. 📸',
            attachTo: { element: '.nb-image', on: 'left' },
            buttons: [
                {
                    text: 'Anterior',
                    action: tour.back
                },
                {
                    text: 'Siguiente',
                    action: tour.next
                }
            ]
        });

        // Paso 4: Botón de Calibración
        tour.addStep({
            id: 'boton-calibracion',
            text: 'Cuando estés listo, haz clic en este botón para capturar la imagen y comenzar el proceso de calibración. ¡Buena suerte! 🌟',
            attachTo: { element: '.nb-button', on: 'bottom' },
            buttons: [
                {
                    text: 'Anterior',
                    action: tour.back
                },
                {
                    text: 'Finalizar',
                    action: tour.complete
                }
            ]
        });

        tour.start();
    }, []);

    return null;
};

export default TourGuide;
