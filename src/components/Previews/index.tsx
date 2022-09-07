// Imports styled components
import { PreviewsWrapper } from "./styled";

// Imports components
import { Preview } from "./Preview";

// Imports redux stuff
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
