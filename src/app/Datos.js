import axios from "axios";

export const obtenerDatos = () => {
    // Obtener categorías de la API
    axios.get("http://localhost:8080/biblioteca/categorias")
        .then(response => {
            setCategorias(response.data);
        })
        .catch(error => {
            console.error("Error al obtener categorías:", error);
        });

    axios.get("http://localhost:8080/biblioteca/prestamos")
        .then(response => {
            setPrestamos(response.data);
            console.log(prestamos);
        })
        .catch(error => {
            console.error("Error al obtener prestamos:", error);
        });

    // Obtener libros de la API
    axios.get("http://localhost:8080/biblioteca/libros")
        .then(response => {
            setLibros(response.data);
        })
        .catch(error => {
            console.error("Error al obtener libros:", error);
        });

    // Función para obtener la lista de usuarios desde la API
    axios.get("http://localhost:8080/biblioteca/usuarios")
        .then(response => {
            // Al recibir la respuesta exitosa, actualiza el estado de los usuarios
            setUsuarios(response.data);
        })
        .catch(error => {
            // En caso de error, muestra un mensaje en la consola
            console.error("Error al obtener usuarios:", error);
            // Aquí podrías manejar el error de alguna manera, como mostrar un mensaje al usuario
        });
};
