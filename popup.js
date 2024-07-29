// popup.js
document.addEventListener('DOMContentLoaded', function() {
  const statusElement = document.getElementById('status');
  const toggleButton = document.getElementById('toggleButton');

  function updateUI(enabled) {
    statusElement.textContent = enabled ? 'Enabled' : 'Disabled';
    toggleButton.textContent = enabled ? 'Disable' : 'Enable';
  }

  chrome.runtime.sendMessage({action: "toggleAdBlock"}, function(response) {
    updateUI(response.enabled);
  });

  toggleButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "toggleAdBlock"}, function(response) {
      updateUI(response.enabled);
    });
  });
});