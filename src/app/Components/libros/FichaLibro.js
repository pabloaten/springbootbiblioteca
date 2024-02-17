import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

function FichaLibro({ 
    visibleFichaLibro, 
    setVisibleFichaLibro, 
    libroSeleccionado, 
    libroInput, 
    setLibroInput, 
    categorias, 
    handleEliminarLibro, 
    guardarLibro 
}) {
    return (
        <Dialog
            header={"Ficha del libro: " + libroSeleccionado.nombre}
            visible={visibleFichaLibro}
            style={{ width: '50vw' }}
            modal={false}
            onHide={() => setVisibleFichaLibro(false)}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <InputText value={libroInput.id} placeholder="ID del libro" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <InputText value={libroInput.nombre} onChange={(e) => setLibroInput({ ...libroInput, nombre: e.target.value })} placeholder="Nombre del libro" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <InputText value={libroInput.editorial} onChange={(e) => setLibroInput({ ...libroInput, editorial: e.target.value })} placeholder="Editorial del libro" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <InputText value={libroInput.autor} onChange={(e) => setLibroInput({ ...libroInput, autor: e.target.value })} placeholder="Autor del libro" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <Dropdown
                        value={libroInput.categoria ? libroInput.categoria.id : null}
                        options={categorias.map(categoria => ({ label: categoria.categoria, value: categoria.id }))}
                        onChange={(e) => {
                            const selectedCategory = categorias.find(cat => cat.id === e.value);
                            setLibroInput({ ...libroInput, categoria: selectedCategory });
                        }}
                        placeholder="Seleccionar Categoría" />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button style={{ marginRight: '0.5rem' }} onClick={() => handleEliminarLibro(libroSeleccionado.id)}>Eliminar</Button>
                <Button onClick={guardarLibro}>Guardar</Button>
            </div>
        </Dialog>
    );
}

export default FichaLibro;
