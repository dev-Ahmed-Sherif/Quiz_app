import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Stack,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { FaPlus } from "react-icons/fa";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchItem from "./../components/SearchItem";

import image from "../img/OIP.jpg";

import "../styles/Dashboard.css";

function QuizzesDashboard() {
  const GET_URI_BACK = "/api/quizzes";

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);

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
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        {/* <SearchItem /> */}
        <Box p={6}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                navigate("/add-quiz");
              }}
              variant="contained"
              sx={{
                width: "120px",
                justifyContent: "space-between",
              }}
            >
              <FaPlus /> أضف أختبار
            </Button>
            <Typography fontSize={25} color={"blue"}>
              الأختبارات
            </Typography>
          </Stack>
          <Stack
            pt={1.5}
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              gap: "14px",
            }}
          >
            {rows.map((row) => (
              <Card
                key={row._id}
                sx={{
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
                  <Typography fontWeight="bold">
                    {row.subjectId.name}
                  </Typography>
                  <Typography fontWeight="bold"> {row.month} </Typography>
                  <Typography fontWeight="bold">
                    تاريخ الأنشاء : {row.dateAdded}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      navigate(`/add-ques/${row._id}`);
                    }}
                    variant="contained"
                    sx={{
                      width: 120,
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    <FaPlus />
                    إضافة الأسئلة
                  </Button>
                  <Button
                    onClick={() => {}}
                    variant="contained"
                    sx={{
                      width: 125,
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    <DeleteIcon />
                    حذف الأختبار
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default QuizzesDashboard;
