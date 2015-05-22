# FormValidation
Simple to implement jQuery form validation plugin. Add validation to your input fields simply be adding HTML fields to them. An example may look like this:
```HTML
<input type="text" fv-email="This must be a valid email." name="email" placeholder="Email">
```

##Validation Features

####fv-not-empty
Make sure that a input field isn't empty

Example:
```HTML
fv-not-empty="This field can't be empty"
```

####fv-email
Make sure that a input field has a valid email address

Example:
```HTML
fv-email="This field must be a valid email address"
```

####fv-advanced
You can pass a JSON object to this validation method to perform more advanced validation
#####min
The minimum number of characters that this input field has to have
#####max
The maximum number of characters that this input field can have
#####regex
Write a regular expression to match against the field input
#####message
The error message that is displayed when a condition isn't met

Example:
```HTML
fv-advanced='{"min": "6", "max": "10", "regex": "/\w+/", "message": "This value must be at least 6 characters long."}'
```

##Setup
You can pass some extra setup data such as custom classes so the whole plugin is easier to work with. You can do this by calling formValidator.setup() or FV.setup() in your code.

Example:
```HTML
FV.setup({
    errorMessageClasses: "col-xs-12 col-sm-8 col-md-4"
});
```

#####errorMessageClasses
Pass in a string of classes to be added to error messages

Example:
```HTML
errorMessageClasses: "col-xs-12 col-sm-8 col-md-4"
```