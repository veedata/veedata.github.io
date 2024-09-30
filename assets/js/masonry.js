$(document).ready(function () {
  // Init Masonry
  var $grid = $(".projects").masonry({
    horizontalOrder: true,
    itemSelector: ".col",
  });
  // Layout Masonry after each image loads
  $grid.imagesLoaded().progress(function () {
    $grid.masonry("layout");
  });
});
