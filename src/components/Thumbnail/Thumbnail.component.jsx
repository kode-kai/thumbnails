import React from 'react';
import domtoimage from 'dom-to-image';

import PlaceholderImage from '../../assets/placeholder.png';
import { Div, Img } from './Thumbnail.styled';

const initialText = 'example';

const Thumbnail = () => {
  const [subtitle, setSubtitle] = React.useState(initialText);
  const [isDark, setIsDark] = React.useState(false);
  const containerRef = React.useRef(null);
  const imageRef = React.useRef(null);

  React.useEffect(() => { 
    (subtitle !== initialText) ? containerRef.current.style.display = '' : 
      containerRef.current.style.display = 'none'; 
  }, [subtitle]);

  const handleChange = (e) => {
    const text = e.target.value;
    setSubtitle(text);
  }

  const handleTheme = () => setIsDark(isDark => !isDark);
  
  const handleClick = () => {
    const input = containerRef.current;
    domtoimage.toPng(input).then(imgData => {
      window.scrollTo(0,0);
      console.log(imgData);
      imageRef.current.src = imgData;
      input.style.display = "none";
    });
  }

  const handleReload = () => {
    window.location.reload();
    return false;
  }

  return (
    <>
      <div>
        <Img src={PlaceholderImage} ref={imageRef} id="myImage" alt="canvas"/>
        <br/>
        <input placeholder="Enter your text here" onChange={handleChange} type="text"/>
        <input type="button" value="Invert Theme" onClick={handleTheme}/>
        <br />
        <input type="button" value="Capture" onClick={handleClick}/>
        <input type="button" value="Reload" onClick={handleReload}/>
        <br />
      </div>
      <div>
        <Div ref={containerRef} id="div" isDark={isDark}>
          <h1 style={{fontSize: 400}}>kode kai</h1>
          <h2 style={{fontSize: 150}}>{subtitle}</h2>
        </Div>
      </div>
    </>
  )
};

export default Thumbnail;