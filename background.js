if (typeof chrome !== 'undefined' && chrome.storage) {
let blockedCount = 0;
let isEnabled = true;

// Initialize blockedCount and isEnabled from storage
chrome.storage.local.get(['enabled', 'blocked']).then(function(result) {
    // Use result here
  }).catch(function(error) {
    console.error('Error retrieving data from storage:', error);
  });
function updatePopup() {
  chrome.runtime.sendMessage({ type: 'updateStats', blockedCount: blockedCount, isEnabled: isEnabled });
}

function blockAds(details) {
  if (isEnabled) {
    blockedCount++;
    chrome.storage.local.set({ blocked: blockedCount });
    updatePopup();
    return { cancel: true };
  }
  return { cancel: false };
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'toggleEnabled') {
    isEnabled = message.enabled;
    chrome.storage.local.set({ enabled: isEnabled });
    updatePopup();
  }
});
}
else{
    console.error('Chrome storage API not available');
}