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
    "-o, --output <output>",
    "destination folder. Default is ./{image}_tiles"
  )
  .option("-t, --tilesize <tilesize>", "tile size. Default is 256px")
  .action(async (image, cmdObj) => {
    const output =
      cmdObj.output ||
      `${path.dirname(image)}/${path.basename(
        image,
        path.extname(image)
      )}_tiles`;
    const tileSize = parseInt(cmdObj.tilesize) || 256;
    await Pyramid.create({
      inPath: image,
      outPath: output,
      tileSize,
    });
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
