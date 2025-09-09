<template>
  <div style="display:none"></div>
</template>

<script>
export default {
  name: 'Validation',
  props: {
    model: { type: Object, required: true },
    rules: { type: Object, required: true }
  },
  data() {
    return {
      currentErrors: {},
      workingRules: {},
      workingModel: {},
      currentField: '',
      currentFieldRules: [],
      currentValue: '',
      currentRule: null,
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    };
  },
  methods: {
    validate() {
      this.currentErrors = {};
      this.workingRules = this.rules || {};
      this.workingModel = this.model || {};

      Object.keys(this.workingRules).forEach((field) => {
        this.currentField = field;
        this.currentFieldRules = Array.isArray(this.workingRules[field]) ? this.workingRules[field] : [this.workingRules[field]];
        const raw = this.workingModel[field];
        this.currentValue = raw == null ? '' : String(raw);

        for (let i = 0; i < this.currentFieldRules.length; i++) {
          this.currentRule = this.currentFieldRules[i] || {};
          if (typeof this.currentRule.when === 'function' && !this.currentRule.when(this.workingModel)) continue;

          if (this.currentRule.required) {
            if (this.currentValue.trim().length === 0) {
              this.currentErrors[this.currentField] = this.currentRule.message || 'This field is required.';
              break;
            }
          }

          if (this.currentRule.type === 'email') {
            if (!this.emailRegex.test(this.currentValue)) {
              this.currentErrors[this.currentField] = this.currentRule.message || 'Invalid email.';
              break;
            }
          }

          if (this.currentRule.pattern) {
            const re = this.currentRule.pattern instanceof RegExp ? this.currentRule.pattern : new RegExp(this.currentRule.pattern);
            if (!re.test(this.currentValue)) {
              this.currentErrors[this.currentField] = this.currentRule.message || 'Invalid format.';
              break;
            }
          }

          if (typeof this.currentRule.minLen === 'number' && this.currentValue.length < this.currentRule.minLen) {
            this.currentErrors[this.currentField] = this.currentRule.message || `Minimum length is ${this.currentRule.minLen}.`;
            break;
          }
          if (typeof this.currentRule.maxLen === 'number' && this.currentValue.length > this.currentRule.maxLen) {
            this.currentErrors[this.currentField] = this.currentRule.message || `Maximum length is ${this.currentRule.maxLen}.`;
            break;
          }

          if (typeof this.currentRule.validator === 'function') {
            const result = this.currentRule.validator(this.currentValue, this.workingModel);
            if (result !== true) {
              this.currentErrors[this.currentField] = typeof result === 'string' ? result : (this.currentRule.message || 'Invalid value.');
              break;
            }
          }
        }
      });

      this.$emit('errors', this.currentErrors);
      return Object.keys(this.currentErrors).length === 0;
    }
  },
  watch: {
    model: {
      handler() {
        this.validate();
      },
      deep: true
    }
  }
}
</script>


