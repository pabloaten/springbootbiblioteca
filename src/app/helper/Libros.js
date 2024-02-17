import axios from "axios";

export const eliminarLibro = (id, libros, setLibros, setVisibleFichaLibro, toast) => {
    axios.delete(`http://localhost:8080/biblioteca/libros/${id}`)
        .then(response => {
            const nuevosLibros = libros.filter(libro => libro.id !== id);
            setLibros(nuevosLibros);
            setVisibleFichaLibro(false);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Libro eliminado correctamente', life: 3000 });
        })
        .catch(error => {
            console.error("Error al eliminar libro:", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el libro', life: 3000 });
        });
};
export const actualizarLibro = (id, nuevoLibro, libros, setLibros, toast) => {
    // Realizar la solicitud PUT para actualizar el libro por su ID
  
    axios.put(`http://localhost:8080/biblioteca/libros/${id}`, nuevoLibro)
        .then(() => {
            // Actualizar el estado de los libros con el nuevo libro
            const librosActualizados = libros.map(libro => {
                if (libro.id === id) {
                    return { ...nuevoLibro, id: libro.id }; // Sustituir el libro existente con el nuevoLibro
                }
                return libro;
            });
            
            setLibros(librosActualizados);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Libro actualizado correctamente', life: 3000 });
        })
        .catch(error => {
            console.error("Error al actualizar libro:", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el libro', life: 3000 });
        });
};

export const guardarNuevoLibro = (libroInput, categorias, categoriaSeleccionadaLibro, libros, setLibros, setVisibleCrearLibro, toast, setLibroInput, setCategoriaSeleccionadaLibro) => {
    const nuevoLibroConCategoria = { ...libroInput, categoria: categorias.find(cat => cat.id === categoriaSeleccionadaLibro) };
    axios.post("http://localhost:8080/biblioteca/libros", nuevoLibroConCategoria)
        .then(response => {
            setLibros([...libros, response.data]);
            setVisibleCrearLibro(false);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Libro creado correctamente', life: 3000 });
            setLibroInput({
                id: '',
                nombre: '',
                autor: '',
                editorial: '',
                categoria: {}
            });
            setCategoriaSeleccionadaLibro("");
        })
        .catch(error => {
            console.error("Error al crear libro:", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al crear el libro', life: 3000 });
        });
};

