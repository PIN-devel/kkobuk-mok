import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .summary {
    width: 1020px;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    justify-content: space-between;
    margin: 10px;
  }

  .summary--tiles--value {
    font-family: "Montserrat", sans-serif;
    font-size: 25px;
    fill: #707173;
  }

  .summary--tiles--label {
    text-align: center;
    font-size: 15px;
    fill: #ba6a5d;
  }
`;
