import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .profileInfo {
    margin-left: 50px;
  }
  .profileButton {
  }
  .Today {
    text-align: center;
    .chartTitle {
      margin-top: 200px;
    }
  }
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 2px;
`;
