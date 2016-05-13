module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'ember-text-measurer',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
