import styled from "styled-components";

export const BoardWrapper = styled.div<{
  rows: number;
  cols: number;
}>`
  grid-area: view;
  display: grid;
  min-width: 50vw;
  aspect-ratio: 1/1.5;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  background-color: var(--board-color);
  border-radius: 0.2em;
  overflow: hidden;

  @media screen and (min-width: 700px) {
    min-width: 25vw;
  }
`;
