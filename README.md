# FormValidation

## This project has moved
This project has moved to [Gitlab](https://gitlab.com/DrRoach/FormValidation).

Simple to implement jQuery form validation plugin. Add validation to your input fields simply be adding HTML fields to them. An example may look like this:
```HTML
<input type="text" fv-email="This must be a valid email." name="email" placeholder="Email">
```

## Validation Features

[![Feature Requests](https://cloud.githubusercontent.com/assets/390379/10127973/045b3a96-6560-11e5-9b20-31a2032956b2.png)](http://feathub.com/DrRoach/FormValidation)

#### fv-not-empty
Make sure that a input field isn't empty

Example:
```HTML
fv-not-empty="This field can't be empty"
```

#### fv-email
Make sure that a input field has a valid email address

Example:
```HTML
fv-email="This field must be a valid email address"
```

#### fv-simple-email
Much simpler email check that only looks for `@` in input. This may be a better choice for large-scale production use where the 0.1% of emails that may fail the `fv-email` check will not fail.

Example:
```HTML
fv-simple-email="This field must be a valid email address"
```

#### fv-number
Make sure that a input field has a valid number

Example:
```HTML
fv-number="This field must be a number"
```

#### fv-alphanum
Make sure that a input field has a alpha-numeric value

Example:
```HTML
fv-alphanum="This field must be a alpha-numeric value"
```

#### fv-func
Add some JavaScript code to be ran to which will either return true or an error message. This is useful when you want to make sure a variable has a certain value for example. You can also use "this" in a fv-func call to reference the current inputs' value

Example:
```HTML
fv-func="this == 'I\'m Human!' ? true : 'It looks like you\'re not human'"
```

You can also use JavaScript variables in here

Example:
```HTML
fv-func="loading == false ? true : 'The page is loading'"
```

#### fv-advanced
You can pass a JSON object to this validation method to perform more advanced validation
##### min
The minimum number of characters that this input field has to have
##### max
The maximum number of characters that this input field can have
##### regex
Write a regular expression to match against the field input
##### regex_reverse
Boolean that can tell our checks to fail on the inverse of our regular expression. For example, say you don't want any whitespace in your input. Setting this value to `true` will throw your error if it finds any whitespace. Rather than trying to force whitespace only.
##### message
The error message that is displayed when a condition isn't met

Example:
```HTML
fv-advanced='{"min": "6", "max": "10", "regex": "\\w+", "message": "This value must be at least 6 characters long."}'
```

## Running custom methods
There are times when you may want to run some JS after a field has been validated or invalidated. To do this you can add the `fv-valid-func` or `fv-invalid-func` data values. These allow you to run a function to add/remove a class on validation and invalidation. These two data types do not currently support the use of `$(this)` so if you wish to target a specific input it will need a unique selector. As of yet this cannot call an already existing JS method although this may be made available in
the future

Example:
```HTML
<input type="text" id="targetedInput" fv-email="Please supply a valid email." fv-valid-func="$('#targetedInput').addClass('custom-valid')" fv-invalid-func="$('#targetedInput').removeClass('custom-valid')">
```

## Setup
You can pass some extra setup data such as custom classes so the whole plugin is easier to work with. You can do this by calling formValidator.setup() or FV.setup() in your code.

Example:
```HTML
FV.setup({
    errorMessageClasses: "col-xs-12 col-sm-8 col-md-4"
});
```

##### errorMessageClasses
Pass in a string of classes to be added to error messages

Example:
```HTML
errorMessageClasses: "col-xs-12 col-sm-8 col-md-4"
```
