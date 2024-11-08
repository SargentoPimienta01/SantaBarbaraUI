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
            useModalOverlay: true,
        });

        tour.addStep({
            id: 'welcome',
            text: '¡Bienvenido! Este es el componente de carga y previsualización de imágenes.',
            attachTo: { element: '#image-upload-container', on: 'top' },
            buttons: [{ text: 'Siguiente', action: tour.next }],
        });

        tour.addStep({
            id: 'incubator-select',
            text: 'Aquí puedes seleccionar la incubadora.',
            attachTo: { element: '#incubator-select', on: 'right' },
            buttons: [
                { text: 'Anterior', action: tour.back },
                { text: 'Siguiente', action: tour.next },
            ],
        });

        tour.addStep({
            id: 'maple-input',
            text: 'Este es el campo para ingresar el nombre del maple.',
            attachTo: { element: '#maple-input', on: 'right' },
            buttons: [
                { text: 'Anterior', action: tour.back },
                { text: 'Siguiente', action: tour.next },
            ],
        });

        tour.addStep({
            id: 'upload-area',
            text: 'Aquí puedes arrastrar y soltar una imagen o seleccionar una desde tu dispositivo.',
            attachTo: { element: '#upload-area', on: 'top' },
            buttons: [
                { text: 'Anterior', action: tour.back },
                { text: 'Siguiente', action: tour.next },
            ],
        });

        tour.addStep({
            id: 'file-upload',
            text: 'También puedes hacer clic en este botón para elegir una imagen desde tu dispositivo.',
            attachTo: { element: '#file-upload', on: 'top' },
            buttons: [
                { text: 'Anterior', action: tour.back },
                { text: 'Siguiente', action: tour.next },
            ],
        });

        tour.addStep({
            id: 'detection-button',
            text: 'Finalmente, presiona este botón para hacer la detección en la imagen cargada.',
            attachTo: { element: '#detection-button', on: 'top' },
            buttons: [
                { text: 'Anterior', action: tour.back },
                { text: 'Finalizar', action: tour.complete },
            ],
        });

        tour.start();
    }, []);

    return null;
};

export default TourGuide;
