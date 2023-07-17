  
import React, { useRef, useEffect } from 'react'; 
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';   

 
const TextCanvasComponent = () => {
  const canvasRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const context1 = canvas.getContext('2d');
 
    const customFont = new FontFace('CustomFont', 'url(../fonts/nunito-regular-webfont.woff2)');
     

    const drawFirstLabel = (text: any, x: number, y: number) => { 

      const fontFamily = 'CustomFont';
      const fontSize = '1.5em';  
      context.font =  `${fontSize} ${fontFamily}`; 
      context.fillStyle = 'White'; 
      context.fillText(text, 10, 30);
    }; 

 
    const drawSecondLabel = (text: any, x: number, y: number) => {
        // context.font = '1em Arial';
        context.fillStyle = 'White';  
        const fontFamily = 'CustomFont';
        const fontSize = '1em';  
        context.font =  `${fontSize} ${fontFamily}`; 
        context.fillText(text, 20, 60);
      };
 
    const clearText = (x: number, y: number, width: any, height: number) => {
      context.clearRect(x, y, width, height);
    };
  

    const handleInputChange = () => {
      const inputText1 = inputRef1.current.value;
      const inputText2 = inputRef2.current.value;
    
      clearText(0, 30 - 20, context.measureText(inputText1).width, 30);
      clearText(0, 60 - 20, context.measureText(inputText2).width, 30);
    
      if (inputText1 === '') {
        clearText(0, 30 - 20, context.measureText('placeholder').width, 30);
      } else {
        drawFirstLabel(inputText1, 0, 30);
      }
    
      if (inputText2 === '') {
        clearText(0, 60 - 20, context.measureText('placeholder').width, 30);
      } else {
        drawSecondLabel(inputText2, 0, 60);
      }
    }; 
     
     
    context.fillStyle = 'white';
    const borderRadius = 10;
    const rectX = 180;
    const rectY = 12;
    const rectWidth = 120;
    const rectHeight = 90;
    context.beginPath();
    context.moveTo(rectX + borderRadius, rectY);
    context.lineTo(rectX + rectWidth - borderRadius, rectY);
    context.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + borderRadius, borderRadius);
    context.lineTo(rectX + rectWidth, rectY + rectHeight - borderRadius);
    context.arcTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - borderRadius, rectY + rectHeight, borderRadius);
    context.lineTo(rectX + borderRadius, rectY + rectHeight);
    context.arcTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - borderRadius, borderRadius);
    context.lineTo(rectX, rectY + borderRadius);
    context.arcTo(rectX, rectY, rectX + borderRadius, rectY, borderRadius);
    context.closePath();
    context.fill();
    
      const qr_img = new Image();
        qr_img.src = "https://static.iviva.com/images/QR-code.svg";
        qr_img.onload = () => {
          context.drawImage(qr_img, 190, 20, 100, 75);
      }; 

      const scan_lucy_mobile = new Image();
      scan_lucy_mobile.src =
        "https://static.iviva.com./images/Udhayimages/Lucy_home_new/Lucy-icon.svg";
      scan_lucy_mobile.onload = () => {
        const context1 = canvas.getContext("2d");
        context1.drawImage(scan_lucy_mobile, 175, 112, 70, 25);
      };
  
      // context1.font = "9px Comic Sans MS";
      // context1.fillStyle = "black";
      // context1.fillText("Scan with Lucy Mobile", 205, 126, 100 );

       // Load the custom font
      
       customFont.load().then((font) => {
         document.fonts.add(font);
  
         const fontFamily = 'CustomFont';
         const fontSize = '9px';
         context.font = `${fontSize} ${fontFamily}`;
  
         context1.fillText("Scan with Lucy Mobile", 205, 126, 100 );
       });



      inputRef1.current.addEventListener('input', handleInputChange);
      inputRef2.current.addEventListener('input', handleInputChange);

      return () => {
        inputRef1.current.removeEventListener('input', handleInputChange);
        inputRef2.current.removeEventListener('input', handleInputChange);
      };
  }, []);
 

  const handleDownloadImage = () => {
    const container = containerRef.current;

    html2canvas(container)
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

    html2canvas(container)
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
    
                <div className="input-content">
                      <ul>
                         <li>
                             <label>First Label</label>
                             <input type="text" ref={inputRef1} placeholder=" " />
                         </li>  
                       <li>
                            <label>Second Label</label>
                             <input type="text" ref={inputRef2} placeholder=" " />
                        </li>  
                    </ul> 
               </div> 
           
        </div> 
    
        <div className="canvas_widget-rgt"  ref={containerRef}>
            <canvas id="canvas" ref={canvasRef} > </canvas>
        </div>  

        <div className='canvas_bottom'>
            <button className='download-canvas-img' onClick={handleDownloadImage}>Download Canvas</button> 
            <button className='download-canvas-pdf' onClick={handleDownloadPDF}>Download Canvas as PDF</button> 
        </div>
     </div> 

  );
};


export default TextCanvasComponent;
 