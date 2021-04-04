import React from 'react';
import domtoimage from 'dom-to-image';

import PlaceholderImage from '../../assets/placeholder.png';
import { Div, Img } from './Thumbnail.styled';

const initialText = 'example';

const Thumbnail = () => {
  const [subtitle, setSubtitle] = React.useState(initialText);
  const [source, setSource] = React.useState('');
  const [isDark, setIsDark] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);

  const containerRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const anchorRef = React.useRef(null);

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
    setIsDisabled(false);
    domtoimage.toPng(input).then(imgData => {
      window.scrollTo(0,0);
      imageRef.current.src = imgData;
      setSource(imgData);
      input.style.display = "none";
    });
  }

  const handleDownload = () => {
    anchorRef.current.href = source;
    anchorRef.current.download = 'Thumbnail.png';
    document.body.appendChild(anchorRef.current);
    anchorRef.current.click();
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
        <input placeholder="Enter your topic here" onChange={handleChange} type="text"/>
        <input type="button" value="Invert Theme" onClick={handleTheme}/>
        <br />
        <input type="button" value="Capture" onClick={handleClick}/>
        <input type="button" value="Reload" onClick={handleReload}/>
        <input type="button" value="Download" onClick={handleDownload} disabled={isDisabled}/>
        <div>
          <a ref={anchorRef} href='#' style={{display: 'none'}} />
        </div>
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