document.addEventListener('DOMContentLoaded', function () {
    
  if (typeof chrome !== 'undefined' && chrome.storage) {
 

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
      chrome.runtime.sendMessage({ type: 'toggleEnabled', enabled: enabled });
    });
  
    // Listen for messages from the background script to update the stats
    chrome.runtime.onMessage.addListener(function (message) {
      if (message.type === 'updateStats') {
        blockedCount.textContent = message.blockedCount;
        toggle.checked = message.isEnabled;
      }
    });
    
}else {
    console.error('Chrome storage API not available');
  }
  });