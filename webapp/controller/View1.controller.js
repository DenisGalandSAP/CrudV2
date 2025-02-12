sap.ui.define([
    "../controller/BaseController",
    "sap/m/MessageBox"

],
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("nmc.be.project5.controller.View1", {

            onInit: function () {

            },

            onSelection: function (oEvent) {
                this.getModel('View1').setProperty('/UDButtonVisible', true);
                var oItem = oEvent.getParameter('listItem');
                this.oContext = oItem.getBindingContext();
                this.sPath = this.oContext.getPath();
            },

            onCreate: function () {

            },

            onUpdate: async function () {
                if (!this.oEditFragment) {
                    this.oEditFragment = await this.loadFragment({ name: 'nmc.be.project5.view.fragment.edit' });
                    this.getView().addDependent(this.oEditFragment);
                }
                this.oEditFragment.bindElement(this.sPath);
                this.oEditFragment.open();
            },

            onCancelEdit: function () {
                this.oEditFragment.close();
            },

            onSaveEdit: function () {
                this.getModel().update(this.sPath, this.oContext.getObject(), {
                    success: (oResponse) => { this.oEditFragment.close() },
                    error: (oError) => { }
                });
            },

            onDelete: function () {
                MessageBox.confirm(this.getResourceBundle().getText('confirmDelete'), {
                    onClose: (oAction) => {
                        if (oAction === 'OK') {
                            this.getModel().remove(this.sPath, {
                                success: (oResponse) => { this.getModel('View1').setProperty('/UDButtonVisible', false); },
                                error: (oError) => { }
                            })
                        }
                    }
                });
            }
        });
    });
