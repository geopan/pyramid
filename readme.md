# Pyramid

Generate tiles pyramid for an image.

![alt text](./pyramid.png)

## Installation

```shell
npm update @geopan.io/pyramid -g
```

## Usage

```shell
pyramid <image> <output>
```

## Misc

### Using gdal

```
gdal2tiles.py -p raster geopan.png
```

### ImageMagiik

```
convert image.jpeg -define tiff:tile-geometry=256x256 -compress jpeg ptif:output/%%~nf.tif
```

### npm image-tiler

Inspired by [image-tiler](https://www.npmjs.com/package/image-tiler)

```shell
# convert image to magic cache
convert input/cat.jpg /tmp/pyramid_tiler_7683/temp_level_0.mpc
```
