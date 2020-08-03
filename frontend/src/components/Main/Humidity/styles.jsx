import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  @keyframes grow {
    from {
      width: 0%;
    }
    to {
      width: ${(props) => props.value}%;
    }
  }
  .container {
    position: relative;
    width: 50vw;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .words {
      display: flex;
      justify-content: space-between;
    }
  }
  input {
    display: none;
  }
  label {
    position: relative;
    display: block;
    width: 100%;
    height: 40px;
    background: transparent;
    border-radius: 0.4rem;
    border: 2px solid white;
    overflow: hidden;
    box-shadow: -2px 0 8px 0 rgba(white, 0.6);
    div {
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(to bottom, #a3e2ef 35%, #4f9cc0);
      height: 100%;
      width: 0%;
      animation: grow 2s forwards;
      box-shadow: 0 0 8px 1px white inset;
      &:before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/172299/bubbles-mask.gif);
        mix-blend-mode: overlay;
        opacity: 0.5;
      }
    }
  }
  span {
    display: inline-block;
    color: #000;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-top: 0.7rem;
    &:last-child {
      float: right;
    }
  }
  .mybox {
    border-width: low;
    border-color: gray;
  }
`;
