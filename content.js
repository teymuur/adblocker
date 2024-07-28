// List of common ad-related keywords
const adKeywords = ['ad', 'advertisement', 'banner', 'sponsor', 'promo'];

// Function to check if an element is likely an ad
function isLikelyAd(element) {
  const elementString = (element.id + ' ' + element.className).toLowerCase();
  return adKeywords.some(keyword => elementString.includes(keyword));
}

// Function to remove ads
function removeAds() {
  const allElements = document.getElementsByTagName('*');
  let removedCount = 0;

  for (let element of allElements) {
    if (isLikelyAd(element)) {
      element.remove();
      removedCount++;
    }
  }

  // Send message to background script about removed ads
  chrome.runtime.sendMessage({ type: 'adsRemoved', count: removedCount },response => {
    if (response && response.success) {
      console.log('Ad blocker removed');
    } else {
      console.error('Failed');
    }
  });
}

// Initial ad removal on DOMContentLoaded
document.addEventListener('DOMContentLoaded', removeAds);

// Set up a MutationObserver to watch for dynamically added content
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      for (let node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE && isLikelyAd(node)) {
          node.remove();
          chrome.runtime.sendMessage({ type: 'adsRemoved', count: 1 });
        }
      }
    }
  }
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });

// Periodically check for new ads (some ads might be loaded after a delay)
setInterval(removeAds, 5000);