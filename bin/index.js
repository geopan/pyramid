#!/usr/bin/env node
const path = require("path");
const pjson = require("../package.json");
const program = require("commander");
const Pyramid = require("../lib/Pyramid").default;

program
  .version(pjson.version)
  .description("Create a pyramid of tiles from an image")
  .arguments("<image>")
  .option(
    "-p, --pattern <pattern>",
    "output pattern. Default is {z}/{x}_{y}.{format}"
  )
  .option(
    "-o, --output <output>",
    "destination folder. Default is ./{image}_tiles"
  )
  .option("-q, --quality <quality>", "compression level. Default is 100")
  .option("-t, --tilesize <tilesize>", "tile size. Default is 256px")
  .action(async (image, cmdObj) => {
    const pattern = cmdObj.pattern || "{z}/{x}_{y}.jpg";
    const output =
      cmdObj.output ||
      `${path.dirname(image)}/${path.basename(
        image,
        path.extname(image)
      )}_tiles`;
    const quality = cmdObj.quality || 100;
    const tileSize = cmdObj.tilesize || 256;
    await Pyramid.create({
      inPath: image,
      outPath: output,
      pattern,
      quality,
      tileSize,
    });
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
