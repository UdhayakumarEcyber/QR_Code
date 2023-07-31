import React, { useRef, useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import TextBoxComponent from './textBoxComponent';

interface CanvasComponentProps {
  showDownloadButtons: boolean;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({ showDownloadButtons }) => {
  const containerRef = useRef(null);

  const [displayText, setDisplayText] = useState('');
  const [displayText1, setDisplayText1] = useState('');

  const handleTextChange = (newText: string) => {
    setDisplayText(newText);
  };

  const handleTextChange1 = (newText: string) => {
    setDisplayText1(newText);
  };

  const handleDownloadImage = () => {
    const container = containerRef.current;

    html2canvas(container, { useCORS: true })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'canvas_image.png';
        link.click(); 
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const handleDownloadPDF = () => {
    const container = containerRef.current;

    html2canvas(container, { useCORS: true })
      .then((canvas) => {
        const imageData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imageData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('canvas_image.pdf');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <div className="canvas_widget">
      <div className="canvas_widget-lft">
        <TextBoxComponent onTextChange={handleTextChange} onTextChange1={handleTextChange1} />
      </div>

      <div className="canvas_widget-rgt">
        <div id="canvas" ref={containerRef}>
          <div className="canvas-lft">
            <h3>{displayText}</h3>
            <p>{displayText1}</p>
          </div>

          <div className="canvas-rgt">
            <div className="qr_pict"></div>

            <div className="mobile_scan"> 
                <img src="https://static.iviva.com/images/scan-lucy-mobile.png" alt="Logo"></img>  
            </div>
          </div>
        </div>
      </div>

      {showDownloadButtons && (
        <div className="canvas_bottom">
          <button className="download-canvas-img" onClick={handleDownloadImage}>
            Download Canvas
          </button>
          <button className="download-canvas-pdf" onClick={handleDownloadPDF}>
            Download Canvas as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default CanvasComponent;
