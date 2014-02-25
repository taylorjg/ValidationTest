/**
 * Created by taylojo on 25/02/14.
 */

(function(){

    "use strict";

    $(document).ready(function() {

        $("form").validate({
                errorClass: "myerror",
                errorPlacement: function(error, element) {
                    error.addClass("alert");
                    error.addClass("alert-warning");
                    error.appendTo(element.closest("td").next("td"));
                },
                rules: {
                // contactDetailsSection
                firstName: {
                    required: true,
                    minlength: 3,
                    maxlength: 20
                },
                lastName: {
                    required: true,
                    minlength: 3,
                    maxlength: 20
                },
                email: {
                    required: true,
                    email: true,
                    maxlength: 80
                },
                creditCardNumber: {
                    creditcardtypes: {
                        mastercard: true,
                        visa: true,
                        amex: true
                    }
                },
                // deliveryAddressSection
                addressLine1: {
                    required: true,
                    minlength: 2,
                    maxlength: 80
                },
                postCode: {
                    required: true,
                    postcodeUK: true
                }
            }
        });
    });
}());
