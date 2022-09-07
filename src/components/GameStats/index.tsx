// Imports styled components
import {
  GameStatsWrapper,
  GameStatsList,
  GameStatsListLabel,
  GameStatsListValue,
} from "./styled";

// Imports redux stuff
import { useAppSelector } from "../../redux";

export const GameStats = () => {
  const { level, rowsToLevelUp, score } = useAppSelector((state) => state.game);

  return (
    <GameStatsWrapper>
      <GameStatsList>
        <GameStatsListLabel>Level</GameStatsListLabel>
        <GameStatsListValue>{level}</GameStatsListValue>
        <GameStatsListLabel>Lines to Next Level</GameStatsListLabel>
        <GameStatsListValue>{rowsToLevelUp}</GameStatsListValue>
        <GameStatsListLabel>Score</GameStatsListLabel>
        <GameStatsListValue>{score}</GameStatsListValue>
      </GameStatsList>
    </GameStatsWrapper>
  );
};
