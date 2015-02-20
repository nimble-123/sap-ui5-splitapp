jQuery.sap.declare("abat.Mockup.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

abat.Mockup.util.Formatter = {

  _statusStateMap : {
    "lieferbar" : "Success",
    "bald lieferbar" : "Warning",
    "ausverkauft" : "Error"
  },

  statusState : function(value) {
    var map = abat.Mockup.util.Formatter._statusStateMap;
    return (value && map[value]) ? map[value] : "None";
  },

  numberState : function(stock, minStock) {
    return (parseInt(stock) <= parseInt(minStock)) ? "Error" : "None";
  },

  date : function(value) {
    if (value) {
      var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
        pattern : "yyyy-MM-dd"
      });
      return oDateFormat.format(new Date(value));
    } else {
      return value;
    }
  },

  quantity : function(value) {
    try {
      return (value) ? parseFloat(value).toFixed(0) : value;
    } catch (err) {
      return "Not-A-Number";
    }
  }
};