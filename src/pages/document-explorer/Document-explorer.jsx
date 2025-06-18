import './Document-explorer.css';
import React, { useState } from 'react';
import NavLeft from '../../components/NavLeft';
import DocumentList from '../../components/DocumentList';
import DocumentForm from '../../components/DocumentForm';

function DocumentExplorer() {
    const [filtroTipoDocumento, setFiltroTipoDocumento] = useState('');
    const [filtroFechaCarga, setFiltroFechaCarga] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [showForm, setShowForm] = useState(false);

    const [documentos, setDocumentos] = useState([
        { nombre: "Seguro La Caja", tipo_documento: "Documento", fecha_carga: "24-02-2025", fecha_vencimiento: "01-02-2026", monto: "---", estado: "Activo" },
        { nombre: "Licencia de conducir 1B", tipo_documento: "Documento", fecha_carga: "15-05-2021", fecha_vencimiento: "15-05-2026", monto: "---", estado: "Activo" },
        { nombre: "Pago de aranceles", tipo_documento: "Comprobante", fecha_carga: "22-06-2026", fecha_vencimiento: "22-06-2026", monto: "15600.00", estado: "Activo" },
    ]);

    const tipoDocumento = [
        "Comprobante",
        "Documento"
    ];

    const estados = [
        "Activo",
        "Anulada",
        "Vencida"
    ];

    const documentosFiltrados = documentos.filter(doc => {
        const coincideTipo = filtroTipoDocumento === '' || doc.tipo_documento === filtroTipoDocumento;
        const coincideFecha = filtroFechaCarga === '' || doc.fecha_carga === filtroFechaCarga;
        const coincideEstado = filtroEstado === '' || doc.estado === filtroEstado;
        const coincideBusqueda = busqueda === '' || doc.nombre.toLowerCase().includes(busqueda.toLowerCase());

        return coincideTipo && coincideFecha && coincideEstado && coincideBusqueda;
    });

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleHideForm = () => {
        setShowForm(false);
    };

    const handleFormSubmit = (formData) => {
        const nuevoDocumento = {
            ...formData,
            monto: formData.tipo_documento === 'Comprobante' ? formData.monto : '---',
            estado: 'Activo'
        };

        setDocumentos(prev => [...prev, nuevoDocumento]);
    };

    return (
        <div className="document-explorer">
            <NavLeft
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                filtroTipoDocumento={filtroTipoDocumento}
                setFiltroTipoDocumento={setFiltroTipoDocumento}
                filtroEstado={filtroEstado}
                setFiltroEstado={setFiltroEstado}
                tipoDocumento={tipoDocumento}
                estados={estados}
            />

            <DocumentList
                documentosFiltrados={documentosFiltrados}
                onShowForm={handleShowForm}
            />

            <DocumentForm
                isVisible={showForm}
                onHide={handleHideForm}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}

export default DocumentExplorer;