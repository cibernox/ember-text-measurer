import Ember from 'ember';
const { Controller, String: { htmlSafe }, inject: { service }, computed } = Ember;

const sampleMultilineText = `Lorem
ipsum dolor sit amet, ex legimus mandamus sea, qui no doctus option. Ei pri commune maiestatis. Mea at facete appetere tincidunt. Et sea quaestio expetendis. No eius virtute delenit per.



Ea mel error latine, usu harum delicata forensibus id, ut est probo quodsi regione. Sumo definitiones ex has, percipit voluptatum an qui. Eius solet aeterno sea ut, qui ex inani persequeris. In nostro facilis consetetur mea. Ut audiam virtute nostrum eam, omnes luptatum splendide eam at.

Veri zril ex vel, pri habemus delicata et. Te minimum expetenda dissentiet est, homero omnium expetenda no pri, enim fuisset usu ei. Mel ex quidam scripserit, pri aliquip debitis id. Vis ea legere persius recteque, utamur blandit volutpat ea vel.`;

export default Controller.extend({
  textMeasurer: service(),
  demo1text: '',
  demo2text: 'Hello world',
  demo2width: 200,
  demo3text: sampleMultilineText,

  // CPs
  demo1Style: computed('demo1text', function() {
    let { demo1text: text, textMeasurer: measurer } = this.getProperties('demo1text', 'textMeasurer');
    let width = measurer.width(text, '13px Arial') + 5;
    return htmlSafe(`width: ${width}px;`);
  }),

  demo2Style: computed('demo2text', 'demo2width', function() {
    let { demo2text, demo2width, textMeasurer: measurer } = this.getProperties('demo2text', 'demo2width', 'textMeasurer');
    let size = measurer.fitTextSize(demo2text, demo2width, '24px Arial');
    return htmlSafe(`width: ${demo2width}px; font-size: ${size}px;`);
  }),

  demo3lines: computed('demo3text', function() {
    let { demo3text, textMeasurer: measurer } = this.getProperties('demo3text', 'textMeasurer');
    console.time('measure');
    let result = measurer.lines(demo3text, 300, "normal normal normal normal 11px / normal BlinkMacSystemFont");
    console.timeEnd('measure');
    return result;
  })
});
