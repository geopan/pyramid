function maxZoom(width: number, height: number, tileSize: number = 256) {
  const halvingsWidth = Math.ceil(Math.log2(Math.ceil(width / tileSize)));
  const halvingsheight = Math.ceil(Math.log2(Math.ceil(height / tileSize)));

  return Math.max(halvingsWidth, halvingsheight);
}

export default { maxZoom };
