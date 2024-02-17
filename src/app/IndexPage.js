'use client';
import Link from 'next/link';
import Contenido from './Components/Contenido';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';

import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputTextarea } from 'primereact/inputtextarea';
import TuComponente from './Components/prestamos/CrearPrestamos';
import axios from 'axios';
import CrearNuevaCategoriaDialog from './Components/categorias/CrearNuevaCategoriaDialog';
import CategoriasDialog from './Components/categorias/CategoriasDialog';
import LibrosDialog from './Components/libros/LibrosDialog';
import FichaCategoria from './Components/categorias/FichaCategoria';
import FichaLibro from './Components/libros/FichaLibro';
import CrearNuevoLibro from './Components/libros/CrearNuevoLibro';
import EditarUsuario from './Components/usuarios/EditarUsuario';
import UsuariosDialog from './Components/usuarios/UsuariosDialog';
import CrearUsuario from './Components/usuarios/CrearUsuario';
import EditarPrestamos from './Components/prestamos/EditarPrestamos';
import { actualizarCategoria, crearCategoria, guardarCategoria } from './helper/Categorias';
import { actualizarLibro, eliminarLibro, guardarNuevoLibro } from './helper/Libros';
import { crearUsuario, eliminarUsuario } from './helper/Usuarios';
const IndexPage = () => {
    // Estados de los usuarios
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});
    const [nombreCategoria, setnombreCategoria] = useState('');
    const [usuarioInput, setUsuarioInput] = useState({
        id: '',
        nombre: '',
        apellidos: '',
       
    });
    const [visibleEditarUsuario, setVisibleEditarUsuario] = useState(false); // Estado para controlar la visibilidad del diálogo de editar usuario
    const [visibleCrearUsuario, setVisibleCrearUsuario] = useState(false); // Estado para controlar la visibilidad del diálogo de creación de usuarios

    // Estados de los prestamos
    const [prestamos, setPrestamos] = useState([]);
    const [libroSeleccionadoPrestamo, setLibroSeleccionadoPrestamo] = useState({});
    const [usuarioSeleccionadoPrestamo, setUsuarioSeleccionadoPrestamo] = useState({});
    const [prestamoInput, setPrestamoInput] = useState({
        idPrestamo: '',
        fechaPrestamo: '',
        libro: { nombre: '' },
        usuario: { nombre: '' },
      
    });
    const [visibleFichaPrestamo, setVisibleFichaPrestamo] = useState(false);

    // Estados de búsqueda y resultados
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [mostrarResultadosUsuarios, setMostrarResultadosUsuarios] = useState(false); // Estado para controlar la visibilidad del segundo Dialog
    const [mostrarResultadosLibros, setMostrarResultadosLibros] = useState(false);
    const [visiblePrestamos, setVisiblePrestamos] = useState(false);
    const [visibleCrearPrestamo, setVisibleCrearPrestamo] = useState(false);
    const [prestamoSeleccionado, setPrestamoSeleccionado] = useState({});

    // Estados de las categorías
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({});
    const [visibleFichaCategoria, setvisibleFichaCategoria] = useState(false);
    const [categoriaSeleccionadaLibro, setCategoriaSeleccionadaLibro] = useState('');
    const [categoriaInput, setCategoriaInput] = useState({
        id: '',
        categoria: ''
    });

    // Estados de los libros
    const [libros, setLibros] = useState([]);
    const [libroSeleccionado, setLibroSeleccionado] = useState({});
    const [libroInput, setLibroInput] = useState({
        id: '',
        nombre: '',
        autor: '',
        editorial: '',
        categoria: {}
    });
    const [visibleCrearLibro, setVisibleCrearLibro] = useState(false);

    // Otros estados y referencias
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [visibleCrear, setVisibleCrear] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [sortField, setSortField] = useState('nombre');
    const [filteredLibros, setFilteredLibros] = useState([]);
    const [visibleLibro, setVisibleLibro] = useState(false);
    const [visibleFichaLibro, setVisibleFichaLibro] = useState(false);

    // Función para abrir el diálogo de editar usuario
    const editarUsuario = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setUsuarioInput(usuario);
        setVisibleEditarUsuario(true);
    };
    // Función para cerrar el diálogo de editar usuario
    const cerrarEditarUsuario = () => {
        setVisibleEditarUsuario(false);
    };
    const actualizarUsuario = () => {
        // Realizar la solicitud PUT para actualizar el usuario con los datos del usuarioInput
        axios.put(`http://localhost:8080/biblioteca/usuarios/update/${usuarioInput.id}`, usuarioInput)
            .then(response => {
                // Actualizar el estado de los usuarios con los nuevos datos del usuario actualizado
                const nuevosUsuarios = usuarios.map(user => {
                    if (user.id === usuarioInput.id) {
                        return usuarioInput; // Reemplazar el usuario antiguo con el nuevo
                    }
                    return user;
                });
                setUsuarios(nuevosUsuarios);
                // Ocultar el diálogo de edición
                setVisibleEditarUsuario(false);
                // Mostrar un mensaje de éxito
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado correctamente', life: 3000 });
            })
            .catch(error => {
                // Manejar el error en caso de fallo en la solicitud PUT
                console.error("Error al actualizar usuario:", error);
                // Mostrar un mensaje de error
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el usuario', life: 3000 });
            });
    };
    // Función para cerrar el diálogo de editar prestamo
    const cerrarEditarPrestamo = () => {
        setVisibleFichaPrestamo(false);
    };
    // Función para actualizar un prestamo
    const actualizarPrestamo = () => {
        const nuevoPrestamo = { libro: libroSeleccionadoPrestamo, usuario: usuarioSeleccionadoPrestamo };
        // Realizar la solicitud PUT para actualizar el prestamo con los datos del prestamoInput
        axios.put(`http://localhost:8080/biblioteca/prestamos/${prestamoInput.idPrestamo}`, nuevoPrestamo)
            .then(response => {
                // Actualizar el estado de los prestamos con los nuevos datos del prestamo actualizado
                const nuevosPrestamos = prestamos.map(prestamo => {
                    if (prestamo.idPrestamo === prestamoInput.idPrestamo) {
                        return prestamoInput; // Reemplazar el prestamo antiguo con el nuevo
                    }
                    return prestamo;
                });
                setPrestamos(nuevosPrestamos);
                setPrestamoSeleccionado({});
                setLibroSeleccionadoPrestamo({});
                setUsuarioSeleccionadoPrestamo({});
                setPrestamoInput({
                    idPrestamo: '',
                    nombre: '',
                    autor: '',
                    editorial: '',
                    categoria: {},
                    usuario: { nombre: '' },
                    libro: { nombre: '' }
                });
                // Ocultar el diálogo de edición
                setVisibleFichaPrestamo(false);
                // Mostrar un mensaje de éxito
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Prestamo actualizado correctamente', life: 3000 });
            })
            .catch(error => {
                // Manejar el error en caso de fallo en la solicitud PUT
                console.error("Error al actualizar prestamo:", error);
                // Mostrar un mensaje de error
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el prestamo', life: 3000 });
            });
    };
    useEffect(() => {

        // Aplicar el filtro y ordenar según el campo seleccionado
        const filtered = libros.filter(libro =>
            libro[sortField] && libro[sortField].toLowerCase().includes(searchText.toLowerCase())
        );

        if (sortField) {
            filtered.sort((a, b) => (a[sortField] > b[sortField]) ? 1 : -1);
        }

        setFilteredLibros(filtered);
    }, [libros, searchText, sortField]);
    // Crea una función para mostrar u ocultar el diálogo de creación de libros
    const toggleCrearLibroDialog = () => {
        setVisibleCrearLibro(!visibleCrearLibro);
    };

    useEffect(() => {

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
                console.error("Error al obtener categorías:", error);
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

    }, []);

    const modificarCategoria = (categoria) => {
        setCategoriaSeleccionada(categoria);
        setCategoriaInput(categoria);
    };

    const handleEliminarLibro = (id) => {

        eliminarLibro(id, libros, setLibros, setVisibleFichaLibro, toast);
        const prestamosActualizados = prestamos.filter(prestamo => prestamo.libro.id !== id);
        setPrestamos(prestamosActualizados);


    }

    const eliminarPrestamo = (id) => {
        console.log(id);
        axios.delete(`http://localhost:8080/biblioteca/prestamos/${id}`)

            .then(response => {
                const nuevosLibros = prestamos.filter(libro => libro.idPrestamo !== id);
                setPrestamos(nuevosLibros);
                setVisibleFichaPrestamo(false);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Libro eliminado correctamente', life: 3000 });
            })
            .catch(error => {
                console.error("Error al eliminar libro:", error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el libro', life: 3000 });
            });
    };

    const handleActualizarLibro = (id, nuevoLibro) => {
        actualizarLibro(id, nuevoLibro, libros, setLibros, toast);
    };

    const modificarLibro = (libro) => {
        setLibroSeleccionado(libro);
        setLibroInput(libro);
    };
    const modificarPrestamo = (prestamo) => {
        setPrestamoSeleccionado(prestamo);
        setLibroSeleccionadoPrestamo(prestamo.libro);
        setUsuarioSeleccionadoPrestamo(prestamo.usuario);
        console.log(prestamo);
        setPrestamoInput(prestamo);
    };

    const handleGuardarCategoria = () => {
        guardarCategoria(categoriaInput, categorias, setCategorias, setvisibleFichaCategoria, toast, actualizarCategoria);
    }

    const handleGuardarNuevoLibro = () => {
        guardarNuevoLibro(libroInput, categorias, categoriaSeleccionadaLibro, libros, setLibros, setVisibleCrearLibro, toast, setLibroInput, setCategoriaSeleccionadaLibro);
    };

    const handleCrearCategoria = () => {
        crearCategoria(nombreCategoria, setCategorias, setVisibleCrear, toast, setnombreCategoria, categorias);
    }
    const guardarLibro = () => {
        const nuevosLibros = libros.map(libro => {
            if (libro.id === libroInput.id) {
                return libroInput;
            }
            return libro;
        });

        setLibros(nuevosLibros);
        setVisibleFichaLibro(false);
        handleActualizarLibro(libroInput.id, libroInput);
    };

    const fichaTemplate = (categoria) => {
        return (
            <Button label="Ficha" icon="pi pi-external-link" onClick={() => {
                modificarCategoria(categoria);
                setvisibleFichaCategoria(true);
            }} />
        );
    };

    const fichaLibroTemplate = (libro) => {
        return (
            <>
                <Button label="Ficha" icon="pi pi-external-link" onClick={() => {
                    modificarLibro(libro);
                    setVisibleFichaLibro(true);
                }} />

            </>
        );
    };

    const fichaPrestamoTemplate = (prestamo) => {
        return (
            <>
                <Button label="Ficha" icon="pi pi-external-link" onClick={() => {
                    modificarPrestamo(prestamo);
                    setVisibleFichaPrestamo(true);
                }} />

            </>
        );
    };
    const [visibleMostrarUsuarios, setVisibleMostrarUsuarios] = useState(false);


    // Función para cerrar el diálogo de mostrar todos los usuarios
    const cerrarMostrarUsuarios = () => {
        setVisibleMostrarUsuarios(false);
    };

    const handleCrearUsuario = () => {
        crearUsuario(usuarioInput, usuarios, setUsuarios, setVisibleCrearUsuario, toast);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado correctamente', life: 3000 });
        setVisibleCrearUsuario(false);
    };

    const items = [
        {
            label: 'Categorias',
            icon: 'pi pi-link',
            items: [
                {
                    label: 'Ver Categorias',
                    icon: 'pi pi-list',
                    command: () => {
                        setVisible(true);
                    }
                },
                {
                    label: 'Crear Categoria', // Submenú para crear un nuevo libro
                    icon: 'pi pi-plus',
                    command: () => {
                        setVisibleCrear(true); // Mostrar el diálogo de creación de libros
                    }
                }
            ]
        },
        {
            label: 'Libros',
            icon: 'pi pi-link',
            items: [
                {
                    label: 'Ver Libros',
                    icon: 'pi pi-list',
                    command: () => {
                        setVisibleLibro(true);
                    }
                },
                {
                    label: 'Crear Libro', // Submenú para crear un nuevo libro
                    icon: 'pi pi-plus',
                    command: () => {
                        setVisibleCrearLibro(true); // Mostrar el diálogo de creación de libros
                    }
                }
            ]
        },
        {
            label: 'Prestamos',
            icon: 'pi pi-times',
            items: [
                {
                    label: 'Ver Prestamos',
                    icon: 'pi pi-list',
                    command: () => {
                        setVisiblePrestamos(true);
                    }
                },
                {
                    label: 'Crear Prestamos', // Submenú para crear un nuevo libro
                    icon: 'pi pi-plus',
                    command: () => {
                        setVisibleCrearPrestamo(true); // Mostrar el diálogo de creación de libros
                    }
                }
            ]
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-link',
            items: [
                {
                    label: 'Ver Usuarios',
                    icon: 'pi pi-list',
                    command: () => {
                        setVisibleMostrarUsuarios(true);
                    }
                },
                {
                    label: 'Crear Usuarios', // Submenú para crear un nuevo libro
                    icon: 'pi pi-plus',
                    command: () => {
                        setVisibleCrearUsuario(true); // Mostrar el diálogo de creación de libros
                    }
                }
            ]
        },
        {
            label: 'Cerrar todo',
            icon: 'pi pi-times',
            command: () => {
                cerrarTodosLosDialogos()
            }
        }
    ];
    const cerrarTodosLosDialogos = () => {
        setVisible(false);
        setVisibleEditarUsuario(false);
        setVisibleMostrarUsuarios(false);
        setVisibleCrearUsuario(false);

        setVisibleLibro(false);
        setVisibleFichaLibro(false);
        setVisibleCrearLibro(false);
        setVisiblePrestamos(false);
        setVisibleCrear(false);
        setVisibleCrearPrestamo(false);
        setVisibleFichaPrestamo(false)
    };
    const botonEditarUsuario = (usuario) => {
        return (
            <Button
                label="Editar"
                className="p-button p-button-secondary"
                onClick={() => editarUsuario(usuario)}
            />
        );
    };
    const categoriaLibro = (libro) => {
        const categoriaEncontrada = categorias.find(cat => cat.id === libro.categoria.id);

        if (categoriaEncontrada) {
            return <span>{categoriaEncontrada.categoria}</span>;
        } else {
            return <span>Categoría no encontrada</span>;
        }
    }
    const libroPrestamo = (prestamo) => {
       
        const libroEncontrado = libros.find(lib => lib.id === prestamo.libro.id);

        if (libroEncontrado) {
            return libroEncontrado.nombre
        } else {
            return <span>Categoría no encontrada</span>;
        }
    }
    

    const usuarioPrestamo = (prestamo) => {

        const usuarioEncontrado = usuarios.find(usuario => usuario.id === prestamo.usuario.id);

        if (usuarioEncontrado) {
            return usuarioEncontrado.nombre;
        } else {
            return <span>Categoría no encontrada</span>;
        }
    }

    const handleEliminarUsuario = (id) => {
        setVisibleEditarUsuario(false);
        eliminarUsuario(id, usuarios, setUsuarios, toast);
        const prestamosActualizados = prestamos.filter(prestamo => prestamo.usuario.id !== id);
        console.log(prestamos, usuarios);
        setPrestamos(prestamosActualizados);
    };

    const buscarLibro = () => {
       
        
        setResultadosBusqueda(libros);
        setMostrarResultadosLibros(true); // Mostrar el segundo Dialog cuando hay resultados
    };
    const buscarUsuario = () => {
      
        setResultadosBusqueda(usuarios);
        console.log(prestamos);

        setMostrarResultadosUsuarios(true); // Mostrar el segundo Dialog cuando hay resultados
    };


    const seleccionar = (usuario) => {
        // Lógica para seleccionar el usuario
        const usuarioSeleccionadoClon = { ...usuario };
        setPrestamoInput(prevState => ({
            ...prevState,
            usuario: usuarioSeleccionadoClon
        }));
        setMostrarResultadosUsuarios(false)

      

    };
    const seleccionarLibro = (libro) => {
        // Lógica para seleccionar el usuario
        // Clona el objeto libro para evitar modificar el estado original de los libros
        const libroSeleccionadoClon = { ...libro };
        setPrestamoInput(prevState => ({
            ...prevState,
            libro: libroSeleccionadoClon
        }));
     
        setMostrarResultadosLibros(false)

      
    };

    return (
        <div>
            <nav>
                <Toast ref={toast} />
                <Menubar model={items} />
                <CrearNuevaCategoriaDialog visibleCrear={visibleCrear} setVisibleCrear={setVisibleCrear} nombreCategoria={nombreCategoria} setnombreCategoria={setnombreCategoria} handleCrearCategoria={handleCrearCategoria} />
                <CategoriasDialog
                    visible={visible}
                    setVisible={setVisible}
                    categorias={categorias}
                    fichaTemplate={fichaTemplate}
                />
                <LibrosDialog
                    categoriaLibro={categoriaLibro}
                    visibleLibro={visibleLibro}
                    setVisibleLibro={setVisibleLibro}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    sortField={sortField}
                    setSortField={setSortField}
                    fichaLibroTemplate={fichaLibroTemplate}
                    filteredLibros={filteredLibros}
                />
                <FichaCategoria
                    visibleFichaCategoria={visibleFichaCategoria}
                    setvisibleFichaCategoria={setvisibleFichaCategoria}
                    categoriaSeleccionada={categoriaSeleccionada}
                    setCategoriaInput={setCategoriaInput}
                    categoriaInput={categoriaInput}
                    categorias={categorias}
                    toast={toast}

                    setCategorias={setCategorias}
                    handleGuardarCategoria={handleGuardarCategoria}
                />
                <FichaLibro
                    visibleFichaLibro={visibleFichaLibro}
                    setVisibleFichaLibro={setVisibleFichaLibro}
                    libroSeleccionado={libroSeleccionado}
                    libroInput={libroInput}
                    setLibroInput={setLibroInput}
                    categorias={categorias}
                    handleEliminarLibro={handleEliminarLibro}
                    guardarLibro={guardarLibro}
                />
                <CrearNuevoLibro
                    visibleCrearLibro={visibleCrearLibro}
                    setVisibleCrearLibro={setVisibleCrearLibro}
                    libroInput={libroInput}
                    setLibroInput={setLibroInput}
                    categoriaSeleccionadaLibro={categoriaSeleccionadaLibro}
                    setCategoriaSeleccionadaLibro={setCategoriaSeleccionadaLibro}
                    categorias={categorias}
                    handleGuardarNuevoLibro={handleGuardarNuevoLibro}
                />
                <EditarUsuario
                    visibleEditarUsuario={visibleEditarUsuario}
                    cerrarEditarUsuario={cerrarEditarUsuario}
                    usuarioSeleccionado={usuarioSeleccionado}
                    usuarioInput={usuarioInput}
                    setUsuarioInput={setUsuarioInput}
                    handleEliminarUsuario={handleEliminarUsuario}
                    actualizarUsuario={actualizarUsuario}
                />
                <UsuariosDialog
                    visibleMostrarUsuarios={visibleMostrarUsuarios}
                    cerrarMostrarUsuarios={cerrarMostrarUsuarios}
                    usuarios={usuarios}
                    botonEditarUsuario={botonEditarUsuario}
                />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CrearUsuario
                        visibleCrearUsuario={visibleCrearUsuario}
                        setVisibleCrearUsuario={setVisibleCrearUsuario}
                        usuarioInput={usuarioInput}
                        setUsuarioInput={setUsuarioInput}
                        handleCrearUsuario={handleCrearUsuario}
                    />
                    <EditarPrestamos
                        visiblePrestamos={visiblePrestamos}
                        setVisiblePrestamos={setVisiblePrestamos}
                        prestamos={prestamos}
                        setPrestamos={setPrestamos}
                        visibleCrearPrestamo={visibleCrearPrestamo}
                        setVisibleCrearPrestamo={setVisibleCrearPrestamo}
                        usuarios={usuarios}
                        libros={libros}
                        usuarioPrestamo={usuarioPrestamo}
                        libroPrestamo={libroPrestamo}
                        visibleFichaPrestamo={visibleFichaPrestamo}
                        cerrarEditarPrestamo={cerrarEditarPrestamo}
                        prestamoInput={prestamoInput}
                        prestamoSeleccionado={prestamoSeleccionado}
                        categoriaLibro={categoriaLibro}
                        eliminarPrestamo={eliminarPrestamo}
                        actualizarPrestamo={actualizarPrestamo}
                        mostrarResultadosUsuarios={mostrarResultadosUsuarios}
                        setMostrarResultadosUsuarios={setMostrarResultadosUsuarios}
                        mostrarResultadosLibros={mostrarResultadosLibros}
                        setMostrarResultadosLibros={setMostrarResultadosLibros}
                        resultadosBusqueda={resultadosBusqueda}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        sortField={sortField}
                        setSortField={setSortField}
                        filteredLibros={filteredLibros}
                        seleccionarLibro={seleccionarLibro}
                        fichaPrestamoTemplate={fichaPrestamoTemplate}
                        buscarLibro={buscarLibro}
                        buscarUsuario={buscarUsuario}
                        seleccionar={seleccionar}

                    />
                </div>
            </nav>
            <main>
                {/* Contenido */}
                {/* <img src="https://img.freepik.com/vector-gratis/fondo-linea-elegante-hexagonal-patron_1017-19742.jpg" style={{ width: "100vw" }} /> */}
            </main>
        </div>
    );

};

export default IndexPage;

