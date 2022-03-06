import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import OrderFoodForm from "../../components/OrderEatForm/OrderFoodForm";
import styles from "./Content.module.scss";
import StartButton from "../../components/StartButton/StartButton";

const Content = () => {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <>
      {!formVisible && <StartButton onClick={() => setFormVisible(true)} />}
      {formVisible && (
        <Card className={styles.Content}>
          <CardContent>
            <OrderFoodForm />
          </CardContent>
        </Card>
      )}

      {/* <StartButton onClick={() => setFormVisible(true)} /> */}
    </>
  );
};

export default Content;
