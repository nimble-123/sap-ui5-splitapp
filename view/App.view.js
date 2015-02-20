sap.ui.jsview("abat.Mockup.view.App", {

  getControllerName : function() {
    return "abat.Mockup.view.App";
  },

  createContent : function(oController) {

    // to avoid scroll bars on desktop the root view must be set to block
    // display
    this.setDisplayBlock(true);

    // create app
    this.app = new sap.m.SplitApp();

    // load the master page
    var master = sap.ui.xmlview("Master", "abat.Mockup.view.Master");
    master.getController().nav = this.getController();
    this.app.addPage(master, true);

    // load the empty page
    var empty = sap.ui.xmlview("Empty", "abat.Mockup.view.Empty");
    this.app.addPage(empty, false);

    // wrap app with shell
    return new sap.m.Shell("Shell", {
      title : "{i18n>ShellTitle}",
      showLogout : false,
      app : this.app
    });
  }
});