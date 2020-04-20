import path from "path";
import mkdirp from "mkdirp";
import sharp from "sharp";

export interface PyramidOptions {
  inPath: string;
  outPath: string;
  tileSize?: number;
}

export interface LevelOptions extends PyramidOptions {
  image: Buffer;
  zoom: number;
}

export interface TilerOptions extends LevelOptions {
  width: number;
  height: number;
  format: string;
  tileSize: number;
}

// create each zoom level for an image
async function createLevel(options: LevelOptions): Promise<void> {
  const { image, outPath, tileSize = 256, zoom } = options;

  const { width = 0, height = 0, format = "jpg" } = await sharp(
    image
  ).metadata();

  let dir = `${outPath}${path.sep}${zoom}`;

  await mkdirp(dir);

  await tileImage({
    ...options,
    zoom,
    outPath: dir,
    tileSize,
    width,
    height,
    format,
  });

  const newLevel = await sharp(image)
    .resize(Math.round(width * 0.5))
    .toBuffer();

  if (height > tileSize || width > tileSize) {
    createLevel({ ...options, image: newLevel, zoom: zoom - 1 });
  } else {
    dir = `${outPath}${path.sep}${zoom}`;
    await sharp(image).toFile(`${dir}${path.sep}${0}_${0}.${format}`);
  }
}

// create all tiles for a given zoom level
async function tileImage(options: TilerOptions): Promise<void> {
  const { image, tileSize, width, height, format, outPath } = options;

  const rows = width / tileSize;
  const columns = height / tileSize;

  const cursor = { x: 0, y: 0 };
  const tile = { h: tileSize, w: tileSize };

  const promises = [];

  for (let r = 0; r < rows; r++) {
    tile.w = width - cursor.x >= tileSize ? tileSize : width - cursor.x;

    cursor.y = 0;

    for (let c = 0; c < columns; c++) {
      tile.h = height - cursor.y >= tileSize ? tileSize : height - cursor.y;

      promises.push(
        sharp(image)
          .extract({
            left: cursor.x,
            top: cursor.y,
            width: tile.w,
            height: tile.h,
          })
          .toFile(`${outPath}${path.sep}${r}_${c}.${format}`)
      );

      cursor.y += tileSize;
    }

    cursor.x += tileSize;
  }

  await Promise.all(promises);
}

export default { createLevel, tileImage };
