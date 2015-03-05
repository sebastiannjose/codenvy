/*
 * CODENVY CONFIDENTIAL
 * __________________
 * 
 *  [2012] - [2013] Codenvy, S.A. 
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Codenvy S.A. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Codenvy S.A.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Codenvy S.A..
 */
 
define(["jquery","underscore", "backbone", "models/account","views/accountformbase"],

    function($, _, Backbone, Account){
        var CreateWsAddMember = Backbone.View.extend({
            
            initialize : function(){
                var username = Account.getQueryParameterByName("username");
                var bearertoken = Account.getQueryParameterByName("bearertoken");
                var workspace = Account.getQueryParameterByName("workspace");
                var redirect_url = Account.getQueryParameterByName("redirect_url");
                var queryParams = window.location.search.substring(1);
                if (username && bearertoken) {
                    Account.processCreate(
                        username,
                        bearertoken,
                        workspace,
                        redirect_url, queryParams,
                        _.bind(function(errors){

                            if(errors.length !== 0){
                                this.trigger(
                                    "invalid",
                                    errors[0].getFieldName(),
                                    errors[0].getErrorDescription()
                                );
                            }
                        },this)
                    );
                } else {
                    Account.redirectToUrl("/");
                }

/*                Account.createWorkspace(
                    Account.getQueryParameterByName('username'),
                    Account.getQueryParameterByName('bearertoken'),
                    Account.getQueryParameterByName('workspace'),
                    Account.getQueryParameterByName('redirect_url'),
                    _.bind(function(d){
                        this.trigger("success",d);
                    },this),
                    _.bind(function(errors){

                        if(errors.length !== 0){
                            this.trigger(
                                "invalid",
                                errors[0].getFieldName(),
                                errors[0].getErrorDescription()
                            );
                        }
                    },this)
                );*/
            }
        });

        return {
            get : function(form){
                if(typeof form === 'undefined'){
                    throw new Error("Need a form");
                }

                return new CreateWsAddMember({ el : form });
            }
        };

    }
);