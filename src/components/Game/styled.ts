import styled from "styled-components";

export const GameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
`;

export const Modal = styled.div<{
  showed: boolean;
}>`
  display: ${(props) => (props.showed ? "block" : "none")};
  width: 100%;
  position: absolute;
  top: 50%;
  background-color: hsla(0, 0%, 100%, 0.7);
  font-family: "Press Start 2P", cursive;
  padding: 2vw;
  text-align: center;
  z-index: 1000;
  font-size: max(2vw, 1rem);
  color: var(--board-color);
`;
