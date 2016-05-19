import Ember from 'ember';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  },

  width(string, font = null) {
    if (font) { this.ctx.font = font; }
    return this.ctx.measureText(string).width;
  },

  lines(string, maxWidth, font = null) {
    if (font) { this.ctx.font = font; }
    let paragraphs = string.split(/\n/);
    let lines = paragraphs.length;
    for (let i = 0; i < paragraphs.length; i++) {
      let paragraph = paragraphs[i];
      if (paragraph !== '') {
        let words = paragraph.split(' ');
        let widthSoFar = 0;
        let j = 0;
        for (; j < words.length - 1; j++) {
          let wordWidth = this.ctx.measureText(words[j] + ' ').width;
          widthSoFar = widthSoFar + wordWidth;
          if (widthSoFar > maxWidth) {
            lines++;
            widthSoFar = wordWidth;
          }
        }
        let wordWidth = this.ctx.measureText(words[j]).width;
        widthSoFar = widthSoFar + wordWidth;
        if (widthSoFar > maxWidth) {
          lines++;
          widthSoFar = wordWidth;
        }
      }
    }
    return lines;
  },

  fitTextSize(string, maxWidth, font = null) {
    let width = this.width(string, font);
    let fontSize = this.ctx.font.match(/\d+/)[0];
    return Math.floor(parseFloat(fontSize) * maxWidth / width);
  }
});
