import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

function CrearNuevoLibro({ 
    visibleCrearLibro, 
    setVisibleCrearLibro, 
    libroInput, 
    setLibroInput, 
    categoriaSeleccionadaLibro, 
    setCategoriaSeleccionadaLibro, 
    categorias, 
    handleGuardarNuevoLibro
}) {
    return (
        <Dialog
            header="Crear Nuevo Libro"
            visible={visibleCrearLibro}
            style={{ width: '50vw' }}
            modal={false}
            onHide={() => setVisibleCrearLibro(false)}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Agrega campos de entrada para los detalles del nuevo libro */}
                <InputText 
                    value={libroInput.nombre} 
                    onChange={(e) => setLibroInput({ ...libroInput, nombre: e.target.value })} 
                    placeholder="Nombre del libro" 
                    style={{ marginBottom: '1rem' }} 
                />
                <InputText 
                    value={libroInput.autor} 
                    onChange={(e) => setLibroInput({ ...libroInput, autor: e.target.value })} 
                    placeholder="Autor del libro" 
                    style={{ marginBottom: '1rem' }} 
                />
                <InputText 
                    value={libroInput.editorial} 
                    onChange={(e) => setLibroInput({ ...libroInput, editorial: e.target.value })} 
                    placeholder="Editorial del libro" 
                    style={{ marginBottom: '1rem' }} 
                />
                <Dropdown
                    value={categoriaSeleccionadaLibro}
                    options={categorias.map(categoria => ({ label: categoria.categoria, value: categoria.id }))}
                    onChange={(e) => setCategoriaSeleccionadaLibro(e.value)}
                    placeholder="Seleccionar Categoría"
                    style={{ width: '30%', marginBottom: '1rem' }} 
                />
                {/* Puedes agregar más campos de entrada según tus necesidades */}
                <Button onClick={handleGuardarNuevoLibro} style={{ width: '100%' }}>Crear Libro</Button>
            </div>
        </Dialog>
    );
}

export default CrearNuevoLibro;
