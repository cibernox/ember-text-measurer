import Ember from 'ember';
const { Controller, String: { htmlSafe }, inject: { service }, computed } = Ember;

export default Controller.extend({
  textMeasurer: service(),
  demo1text: '',
  demo2text: 'Hello world',
  demo2width: 200,

  // CPs
  demo1Style: computed('demo1text', function() {
    let { demo1text: text, textMeasurer: measurer } = this.getProperties('demo1text', 'textMeasurer');
    let width = measurer.width(text, '13px Arial') + 5;
    return htmlSafe(`width: ${width}px;`);
  }),

  demo2Style: computed('demo2text', 'demo2width', function() {
    let { demo2text, demo2width, textMeasurer: measurer } = this.getProperties('demo2text', 'demo2width', 'textMeasurer');
    let width = measurer.width(demo2text, '16px Arial');
    let ratio = (demo2width - 4) / width;
    return htmlSafe(`width: ${demo2width}px; font-size: ${16 * ratio}px;`);
  })
});