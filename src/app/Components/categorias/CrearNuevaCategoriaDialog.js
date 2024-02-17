import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const CrearNuevaCategoriaDialog = ({ visibleCrear, setVisibleCrear, nombreCategoria, setnombreCategoria, handleCrearCategoria }) => {
    const categoryDialogStyle = { width: '50vw' };
    const dialogBoxStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center' };
    const inputTextStyle = { marginBottom: '1rem' };
    const buttonStyle = { width: '100%' };
    
    return (
        <Dialog
            header="Crear Nueva Categoría"
            visible={visibleCrear}
            style={categoryDialogStyle}
            modal={false}
            onHide={() => setVisibleCrear(false)}
        >
            <div style={dialogBoxStyle}>
                <InputText
                    value={nombreCategoria}
                    onChange={(e) => setnombreCategoria(e.target.value)}
                    placeholder="Nombre de la Categoría"
                    style={inputTextStyle}
                />
            
                <Button onClick={handleCrearCategoria} style={buttonStyle}>Crear Categoría</Button>
            </div>
        </Dialog>
    );
};

export default CrearNuevaCategoriaDialog;