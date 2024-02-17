import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function LibrosDialog({ fichaLibroTemplate,categoriaLibro,visibleLibro, setVisibleLibro, searchText, setSearchText, sortField, setSortField, filteredLibros }) {
    return (
        <Dialog header="Libros" visible={visibleLibro} modal={false} onHide={() => setVisibleLibro(false)}>
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
                        { label: 'Editorial', value: 'editorial' }
                    ]}
                    onChange={(e) => setSortField(e.value)}
                    placeholder="Ordenar por" />
            </div>
            <DataTable value={filteredLibros} tableStyle={{ minWidth: '50rem' }}>

                <Column field="id" header="Id"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="autor" header="Autor"></Column>
                <Column field="editorial" header="Editorial"></Column>
                <Column body={categoriaLibro} header="Categoria"></Column>
                <Column header="Ficha" body={fichaLibroTemplate} />
            </DataTable>
        </Dialog>
    );
}

export default LibrosDialog;
