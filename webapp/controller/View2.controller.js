sap.ui.define([
    "../controller/BaseController"
],
    function (Controller) {
        "use strict";

        return Controller.extend("nmc.be.project5.controller.View2", {

            onInit: function () {
                this.getRouter().getRoute("RouteView2").attachMatched(this._attachMatched, this);
            },

            _attachMatched: function (oParams) {
                var sUuid = oParams.getParameter('arguments').sUuid;
                this.getView().bindElement(`/ZI_USERDGAL(guid'${sUuid}')`);
            }


        });
    });
