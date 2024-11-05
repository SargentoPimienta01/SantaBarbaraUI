// src/components/TourGuide.jsx
import React, { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const TourGuide = () => {
    useEffect(() => {
        const tour = new Shepherd.Tour({
            defaultStepOptions: {
                classes: 'shepherd-theme-arrows',
                scrollTo: { behavior: 'smooth', block: 'center' },
                cancelIcon: {
                    enabled: true
                },
            },
        });

        // Definir los pasos del tour
        tour.addStep({
            id: 'menu',
            text: 'Este es el menú principal de la aplicación, donde puedes acceder a las diferentes secciones.',
            attachTo: { element: '#menu', on: 'bottom' },
            buttons: [
                {
                    text: 'Siguiente',
                    action: tour.next
                }
            ]
        });

        tour.addStep({
            id: 'estadisticas',
            text: 'Aquí puedes acceder directamente a las estadísticas del análisis de inviabilidad.',
            attachTo: { element: '#estadisticas', on: 'top' },
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
            id: 'links',
            text: 'Este es el menú desplegable con opciones para calibración, subir imagen, detección y estadísticas.',
            attachTo: { element: '#links', on: 'left' },
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

        // Iniciar el tour automáticamente
        tour.start();
    }, []);

    return null; // Este componente no necesita renderizar nada visible
};

export default TourGuide;
