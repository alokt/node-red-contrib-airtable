const Airtable = require("airtable");

module.exports = function (RED) {
  const register = function (config) {
    RED.nodes.createNode(this, config);
    let credentials = this.credentials;
    var airtableConfig = RED.settings.functionGlobalContext.get('airtable');
    if (airtableConfig && airtableConfig[config.name]) {
      console.log('Using credentional from Settings.globalcontext');
      credentials = airtableConfig[config.name];
    }
    if (!credentials || !credentials.app || !credentials.key) return;
    this.app = new Airtable({ apiKey: credentials.key }).base(credentials.app);
  };

  RED.nodes.registerType("node-config-airtable", register, {
    credentials: {
      key: { value: undefined },
      app: { value: undefined }
    }
  });
};
