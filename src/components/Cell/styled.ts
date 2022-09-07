import styled from "styled-components";

// Imports types
import { CellType } from "../../utils/types";

export const CellWrapper = styled.div<{
  type: CellType;
}>`
  width: auto;

  aspect-ratio: 1/1;

  border-top: 0.03em solid hsl(0, 0%, 25%);
  border-left: 0.03em solid hsl(0, 0%, 25%);
  border-bottom: 0.03em solid hsl(0, 0%, 15%);
  border-right: 0.03em solid hsl(0, 0%, 15%);

  border-radius: 0.1em;

  border: ${(props) => !props.type && "none"};
  background-color: ${(props) => `var(--${props.type})`};
`;
