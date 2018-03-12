//phantom.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js");
//phantom.injectJs("../formValidation.js");

var webPage = require('webpage');
var page = webPage.create();

var passes = 0;
var fails  = 0;

page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", function() {
    console.log("jQuery Loaded..");

    if (page.injectJs("../formValidation.js")) {
        console.log("FormValidation injected..\n");

        /**
         *  Test `not_empty()`
         */
        console.log("Testing `not_empty()`");
        var testNotEmpty = page.evaluate(function() {
            var fv = new FormValidation();

            // If we pass nothing we expect to get false
            if (fv.not_empty() != false) {
                return false;
            }

            // If we pass a valid input we expect true
            if (fv.not_empty("input") != true) {
                return false;
            }

            // All test have passed
            return true;
        });

        // Evaluate not empty tests
        if (testNotEmpty == true) {
            passes++;
        } else {
            console.log("Test: testNotEmpty failed");
            fails++;
        }

        /**
         * Test `simple_email()`
         */
        console.log("Testing `simple_email()`");
        var testSimpleEmail = page.evaluate(function() {
            var fv = new FormValidation();

            if (fv.simple_email() != false) {
                return false;
            }

            if (fv.simple_email("invalidemail") != false) {
                return false;
            }

            if (fv.simple_email("valid@gmail.com") != true) {
                return false;
            }

            if (fv.simple_email("anotherinvalid.com") != false) {
                return false;
            }

            return true;
        });

        // Evaluate simple email tests
        if (testSimpleEmail == true) {
            passes++;
        } else {
            console.log("Test: testSimpleEmail failed");
            fails++;
        }

        /**
         * Test `email()`
         */
        console.log("Testing `email()`");
        var testEmail = page.evaluate(function() {
            var fv = new FormValidation();

            if (fv.email() != false) {
                return false;
            }

            if (fv.email("invalidemail") != false) {
                return false;
            }

            if (fv.email("invalid@gmail") != false) {
                return false;
            }

            if (fv.email("valid@gmail.com") != true) {
                return false;
            }

            if (fv.email("invalid@.com") != false) {
                return false;
            }

            return true;
        });

        // Evaluate email
        if (testEmail == true) {
            passes++;
        } else {
            console.log("Test: testEmail failed");
            fails++;
        }

        /**
         * Test `number()`
         */
        console.log("Testing `number()`");
        var testNumber = page.evaluate(function() {
            var fv = new FormValidation();

            if (fv.number() != false) {
                return false;
            }

            if (fv.number("abc") != false) {
                return false;
            }

            if (fv.number("45") != true) {
                return false;
            }

            if (fv.number("4-2") != false) {
                return false;
            }

            return true;
        });

        // Evaluate number
        if (testNumber == true) {
            passes++;
        } else {
            console.log("Test: testNumber failed");
            fails++;
        }

        /**
         * Test `alphanum()`
         */
        console.log("Testing `alphanum()`");
        var testAlphanum = page.evaluate(function() {
            var fv = new FormValidation();

            if (fv.alphanum() != false) {
                return false;
            }

            if (fv.alphanum("sd23-!") != false) {
                return false;
            }

            if (fv.alphanum("sds 32") != false) {
                return false;
            }

            if (fv.alphanum("abcd") != true) {
                return false;
            }

            if (fv.alphanum("abc123") != true) {
                return false;
            }

            if (fv.alphanum("") != false) {
                return false;
            }

            return true;
        });

        // Evaluate alphanum
        if (testAlphanum == true) {
            passes++;
        } else {
            console.log("Test: testAlphanum failed");
            fails++;
        }

        /**
         * Test `func()`
         */
        console.log("Testing `func()`");
        var testFunc = page.evaluate(function() {
            var fv = new FormValidation();

            if (fv.func("true", "this == false") != false) {
                return false;
            }

            if (fv.func("false", "this == 'testing'") != false) {
                return false;
            }

            if (fv.func("testing", "this == 'testing'") != true) {
                return false;
            }

            if (fv.func("test", "this < 10") != false) {
                return false;
            }

            if (fv.func("5", "this < 10") != true) {
                return false;
            }

            return true;
        });

        // Evaluate func
        if (testFunc == true) {
            passes++;
        } else {
            console.log("Test: testFunc falied");
            fails++;
        }

        console.log("Testing `advanced()`");
        var testAdvanced = page.evaluate(function() {
            var fv = new FormValidation();

            if (fv.advanced("test", {min: 5}) != false) {
                return false;
            }

            if (fv.advanced("testing", {min: 5}) != true) {
                return false;
            }

            if (fv.advanced("testing", {max: 5}) != false) {
                return false;
            }

            if (fv.advanced("test", {max: 5}) != true) {
                return false;
            }

            if (fv.advanced("testword", {regex: "\\w+"}) != true) {
                return false;
            }

            if (fv.advanced("test num only", {regex: "^\\d+$"}) != false) {
                return false;
            }

            if (fv.advanced("test whitespace reverse", {regex: "\\s+", regex_reverse: true}) != false) {
                return false;
            }

            if (fv.advanced("t estwhitespace", {regex: "\\s+", regex_reverse: false}) != true) {
                return false;
            }

            return true;
        });

        // Evaluate advanced
        if (testAdvanced == true) {
            passes++;
        } else {
            console.log("Test: testAdvanced failed");
            fails++;
        }

        console.log("\n" + passes + " tests passed. " + fails + " tests failed.\n");
    }

    phantom.exit();
});

window.setTimeout(function() {
    console.log("TIMEOUT");
    phantom.exit(1);
}, 10000);
