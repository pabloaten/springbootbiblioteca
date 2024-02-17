import axios from 'axios';

export const eliminarCategoria = (id, categorias, setCategorias, setVisibleFichaCategoria, toast) => {
    axios.delete(`http://localhost:8080/biblioteca/categorias/${id}`)
        .then(response => {
            const nuevasCategorias = categorias.filter(cat => cat.id !== id);
            setCategorias(nuevasCategorias);
            setVisibleFichaCategoria(false);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Categoría eliminada correctamente', life: 3000 });
        })
        .catch(error => {
            console.error("Error al eliminar categoría:", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar la categoría', life: 3000 });
        });
};

export const actualizarCategoria = (categoriaInput, categorias, setCategorias, setVisibleFichaCategoria, toast) => {
    axios.put(`http://localhost:8080/biblioteca/categorias/${categoriaInput.id}`, categoriaInput)
        .then(response => {
            const nuevasCategorias = categorias.map(cat => {
                if (cat.id === categoriaInput.id) {
                    return categoriaInput;
                }
                return cat;
            });
            setCategorias(nuevasCategorias);
            setVisibleFichaCategoria(false);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Categoría actualizada correctamente', life: 3000 });
        })
        .catch(error => {
            console.error("Error al actualizar categoría:", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la categoría', life: 3000 });
        });
};
export const guardarCategoria = (categoriaInput, categorias, setCategorias, setvisibleFichaCategoria, toast, actualizarCategoria) => {
    const nuevasCategorias = categorias.map(cat => {
        if (cat.id === categoriaInput.id) {
            return categoriaInput;
        }
        return cat;
    });

    setCategorias(nuevasCategorias);
    setvisibleFichaCategoria(false);
    actualizarCategoria(categoriaInput, categorias, setCategorias, setvisibleFichaCategoria, toast);
};

export const crearCategoria = (nombreCategoria, setCategorias, setVisibleCrear, toast, setNombreCategoria, categorias) => {
    axios.post("http://localhost:8080/biblioteca/categorias", { categoria: nombreCategoria })
        .then(response => {
            setCategorias([...categorias, response.data]);
            setVisibleCrear(false);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Categoría creada correctamente', life: 3000 });

            setNombreCategoria(""); // Asegúrate de que setNombreCategoria esté definido y limpie el valor después de la creación
        })
        .catch(error => {
            console.error("Error al crear categoría:", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al crear la categoría', life: 3000 });
        });
};



