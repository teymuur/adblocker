// popup.js
document.addEventListener('DOMContentLoaded', function() {

  const toggleButton = document.getElementById('toggleButton');

  

  toggleButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "toggleAdBlock"}, function(response) {

    });

  });
});