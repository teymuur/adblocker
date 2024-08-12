document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleButton');

  toggleButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "toggleAdBlock"})
      .then(response => {
        // Handle response if needed
      })
      .catch(error => console.error(error));
  });
});