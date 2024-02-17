import React from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function CategoriasDialog({ visible, setVisible, categorias, fichaTemplate }) {
    return (
        <Dialog
            header="Categorias"
            visible={visible}
            modal={false}
            onHide={() => setVisible(false)}
        >
            <DataTable value={categorias} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Id" />
                <Column field="categoria" header="Nombre" />
                <Column header="Ficha" body={fichaTemplate} />
            </DataTable>
        </Dialog>
    );
}

export default CategoriasDialog;
