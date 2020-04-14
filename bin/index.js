#!/usr/bin/env node

const Pyramid = require("../lib/Pyramid").default;

const program = require("commander");

program
  .version("0.1.0")
  .description("Create a pyramid of tiles from an image")
  .arguments("<image> <output>")
  .option(
    "-p, --pattern <pattern>",
    "output pattern. Default is {z}/{x}_{y}.{format}"
  )
  .action(async (image, output, cmdObj) => {
    const pattern = cmdObj.pattern || "{z}/{x}_{y}.jpg";
    await Pyramid.create({ inPath: image, outPath: output, pattern });
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
