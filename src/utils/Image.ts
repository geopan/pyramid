import { imageSize } from 'image-size'

function isBiggerThanTile(imagePath: string, tileSize: number = 256) {
  const { height = 0, width = 0 } = imageSize(imagePath);
  return height > tileSize || width > tileSize;
}

function maxZoom(imagePath: string, tileSize: number = 256) {
  const { height = 0, width = 0 } = imageSize(imagePath);
  const halvingsWidth = Math.ceil(Math.log2(Math.ceil(width / tileSize)));
  const halvingsheight = Math.ceil(
    Math.log2(Math.ceil(height / tileSize))
  );

  return Math.max(halvingsWidth, halvingsheight)
}

export default { isBiggerThanTile, maxZoom }