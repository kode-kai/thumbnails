import React from 'react';
import { Div, Img, H1, H2 } from './Thumbnail.styled';
import html2canvas from 'html2canvas';

const Thumbnail = ({ subtitle = 'subtitle', theme }) => {
  const containerRef = React.useRef();
  const imageRef = React.useRef();

  const doCapture = () => {
    html2canvas(containerRef.current).then(canvas => {
      window.scrollTo(0,0);
      imageRef.current.src = canvas.toDataURL('image/jpeg', 1.0);
      containerRef.current.style.display = "none";
    });
  }

  React.useEffect(() => {
    doCapture();
  }, []);

  const handleClick = () => {
    doCapture();
  }

  return (
    <>
      <Div ref={containerRef} className={theme}>
        <H1>kode kai</H1>
        <H2>{subtitle}</H2>
      </Div>
      <Img ref={imageRef} />
      <br/>
      <input type="button" onClick={handleClick} value="Capture"/>
    </>
  )
};

export default Thumbnail;