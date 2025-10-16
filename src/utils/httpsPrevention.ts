// Utility to prevent HTTPS redirects and ensure HTTP connections
(function() {
  // Override any attempts to redirect to HTTPS
  const originalReplace = window.location.replace;
  const originalAssign = window.location.assign;
  
  window.location.replace = function(url) {
    // If the URL starts with https, change it to http
    if (typeof url === 'string' && url.startsWith('https://')) {
      url = url.replace('https://', 'http://');
    }
    return originalReplace.call(this, url);
  };
  
  window.location.assign = function(url) {
    // If the URL starts with https, change it to http
    if (typeof url === 'string' && url.startsWith('https://')) {
      url = url.replace('https://', 'http://');
    }
    return originalAssign.call(this, url);
  };
  
  // Check current location and redirect to HTTP if on HTTPS
  if (window.location.protocol === 'https:') {
    const httpUrl = window.location.href.replace('https://', 'http://');
    window.location.replace(httpUrl);
  }
  
  // Prevent any future attempts to switch to HTTPS
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(state, title, url) {
    if (typeof url === 'string' && url.startsWith('https://')) {
      url = url.replace('https://', 'http://');
    }
    return originalPushState.call(this, state, title, url);
  };
  
  history.replaceState = function(state, title, url) {
    if (typeof url === 'string' && url.startsWith('https://')) {
      url = url.replace('https://', 'http://');
    }
    return originalReplaceState.call(this, state, title, url);
  };
  
  console.log('HTTPS prevention loaded: Redirecting to HTTP if needed');
})();

export {};