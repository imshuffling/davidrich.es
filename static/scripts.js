window.onload = function() {

  // browser check for webp support
  async function supportsWebp() {
    if (!self.createImageBitmap) return false;

    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
  }

  (async () => {
    if(await supportsWebp()) {
      console.log('does support');
    }
    else {
      console.log('does not support');
      document.querySelector("body").classList.add('no-webp');
    }
  })();

  // add target blank to a href
  var anchors = document.getElementsByTagName('a');
  for (var i=0; i<anchors.length; i++){
    if (anchors[i].hostname != window.location.hostname) {
        anchors[i].setAttribute('target', '_blank');
        anchors[i].setAttribute('rel', 'noopener');
    }
  }

}
