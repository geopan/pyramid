import mkdirp from "mkdirp"
import tiler, { PyramidOptions } from "./tiler"

const sizeOf = require("image-size");
const rimraf = require("rimraf");

const createTiles = async (options: PyramidOptions) => {

  const tileSize = options.tileSize || 256;
  const tmpDir = options.tmpDir || process.env.TMPDIR || "/tmp";
  const tempDir = `${tmpDir}/pyramid_tiler_${process.pid}`;

  let zoomToDisplay = 0

  const size = sizeOf(options.inPath);
  const halvingsWidth = Math.ceil(Math.log2(Math.ceil(size.width / tileSize)));
  const halvingsheight = Math.ceil(
    Math.log2(Math.ceil(size.height / tileSize))
  );

  zoomToDisplay = Math.max(halvingsWidth, halvingsheight)

  try {

    await mkdirp(tempDir)

    await tiler.record(
      {
        ...options,
        tileSize,
        zoom: 0,
        tmpDir,
        tempDir,
        zoomToDisplay,
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

export default createTiles
