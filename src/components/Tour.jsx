// src/components/TourGuide.jsx
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
                cancelIcon: {
                    enabled: true
                },
            },
            useModalOverlay: true // Aplica un fondo oscuro para destacar el enfoque
        });

        tour.addStep({
            id: 'menu',
            text: '¡Bienvenido! 😊 Este es el menú principal de nuestra aplicación. Aquí puedes navegar por las distintas secciones y acceder a las funciones clave. Haz clic y explora a tu ritmo; ¡es fácil y está todo a tu alcance!',
            attachTo: { element: '#menu', on: 'bottom' },
            offset: 20,
            buttons: [
                {
                    text: 'Siguiente',
                    action: tour.next
                }
            ]
        });

        tour.addStep({
            id: 'estadisticas',
            text: '¿Interesado en las estadísticas? 📊 Con un solo clic en el botón de "Estadísticas", podrás ver datos importantes sobre el análisis de inviabilidad. Es rápido y práctico para que siempre tengas la información a mano.',
            attachTo: { element: '#estadisticas', on: 'top' },
            offset: 20,
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
            id: 'hamburger',
            text: 'Este es el menú desplegable 🗂️, donde podrás acceder a opciones útiles como "Calibración", "Subir Imagen" y "Detección". Navega sin problemas y explora todas las herramientas que hemos creado para optimizar tu experiencia.',
            attachTo: { element: '#hamburger', on: 'left' },
            offset: 20,
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
            id: 'inicio',
            text: 'Esta es la opción de "Inicio". Desde aquí puedes volver al punto de partida y acceder a información general de la aplicación. ¡Es un buen lugar para comenzar o regresar si te pierdes!',
            attachTo: { element: '#links li a[href="/"]', on: 'left' },
            offset: 20,
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
            id: 'calibracion',
            text: 'La opción "Calibración" te permite ajustar el sistema para obtener los mejores resultados en el análisis de las imágenes. ¡Perfecto para una detección precisa!',
            attachTo: { element: '#links a[href="/calibracion"]', on: 'right' },
            offset: 20,
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
            id: 'subir-imagen',
            text: 'Con "Subir Imagen", puedes cargar las imágenes de los huevos para el análisis. Nuestro sistema procesará la imagen para detectar la viabilidad de forma rápida y eficiente.',
            attachTo: { element: '#links a[href="/upload"]', on: 'right' },
            offset: 20,
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
            id: 'deteccion',
            text: 'La opción "Detección" realiza un análisis detallado de la imagen subida para identificar posibles signos de inviabilidad en los huevos. ¡Aquí es donde ocurre la magia del análisis!',
            attachTo: { element: '#links a[href="/deteccion"]', on: 'right' },
            offset: 20,
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
            id: 'estadisticas-menu',
            text: 'Aquí puedes acceder directamente a las "Estadísticas" desde el menú desplegable, brindándote una visión general de los resultados del análisis. ¡Consulta los datos cuando quieras!',
            attachTo: { element: '#links a[href="#"]', on: 'right' },
            offset: 20,
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
            id: 'final',
            text: '¡Eso es todo! 🎉 Ya conoces todas las secciones de nuestro menú. Ahora es tu turno de explorar y aprovechar al máximo todas las herramientas disponibles. ¡Diviértete descubriendo!',
            attachTo: { element: '#menu', on: 'bottom' },
            offset: 20,
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
