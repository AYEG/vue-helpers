[![Build Status](https://travis-ci.org/LauraWert/vue-helpers.svg?branch=master)](https://travis-ci.org/LauraWert/vue-helpers)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7b94e96279234d0aaca6af5b87148301)](https://www.codacy.com/app/LauraWert/vue-helpers?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=LauraWert/vue-helpers&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/7b94e96279234d0aaca6af5b87148301)](https://www.codacy.com/app/LauraWert/vue-helpers?utm_source=github.com&utm_medium=referral&utm_content=LauraWert/vue-helpers&utm_campaign=Badge_Coverage)

# uw-vue-helpers
## Modalwrapper components
Wraps QModal and adds a few extra functionalities.
props:

* *value* (boolean optional): used to open and close the modal
* *title* (string optional): Title to be displayed in the modal
* *showLoading* (boolean optional): Shows QInnerLoading with QSpinnerGears if true

Besides displaying props the modal also has three slots available for you to customize your modal. These slots being:
* content (consists of modal content),
* abort (consists of the abort button), 
* buttons (consists modal wrapper buttons).

The modal can be opened using both refs and v-model.

#### ModalWrapperButtons
Component with the default ModalWrapperButtons, slots:
* *abort*
* *submit*
#### ModalWrapperContent
Component with default ModalWrapperContent styling slots:
* *Default*

#### ModalWrapperTitle
Component with default ModalWrapperTitle styling, props:

* *title* (string optional): Title to be displayed in the modal

#### UWInput
Form Element that contains our standard configuration for forms. 
At this time only QInput and QSelect are suppported, but more quasar element can be added. 

This component consist of:
* A Qfield + een quasar input element
* Matching name for input + field that makes sure v-validate errors are displayed

Usage (props):
* input(string): quasar input naam (QInput, QSelect)
* name(string) *: input name + field name
* value(string) *: waarde van input
* label(string): label die in het formulier weergeven wordt  
* Verder worden alle props via Uwinput naar de onderliggende quasar input doorgegeven

To use v-validate on the field the vee-validate validator has to be passed down from the parent as follows:
      @Provide() private parentValidator: Validator = this.$validator

Example:
    <uw-input
      v-validate="'required'"
      v-model="contactPerson.role"
      :options="roleOptions"
      input="QSelect"
      name="role"
      label="Rol"
    />