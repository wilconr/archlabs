var list;

function openList() {
  if (list) {
    list.focus();
    return;
  }

  chrome.app.window.create('list.html', {
    id: 'list',
    innerBounds: {
      width: 768,
      height: 868,
      minWidth: 768,
      minHeight: 868
    }
  }, function(w) {
    list = w;

    list.onClosed.addListener(function() {
      list = null;
      maybeClose();
    })
  });
}

chrome.app.runtime.onLaunched.addListener(function(e) {
  openList();
});

