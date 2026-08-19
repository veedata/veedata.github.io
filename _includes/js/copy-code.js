// Add a copy button to each Rouge code block.
(function () {
  var blocks = document.querySelectorAll('div.highlight, figure.highlight');
  blocks.forEach(function (block) {
    var pre = block.querySelector('pre');
    if (!pre) return;
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'copy';
    btn.addEventListener('click', function () {
      var code = block.querySelector('code') || pre;
      navigator.clipboard.writeText(code.innerText.replace(/\n$/, '')).then(function () {
        btn.textContent = 'copied';
        setTimeout(function () { btn.textContent = 'copy'; }, 1500);
      });
    });
    block.appendChild(btn);
  });
})();
