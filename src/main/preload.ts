// Preload script runs in a context that has access to both Node.js and the browser
// Use this to expose safe APIs to the renderer process

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
});
