import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 60%;
  justify-content: center;
  border-style: outset;
  border-radius: 30px;
  margin-top: 30px;
  padding: 25px 15px;
  background-color: #1abc9c;
  background-image: url("/images/tech-neck.jpg");
  background-size: cover;

  // background-size: contain;
  // background-repeat: no-repeat;
  background-size: 100% 100%;

  h2 {
    color: white;
  }
`;
