import { STATS_FILE } from "../config"

export const readStatsFile = async () => {
  let data = {}

  if (window.fs) {
    if (window.fs.existsSync(STATS_FILE)) {
      data = await window.fs.promises.readFile(STATS_FILE)
    }
  } else {
    // running in Vite dev server
    data = (await import('../../data/stats.json')).default
  }

  return data
}
