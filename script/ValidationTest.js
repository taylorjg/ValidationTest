/**
 * Created by taylojo on 25/02/14.
 */

(function(){

    "use strict";

    $(document).ready(function() {

        var $outputPanel = $("#outputPanel");
        var _submitClicked = false;

        var _logMessage = function(message) {
            var existingText = $.trim($outputPanel.html());
            var separator = (existingText) ? "<br />" : "";
            var newText = existingText + separator + message;
            $outputPanel.html(newText).show();
        };

        var _reset = function(clearFieldsToo) {
            _validator.resetForm();
            $outputPanel.empty().hide();
            if (clearFieldsToo) {
                $(":input").val("");
            }
        }

        $("#resetBtn").click(function() {
            _reset(false /* clearFieldsToo */);
        });

        $("#clearBtn").click(function() {
            _reset(true /* clearFieldsToo */);
        });

        $("#submitBtn").click(function() {
            _submitClicked = true;
            _ignorePristineSections();
            _logMessage("submitBtn click handler");
        });

        var _validator = $("form").validate({
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

        var _defaultIgnoreSelector = _validator.settings.ignore;

        var _saveSection = function(sectionName) {
            _logMessage("saving section " + sectionName);
        };

        var _validateAndSaveSectionIfValid = function(sectionName) {
            _ignorePristineSections();
            if (_validator.form()) {
                _saveSection(sectionName);
            }
        };

        var _validateDirtySectionsExceptThisOne = function($sectionToIgnore) {
            var $dirtySections = $("div[data-validation-is-dirty='true']").not($sectionToIgnore);
            $dirtySections.each(function () {
                var sectionName = $(this).attr("data-validation-model");
                _validateAndSaveSectionIfValid(sectionName);
            });
        };

        var _ignorePristineSections = function() {
            if (_submitClicked) {
                _validator.settings.ignore = _defaultIgnoreSelector;
                _logMessage("_validator.settings.ignore: " + _validator.settings.ignore);
                return;
            }
            var $dirtySections = $("div[data-validation-model]:not([data-validation-is-dirty])");
            var bits = [];
            bits.push(_defaultIgnoreSelector);
            $dirtySections.each(function() {
                var $dirtySection = $(this);
                var bit = "#" + $dirtySection.attr("id") + " :input";
                bits.push(bit);
            });
            var ignoreSelector = bits.join(", ");
            _validator.settings.ignore = ignoreSelector;
            _logMessage("_validator.settings.ignore: " + _validator.settings.ignore);
        };

        $(document).on("change keyup paste", "div[data-validation-model] :input", function () {
            var $thisSection = $(this).closest("div[data-validation-model]");
            $thisSection.attr("data-validation-is-dirty", "true");
        });

        $(document).on("focus", "div[data-validation-model] :input", function () {
            var $thisSection = $(this).closest("div[data-validation-model]");
            _validateDirtySectionsExceptThisOne($thisSection);
        });

        $outputPanel.hide();
        _ignorePristineSections();
    });
}());
