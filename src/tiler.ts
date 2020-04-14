import { execSync } from "child_process"
import path from "path"
import fs from "fs"
import mkdirp from "mkdirp";

const sizeOf = require("image-size");

export interface PyramidOptions {
  inPath: string,
  outPath: string,
  pattern: string,
  tileSize?: number;
  tmpDir?: string;
  tempDir?: string;
  quality?: number;
}

export interface TilerOptions extends PyramidOptions {
  zoom: number,
  zoomToDisplay: number;
}

export interface Pattern {
  ext: string;
  filename: string;
  pathname: string;
}

export function imageBiggerThanTile(path: string, tileSize: number) {
  const size = sizeOf(path);
  return size.height > tileSize || size.width > tileSize;
}

export function decomposePattern(pattern: string, zoom: number = 0, tileSize: number = 256): Pattern {
  const filename = pattern
    .replace(/\{z\}/, "" + zoom)
    .replace(/\{x\}/, "%[fx:page.x/" + tileSize + "]")
    .replace(/\{y\}/, "%[fx:page.y/" + tileSize + "]")
    .replace(/\.[^.]+$/, "");

  const pathname = (pattern.indexOf(path.sep) > 0) ?
    pattern
      .replace(new RegExp(path.sep + "[^" + path.sep + "]*$"), "")
      .replace(/\{z\}/, "" + zoom) : ""

  return {
    ext: pattern.replace(/.*(\.[^.]+)$/, "$1"),
    filename,
    pathname
  }
}

// create tiles for a given image at a given zoom level
async function level(options: TilerOptions): Promise<void> {

  const { inPath, outPath, pattern, zoom, tileSize, quality } = options
  const { ext, filename, pathname } = decomposePattern(pattern, zoom, tileSize)

  await mkdirp(outPath + path.sep + pathname)

  const cmd = `convert ${inPath} -crop ${tileSize}x${tileSize} -set filename:tile "${filename}" -quality ${quality} +repage +adjoin "${outPath}/%[filename:tile]${ext}"`;

  execSync(cmd);

}

// create each zoom level for an image
async function record(options: TilerOptions): Promise<void> {

  const { tempDir, zoom, inPath, tileSize = 256, zoomToDisplay, quality } = options

  const inPathMpc = `${tempDir}/temp_level_${zoom}.mpc`;

  execSync(`convert ${inPath} ${inPathMpc}`);

  await level({ ...options, inPath: inPathMpc, zoom: zoomToDisplay })

  if (imageBiggerThanTile(inPath, tileSize)) {
    const newZoom = zoom + 1;
    const newInPath = `${tempDir}/temp_level_${zoom}.png`;

    execSync(`convert ${inPathMpc} -resize 50% -quality ${quality} ${newInPath}`);
    fs.unlinkSync(inPathMpc);
    return record({ ...options, inPath: newInPath, zoom: newZoom, zoomToDisplay: zoomToDisplay - 1 });

  } else {
    fs.unlinkSync(inPathMpc);
  }

}

export default { level, record }