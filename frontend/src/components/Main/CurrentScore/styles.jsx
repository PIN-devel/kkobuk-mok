import styled from "styled-components";

export const Wrapper = styled.div`
  padding-left: 10%;
  padding-top: 10%;
  .container {
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    border-radius: 50%;
  }

  .blueCircle {
    border-radius: 50%;
    background-color: deepskyblue;
    width: 200px;
    height: 200px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  }

  .yellowCircle {
    border-radius: 50%;
    background-color: orange;
    width: 200px;
    height: 200px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  }

  .redCircle {
    border-radius: 50%;
    background-color: red;
    width: 200px;
    height: 200px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  }

  .purpleCircle {
    border-radius: 50%;
    background-color: purple;
    width: 150px;
    height: 150px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  }

  .score {
    width: 180px;
    height: 180px;
    z-index: 100;
    border-radius: 50%;
    background-color: white;
    .myscore {
      margin-left: 40px;
      margin-top: 60px;
      text-align: center center;
      font-size: 50px;
    }
  }
  @keyframes scaleIn {
    from {
      transform: scale(1, 1);
      opacity: 0.5;
    }
    to {
      transform: scale(3, 3);
      opacity: 0;
    }
  }
`;
