#!/usr/bin/env node
const path = require("path");
const program = require("commander");
const Pyramid = require("../lib/Pyramid").default;

program
  .version("0.1.0")
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
  .action(async (image, cmdObj) => {
    const pattern = cmdObj.pattern || "{z}/{x}_{y}.jpg";
    const output =
      cmdObj.output ||
      `${path.dirname(image)}/${path.basename(
        image,
        path.extname(image)
      )}_tiles`;
    await Pyramid.create({ inPath: image, outPath: output, pattern });
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
