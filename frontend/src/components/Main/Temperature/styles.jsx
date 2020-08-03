import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  $wrapper-card-bg: rgba(21, 34, 46, 0.25);
  $gauge-shadow: 0 0 0 6px rgba(255, 255, 255, 0.09),
    0 0 35px 5px rgba(255, 255, 255, 0.29);
  $gauge-bg: #e7e7e7;
  $gauge-common-color: #15222e;
  $gauge-slice-default-color: #000;
  $gauge-first-slice-color: #1eaa59;
  $gauge-second-slice-color: #9baa1e;
  $gauge-third-slice-color: #f1c40f;
  $gauge-fourth-slice-color: #e67e22;
  $gauge-fifth-slice-color: #e84c3d;
  $color-white: #fff;

  body {
    background: linear-gradient(45deg, #15222e, #8100e0);
    height: 100vh;
  }

  .wrapper {
    display: table;
    margin: 0 auto;
    background: $wrapper-card-bg;
    padding: 35px 40px 40px;
    border-radius: 6px;
    box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.32), 0 1px 9px -1px #15222e;
  }

  .wrapper-header {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    color: rgba(255, 255, 255, 0.74);
    margin: 30px 0 15px;
    font-weight: normal;
  }

  .heart {
    margin: 0 8px;
    display: inline-block;
    animation: simplePulse ease-in-out 1.1s infinite;
  }

  .gauge {
    font-family: Arial, Helvetica, sans-serif;
    background: $gauge-bg;
    box-shadow: $gauge-shadow;
    width: 200px;
    height: 100px;
    border-radius: 100px 100px 0 0;
    position: relative;
    overflow: hidden;

    /* safari fix */
    -webkit-transform-style: flat;
    -webkit-transform: translateZ(0px);

    &.min-scaled {
      transform: scale(0.5);
    }
  }

  .gauge-center {
    content: "";
    color: $color-white;
    width: 60%;
    height: 60%;
    background: $gauge-common-color;
    border-radius: 100px 100px 0 0;
    position: absolute;
    box-shadow: 0 -13px 15px -10px rgba(0, 0, 0, 0.28);
    right: 21%;
    bottom: 0;
    color: $color-white;
    &::before {
      content: "128";
      font-size: 1.5em;
      width: 100%;
      padding: 10px 0 0 0;
      text-align: center;
      float: left;
      -webkit-font-smoothing: antialiased;
    }
    &::after {
      content: "units";
      width: 100%;
      float: left;
      opacity: 0.6;
      text-align: center;
    }
  }

  .needle {
    width: 78px;
    height: 7px;
    background: $gauge-common-color;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 100%;
    border-top-right-radius: 5px;
    position: absolute;
    bottom: 4px;
    left: 20px;
    transform-origin: 100% 4px;
    animation: speed 5s infinite;
    box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.38);
  }

  .slice-colors .st {
    position: absolute;
    bottom: 0;
    width: 60px;
    height: 0;
    border-bottom: 80px solid $gauge-slice-default-color;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    &.slice-item {
      &:nth-child(1) {
        border-bottom-color: $gauge-first-slice-color;
        left: -2px;
      }
      &:nth-child(2) {
        border-bottom-color: $gauge-second-slice-color;
        transform: rotate(135deg);
        transform-origin: right;
        top: 12px;
        left: -65px;
      }
      &:nth-child(3) {
        border-bottom-color: $gauge-third-slice-color;
        transform: rotate(179deg);
        transform-origin: right;
        top: -20px;
        left: -62px;
        border-bottom-width: 90px;
        border-left-width: 45px;
        border-right-width: 45px;
        width: 18px;
      }
      &:nth-child(4) {
        border-bottom-color: $gauge-fourth-slice-color;
        transform: rotate(219deg);
        transform-origin: right;
        top: -23px;
        left: 43px;
      }
      &:nth-child(5) {
        border-bottom-color: $gauge-fifth-slice-color;
        transform: rotate(240deg);
        transform-origin: right;
        right: 52px;
      }
    }
  }

  @-webkit-keyframes speed {
    0% {
      transform: rotate(0);
    }

    40% {
      transform: rotate(180deg);
    }

    55% {
      transform: rotate(170deg);
    }

    75% {
      transform: rotate(180deg);
    }
  }

  @-webkit-keyframes simplePulse {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 0.98;
      //transform: scale(1.3); to do: fix display render issue;
    }
  }
`;
