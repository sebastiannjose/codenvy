define(["underscore","views/accountformbase","models/account"], 

    function(_,AccountFormBase,Account){

        var ForgotPasswordForm = AccountFormBase.extend({
            __submit : function(){
                this.__showProgress();
                this.trigger("submitting");

                Account.recoverPassword(
                    this.$("input[name='email']").val(),
                    _.bind(function(d){
                        this.trigger("success",d);
                    },this),
                    _.bind(function(errors){
                        if(errors.length > 0){
                            this.trigger(
                                "invalid",
                                errors[0].getFieldName(),
                                errors[0].getErrorDescription()
                            );
                        }
                    },this)
                );
            }
        });

        return {
            get : function(form){
                if(typeof form === 'undefined'){
                    throw new Error("Need a form");
                }

                return new ForgotPasswordForm({ el : form });
            },

            ForgotPasswordForm : ForgotPasswordForm
        };

    }
);