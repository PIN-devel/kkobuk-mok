import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-width: medium;
  border-style: ridge;
  border-color: gray;
  #app {
    margin-top: 40px;
  }
  
  #progressInput {
    margin: 20px auto;
    width: 30%;
  }
  
  .circle-background,
  .circle-progress {
    fill: none;
  }
  
  .circle-background {
    stroke: #ddd;
  }
  
  .circle-progress {
    stroke: red;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  
  .circle-text {
    font-size: 3em;
    font-weight: bold;
    fill: red;
  }
`;