import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { eliminarCategoria } from './Categorias';

function FichaCategoria({
    visibleFichaCategoria,
    setvisibleFichaCategoria,
    categoriaInput,
    setCategoriaInput,
    categoriaSeleccionada,
    categorias,
    setCategorias,
    toast,
    handleGuardarCategoria
}) {
    return (
        <Dialog
            header={"Ficha de la categoría: " + categoriaSeleccionada.categoria}
            visible={visibleFichaCategoria}
            style={{ width: '50vw' }}
            modal={false}
            onHide={() => setvisibleFichaCategoria(false)}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <InputText
                        value={categoriaInput.id}
                     
                        placeholder="ID de la categoría"
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <InputText
                        value={categoriaInput.categoria}
                        onChange={(e) => setCategoriaInput({ ...categoriaInput, categoria: e.target.value })}
                        placeholder="Nombre de la categoría"
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button style={{ marginRight: '0.5rem' }} onClick={() => eliminarCategoria(categoriaSeleccionada.id, categorias, setCategorias, setvisibleFichaCategoria, toast)}>Eliminar</Button>
                <Button onClick={handleGuardarCategoria}>Guardar</Button>
            </div>
        </Dialog>
    );
}

export default FichaCategoria;
