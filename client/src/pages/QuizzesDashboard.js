import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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

import "react-toastify/dist/ReactToastify.css";

import image from "../img/OIP.jpg";

import "../styles/Dashboard.css";

function QuizzesDashboard() {
  const GET_URI_BACK = "/api/quizzes";
  const DELETE_URI_BACK = "/api/quizzes/delete";

  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${DELETE_URI_BACK}`,
        {
          data: { _id: id },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      notfyDelete();
      setRows([...res.data.data]);
    } catch (error) {}
  };

  const notfyDelete = () => {
    toast.info("👍👍👍 تم حذف الأختبار بنجاح", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
              flexWrap: "wrap",
              flexDirection: "row-reverse",
              justifyContent: "center",
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
                  width: "320px",
                }}
              >
                <CardMedia sx={{ paddingTop: "7px" }}>
                  <img
                    style={{
                      width: "3.4em",
                      height: "3.4em",
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
                  <Typography fontWeight="bold" color="blue" fontSize={"large"}>
                    عدد الأسئلة : {row.questionIds.length}
                  </Typography>
                  <Typography fontWeight="bold" color="blue" fontSize={"large"}>
                    زمن الأختبار : {`${row.quizTime} دقيقة`}
                  </Typography>
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
                    onClick={() => handleDelete(row._id)}
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
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default QuizzesDashboard;
