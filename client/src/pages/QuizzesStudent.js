import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  Stack,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";

import image from "../img/OIP.jpg";

import "react-toastify/dist/ReactToastify.css";
import "../styles/Dashboard.css";

function QuizzesStudent() {
  const navigate = useNavigate();

  const GET_URI_BACK = "/api/quizzes";

  const [rows, setRows] = useState([]);

  const { academicYear, quizzesResult } = useSelector((state) => state.user);

  console.log(academicYear);
  console.log(quizzesResult);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${GET_URI_BACK}`,
        { withCredentials: true }
      );
      console.log(data.data);
      setRows([...data.data]);
      // console.log(rows);
    } catch (error) {}
  };

  return (
    <Stack
      p={2}
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: "14px",
      }}
    >
      {rows.map((row) =>
        row.academicYearId._id === academicYear &&
        quizzesResult.find((ele) => ele.quizId !== row._id) !== undefined ? (
          <Card
            key={row._id}
            sx={{
              width: "14em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia sx={{ paddingTop: "7px" }}>
              <img
                style={{
                  width: "7em",
                  height: "7em",
                  borderRadius: "50%",
                }}
                src={image}
                alt="exam"
              />
            </CardMedia>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography fontWeight="bold">
                {row.academicYearId.name}
              </Typography>
              <Typography fontWeight="bold">{row.subjectId.name}</Typography>
              <Typography fontWeight="bold"> {row.month} </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => {
                  navigate(`/quiz/${row._id}`);
                }}
                variant="contained"
                sx={{
                  width: 120,
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <AiOutlineArrowRight />
                إبدا الأمتحان
              </Button>
            </CardActions>
          </Card>
        ) : (
          <></>
        )
      )}
    </Stack>
  );
}

export default QuizzesStudent;
