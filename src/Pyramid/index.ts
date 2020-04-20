import tiler, { PyramidOptions } from "./Tiler";
import sharp from "sharp";
import { Image } from "../utils";

const create = async (options: PyramidOptions) => {
  const { tileSize = 256, inPath } = options;

  try {
    const image = await sharp(inPath).toBuffer();

    const { width = 0, height = 0 } = await sharp(image).metadata();

    await tiler.createLevel({
      ...options,
      image,
      tileSize,
      zoom: Image.maxZoom(width, height, tileSize),
    });
  } catch (err) {
    console.error(err);
  }
};

export default { create };
