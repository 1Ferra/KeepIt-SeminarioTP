import React from 'react';

function DocumentList({ documentosFiltrados, onShowForm }) {
    return (
        <div className="document-explorer-content">
            <div className='document-explorer-menu-bar'>
                <div className="document-explorer-content-titulo">
                    <div className="document-explorer-content-barra"></div>
                    <div className="document-explorer-titulo">Mis Documentos</div>
                </div>
                <a
                    className='boton-agregar'
                    href='#'
                    onClick={(e) => {
                        e.preventDefault();
                        onShowForm();
                    }}
                >
                    <span className="material-symbols-outlined">add</span>
                </a>
            </div>

            <div className="document-explorer-columns">
                <div className='columna'>Nombre</div>
                <div className='columna'>Tipo documento</div>
                <div className='columna'>Fecha de Carga</div>
                <div className='columna'>Fecha de Vencimiento</div>
                <div className='columna'>Monto</div>
                <div className='columna'>Estado</div>
            </div>

            <div className="document-explorer-list">
                {documentosFiltrados.map((documento, index) => (
                    <div key={index} className="document">
                        <div className='document-barra'></div>
                        <div className='columna'>{documento.nombre}</div>
                        <div className='columna'>{documento.tipo_documento}</div>
                        <div className='columna'>{documento.fecha_carga}</div>
                        <div className='columna'>{documento.fecha_vencimiento}</div>
                        <div className='columna'>${documento.monto}</div>
                        <div className='columna'>{documento.estado}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DocumentList;