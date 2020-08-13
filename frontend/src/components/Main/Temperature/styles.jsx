import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  .container {
    width: 100%;
    text-align: center;
  }
  ${(props) => props.myTemp}
  @keyframes progressAnimationStrike {
    from {
      width: ${(props) => props.myTemp};
    }
    to {
      width: ${(props) => props.currentTemp}%;
    }
  }

  .progress2 {
    padding: 6px;
    border-radius: 0.4rem;
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
    width: ${(props) => props.currentTemp}%;
    background-color: #ef476f;
    animation: progressAnimation 6s;
  }

  $green: #4cd964;
  $turquoise: #5ac8fa;
  $blue: #007aff;
  $light-blue: #7dc8e8;
  $purple: #5856d6;
  $red: #ff2d55;
`;
