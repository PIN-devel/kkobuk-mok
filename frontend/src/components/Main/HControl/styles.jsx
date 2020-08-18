import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  .happy {
    border-style: outset;
    border-radius: 30px;
  }
  .ThemeBox {
    width: 70%;
    height: 100%;
    padding-bottom: 5%;
  }
  .mySwitch {
  }
  .myTitleW {
    padding-top: 5%;
  }
  select {
    width: 90%;
    height: 100%;
    border-radius: 10px;
    padding-left: 30%;
    font-size: 1rem;
    letter-spacing: 1px;
  }
  .NumBox {
    width: 100%;
    height: 100%;
    input {
      margin-right: 15px;
    }
  }
  .SpecialOne {
    width: 60px;
    height: 36px;
    border-radius: 10px;
    text-align: center;
    font-size: 1rem;
    letter-spacing: 1px;
    outline: none;
  }
  .SpecialButton {
    width: 60px;
    height: 36px;
    color: white;
    background-color: #22b8cf;
  }
  option {
    height: 100px;
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
    border-top-left-radius: 30px;
  }
  .topR {
    border-top-right-radius: 30px;
  }
  .SelBox {
    display: flex;
    justify-content: center;
    align-items: center;
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
