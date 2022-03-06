import React, { useContext, useState } from "react";
import styles from "./OrderFoodForm.module.scss";
import { Form, Field, FormSpy } from "react-final-form";
import Button from "@mui/material/Button";
import SelectAdapter from "../SelectAdapter/SelectAdapter";
import TextFieldAdapter from "../TextFieldAdapter/TextFieldAdapter";
import { SelectModes, SelectOptions } from "./Constants";
import RatingAdapter from "../RatingAdapter/RatingAdapter";
import {
  composeValidationRules,
  mustBeFloatRule,
  mustBeNumberRule,
  mustBeRightLength,
  requiredRule,
} from "./Validation";
import NumberFormatCustom from "../NumberFormatCustom/NumberFormatCustom";
import Typography from "@mui/material/Typography";
import { ThemeContext } from "../../contexts/ThemeContext";
import ResponseDialog from "../ResponseDialog/ResponseDialog";
import { styled } from "@mui/material/styles";

// styled components
const colors = {
  light: "#000000b5",
  dark: "white",
};

const CssTypography = styled(Typography)(({ theme }) => ({
  "&": {
    color: theme === "dark" ? colors.dark : colors.light,
    fontSize: "1.5rem",
  },
}));

// form component
const OrderFoodForm = () => {
  const { theme } = useContext(ThemeContext);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState();

  const [selectMode, setSelectMode] = useState();

  const [ratingValue, setRatingValue] = useState(null);

  const handleCloseDialog = () => {
    setDialogVisible(false);
  };

  const onSubmit = async (e, form) => {
    const { type, name } = e;

    // prepare data
    let preparation_time = e.preparation_time.split("");
    preparation_time.splice(2, 0, ":");
    preparation_time.splice(5, 0, ":");
    preparation_time = preparation_time.join("");

    const body = { name, preparation_time, type };

    switch (selectMode) {
      case SelectModes.Pizza: {
        body.no_of_slices = parseInt(e.no_of_slices);
        body.diameter = parseInt(e.diameter);
        break;
      }

      case SelectModes.Soup: {
        body.spiciness_scale = parseInt(e.spiciness_scale);
        break;
      }

      case SelectModes.Sandwich: {
        body.slices_of_bread = parseInt(e.slices_of_bread);
        break;
      }

      default: {
        break;
      }
    }

    // send POST request
    const res = await fetch(
      "https://frosty-wood-6558.getsandbox.com:443/dishes",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    if (res.status === 200) {
      const json = await res.json();

      setDialogVisible(true);
      setDialogData(json);

      resetForm(form);
    }
  };

  const resetForm = (form) => {
    setRatingValue(null);
    setSelectMode(null);
    form.restart();
  };

  return (
    <>
      <CssTypography variant="h6" theme={theme} component="div">
        Order your food
      </CssTypography>
      <Form
        onSubmit={onSubmit}
        subscription={{ submitting: true, pristine: true }}
      >
        {({ handleSubmit, pristine, form }) => (
          <form
            onSubmit={(e) => handleSubmit(e, form)}
            className={styles.OrderEatForm}
          >
            <div className={styles.OrderEatForm__inputs}>
              <Field
                name="name"
                label="Dish Name"
                helperText="Set dish name"
                validate={requiredRule}
                component={TextFieldAdapter}
              />

              <Field
                name="preparation_time"
                label="Preparation Time"
                helperText="Set preparation time"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                validate={composeValidationRules(
                  requiredRule,
                  mustBeRightLength
                )}
                component={TextFieldAdapter}
              />

              <Field
                name="type"
                label="Dish Type"
                helperText="Set dish type"
                validate={requiredRule}
                setSelectMode={setSelectMode}
                setRatingValue={setRatingValue}
                options={SelectOptions}
                component={SelectAdapter}
                form={form}
              />

              {selectMode === SelectModes.Pizza && (
                <>
                  <Field
                    name="no_of_slices"
                    label="Number of Slices"
                    helperText="Set number of slices"
                    validate={composeValidationRules(
                      requiredRule,
                      mustBeNumberRule
                    )}
                    component={TextFieldAdapter}
                  />
                  <Field
                    name="diameter"
                    label="Diameter"
                    helperText="Set diameter"
                    validate={composeValidationRules(
                      requiredRule,
                      mustBeFloatRule
                    )}
                    component={TextFieldAdapter}
                  />
                </>
              )}

              {selectMode === SelectModes.Soup && (
                <Field
                  name="spiciness_scale"
                  type="radio"
                  label="Spiciness Scale"
                  helperText="Set spiciness scale"
                  form={form}
                  validate={requiredRule}
                  ratingValue={ratingValue}
                  setRatingValue={setRatingValue}
                  component={RatingAdapter}
                />
              )}

              {selectMode === SelectModes.Sandwich && (
                <>
                  <Field
                    name="slices_of_bread"
                    label="Slices of Bread"
                    helperText="Set slices of bread"
                    validate={composeValidationRules(
                      requiredRule,
                      mustBeNumberRule
                    )}
                    component={TextFieldAdapter}
                  />
                </>
              )}
            </div>

            <div className={styles.OrderEatForm__buttons}>
              <Button type="submit" variant="contained">
                Order
              </Button>

              <FormSpy subscription={{ pristine: true }}>
                {({ pristine, form }) => (
                  <Button
                    variant="outlined"
                    type="button"
                    style={{ marginTop: "20px" }}
                    disabled={pristine}
                    onClick={() => resetForm(form)}
                  >
                    Reset
                  </Button>
                )}
              </FormSpy>
            </div>
          </form>
        )}
      </Form>

      <ResponseDialog
        open={dialogVisible}
        data={dialogData}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

export default OrderFoodForm;
