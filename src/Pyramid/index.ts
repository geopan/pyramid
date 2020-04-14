import mkdirp from "mkdirp"
import tiler, { PyramidOptions } from "./Tiler"
import rimraf from "rimraf"

const create = async (options: PyramidOptions) => {

  const tileSize = options.tileSize || 256;
  const tmpDir = options.tmpDir || process.env.TMPDIR || "/tmp";
  const tempDir = `${tmpDir}/pyramid_tiler_${process.pid}`;

  try {

    await mkdirp(tempDir)

    await tiler.createLevel(
      {
        ...options,
        tileSize,
        zoom: 0,
        tmpDir,
        tempDir,
        quality: options.quality || 100
      }
    )

  } catch (err) {
    console.error(err)
  }

  rimraf(tempDir, (err: Error) => {
    if (err) { console.error(err) }
  });

};

export default { create }
