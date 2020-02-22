var dialog = document.getElementById('setting-dialog');
		var showDialogButton = document.querySelector('#setting');
		if (! dialog.showModal) {
		  dialogPolyfill.registerDialog(dialog);
		}
		showDialogButton.addEventListener('click', function() {
		  dialog.showModal();
		});
		dialog.querySelector('.close').addEventListener('click', function() {
		  dialog.close();
		});