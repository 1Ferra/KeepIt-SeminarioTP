import React, { useState } from 'react';

function DocumentForm({
    isVisible,
    onHide,
    onSubmit
}) {
    const [step, setStep] = useState(2); // 1: subir archivo, 2: verificar datos
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [extractedData, setExtractedData] = useState(null);
    const [errors, setErrors] = useState({});

    // Resetear el formulario cuando se cierre
    const resetForm = () => {
        setStep(1);
        setSelectedFile(null);
        setExtractedData(null);
        setErrors({});
        setIsUploading(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setErrors({});
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setErrors({ file: 'Debe seleccionar un archivo' });
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('/api/extract-document-data', {
                method: 'POST',
                body: formData
            });

            if (response.status === 200) {
                const data = await response.json();
                setExtractedData(data);
                setStep(2);
            } else {
                const errorData = await response.json();
                setErrors({ file: errorData.message || 'Error al procesar el archivo' });
            }
        } catch (error) {
            setErrors({ file: 'Error de conexión con el servidor' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDataChange = (field, value) => {
        setExtractedData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/save-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...extractedData,
                    originalFile: selectedFile.name
                })
            });

            if (response.status === 200) {
                onSubmit(extractedData);
                resetForm();
                onHide();
            } else {
                const errorData = await response.json();
                setErrors({ submit: errorData.message || 'Error al guardar el documento' });
            }
        } catch (error) {
            setErrors({ submit: 'Error de conexión con el servidor' });
        }
    };

    const handleClose = () => {
        resetForm();
        onHide();
    };

    const renderStep1 = () => (
        <form onSubmit={handleFileUpload} className='formulario'>
            <div className="formulario-input-cont">
                <div className='formulario-input-titulo'>Seleccionar Archivo</div>
                <input
                    type="file"
                    className='input-fecha-carga'
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <p className='error-formulario-input'>{errors.file || ''}</p>
            </div>

            <button
                type="submit"
                className={`boton-aceptar ${isUploading ? 'loading' : ''}`}
                disabled={isUploading}
            >
                {isUploading ? 'Procesando...' : 'Procesar Archivo'}
            </button>
        </form>
    );

    const renderStep2 = () => (
        <form onSubmit={handleFinalSubmit} className={`formulario ${step === 2 ? 'step-2' : ''}`}>
            <div className="formulario-verificacion-titulo">
                Verificar datos extraídos del archivo:
            </div>

            <div className="formulario-input-cont">
                <div className='formulario-input-titulo'>Tipo de Archivo</div>
                <select
                    className='select-tipo-documento'
                    value={extractedData?.tipoArchivo || ''}
                    onChange={(e) => handleDataChange('tipoArchivo', e.target.value)}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Documento">Documento</option>
                    <option value="Comprobante">Comprobante</option>
                    <option value="Factura">Factura</option>
                </select>
            </div>

            <div className="formulario-input-cont">
                <div className='formulario-input-titulo'>Monto</div>
                <input
                    type="number"
                    step="0.01"
                    className='input-fecha-carga'
                    value={extractedData?.monto || ''}
                    onChange={(e) => handleDataChange('monto', e.target.value)}
                />
            </div>

            <div className="formulario-input-cont">
                <div className='formulario-input-titulo'>Categoría</div>
                <input
                    type="text"
                    className='input-fecha-carga'
                    value={extractedData?.categoria || ''}
                    onChange={(e) => handleDataChange('categoria', e.target.value)}
                />
            </div>

            <div className="formulario-input-cont">
                <div className='formulario-input-titulo'>Fecha de Creación</div>
                <input
                    type="date"
                    className='input-fecha-carga'
                    value={extractedData?.fechaCreacion || ''}
                    onChange={(e) => handleDataChange('fechaCreacion', e.target.value)}
                />
            </div>

            <div className="formulario-input-cont">
                <div className='formulario-input-titulo'>Fecha de Vencimiento</div>
                <input
                    type="date"
                    className='input-fecha-carga'
                    value={extractedData?.fechaVencimiento || ''}
                    onChange={(e) => handleDataChange('fechaVencimiento', e.target.value)}
                />
            </div>

            <div className="formulario-input-cont">
                <div className='formulario-input-titulo'>Número de Factura</div>
                <input
                    type="text"
                    className='input-fecha-carga'
                    value={extractedData?.numeroFactura || ''}
                    onChange={(e) => handleDataChange('numeroFactura', e.target.value)}
                />
            </div>

            <div className="formulario-input-cont">
                <div className='formulario-input-titulo'>Fecha de Emisión</div>
                <input
                    type="date"
                    className='input-fecha-carga'
                    value={extractedData?.fechaEmision || ''}
                    onChange={(e) => handleDataChange('fechaEmision', e.target.value)}
                />
            </div>

            <div className="formulario-input-cont">
                <div className='formulario-input-titulo'>Emisor</div>
                <input
                    type="text"
                    className='input-fecha-carga'
                    value={extractedData?.emisor || ''}
                    onChange={(e) => handleDataChange('emisor', e.target.value)}
                />
            </div>

            <div className="formulario-input-cont">
                <div className='formulario-input-titulo'>Tipo de Factura</div>
                <select
                    className='select-tipo-documento'
                    value={extractedData?.tipoFactura || ''}
                    onChange={(e) => handleDataChange('tipoFactura', e.target.value)}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
            </div>

            {errors.submit && (
                <p className='error-formulario-input'>{errors.submit}</p>
            )}

            <div className="formulario-botones">
                <button
                    type="button"
                    className='boton-cancelar'
                    onClick={() => setStep(1)}
                >
                    Volver
                </button>
                <button type="submit" className='boton-aceptar'>
                    Agregar Documento
                </button>
            </div>
        </form>
    );

    return (
        <div
            id="visualizador"
            className='visualizador'
            style={{ display: isVisible ? 'flex' : 'none' }}
        >
            <div
                id="backgroud-visualizador"
                className='backgroud-visualizador'
                onClick={handleClose}
            ></div>
            <div className={`formulario-carga ${step === 2 ? 'step-2' : ''}`}>
                <div className="document-explorer-content-titulo">
                    <div className="document-explorer-content-barra"></div>
                    <div className="document-explorer-titulo">
                        {step === 1 ? 'Subir Documento' : 'Verificar Datos'}
                    </div>
                </div>

                {step === 1 ? renderStep1() : renderStep2()}
            </div>
        </div>
    );
}

export default DocumentForm;
