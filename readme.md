# Pyramid

Generate tiles pyramid for an image.

![alt text](./pyramid.png)

## Installation

This assumes that Node.js has already been installed.

```shell
npm update @geopan.io/pyramid -g
```

## Usage

```shell
pyramid <image>
```

## Tradeoffs

- The image tiling happens in parallel for a given level. This could be improved to both speed up the process as well as limit the risk for spike in CPU consumption.
- There is a risk that for really big images, such as orthophoto, the memory suffers with this approach and I would consider using node stream interface instead.
- I would add a lot more unit tests. Currently there is a single one to illustrate how to deal with Jest.

#### Help

```shell
pyramid -h

# Return

Usage: pyramid [options] <image>

Create a pyramid of tiles from an image

Options:
  -V, --version              output the version number
  -o, --output <output>      destination folder. Default is ./{image}_tiles
  -t, --tilesize <tilesize>  tile size. Default is 256px
  -h, --help                 display help for command
```
