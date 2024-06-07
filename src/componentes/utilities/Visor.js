import React, { useState } from 'react';
import PDFViewer from './PDFViewer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Impresion from '../compras/Impresion';

const Visor = () => {
    const [fileUrl, setFileUrl] = useState(null);

    const handleGeneratePDF = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setFileUrl(pdfUrl);
        });
    };

    return (
        <div>
            <Impresion />
            <button onClick={handleGeneratePDF}>Generar y ver PDF</button>
            {fileUrl && <PDFViewer fileUrl={fileUrl} />}
        </div>
    );
};

export default Visor;