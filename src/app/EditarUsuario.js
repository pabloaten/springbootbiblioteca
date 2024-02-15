import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function EditarUsuario({ 
    visibleEditarUsuario, 
    cerrarEditarUsuario, 
    usuarioSeleccionado, 
    usuarioInput, 
    setUsuarioInput, 
    handleEliminarUsuario, 
    actualizarUsuario 
}) {
    return (
        <Dialog
            header={"Editar Usuario: " + usuarioSeleccionado.nombre}
            visible={visibleEditarUsuario}
            style={{ width: '50vw' }}
            modal={false}
            onHide={cerrarEditarUsuario}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <InputText 
                        value={usuarioInput.id} 
                      
                        placeholder="ID del usuario" 
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <InputText 
                        value={usuarioInput.nombre} 
                        onChange={(e) => setUsuarioInput({ ...usuarioInput, nombre: e.target.value })} 
                        placeholder="Nombre del usuario" 
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <InputText 
                        value={usuarioInput.apellidos} 
                        onChange={(e) => setUsuarioInput({ ...usuarioInput, apellidos: e.target.value })} 
                        placeholder="Apellidos del usuario" 
                    />
                </div>
                {/* Agrega más campos según tus necesidades */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button style={{ marginRight: '0.5rem' }} onClick={() => handleEliminarUsuario(usuarioSeleccionado.id)}>Eliminar</Button>
                <Button onClick={actualizarUsuario}>Guardar</Button>
            </div>
        </Dialog>
    );
}

export default EditarUsuario;
