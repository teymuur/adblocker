document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('toggle');
    const blockedCount = document.getElementById('blocked-count');
  
    // Retrieve and display the extension's current state
    chrome.storage.local.get(['enabled', 'blocked'], function (result) {
      toggle.checked = result.enabled !== false;
      blockedCount.textContent = result.blocked || 0;
    });
  
    // Toggle the ad blocker on/off
    toggle.addEventListener('change', function () {
      const enabled = toggle.checked;
      try {
        chrome.runtime.sendMessage({ type: 'toggleEnabled', enabled: enabled }, response => {
          if (response && response.success) {
            console.log('Ad blocker toggled successfully');
          } else {
            console.error('Failed to toggle ad blocker');
          }
        });
      } catch (error) {
        console.error('Failed to send toggleEnabled message:', error);
      }
    });
  
    // Listen for messages from the background script to update the stats
    chrome.runtime.onMessage.addListener(function (message) {
      if (message.type === 'updateStats') {
        blockedCount.textContent = message.blockedCount;
        toggle.checked = message.isEnabled;
      }
    });
  });