import styled from "styled-components";

export const GameStatsWrapper = styled.div`
  grid-area: score;
  max-width: 100px;
  font-family: monospace;
`;

export const GameStatsListLabel = styled.li`
  font-size: max(0.8rem, 1.3vw);
  color: hsl(0, 0%, 100%);
`;

export const GameStatsListValue = styled.li`
  font-size: max(0.6rem, 1.3vw);
  color: hsla(0, 0%, 100%, 0.5);
  margin-bottom: 1em;
`;

export const GameStatsList = styled.ul`
  list-style: none;
  padding-left: 0.5em;
  display: flex;
  flex-direction: column;
  text-align: right;
  padding: 0em 1em;
`;
