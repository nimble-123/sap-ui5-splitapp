jQuery.sap.require("abat.Mockup.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("abat.Mockup.view.Detail", {
	
	onInit : function (evt) {	
		this.configForecastChart();
		this.configOrderProposalChart();		
	},
	
	handleForecastDataSelect : function (evt) {
		var xAxisIndex= (evt.getParameter("data")[0]).data[0].ctx.path.dii_a1;
		var oContext = this.getView().byId("lineChart").getBindingContext();
		var oSelectedData = this.getView().getModel().getProperty(oContext.sPath+"/ForecastData/"+xAxisIndex);
		
		console.log(oSelectedData);
	},
	
	handleOrderProposalDataSelect : function (evt) {
		//TODO write code to make Chart dynamic
	},

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	
	handleApprove : function (evt) {
		// show confirmation dialog
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
			bundle.getText("ApproveDialogMsg"),
			function (oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					// notify user
					var successMsg = bundle.getText("ApproveDialogSuccessMsg");
					sap.m.MessageToast.show(successMsg);
					// TODO call proper service method and update model (not part of this session)
				}
			},
			
			bundle.getText("ApproveDialogTitle")
		);
	},
	
	handleLineItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("LineItem", context);
	},
	
	configForecastChart : function () {
		// A Dataset defines how the model data is mapped to the chart 
		var oDatasetForecast = new sap.viz.ui5.data.FlattenedDataset({
			// a Bar Chart requires exactly one dimension (x-axis) 
			dimensions : [ 
				{
					axis : 1, // must be one for the x-axis, 2 for y-axis
					name : 'Month', 
					value : "{Month}"
				} 
			],
			// it can show multiple measures, each results in a new set of bars in a new color 
			measures : [ 
			    // measure 1
				{
					name : 'Menge1', // 'name' is used as label in the Legend 
					value : '{Menge1}' // 'value' defines the binding for the displayed value   
				},
				{
					name : 'Menge2', 
					value : '{Menge2}'
				} 
			],		
			// 'data' is used to bind the whole data collection that is to be displayed in the chart 
			data : {
				path : "ForecastData"
			}
			
		});
		
		oLineChart = this.getView().byId("lineChart");
		oLineChart.setTitle(new sap.viz.ui5.types.Title({visible:true, text:"{i18n>ForecastChartTitle}"}));
		oLineChart.setDataset(oDatasetForecast);
	},
	
	configOrderProposalChart : function () {
		// A Dataset defines how the model data is mapped to the chart 
		var oDatasetOrderProposal = new sap.viz.ui5.data.FlattenedDataset({
			// a Bar Chart requires exactly one dimension (x-axis) 
			dimensions : [ 
				{
					axis : 1, // must be one for the x-axis, 2 for y-axis
					name : 'Month', 
					value : "{Month}"
				} 
			],
			// it can show multiple measures, each results in a new set of bars in a new color 
			measures : [ 
			    // measure 1
				{
					name : 'Menge1', // 'name' is used as label in the Legend 
					value : '{Menge1}' // 'value' defines the binding for the displayed value   
				},
				{
					name : 'Menge2', 
					value : '{Menge2}'
				} 
			],		
			// 'data' is used to bind the whole data collection that is to be displayed in the chart 
			data : {
				path : "ForecastData"
			}
			
		});
		
		oBarChart = this.getView().byId("barChart");
		oBarChart.setTitle(new sap.viz.ui5.types.Title({visible:true, text:"{i18n>OrderProposalChartTitle}"}));
		oBarChart.setDataset(oDatasetOrderProposal);
	}
});