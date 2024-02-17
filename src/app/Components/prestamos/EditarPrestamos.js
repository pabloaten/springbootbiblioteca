import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TuComponente from './MiComponente';
import { Dropdown } from 'primereact/dropdown';

function EditarPrestamos({
    visiblePrestamos,
    setVisiblePrestamos,
    prestamos,
    setPrestamos,
    visibleCrearPrestamo,
    setVisibleCrearPrestamo,
    usuarios,
    libros,
    visibleFichaPrestamo,
    cerrarEditarPrestamo,
    prestamoInput,
categoriaLibro,
    eliminarPrestamo,
    actualizarPrestamo,
    mostrarResultadosUsuarios,
    setMostrarResultadosUsuarios,
    mostrarResultadosLibros,
    setMostrarResultadosLibros,
    resultadosBusqueda,
    searchText,
    setSearchText,
    sortField,
    setSortField,
    filteredLibros,
    seleccionarLibro,
    fichaPrestamoTemplate,
    buscarLibro,
    buscarUsuario,
    seleccionar,
    prestamoSeleccionado
}) {

    return (
        <div>
            <Dialog header="Prestamos" visible={visiblePrestamos} modal={false} onHide={() => setVisiblePrestamos(false)}>

                <DataTable value={[...prestamos]} tableStyle={{ minWidth: '50rem' }}>

                    <Column field="idPrestamo" header="Id"></Column>
                    <Column field="fechaPrestamo" header="Fecha"></Column>
                    <Column field="libro.nombre" header="Libro"></Column>
                    <Column field="usuario.nombre" header="Usuario"></Column>
                    <Column header="Ficha" body={fichaPrestamoTemplate} />

                </DataTable>
            </Dialog>
            <TuComponente
                prestamos={prestamos}
                setPrestamos={setPrestamos}
                visibleCrearPrestamo={visibleCrearPrestamo}
                setVisibleCrearPrestamo={setVisibleCrearPrestamo}
                usuarios={usuarios}
                libros={libros}
                categoriaLibro={categoriaLibro}
                sortField={sortField}
                setSortField={setSortField}
                setSearchText={setSearchText}
                searchText={searchText}
            />
            <Dialog
                header={"Editar Prestamo: " + prestamoInput.idPrestamo}
                visible={visibleFichaPrestamo}
                modal={false}
                onHide={cerrarEditarPrestamo}
            >
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col" style={{ margin: '1rem' }}>
                        <label htmlFor="nombreLibro">Nombre del Libro:</label>
                        <InputText id="nombreLibro" value={prestamoInput.libro.nombre} />
                        <Button style={{ marginTop: '1rem' }} onClick={buscarLibro}>Buscar libro</Button>
                    </div>
                    <div className="p-field p-col" style={{ margin: '1rem' }}>
                        <label htmlFor="nombreUsuario">Nombre del Usuario:</label>
                        <InputText id="nombreUsuario" value={prestamoInput.usuario.nombre} />
                        <Button style={{ marginTop: '1rem' }} onClick={buscarUsuario}>Buscar Usuario</Button>
                    </div>
                    {/* Agrega más campos según tus necesidades */}
                </div>
                <div className="p-d-flex p-jc-center" style={{ margin: '1rem' }}>
                    <Button onClick={() => eliminarPrestamo(prestamoInput.idPrestamo)} className="p-button-danger" style={{ marginRight: '0.5rem' }}>Eliminar</Button>
                    <Button onClick={() => actualizarPrestamo()} className="p-button-success">Guardar</Button>
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
                    {/* Agrega más columnas según sea necesario */}
                    <Column body={(rowData) => (
                        <Button onClick={() => seleccionar(rowData)}>Seleccionar</Button>
                    )} />

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
                        className="p-mr-2" />

                    <Dropdown
                        value={sortField}
                        options={[
                            { label: 'Nombre', value: 'nombre' },
                            { label: 'Autor', value: 'autor' },
                            { label: 'Editorial', value: 'editorial' },
                            ,
                        ]}
                        onChange={(e) => setSortField(e.value)}
                        placeholder="Ordenar por" />
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
        </div>
    );
}

export default EditarPrestamos;
