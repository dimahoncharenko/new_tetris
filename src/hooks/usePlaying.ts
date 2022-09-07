// Imports libraries
import { useEffect } from "react";

// Imports redux stuff
import { useAppSelector, useAppDispatch } from "../redux";
import { updatePlayer } from "../redux/slices/game";

// Imports additional functionality
import { SPEED_STEP, MIN_SPEED } from "../utils/functionality";

export const usePlaying = () => {
  const dispatch = useAppDispatch();
  const {
    player: { speed },
    level,
  } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (!speed) return;
    // Deceleration rate of the first level is 0 however, in other ones will be increased by SPEED_STEP each level
    const deceleration = SPEED_STEP * (level - 1);
    const newSpeed = Math.max(MIN_SPEED, speed - deceleration);

    dispatch(updatePlayer({ speed: newSpeed }));
  }, [level, dispatch]);
};
