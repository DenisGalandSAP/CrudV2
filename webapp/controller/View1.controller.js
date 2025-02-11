sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("nmc.be.project5.controller.View1", {
            onInit: function () {
                MessageBox.confirm("Hello World");
            }
        });
    });
