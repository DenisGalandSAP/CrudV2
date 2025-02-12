sap.ui.define([
    "../controller/BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast"

],
    function (Controller, MessageBox, MessageToast) {
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

            onCreate: async function () {
                if (!this.oCreateFragment) {
                    this.oCreateFragment = await this.loadFragment({ name: 'nmc.be.project5.view.fragment.create' });
                    this.getView().addDependent(this.oCreateFragment);
                }
                const date = new Date();
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                const day = String(date.getDate()).padStart(2, '0');
                const yyyymmdd = `${year}${month}${day}`;
                var oContext = this.getModel().createEntry('/ztuserdgalSet', {
                    properties: {
                        Uuid: '',
                        Name: ''
                    }
                })
                this.oCreateFragment.setBindingContext(oContext);
                this.oCreateFragment.open();
            },

            onCancelCreate: function () {
                this.oCreateFragment.close();
            },

            onSaveCreate: function () {
                if (!this.getModel().getPendingChanges()) {
                    MessageBox.error("Please enter a username");
                } else {
                    this.getModel().submitChanges({
                        success: (oResponse) => {
                            this.oCreateFragment.close();
                            this.getModel().refresh();
                            MessageToast.show("Entry created", {
                                at: "center center"
                            })
                        },
                        error: (oError) => {
                            this.oCreateFragment.close();
                            console.log(oError);
                        }
                    })
                }
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
            },

            onNavigate: function (oEvent) {
                var sUuid = oEvent.getSource().getBindingContext().getProperty('Uuid');
                this.getRouter().navTo("RouteView2", { "sUuid": sUuid });
            }
        });
    });
