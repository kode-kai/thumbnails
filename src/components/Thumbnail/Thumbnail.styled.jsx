import styled from 'styled-components';

export const Img = styled.img`
  width: 960px;
  height: 540px;
  border: 2px dashed black;
`;

export const Div = styled.div`
  background-color: #f8e71c;
  color: #b50218;
  width: 1920px;
  height: 1080px;

  > h1 {
    font-family: 'Knewave', cursive;
    text-align: center;
    font-weight: normal;
  }

  > h2 {
    font-family: 'Montserrat', sans-serif;
    text-align: center;
  }

  background-color: ${props => (props.isDark ? `#160f29` : `#f8e71c`)};
  color: ${props => (props.isDark ? `white` : `#b50218`)};
  
`;
