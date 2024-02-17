import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
const CrearPrestamos = ({ categoriaLibro, searchText, setSearchText, sortField, setSortField, prestamos, setPrestamos, visibleCrearPrestamo, setVisibleCrearPrestamo, libros, usuarios }) => {
    const [libroSeleccionadoPrestamo, setLibroSeleccionadoPrestamo] = useState({});
    const [usuarioSeleccionadoPrestamo, setUsuarioSeleccionadoPrestamo] = useState({});
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [mostrarResultadosUsuarios, setMostrarResultadosUsuarios] = useState(false); // Estado para controlar la visibilidad del segundo Dialog
    const [mostrarResultadosLibros, setMostrarResultadosLibros] = useState(false)
    const [filtroUsuario, setFiltroUsuario] = useState('');
    const [filtroLibro, setFiltroLibro] = useState('');

    const buscarLibro = () => {
        // Lógica de búsqueda basada en los filtros
        const resultados = [];
        setResultadosBusqueda(libros);
        setMostrarResultadosLibros(true); // Mostrar el segundo Dialog cuando hay resultados
    };
    const buscarUsuario = () => {
        // Lógica de búsqueda basada en los filtros
        const resultados = [];
        setResultadosBusqueda(usuarios);

        setMostrarResultadosUsuarios(true); // Mostrar el segundo Dialog cuando hay resultados
    };

    const seleccionar = (usuario) => {
        // Lógica para seleccionar el usuario
        console.log("Usuario seleccionado:", usuario);
        setUsuarioSeleccionadoPrestamo(usuario)
        setMostrarResultadosUsuarios(false)


    };
    const seleccionarLibro = (libro) => {
        // Lógica para seleccionar el usuario

        setLibroSeleccionadoPrestamo(libro)
        setMostrarResultadosLibros(false)


    };
    const toast = useRef(null);


    const [filteredLibros, setFilteredLibros] = useState([]);
    const guardarNuevoPrestamo = () => {
        const nuevoPrestamo = { libro: libroSeleccionadoPrestamo, usuario: usuarioSeleccionadoPrestamo };
        console.log(nuevoPrestamo);
        axios.post("http://localhost:8080/biblioteca/prestamos", nuevoPrestamo)
            .then(response => {
                setPrestamos([...prestamos, response.data]);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Libro creado correctamente', life: 3000 });
                setVisibleCrearPrestamo(false)
                setLibroSeleccionadoPrestamo({})
                setUsuarioSeleccionadoPrestamo({})
            })
            .catch(error => {
                console.error("Error al crear libro:", error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al crear el libro', life: 3000 });
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

        setFilteredLibros(libros);
    }, [libros, searchText, sortField]);
    return (
        <>
            <Toast ref={toast} />
            <Dialog
                header="Crear nuevo Prestamo"
                visible={visibleCrearPrestamo}
                style={{ width: '50vw' }}
                modal={false}
                onHide={() => setVisibleCrearPrestamo(false)}
            >
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="usuarioPrestamo">Nombre del Usuario:</label>
                        <InputText id="usuarioPrestamo" value={usuarioSeleccionadoPrestamo.nombre} disabled />
                        <Button style={{ marginTop: '1rem', marginBottom: '1rem' }} onClick={buscarUsuario} className="p-button ">Buscar Usuario</Button>

                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="libroPrestamo">Nombre del Libro:</label>
                        <InputText id="libroPrestamo" value={libroSeleccionadoPrestamo.nombre} disabled />
                        <Button style={{ marginTop: '1rem', marginBottom: '1rem' }} onClick={buscarLibro} className="p-button ">Buscar</Button>

                    </div>
                </div>
                <div className="p-d-flex p-jc-center" style={{ marginTop: '1rem' }}>
                    <Button onClick={guardarNuevoPrestamo} className="p-button p-button-success">Guardar</Button>
                </div>
            </Dialog>

            <Dialog
                header="Resultados de la Búsqueda"
                visible={mostrarResultadosUsuarios} // Mostrar el segundo Dialog cuando se activa el estado
                onHide={() => setMostrarResultadosUsuarios(false)} // Ocultar el segundo Dialog
            >
                <DataTable value={resultadosBusqueda}>
                    <Column field="id" header="ID"></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="apellidos" header="Apellidos"></Column>

                    <Column body={(rowData) => (
                        <Button onClick={() => seleccionar(rowData)}>Seleccionar</Button>
                    )} />
                    <Button>Crear Prestamo</Button>
                </DataTable>
            </Dialog>
            <Dialog
                header="Resultados de la Búsqueda"
                visible={mostrarResultadosLibros} // Mostrar el segundo Dialog cuando se activa el estado
                onHide={() => setMostrarResultadosLibros(false)} // Ocultar el segundo Dialog
            >
                <div className="p-d-flex p-ai-center">
                    <InputText
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Buscar por nombre"
                        className="p-mr-2"
                    />

                    <Dropdown
                        value={sortField}
                        options={[
                            { label: 'Nombre', value: 'nombre' },
                            { label: 'Autor', value: 'autor' },
                            { label: 'Editorial', value: 'editorial' },
                            ,
                        ]}
                        onChange={(e) => setSortField(e.value)}
                        placeholder="Ordenar por"
                    />
                </div>
                <DataTable value={filteredLibros}>
                    <Column field="id" header="Id"></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="autor" header="Autor"></Column>
                    <Column field="editorial" header="Editorial"></Column>
                    <Column body={categoriaLibro} header="Categoria"></Column>

                    <Column body={(rowData) => (
                        <Button onClick={() => seleccionarLibro(rowData)}>Seleccionar</Button>
                    )} />
                </DataTable>
            </Dialog>
        </>
    );
};

export default CrearPrestamos;