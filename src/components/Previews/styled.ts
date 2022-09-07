import styled from "styled-components";

export const PreviewsWrapper = styled.div`
  grid-area: previews;
  padding: 0em 1em;
  max-width: 130px;
`;

export const PreviewWrapper = styled.div<{
  rows: number;
  cols: number;
}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, 2.5vw);
  grid-template-rows: repeat(${(props) => props.rows}, 2.5vw);
  aspect-ratio: 1/1;
  margin: 0;
  max-width: 120px;
  place-content: center;
  background-color: hsla(0, 0%, 0%, 0.5);
  border-radius: 0.3em;
  padding: 0.2em;

  & + & {
    margin-top: 1em;
  }

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(${(props) => props.cols}, 1.5vw);
    grid-template-rows: repeat(${(props) => props.rows}, 1.5vw);
    min-height: 90px;
  }
`;
