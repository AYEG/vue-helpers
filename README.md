[![Build Status](https://travis-ci.org/LauraWert/vue-helpers.svg?branch=master)](https://travis-ci.org/LauraWert/vue-helpers)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7b94e96279234d0aaca6af5b87148301)](https://www.codacy.com/app/LauraWert/vue-helpers?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=LauraWert/vue-helpers&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/7b94e96279234d0aaca6af5b87148301)](https://www.codacy.com/app/LauraWert/vue-helpers?utm_source=github.com&utm_medium=referral&utm_content=LauraWert/vue-helpers&utm_campaign=Badge_Coverage)

### uw-vue-helpers
### Modalwrapper
Wraps QModal and adds a few extra functionalities.
props:

* *value* (boolean optional): used to open and close the modal
* *title* (string optional): Title to be displayed in the modal
* *showLoading* (boolean optional): Shows QInnerLoading with QSpinnerGears if true
* *buttonsEnabled* (boolean optional): Render modal buttons
* All props of QModal available in the current version of quasar

Besides displaying props the modal also has three slots available for you to customize your modal. These slots being:
* content (consists of modal content),
* abort (consists of the abort button), 
* submit (consists of the submit button).

The modal can be opened using both refs and v-model.
