sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"

],
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("nmc.be.project5.controller.View1", {
            onInit: function () {

            },

            onSelection: function (oEvent) {
                var oItem = oEvent.getParameter('listItem');
                var oContext = oItem.getBindingContext();
                var sName = oContext.getProperty('Name');
                MessageBox.show(sName);
            }
        });
    });
