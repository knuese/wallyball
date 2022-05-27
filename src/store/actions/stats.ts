import { Dispatch } from "react";
import { LOAD_STATS, StatActionTypes } from "../types/stats";
import { readStatsFile } from "../../util";

export const loadStats = () => async (dispatch: Dispatch<StatActionTypes>): Promise<void> => {
  const stats = await readStatsFile()
  console.log(stats)

  dispatch({ type: LOAD_STATS, payload: stats })
}
