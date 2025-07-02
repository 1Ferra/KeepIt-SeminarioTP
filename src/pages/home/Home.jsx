import './Home.css';

function Home(){

    const proximosVencimientos = [
        {nombre: "Seguro La Caja", fecha_vencimiento: "10/07/2025"},
        {nombre: "Licencia de conducir 1B", fecha_vencimiento: "12/07/2025"},
        {nombre: "Certificado IGA", fecha_vencimiento: "19/07/2025"},
    ]

    const ultimosDocs = [
        {nombre: "Facturacion Oracle", fecha_vencimiento: "02/07/2025"},
        {nombre: "Certificado Oracle Optimizacion", fecha_vencimiento: "01/07/2025"},
        {nombre: "Comprobante Subscripción lanacion", fecha_vencimiento: "01/07/2025"},
    ]

    const docsMensuales = [
        { month: "Ene", count: 5,},
        { month: "Feb", count: 7,},
        { month: "Mar", count: 8,},
        { month: "Abr", count: 7,},
        { month: "May", count: 2,},
        { month: "Jun", count: 4,},
        { month: "Jul", count: 3,},
        { month: "Ago", count: 4,},
        { month: "Sep", count: 0,},
        { month: "Oct", count: 0,},
        { month: "Nov", count: 0,},
        { month: "Dic", count: 0,},
    ];

    const tipoDocs = [
        {tipo: "Comprobantes", cant: 20},
        {tipo: "Documentos", cant: 14}
    ]

    return(
        <div className="home">
            <div className='home-top'>
                <div className='home-indicador-left'>
                    <div className="document-explorer-content-titulo">
                        <div className="document-explorer-content-barra"></div>
                        <div className="document-explorer-titulo">Documentos Cargados</div>
                    </div>
                    <div className='home-indicador-left-cont'>
                        {
                            docsMensuales.map(ind => (
                                <div className='indicador-mes'>
                                    <div className='cantidad-docs'>{ind.count}</div>
                                    <div className='barra-docs' style={{height: `${ind.count * 15}px`}}></div>
                                    <div className='mes-docs'>{ind.month}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='home-indicador-right'>
                    <div className='home-tituloo'>
                        <div className="document-explorer-content-titulo">
                            <div className="document-explorer-content-barra"></div>
                            <div className="document-explorer-titulo">Tipos de Documento</div>
                        </div>
                        <a style={{textDecoration:"none"}} href='/documents'><span class="material-symbols-outlined flecha">arrow_forward_ios</span></a>
                    </div>
                    <div className='home-indicador-right-cont'>
                        {
                            tipoDocs.map(tipo => (
                                <div className='indicador-tipo'>
                                    <div className='indicador-tipo-cant'>{tipo.cant}</div>
                                    <div className='indicador-tipo-texto'>{tipo.tipo}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='home-bot'>
                <div className='home-docs-vencer'>
                    <div className='home-tituloo'>
                        <div className="document-explorer-content-titulo">
                            <div className="document-explorer-content-barra"></div>
                            <div className="document-explorer-titulo">Proximos Documentos a vencer</div>
                        </div>
                        <a style={{textDecoration:"none"}} href='/documents'><span class="material-symbols-outlined flecha">arrow_forward_ios</span></a>
                    </div>
                    <div className='home-docs-vencer-cont'>
                        {
                            proximosVencimientos.map(documento => (
                                <div className='documento-vencer'>
                                    <div className='documento-vencer-forma'></div>
                                    <div className='documento-vencer-nombre'>{documento.nombre}</div>
                                    <div className='documento-vencer-fecha'>{documento.fecha_vencimiento}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='home-docs-cargados'>
                    <div className='home-tituloo'>
                        <div className="document-explorer-content-titulo">
                            <div className="document-explorer-content-barra"></div>
                            <div className="document-explorer-titulo">Últimos documentos cargados</div>
                        </div>
                        <a style={{textDecoration:"none"}} href='/documents'><span class="material-symbols-outlined flecha">arrow_forward_ios</span></a>
                    </div>
                    
                    <div className='home-docs-cargados-cont'>
                        {
                            ultimosDocs.map(documento => (
                                <div className='documento-vencer'>
                                    <div className='documento-vencer-forma violeta-bk'></div>
                                    <div className='documento-vencer-nombre'>{documento.nombre}</div>
                                    <div className='documento-vencer-fecha'>{documento.fecha_vencimiento}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;