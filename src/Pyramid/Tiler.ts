import { execSync } from "child_process"
import path from "path"
import fs from "fs"
import mkdirp from "mkdirp";

import { Image, Pattern } from '../utils'

export interface PyramidOptions {
  inPath: string;
  outPath: string;
  pattern: string;
  tileSize?: number;
  tmpDir?: string;
  tempDir?: string;
  quality?: number;
}

export interface TilerOptions extends PyramidOptions {
  zoom: number,
  zoomToDisplay?: number;
}

// create tiles for a given image at a given zoom level
async function createTiles(options: TilerOptions): Promise<void> {

  const { inPath, outPath, pattern, zoom, tileSize, quality } = options
  const { ext, filename, pathname } = Pattern.decompose(pattern, zoom, tileSize)

  await mkdirp(outPath + path.sep + pathname)

  const cmd = `convert ${inPath} -crop ${tileSize}x${tileSize} -set filename:tile "${filename}" -quality ${quality} +repage +adjoin "${outPath}/%[filename:tile]${ext}"`;

  execSync(cmd);

}

// create each zoom level for an image
async function createLevel(options: TilerOptions): Promise<void> {

  const { tempDir, zoom, inPath, tileSize = 256, quality } = options

  const zoomToDisplay = options.zoomToDisplay || Image.maxZoom(options.inPath, tileSize);

  const inPathMpc = `${tempDir}/temp_level_${zoom}.mpc`;

  execSync(`convert ${inPath} ${inPathMpc}`);

  await createTiles({ ...options, inPath: inPathMpc, zoom: zoomToDisplay })

  if (Image.isBiggerThanTile(inPath, tileSize)) {

    const newInPath = `${tempDir}/temp_level_${zoom}.png`;

    execSync(`convert ${inPathMpc} -resize 50% -quality ${quality} ${newInPath}`);
    fs.unlinkSync(inPathMpc);
    return createLevel({ ...options, inPath: newInPath, zoom: zoom + 1, zoomToDisplay: zoomToDisplay - 1 });

  } else {
    fs.unlinkSync(inPathMpc);
  }

}

export default { createLevel, createTiles }