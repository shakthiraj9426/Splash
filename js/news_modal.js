var dialog =document.getElementById('news_dialog');
    var showDialog = document.querySelector('#news_icon');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    showDialog.addEventListener('click', function() {
      dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });