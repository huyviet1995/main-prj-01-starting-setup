<template>
    <form @submit.prevent="submitForm" action="">
        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstName">First name</label>
            <input type="text" id="firstName" v-model.trim="firstName.val" @blur="validateField('firstName')">
            <p v-if="!firstName.isValid" class="invalid">First name must not be empty</p>
        </div>
        <div class="form-control" :class="{invalid: !lastName.isValid}">
            <label for="lastName">Last name</label>
            <input type="text" id="lastName" v-model.trim="lastName.val" @blur="validateField('lastName')">
            <p v-if="!lastName.isValid" class="invalid">Last name must not be empty</p>
        </div>
        <div class="form-control" :class="{invalid: !description.isValid}">
            <label for="description">Description</label>
            <textarea rows="5" type="text" id="description" v-model.trim="description.val" @blur="validateField('description')"/>
            <p v-if="!description.isValid" class="invalid">Description must not be empty</p>
        </div>
        <div class="form-control" :class="{invalid: !rate.isValid}">
            <label for="rate">Hourly rate</label>
            <input type="number" id="rate" v-model.number="rate.val" @blur="validateField('rate')">
            <p v-if="!rate.isValid" class="invalid">Rate must be greater than 0</p>
        </div>
        <div class="form-control" :class="{invalid: !areas.isValid}">
            <h3>Areas of expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="validateField('areas')">
                <label for="frontend">Frontend development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="validateField('areas')">
                <label for="backend">Backend development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.val" @blur="validateField('areas')">
                <label for="career">Career advisory</label>
            </div>
            <p v-if="!areas.isValid" class="invalid">At least one area must be picked</p>
        </div>
        <p v-if="!formIsValid" class="invalid">Please fix the above errors and submit again.</p>
        <base-button>Register</base-button>
    </form>
</template>

<script>

export default {
    emits: ['save-data'],
    data() {
        return {
            firstName: {
                val: '',
                isValid: true,
            },
            lastName: {
                val: '',
                isValid: true,
            },
            description: {
                val: '',
                isValid: true,
            },
            rate: {
                val: null,
                isValid: true,
            },
            areas: {
                val: [],
                isValid: true,
            },
            formIsValid: true,
        }
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true;
        },
        validateField(input) {
            const value = this[input].val;
            this.formIsValid = true;
            this.clearValidity(input);
            switch (input) {
                case 'rate': {
                    if (!value || value < 0) {
                        this.rate.isValid = false;
                        this.formIsValid = false;
                    }
                    break;
                }
                case 'areas': {
                    if (value.length === 0) {
                        this.areas.isValid = false;
                        this.formIsValid = false;
                    }
                    break;
                }
                case 'firstName':
                case 'lastName':
                case 'description': {
                    if (value === '') {
                        this[input].isValid = false;
                        this.formIsValid = false;
                    }
                    break;
                }
                default: {
                    this.formIsValid = true;
                    this[input].isValid = true;
                    break;
                }
            }
        },
        validateForm() {
            this.validateField('firstName');
            this.validateField('lastName');
            this.validateField('description');
            this.validateField('areas');
            this.validateField('rate');
        },
        submitForm() {
            // Validate the form.
            this.validateForm();

            const formData = {
                first: this.firstName.val,
                last: this.lastName.val,
                desc: this.description.val,
                rate: this.rate.val,
                areas: this.areas.val,
            }

            if (!this.formIsValid) {
                return;
            }

            console.log(formData);
            this.$emit('save-data', formData);
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid {
    color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>