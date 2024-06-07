import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Impresion = () => {
    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('orden_de_compra.pdf');
        });
    };

    return (
        <div>
            <button onClick={printDocument}>Imprimir</button>
            <div id="divToPrint" style={{ padding: '20px', width: '210mm', minHeight: '297mm', margin: '0 auto', backgroundColor: '#ffffff' }}>
           
                <h2 style={{ textAlign: 'center' }}>Nombre de la Compañía</h2>
                <h4 style={{ textAlign: 'center' }}>Eslogan de su compañía</h4>
                <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p>Dirección</p>
                            <p>Ciudad, Estado, Código postal</p>
                            <p>Teléfono: 123.456.7890 Fax: 123.456.7891</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h3>ORDEN DE COMPRA</h3>
                        </div>
                    </div>
                    <p>El siguiente número debe figurar en toda la correspondencia, papeles de envío y facturas relacionadas:</p>
                    <p>NÚMERO DE O/C: 100</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <div>
                            <p>Para:</p>
                            <p>Nombre</p>
                            <p>Compañía</p>
                            <p>Dirección</p>
                            <p>Ciudad, Estado, Código postal</p>
                            <p>Teléfono</p>
                        </div>
                        <div>
                            <p>Enviar a:</p>
                            <p>Nombre</p>
                            <p>Compañía</p>
                            <p>Dirección</p>
                            <p>Ciudad, Estado, Código postal</p>
                            <p>Teléfono</p>
                        </div>
                    </div>
                    <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>FECHA DE O/C</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>SOLICITANTE</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>ENVIADO MEDIANTE</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>PUNTO F.O.B.</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>TÉRMINOS Y CONDICIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>Vencidos luego de la recepción</td>
                            </tr>
                        </tbody>
                    </table>
                    <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>CANTIDAD</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>PESO POR</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>DESCRIPCIÓN</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>PRECIO UNITARIO</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>PIES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}></td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ marginTop: '20px' }}>
                        <p>SUBTOTAL: $</p>
                        <p>TASA DE IMPUESTO: 8.60%</p>
                        <p>IMPUESTO SOBRE LAS VENTAS: $</p>
                        <p>ENVÍO Y GESTIÓN: $</p>
                        <p>OTRO: $</p>
                        <p>PIES: $</p>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <p>1. Envíe dos copias de su factura.</p>
                        <p>2. Ingrese este pedido de acuerdo con los precios, condiciones, método de entrega y especificaciones mencionados.</p>
                        <p>3. Notifíquenos inmediatamente si no puede enviarlo como se especificó.</p>
                        <p>4. Enviar correspondencia a:</p>
                        <p>Nombre</p>
                        <p>Dirección</p>
                        <p>Teléfono: Fax:</p>
                    </div>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p>AUTORIZACIÓN</p>
                            <div style={{ borderTop: '1px solid black', width: '200px' }}></div>
                            <p>Autorizado por</p>
                        </div>
                        <div>
                            <p>Fecha</p>
                            <div style={{ borderTop: '1px solid black', width: '100px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={printDocument}>Imprimir PDF</button>
        </div>
    );
};

export default Impresion;
