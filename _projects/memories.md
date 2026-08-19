---
layout: page
title: Memories
description: Memories is an easy to use package that helps to seperate clustered images from files and helps add metadata to files.
img: assets/img/memories-thumbnail.jpg
importance: 8
---

### Installation and Features

Install the Python package::

    pip install memories

There are 8 functions at the time being:

- ``open_image``: Open an image as a numpy array
- ``divided_crop``: Takes 3 inputs, the path to the image, the path where the outful folder should be and the number of images present in the input file. It performs the task of dividing a single image into multiple smaller ones. 
- ``add_date``: Takes input as the image path and the datetime to be added. it will add date when the image was originally taken.
- ``bulk_add_date``: Same as addDate, except it will add date to all images in a folder. The inputs are the folder path and datetime.
- ``save_image``: Converts a single image into another format
- ``make_page``: Creates a year book like page in HTML
- ``make_border``: Creates a border around the image
- ``rotate_image``: Returns a rotated image


### Using memories

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
