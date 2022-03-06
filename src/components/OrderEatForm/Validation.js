const requiredRule = (value) => (value ? undefined : "Field is required");

const mustBeNumberRule = (value) =>
  isNaN(value) || value <= 0 ? "Must be a positive number" : undefined;

const mustBeFloatRule = (value) =>
  value.match(/^([0-9]*[.])?[0-9]+$/) && value > 0
    ? undefined
    : "Must be a positive float number";

const mustBeRightLength = (value) =>
  value.length < 6 ? "Incorrect format of time" : undefined;

const composeValidationRules =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export {
  requiredRule,
  mustBeNumberRule,
  mustBeFloatRule,
  mustBeRightLength,
  composeValidationRules,
};
