// browser check for webp support
window.onload = function() {
  async function supportsWebp() {
    if (!self.createImageBitmap) return false;

    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
  }

  (async () => {
    if(await supportsWebp()) {
      //console.log('does support');
    }
    else {
      //console.log('does not support');
      document.querySelector("body").classList.add('no-webp');
    }
  })();
}
