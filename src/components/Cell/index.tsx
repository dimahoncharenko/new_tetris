import { CSSProperties, MouseEventHandler, memo } from "react";

import { CellWrapper } from "./styled";

import { CellType } from "../../utils/types";

type Props = {
  type: CellType;
  onClick?: MouseEventHandler;
  styles?: CSSProperties;
};

export const Cell = memo(({ type, styles, onClick = () => {} }: Props) => {
  return (
    <CellWrapper style={styles} onClick={onClick} type={type}></CellWrapper>
  );
});
