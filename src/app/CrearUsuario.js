import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function CrearUsuario({ 
    visibleCrearUsuario, 
    setVisibleCrearUsuario, 
    usuarioInput, 
    setUsuarioInput, 
    handleCrearUsuario 
}) {
    return (
        <Dialog
            header="Crear Nuevo Usuario"
            visible={visibleCrearUsuario}
            style={{ width: '50vw' }}
            onHide={() => setVisibleCrearUsuario(false)}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <span className="p-float-label">
                        <InputText
                            id="usuario"
                            value={usuarioInput.nombre}
                            onChange={(e) => setUsuarioInput({ ...usuarioInput, nombre: e.target.value })}
                            placeholder="Nombre del usuario" />
                        <label htmlFor="usuario">Nombre</label>
                    </span>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <span className="p-float-label">
                        <InputText
                            id="apellidos"
                            value={usuarioInput.apellidos}
                            onChange={(e) => setUsuarioInput({ ...usuarioInput, apellidos: e.target.value })}
                            placeholder="Apellidos" />
                        <label htmlFor="apellidos">Apellidos</label>
                    </span>
                </div>
                {/* Agrega más campos según sea necesario */}
                <Button style={{ width: '100%', textAlign: 'center' }} onClick={handleCrearUsuario}>Crear</Button>
            </div>
        </Dialog>
    );
}

export default CrearUsuario;
