# FormValidation
Simple to implement jQuery form validation plugin. Add validation to your input fields simply be adding HTML fields to them. An example may look like this:
```HTML
<input type="text" fv-email="This must be a valid email." name="email" placeholder="Email">
```

## Validation Features

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
Add some JavaScript code to be ran to which will either return true or a error messsage. This is useful when you want to make sure a variable has a certain value for example. You can also use "this" in a fv-func call to reference the current inputs' value

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
fv-advanced='{"min": "6", "max": "10", "regex": "/\w+/", "message": "This value must be at least 6 characters long."}'
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
