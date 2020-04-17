import path from "path"

export interface Pattern {
  ext: string;
  filename: string;
  pathname: string;
}

function decompose(pattern: string, zoom: number = 0, tileSize: number = 256): Pattern {
  const filename = pattern
    .replace(/\{z\}/, `${zoom}`)
    .replace(/\{x\}/, `%[fx:page.x/${tileSize}]`)
    .replace(/\{y\}/, `%[fx:page.y/${tileSize}]`)
    .replace(/\.[^.]+$/, "");

  const pathname = (pattern.indexOf(path.sep) > 0) ?
    pattern
      .replace(new RegExp(path.sep + "[^" + path.sep + "]*$"), "")
      .replace(/\{z\}/, `${zoom}`) : ""

  return {
    ext: path.extname(pattern),
    filename,
    pathname
  }
}

export default { decompose }