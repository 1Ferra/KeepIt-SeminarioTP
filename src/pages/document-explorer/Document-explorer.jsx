import './Document-explorer.css';
import React, { useRef, useState } from 'react';

function DocumentExplorer(){

    const [filtroTipoDocumento, setFiltroTipoDocumento] = useState('');
    const [filtroFechaCarga, setFiltroFechaCarga] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [busqueda, setBusqueda] = useState('');

    const [documentos, setDocumentos] = useState([
        {nombre: "Seguro La Caja", tipo_documento: "Documento", fecha_carga: "24-02-2025", fecha_vencimiento: "01-02-2026", monto: "---", estado: "Activo"},
        {nombre: "Licencia de conducir 1B", tipo_documento: "Documento", fecha_carga: "15-05-2021", fecha_vencimiento: "15-05-2026", monto: "---", estado: "Activo"},
        {nombre: "Pago de aranceles", tipo_documento: "Comprobante", fecha_carga: "22-06-2026", fecha_vencimiento: "22-06-2026", monto: "15600.00", estado: "Activo"},
    ])

    const tipoDocumento = [
        "Comprobante",
        "Documento"
    ]

    const estados = [
        "Activo",
        "Anulada",
        "Vencida"
    ]

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files.length) {
        setFileName(e.target.files[0].name);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        setFileName(file.name);
        // Asignar archivo al input para mantenerlo sincronizado
        fileInputRef.current.files = e.dataTransfer.files;
        }
    };


    const mostrar = () => {
        document.getElementById('visualizador').style.display = 'flex'
    }

    const ocultar = () => {
        document.getElementById('visualizador').style.display = 'none'
    }

    const cargarDocumento = () => {
        
        let nombre = document.getElementById('input-formulario-nombre').value
        let fechaCarga = document.getElementById('input-formulario-fecha-carga').value
        let tipoDocumento = document.getElementById('select-formulario-tipo-documento').value
        let fechaVencimiento = document.getElementById('input-formulario-fecha-vencimiento').value
        let monto = document.getElementById('input-formulario-monto').value
        
        let result = {
            nombre: nombre,
            tipo_documento: tipoDocumento,
            fecha_carga: fechaCarga,
            fecha_vencimiento: fechaVencimiento,
            monto: monto,
            estado: "Activo"
        }

        if(validarCredenciales(result)){
            setDocumentos(prev => [...prev, result]);
            document.getElementById('visualizador').style.display = 'none'

            document.getElementById('input-formulario-nombre').value = ''
            document.getElementById('input-formulario-fecha-carga').value = '' 
            document.getElementById('select-formulario-tipo-documento').value = '' 
            document.getElementById('input-formulario-fecha-vencimiento').value = ''
            document.getElementById('input-formulario-monto').value = ''
        }
       
        
    }

    const validarCredenciales = (res) => {
        let regexp = new RegExp("^[a-zA-Z0-9_-ñ-Ñ]*$")
        let flag = true

        if(res.nombre.length < 3){
            document.getElementById("error-formulario-nombre").innerText = "El nombre debe tener al menos 3 caracteres"
            flag = false
        }
        else{
            if(!regexp.test(res.nombre)){
                document.getElementById("error-formulario-nombre").innerText = "No se permiten caracteres especiales"
                flag = false
            }
            else{
                document.getElementById("error-formulario-nombre").innerText = ""
            }
        }
        
        if(res.fecha_carga == ''){
            document.getElementById("error-formulario-fecha-carga").innerText = "Se debe cargar una fecha valida"
            flag = false
        }else{
            document.getElementById("error-formulario-fecha-carga").innerText = ""
        }

        if(res.fecha_vencimiento == ''){
            document.getElementById("error-formulario-fecha-vencimiento").innerText = "Se debe cargar una fecha valida"
            flag = false
        }else{
            document.getElementById("error-formulario-fecha-vencimiento").innerText = ""
        }

        if(res.tipo_documento == ''){
            document.getElementById("error-formulario-tipo-documento").innerText = "Se debe seleccionar el tipo de documento"
            flag = false
        }else{
            document.getElementById("error-formulario-tipo-documento").innerText = ""
        }

        if(res.tipo_documento == 'Comprobante'){
            if(res.monto == ''){
                document.getElementById("error-formulario-monto").innerText = "Se debe cargar el monto respectivo al Comprobante"
                flag = false
            }else{
                document.getElementById("error-formulario-monto").innerText = ""
            }
        }else{
            document.getElementById("error-formulario-monto").innerText = ""
        }
        
        return flag;
    }

    const documentosFiltrados = documentos.filter(doc => {
        const coincideTipo = filtroTipoDocumento === '' || doc.tipo_documento === filtroTipoDocumento;
        const coincideFecha = filtroFechaCarga === '' || doc.fecha_carga === filtroFechaCarga;
        const coincideEstado = filtroEstado === '' || doc.estado === filtroEstado;
        const coincideBusqueda = busqueda === '' || doc.nombre.toLowerCase().includes(busqueda.toLowerCase());

        return coincideTipo && coincideFecha && coincideEstado && coincideBusqueda;
    });

    return(
        <div className="document-explorer">
            <div className="document-explorer-filters">
                <div className='filtros-titulo'>Filtros</div>
                <div className="document-explorer-filters-content">
                    <input type="text" placeholder="Buscar por nombre..." className='input-fecha-carga'
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)} />
                    <div className="document-filter-tipo">
                        <div className='filtro-titulo'>Tipo de documento</div>
                        <select name="" id="select-tipo-documento" className='select-tipo-documento' value={filtroTipoDocumento} onChange={(e) => setFiltroTipoDocumento(e.target.value)}>
                            <option value="" >Seleccione una opción</option>
                            {
                                tipoDocumento.map(tipo => (
                                    <option value={tipo}>{tipo}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* <div className="document-filter-fecha">
                        <div className='filtro-titulo'>Fecha de carga</div>
                        <input type="date" id='input-fecha-carga' className='input-fecha-carga'/>
                    </div> */}
                    <div className="document-filter-estado">
                        <div className='filtro-titulo'>Estado</div>
                        <select name="" id="select-estado" className='select-estado' value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                            <option value="">Seleccione una opción</option>
                            {
                                estados.map(estado => (
                                    <option value={estado}>{estado}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="document-explorer-content">
                <div className='document-explorer-menu-bar'>
                    <div className="document-explorer-content-titulo">
                        <div className="document-explorer-content-barra"></div>
                        <div className="document-explorer-titulo">Mis Documentos</div>
                    </div>
                    <a className='boton-agregar' href='#' onClick={mostrar}><span class="material-symbols-outlined">add</span></a>
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
                    {
                        documentosFiltrados.map((documento, index) => (
                            <div className="document">
                                <div className='document-barra'></div>
                                <div className='columna'>{documento.nombre}</div>
                                <div className='columna'>{documento.tipo_documento}</div>
                                <div className='columna'>{documento.fecha_carga}</div>
                                <div className='columna'>{documento.fecha_vencimiento}</div>
                                <div className='columna'>${documento.monto}</div>
                                <div className='columna'>{documento.estado}</div>
                            </div>
                        ))
                    }  
                </div>
            </div>
            <div id="visualizador" className='visualizador'>
                <div id="backgroud-visualizador" className='backgroud-visualizador' onClick={ocultar}></div>
                <div className="formulario-carga">
                    <div className="document-explorer-content-titulo">
                        <div className="document-explorer-content-barra"></div>
                        <div className="document-explorer-titulo">Nuevo Documento</div>
                    </div>
                    <form action="" className='formulario'>
                        <div className="formulario-input-cont">
                            <div className='formulario-input-titulo'>Nombre</div>
                            <input type="text" id='input-formulario-nombre' className='input-fecha-carga'/>
                            <p className='error-formulario-input' id='error-formulario-nombre'></p>
                        </div>
                        
                        <div className="formulario-input-cont">
                            <div className='formulario-input-titulo'>Fecha de carga</div>
                            <input type="date" id='input-formulario-fecha-carga' className='input-fecha-carga'/>
                            <p className='error-formulario-input' id='error-formulario-fecha-carga'></p>
                        </div>
                        <div className="formulario-input-cont">
                            <div className='formulario-input-titulo'>Tipo de documento</div>
                            <select name="" id="select-formulario-tipo-documento" className='select-tipo-documento'>
                                <option value="" >Seleccione una opción</option>
                                {
                                    tipoDocumento.map(tipo => (
                                        <option value={tipo}>{tipo}</option>
                                    ))
                                }
                            </select>
                            <p className='error-formulario-input' id='error-formulario-tipo-documento'></p>
                        </div>
                        <div className="formulario-input-cont">
                            <div className='formulario-input-titulo'>Fecha de vencimiento</div>
                            <input type="date" id='input-formulario-fecha-vencimiento' className='input-fecha-carga'/>
                            <p className='error-formulario-input' id='error-formulario-fecha-vencimiento'></p>
                        </div>
                        <div className="formulario-input-cont">
                            <div className='formulario-input-titulo'>Monto</div>
                            <input type="number" id='input-formulario-monto' className='input-fecha-carga' readonly/>
                            <p className='error-formulario-input' id='error-formulario-monto'></p>
                        </div>
                                <div
                                className={`drop-zone ${dragOver ? 'dragover' : ''}`}
                                onClick={() => fileInputRef.current.click()}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragOver(true);
                                }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                >
                                Arrastrá un archivo aquí o hacé clic para seleccionarlo.
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {fileName && <div className="file-name">{fileName}</div>}
                                </div>
                        <a href='#' className='boton-aceptar' onClick={cargarDocumento}>Aceptar</a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DocumentExplorer;