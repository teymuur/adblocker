// content.js
let adBlockEnabled = true;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(sender);
  if (request.action === "toggleAdBlock") {
    adBlockEnabled = !adBlockEnabled;
    sendResponse({enabled: adBlockEnabled});
  }
});
function removeAds() {
  if(!adBlockEnabled){
  const adSelectors = [
    '.ad:not(.essential-content)',
    '#ad:not(#essential-content)',
    '.advertisement:not(.essential-content)',
    '.adsbygoogle',
    '[class^="ad-"]:not(.essential-content)',
    '[id^="ad-"]:not(#essential-content)',
    'iframe[src*="ads"]:not(.essential-frame)',
    'div[class*="ad_"]:not(.essential-content)',
    'div[id*="ad_"]:not(#essential-content)',
    'script[src="ads.js"]'
  ];

  const scriptSelector = 'script[src*="ad" i]:not([src*="load" i], [src*="utility" i], [src*="essential" i])';

  adSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (!el.closest('.essential-container')) {
        el.style.display = 'none';
      }
    });
  });

  const adScripts = document.querySelectorAll(scriptSelector);
  adScripts.forEach(script => {
    if (!script.closest('.essential-script-container')) {
      script.remove();
    }
  });
}
}

removeAds();
const adRemovalInterval = setInterval(removeAds, 5000);

// Stop the interval after 1 minute
setTimeout(() => clearInterval(adRemovalInterval), 60000);