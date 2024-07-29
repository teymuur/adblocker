// content.js
function removeAds() {
  const adSelectors = [
    '.ad',
    '#ad',
    '.advertisement',
    '.adsbygoogle',
    '[class*="ad-"]',
    '[id*="ad-"]',
    'iframe[src*="ads"]',
    'adsbox',
    'textads',
    'adbox',
    "banner_ads",
    'script[src*="ad"]',

    

  ];

  adSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => el.remove());
  });
}

removeAds();
setInterval(removeAds, 1000); 