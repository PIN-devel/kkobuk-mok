import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  .container {
    margin-left: 100px;
    width: 350px;
    height: 350px;
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
    background-color: yellow;
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

  .whiteCircle {
    border-radius: 50%;
    background-color: white;
    width: 200px;
    height: 200px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  }

  .score {
    width: 240px;
    height: 240px;
    z-index: 100;
    border-radius: 50%;
    background-color: white;
    .myscore {
      margin-left: 40px;
      margin-top: 60px;
      text-align: center center;
      font-size: 80px;
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
