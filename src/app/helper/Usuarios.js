import axios from 'axios';

export const eliminarUsuario = (id, usuarios, setUsuarios, toast) => {
    // Realizar la solicitud DELETE para eliminar el usuario por su ID
    axios.delete(`http://localhost:8080/biblioteca/usuarios/delete/${id}`)
        .then(response => {
            // Filtrar los usuarios para eliminar el usuario con el ID especificado
            const nuevosUsuarios = usuarios.filter(usuario => usuario.id !== id);
            // Actualizar el estado de los usuarios con la nueva lista sin el usuario eliminado
            setUsuarios(nuevosUsuarios);
            // Mostrar un mensaje de éxito
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado correctamente', life: 3000 });
        })
        .catch(error => {
            // Manejar el error en caso de fallo en la solicitud DELETE
            console.error("Error al eliminar usuario:", error);
            // Mostrar un mensaje de error
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el usuario', life: 3000 });
        });
};
export const crearUsuario = (usuarioInput, usuarios, setUsuarios, setUsuarioInput,setVisibleCrearUsuario, toast) => {
    // Realizar una solicitud POST para crear un nuevo usuario
    axios.post("http://localhost:8080/biblioteca/usuarios", usuarioInput)
        .then(response => {
            // Agregar el nuevo usuario a la lista de usuarios
            setUsuarios([...usuarios, response.data]);
            // Ocultar el diálogo de creación de usuarios
            setVisibleCrearUsuario(false);
            // Mostrar un mensaje de éxito
           
            // Limpiar los campos de entrada del usuario
            setUsuarioInput({
                id: '',
                nombre: '',
                apellidos: ''
                // Agrega más campos según sea necesario
            });
        })
        .catch(error => {
            // Manejar el error en caso de fallo en la solicitud POST
            console.error("Error al crear usuario:", error);
            // Mostrar un mensaje de error
           // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al crear el usuario', life: 3000 });
        });
};


