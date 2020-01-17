var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
    (function() {
  'use strict';
  window['counter'] = 0;
  var snackbarContainer = document.querySelector('#demo-toast-example');
  var showToastButton = document.querySelector('.demo-show-toast');
  showToastButton.addEventListener('click', function() {
    'use strict';
    var data = {message: 'Quote Copied!'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  });
}());

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});


