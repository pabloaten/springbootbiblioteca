import React from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function UsuariosDialog({ 
    visibleMostrarUsuarios, 
    cerrarMostrarUsuarios, 
    usuarios, 
    botonEditarUsuario 
}) {
    return (
        <Dialog
            header="Usuarios"
            visible={visibleMostrarUsuarios}
            style={{ width: '50vw' }}
            modal={false}
            onHide={cerrarMostrarUsuarios}
        >
         
            <DataTable value={usuarios} tableStyle={{ minWidth: '10rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="apellidos" header="Apellidos"></Column>
                <Column header="Acciones" body={botonEditarUsuario} />
           
            </DataTable>
        </Dialog>
    );
}

export default UsuariosDialog;
