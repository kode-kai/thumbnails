import styled from "styled-components";
import React from "react";

const Div = styled.div`
  background-color: #f8e71c;
  color: #b50218;
  zoom: ${(props) => props.previewZoom};
  width: 1920px;
  height: 1080px;

  > h1 {
    font-family: "Knewave", cursive;
    text-align: center;
    font-weight: normal;
  }

  > h2 {
    font-family: "Montserrat", sans-serif;
    text-align: center;
    padding: 0 50px;
  }

  background-color: ${(props) => (props.isDark ? `#160f29` : `#f8e71c`)};
  color: ${(props) => (props.isDark ? `white` : `#b50218`)};
`;

const Design = ({ previewZoom, isDark, subtitle, containerRef }) => {
  return (
    <Div ref={containerRef} previewZoom={previewZoom} isDark={isDark}>
      <h1 style={{ fontSize: 400 }}>kode kai</h1>
      <h2 style={{ fontSize: 150 }}>{subtitle}</h2>
    </Div>
  );
};

export default Design;
