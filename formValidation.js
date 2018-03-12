var fvId = 1;

function FormValidation() {
    this.not_empty = function(input) {
        if (input == null || input.length == 0) {
            // Input is empty so fail
            return false;
        } else {
            // Input isn't empty so return pass
            return true;
        }
    };

    this.simple_email = function(input) {
        if (input != null && input.match(/@/) != null) {
            return true;
        } else {
            return false;
        }

    };

    this.email = function(input) {
        if(input != null && input.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null) {
            return true;
        } else {
            return false;
        }
    };

    this.number = function(input) {
        if (isNaN(input) || input.length == 0) {
            return false;
        } else {
            return true;
        }
    };

    this.alphanum = function(input) {
        if (input != null && input.match(/^[a-z0-9]+$/i) != null) {
            return true;
        } else {
            return false;
        }
    };

    this.func = function(input, func) {
        func = func.replace('this', '"' + input + '"');

        var resp = eval(func);

        if (resp === true) {
            return true;
        } else {
            return false;
        }
    };

    this.advanced = function(input, data) {
        if(typeof data.min != "undefined") {
            if(input.length < data.min) {
                return false;
            } else {
                return true;
            }
        }

        if(typeof data.max != "undefined") {
            if(input.length > data.max) {
                return false;
            } else {
                return true;
            }
        }

        if(typeof data.regex != "undefined") {
            var regex = new RegExp(data.regex);

            var reverse = false;
            if (typeof data.regex_reverse != "undefined") {
                reverse = data.regex_reverse;
            }

            if(input.match(regex)) {
                if (!reverse) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (!reverse) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    };
};


$(document).ready(function() {
    // Create our validation object
    var fv = new FormValidation();

    $.each($('input'), function() {
        this.validations = 0;

        if(typeof $(this).attr('fv-not-empty') != "undefined") {
            this.validations++;

            var message = $(this).attr('fv-not-empty');

            $(this).on('keyup', function() {
                var input = $(this).val();

                if (fv.not_empty(input) == true) {
                    addSuccess(this);
                } else {
                    addError(this, message);
                }
            });
        }

        /**
         * fv-regex handling
         *
         * Supported attributes:
         *  - min
         *  - max
         *  - regex
         */
        if(typeof $(this).attr('fv-advanced') != "undefined") {
            this.validations++;
            var data = JSON.parse($(this).attr('fv-advanced'));
            var message = data.message || "";

            $(this).on('keyup', function() {
                var input = $(this).val();

                if (fv.advanced(input, data) == true) {
                    addSuccess(this);
                } else {
                    addError(this, message);
                }
            });
        }

        /**
         * fv-email handling
         *
         * fv-simple-email is a simple check to see if `@` exists in the input.
         * fv-email is a more complicated regex taken from here: http://emailregex.com/#disqus_thread
         */
        if (typeof $(this).attr('fv-simple-email') != "undefined") {
            this.validations++;
            var message = $(this).attr('fv-simple-email');

            $(this).on('keyup', function() {
                var input = $(this).val();

                if (fv.simple_email(input) == true) {
                    addSuccess(this);
                } else {
                    addError(this, message);
                }
            });
        }

        if(typeof $(this).attr('fv-email') != "undefined") {
            this.validations++;
            var message = $(this).attr('fv-email');

            $(this).on('keyup', function() {
                var input = $(this).val();

                if (fv.email(input) == true) {
                    addSuccess(true);
                } else {
                    addError(this, message);
                }
            });
        }

        /**
         * fv-number handling
         */
        if (typeof $(this).attr('fv-number') != 'undefined') {
            this.validations++;
            var message = $(this).attr('fv-number');

            $(this).on('keyup', function() {
                var input = $(this).val();

                if (fv.number(input) == true) {
                    addSuccess(this);
                } else {
                    addError(this, message);
                }
            });
        }

        /**
         * fv-alphanum handling
         */
        if (typeof $(this).attr('fv-alphanum') != 'undefined') {
            this.validations++;
            var message = $(this).attr('fv-alphanum');

            $(this).on('keyup', function() {
                var input = $(this).val();

                if (fv.alphanum(input) == true) {
                    addSuccess(this);
                } else {
                    addError(this, message);
                }
            });
        }

        if (typeof $(this).attr('fv-func') != 'undefined') {
            this.validations++;
            var func = $(this).attr('fv-func');

            $(this).on('keyup', function() {
                var input = $(this).val();

                if (fv.func(input, func) == true) {
                    addSuccess(this);
                } else {
                    addError(this, message);
                }
            });
        }
    });

    /**
     * Add error class and remove success class from input
     * @param self
     * @param message
     */
    function addError(self, message) {
        self.error = true;

        message = message || '';
        var id = $(self).attr('data-fvid');
        if(typeof id != "undefined") {
            var selector = '.fv-error-message[data-fvid="'+id+'"]';
        } else {
            var selector = '.fv-error-message:not([data-fvid])';
        }

        if($(self).siblings(selector).length === 0) {
            $(self).removeClass('fv-success').addClass('fv-error').attr('data-fvid', fvId).after('<small class="fv-error-message ' + FV.errorMessageClasses + '" data-fvId="'+ fvId++ +'">' + message + '</small>');
            $(self).closest('form').find('input[type="submit"]').prop('disabled', true);
        } else {
            // Error message already exists so replace text
            $(self).siblings(selector).text(message);
        }
    }

    /**
     * Add success class and remove error class from input
     * @param self
     */
    function addSuccess(self) {
        if (!self.error || self.validations == 1) {
            $(self).removeClass('fv-error').addClass('fv-success');
            if($(self).siblings('.fv-error-message').length > 0) {
                var id = $(self).attr('data-fvid');
                $('small[data-fvid="'+id+'"]').remove();
                $(self).removeAttr('data-fvid');
            }
            $(self).closest('form').find('input[type="submit"]').prop('disabled', false);
        } else {
            self.error = false;
        }
    }
});

/**
 * Create shorthand variable for lazy people like me
 */
var FV = {};

/**
 * Create variables with their default values
 * @type {string}
 */
FV.errorMessageClasses = "";

/**
 * Add setup function to allow for some data to be passed
 * @param data
 */
FV.setup = function(data) {
    /**
     * Check to see if custom classes have been added to error messages, if they have, store them
     * for use later in the script
     */
    if(typeof data.errorMessageClasses != "undefined") {
        FV.errorMessageClasses = data.errorMessageClasses;
    }
};
