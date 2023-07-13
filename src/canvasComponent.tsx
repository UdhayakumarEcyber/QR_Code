import React, { useEffect } from 'react';

const CanvasComponent = () => {
    useEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        const context1 = canvas.getContext('2d');
  
      context.font = '1em Comic Sans MS';
      context.fillStyle = 'white';
      context.fillText('The Circuit Scan to book', 0, 80, 150 );
  
      const scan_lucy_mobile = new Image();
      scan_lucy_mobile.src =
        'https://static.iviva.com./images/Udhayimages/Lucy_home_new/Lucy-icon.svg';
      scan_lucy_mobile.onload = () => {
        context1.drawImage(scan_lucy_mobile, 175, 112, 70, 25);
      };
  
      const qr_img = new Image();
      qr_img.src = 'https://static.iviva.com/images/QR-code.svg';
      qr_img.onload = () => {
        context.drawImage(qr_img, 190, 20, 100, 75);
      };
  
      context1.font = '9px Comic Sans MS';
      context1.fillStyle = 'white';
      context1.fillText('Scan with Lucy Mobile', 205, 126, 100 );
    }, []);
  
    return <canvas id="canvas" />;
  };
  
  export default CanvasComponent;
  