import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button } from "@mui/material";

import "../styles/Main.css";

function Main() {
  const LOGIN_PAGE = "/login";

  const navigate = useNavigate();

  return (
    <Stack className="container">
      <img src="./logo.jpeg" alt="" />
      <p style={{ color: "#5a8eff" }}> يقدم لكم تطبيق أختبارات للطلبة </p>
      <img src="./exams.png" alt="" />
      <Button
        sx={{
          color: "blue",
          backgroundColor: "#b9b0b0",
          padding: "14px",
          marginTop: "14px",
          fontSize: "large",
          fontWeight: 500,
        }}
        onClick={() => {
          navigate(LOGIN_PAGE);
        }}
      >
        الذهاب لصفحة تسجيل الدخول
      </Button>
    </Stack>
  );
}

export default Main;
