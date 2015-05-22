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
#####message
The error message that is displayed when a condition isn't met

Example:
```HTML
fv-advanced='{"min": "6", "message": "This value must be at least 6 characters long."}'
```
