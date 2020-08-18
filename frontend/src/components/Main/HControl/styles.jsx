import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  .happy {
    border-style: outset;
    border-radius: 10px;
  }
  .ThemeBox {
    width: 70%;
    height: 100%;
  }
  .SelBox {
    display: flex;
    height: 50%;
    justify-content: center;
    align-items: center;
  }
  .mySwitch {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .myTitleW {
    color: white;
    padding-top: 5%;
    font-size: 1.1vw;
  }
  select {
    width: 90%;
    height: 100%;
    border-radius: 10px;
    padding-left: 10%;
    font-size: 1.1vw;
    letter-spacing: 1px;
  }
  .NumBox {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .SpecialOne {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    text-align: center;
    font-size: 1.1vw;
    letter-spacing: 1px;
    outline: none;
  }
  .SpecialButton {
    width: 100%;
    height: 95%;
    color: white;
    background-color: #22b8cf;
  }
  option {
    height: 100px;
    font-size: 1.1vw;
  }
  h3 {
    color: white;
    font-size: 1.2rem;
  }
  .nameOf {
    padding-left: 25%;
  }
  .3boxes {
    height: 100%;
  }
  .2boxes {
    height: 100%;
  }
  .titles {
    height: 50%;
    text-align: center;
    letter-spacing: 2px;
    background: #22b8cf;
  }
  .topL {
    border-top-left-radius: 10px;
  }
  .topR {
    border-top-right-radius: 10px;
  }
  .theSwitch {
    display: flex;
    justify-content: center;
    align-items: center;
    .switch {
      display: flex;
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: #22b8cf;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  }
`;

export const TurtleSign = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
`;
