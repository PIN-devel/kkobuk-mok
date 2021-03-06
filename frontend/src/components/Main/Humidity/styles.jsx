import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 95%;
  display: flex;
  align-items: center;
  .container {
    width: 100%;
    height: 30%;
  }
  @keyframes progressAnimationStrike {
    from {
      width: ${(props) => props.myHu};
    }
    to {
      width: ${(props) => props.currentHu}%;
    }
  }
  .word {
    padding-left: 37%;
  }
  .progress2 {
    padding: 6px;
    background: transparent;
    border-radius: 0.4rem;
    overflow: hidden;
    background: #26323d;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
      0 1px rgba(255, 255, 255, 0.08);
  }

  .progress-bar2 {
    height: 40px;
    border-radius: 0.4rem;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.05)
    );
    transition: 0.4s linear;
    transition-property: width, background-color;
  }

  .progress-moved .progress-bar2 {
    width: ${(props) => props.currentHu}%;
    background-color: #66d3fa;
    animation: progressAnimation 6s;
  }

  $green: #4cd964;
  $turquoise: #5ac8fa;
  $blue: #007aff;
  $light-blue: #7dc8e8;
  $purple: #5856d6;
  $red: #ff2d55;
  }
  .words {
    display: flex;
    justify-content: space-between;
    color: #66d3fa;
  }
  .Whole {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
