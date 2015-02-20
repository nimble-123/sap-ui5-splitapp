jQuery.sap.require("abat.Mockup.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("abat.Mockup.view.Detail", {

  onInit : function(evt) {
    this.configForecastChart();
    this.configOrderProposalChart();
  },

  handleForecastDataSelect : function(evt) {
    var xAxisIndex = (evt.getParameter("data")[0]).data[0].ctx.path.dii_a1;
    var oContext = this.getView().byId("lineChart").getBindingContext();
    var oSelectedData = this.getView().getModel().getProperty(
        oContext.sPath + "/ForecastData/" + xAxisIndex);

    console.log(oSelectedData);
  },

  handleOrderProposalDataSelect : function(evt) {
    // TODO write code to make Chart dynamic
  },

  handleNavButtonPress : function(evt) {
    this.nav.back("Master");
  },

  handleApprove : function(evt) {
    // show confirmation dialog
    var bundle = this.getView().getModel("i18n").getResourceBundle();
    sap.m.MessageBox.confirm(bundle.getText("ApproveDialogMsg"), function(
        oAction) {
      if (sap.m.MessageBox.Action.OK === oAction) {
        // notify user
        var successMsg = bundle.getText("ApproveDialogSuccessMsg");
        sap.m.MessageToast.show(successMsg);
        // TODO call proper service method and update model
      }
    },

    bundle.getText("ApproveDialogTitle"));
  },

  configForecastChart : function() {
    var oDatasetForecast = new sap.viz.ui5.data.FlattenedDataset({
      dimensions : [ {
        axis : 1,
        name : 'Month',
        value : "{Month}"
      } ],
      measures : [ {
        name : 'Menge1',
        value : '{Menge1}'
      }, {
        name : 'Menge2',
        value : '{Menge2}'
      } ],
      data : {
        path : "ForecastData"
      }
    });

    var oLineChart = this.getView().byId("lineChart");
    oLineChart.setTitle(new sap.viz.ui5.types.Title({
      visible : true,
      text : "{i18n>ForecastChartTitle}"
    }));
    oLineChart.setDataset(oDatasetForecast);
  },

  configOrderProposalChart : function() {
    var oDatasetOrderProposal = new sap.viz.ui5.data.FlattenedDataset({
      dimensions : [ {
        axis : 1,
        name : 'Month',
        value : "{Month}"
      } ],
      measures : [ {
        name : 'Menge1',
        value : '{Menge1}'
      } ],
      data : {
        path : "OrderProposalData"
      }
    });

    var oBarChart = this.getView().byId("barChart");
    oBarChart.setTitle(new sap.viz.ui5.types.Title({
      visible : true,
      text : "{i18n>OrderProposalChartTitle}"
    }));
    oBarChart.setDataset(oDatasetOrderProposal);
  }
});