---
layout: page
title: Memories
description: A small package that splits scanned album pages and restores their dates.
img: assets/img/memories-thumbnail.jpg
importance: 8
group: engineering
topics:
  - Tooling
  - Image clustering
---

Digitizing an old photo album often produces a scan containing several photos, stripped of the dates and organization that gave them context. I built Memories to make that cleanup less tedious: split a scanned page into individual images, restore useful metadata, and prepare the results for browsing or sharing.

### What it does

Install the package with `pip install memories`. Its small API covers the repetitive parts of restoring a scanned collection:

- `open_image` loads an image for processing.
- `divided_crop` separates a page scan into individual photos.
- `add_date` and `bulk_add_date` restore capture dates to one image or a folder.
- `save_image` converts an image to another format.
- `make_page` arranges a collection as an HTML yearbook page.
- `make_border` and `rotate_image` handle common cleanup steps.

### Example

**Importing memories**

    import memories as mem


**Divide Images**

<div class="split" markdown="1">
<div markdown="1">
Converting hard copies of images into their soft copies usually leads to more than a single image being scanned on the same page. And while many devices have an inbuilt option to divide that scan into multiple images, some don't. The module divides a scan into its member images, based on background color if provided.
</div>
{% include figure.liquid path="assets/img/divider.jpg" alt="A scanned page split into its member images" %}
</div>

    image = mem.open_image("./image.png")
    mem.divided_crop(image, image_quantity = 6, bgr_value = [255, 255, 255])


**Add Metadata**

Allows the addition of metadata to images (only jpg supported). The feature currently only provides addition of Date metadata but will be updated in the future with more options.

    # Add date to a single image using image path
    mem.addDate("./image-1.jpg", "27/04/2021 12:00:03")
    # Add date to images in bulk using folder path
    mem.bulkAddDate("./", "27/04/2021 12:00:03")

**Save Images**

Easy conversion of an image into other formats. Currently supported input and output formats can be found [here](https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html). Additionally saving to pdf can be performed, where pdf saves multiple input images in a single pdf file.

    image1 = mem.open_image("./image.png")
    image2 = mem.open_image("./image.png")
    image3 = mem.open_image("./image.png")

    mem.save_image(image1, "path/to/save_folder/file.extention")
    # Save multiple images at once
    mem.save_image([image1, image2, image3], "path/to/save_folder/file.extention")
    # Save multiple images as a pdf
    mem.save_image(["img-1.png", "img-1.jpg", "img-2.jpg"], "path/to/save_folder/file.pdf")

**Scrapbook page**

On input of name, short line and image, this function generates a year-book like webpage.

    mem.makePage(["./source_folder/image1.png", "./random/another_source_folder/image2.jpg"], ["CSS", "Larry"], ["SASS", "That one got to you, didnt it"], "./save_folder")

**Add borders**

<div class="split" markdown="1">
<div markdown="1">
Make a border around an image. While support is limited here, it is slated to increase over time, adding new options and developments to the same.

Currently, you can add a normal border to the image and also a curved border. In both options, users can fine tune the width (normal) and radius (curved edges) of the borders.
</div>
{% include figure.liquid path="assets/img/border.jpg" alt="An image with a plain border and a curved border" %}
</div>



    image = mem.open_image("./image.png")

    # Squared borders
    mem.make_border(image, "normal", bgr_value = [255, 255, 255], border_dimensions = [100, 100, 100, 100])
    # Curved borders
    mem.make_border(image, "curved", bgr_value = [255, 255, 255], border_dimensions = [100, 100, 100, 100], radius_dimensions = [100, 100, 100, 100])
