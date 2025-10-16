// Permission handler to automatically grant permissions and handle popups
(function() {
  // Override window.confirm to always return true
  window.confirm = function() {
    return true;
  };
  
  // Override window.alert to do nothing
  window.alert = function() {
    // Do nothing, suppress alerts
  };
  
  // Override window.prompt to always return a default value
  window.prompt = function(message, defaultValue) {
    return defaultValue || 'confirmed';
  };
  
  // Handle popup windows by opening them directly
  const originalOpen = window.open;
  window.open = function(url, name, features) {
    // Allow popups by opening them directly
    return originalOpen.call(this, url, name, features);
  };
  
  console.log('Permission handler loaded: Confirmation prompts bypassed');
})();

export {};