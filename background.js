let blockedCount = 0;
let isEnabled = true;

// Initialize blockedCount and isEnabled from storage
chrome.storage.local.get(['enabled', 'blocked']).then(function(result) {
   console.log(result);
  }).catch(function(error) {
    console.error('Error retrieving data from storage:', error);
  });
  function updatePopup() {
    try {
      chrome.runtime.sendMessage({ 
        type: 'updateStats', 
        blockedCount: blockedCount, 
        isEnabled: isEnabled 
      });
    } catch (error) {
      console.error('Failed to send updateStats message:', error);
    }
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'toggleEnabled') {
      isEnabled = message.enabled;
      chrome.storage.local.set({ enabled: isEnabled });
      setupListener();
      updatePopup();
      sendResponse({ success: true });
    }
    return true; // Keeps the message channel open for async response
  });
  

function blockAds(details) {
  if (isEnabled) {
    blockedCount++;
    chrome.storage.local.set({ blocked: blockedCount });
    updatePopup();
    return { cancel: true };
  }
  return { cancel: false };
}
