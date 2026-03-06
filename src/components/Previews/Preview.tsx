import { Fragment, memo } from "react";

import { PreviewWrapper } from "./styled";

import { CellType } from "../../utils/types";
import { TETROMINOS } from "../../utils/functionality";

import { Cell } from "../Cell";

type Props = {
  type: CellType;
};

export const Preview = memo(({ type }: Props) => {
  const tetromino = TETROMINOS[type];

  return (
    <PreviewWrapper
      rows={tetromino.shape.length}
      cols={tetromino.shape[0].length}
    >
      {tetromino.shape.map((row) =>
        row.map((col, x) => (
          <Fragment key={x * tetromino.shape.length + x}>
            {col ? (
              <Cell type={type} />
            ) : (
              <Cell
                type=""
                styles={{ border: ".005em solid hsl(0, 0%, 20%)" }}
              />
            )}
          </Fragment>
        ))
      )}
    </PreviewWrapper>
  );
});
