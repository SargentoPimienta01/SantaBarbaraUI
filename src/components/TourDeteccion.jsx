import React, { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const ImageDetectionTour = () => {
    useEffect(() => {
        const tour = new Shepherd.Tour({
            defaultStepOptions: {
                classes: 'shepherd-theme-arrows',
                scrollTo: { behavior: 'smooth', block: 'center' },
                cancelIcon: {
                    enabled: true
                },
            },
            useModalOverlay: true
        });

        tour.addStep({
            id: 'bienvenida',
            text: '¡Bienvenido al componente de detección de inviabilidad! Aquí puedes analizar imágenes de huevos para detectar su viabilidad.',
            attachTo: { element: '.nb-title-container', on: 'bottom' },
            buttons: [
                {
                    text: 'Siguiente',
                    action: tour.next
                }
            ]
        });

        tour.addStep({
            id: 'incubadora',
            text: 'Selecciona la incubadora que estás utilizando para este análisis.',
            attachTo: { element: '#incubator-select', on: 'bottom' },
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

        tour.addStep({
            id: 'maple',
            text: 'Escribe el nombre del maple en el campo de texto para identificar los datos.',
            attachTo: { element: '#maple-input', on: 'bottom' },
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

        tour.addStep({
            id: 'video',
            text: 'Aquí se mostrará la transmisión en vivo de la cámara para la detección en tiempo real.',
            attachTo: { element: '.nb-video', on: 'top' },
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

        tour.addStep({
            id: 'detection-button',
            text: 'Haz clic en este botón para iniciar el análisis de inviabilidad de los huevos.',
            attachTo: { element: '#detection-button', on: 'top' },
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

        tour.addStep({
            id: 'maple-grid',
            text: 'Este es el mapa del maple donde se mostrarán los huevos. Cada huevo puede ser marcado en función de los resultados del análisis.',
            attachTo: { element: '.maple-grid-container', on: 'top' },
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

        tour.addStep({
            id: 'despedida',
            text: '¡Eso es todo! Ahora estás listo para empezar a usar el componente de detección de inviabilidad.',
            attachTo: { element: '.nb-title-container', on: 'top' },
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

export default ImageDetectionTour;
