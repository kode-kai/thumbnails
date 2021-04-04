import React from "react";
import domtoimage from "dom-to-image";
import styled from "styled-components";
import PlaceholderImage from "../../assets/placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faRecycle,
  faDownload,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

import Design from "./Design";

const initialText = "PLACEHOLDER";

const Img = styled.img`
  width: 960px;
  height: 540px;
  border: 2px dashed black;
`;

const Thumbnail = () => {
  const [rendered, setRendered] = React.useState(false);
  const [previewZoom, setPreviewZoom] = React.useState(0.5);
  const [subtitle, setSubtitle] = React.useState(initialText);
  const [source, setSource] = React.useState("");
  const [isDark, setIsDark] = React.useState(false);

  const containerRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const anchorRef = React.useRef(null);

  React.useEffect(() => {
    if (rendered === true) {
      containerRef.current.style.display = "none";
      imageRef.current.style.display = "block";
    } else {
      imageRef.current.style.display = "none";
      if (containerRef.current != null) {
        containerRef.current.style.display = "block";
      }
    }
  }, [rendered]);

  React.useEffect(() => {
    setRendered(false);
    setPreviewZoom(0.5);
  }, [subtitle]);

  const handleChange = (e) => {
    const text = e.target.value;
    setSubtitle(text);
  };

  const handleTheme = () => setIsDark((isDark) => !isDark);

  const handleCapture = () => {
    setPreviewZoom(1.0);
    const input = containerRef.current;
    domtoimage.toPng(input).then((imgData) => {
      window.scrollTo(0, 0);
      imageRef.current.src = imgData;
      setSource(imgData);
      setRendered(true);
    });
  };

  const handleDownload = () => {
    anchorRef.current.href = source;
    anchorRef.current.download = "Thumbnail.png";
    document.body.appendChild(anchorRef.current);
    anchorRef.current.click();
  };

  const handleReload = () => {
    window.location.reload();
    return false;
  };

  return (
    <div>
      <div>
        <Img src={PlaceholderImage} ref={imageRef} id="myImage" alt="canvas" />
        <Design
          containerRef={containerRef}
          id="div"
          previewZoom={previewZoom}
          isDark={isDark}
          subtitle={subtitle}
        />
      </div>
      <br />
      <input
        placeholder="Enter your topic here"
        onChange={handleChange}
        type="text"
      />
      <button onClick={handleCapture} disabled={rendered}>
        <FontAwesomeIcon icon={faCameraRetro} />
      </button>
      <button onClick={handleReload}>
        <FontAwesomeIcon icon={faRecycle} />
      </button>
      <button onClick={handleDownload} disabled={!rendered}>
        <FontAwesomeIcon icon={faDownload} />
      </button>
      <button onClick={handleTheme}>
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
      </button>
      <a
        ref={anchorRef}
        href="https://kodekai.com/thumbnails"
        style={{ display: "none" }}
      >
        Download thumbnail
      </a>
      <br />
    </div>
  );
};

export default Thumbnail;
