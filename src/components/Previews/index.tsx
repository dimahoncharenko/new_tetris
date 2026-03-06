import { PreviewsWrapper } from "./styled";

import { Preview } from "./Preview";

import { useAppSelector } from "../../redux";

export const Previews = () => {
  const previews = useAppSelector((state) => state.game.nextPlayers);

  return (
    <PreviewsWrapper>
      {previews.map(({ shape }, key) => (
        <Preview type={shape} key={key} />
      ))}
    </PreviewsWrapper>
  );
};
