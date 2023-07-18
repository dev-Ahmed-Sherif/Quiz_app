import React from "react";
import "../styles/Modal.css";

import { Typography, Button } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import * as Action from "../redux/Modal_reducer";

const Modal = ({ title, children }) => {
  // const [showModal, setShowModal] = useState(false);

  const showModal = useSelector((state) => state.modal.show);
  // console.log("showModal", showModal);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(Action.setShow(false));
  };

  return (
    <>
      <div className={`modal ${showModal ? "modal-active" : ""}`}>
        <div className="modal-content">
          <h2>{title}</h2>
          {children}
          <button onClick={handleCloseModal}>أغلق</button>
        </div>
      </div>
      <Button
        sx={{ border: "2px solid blue", backgroundColor: "blue" }}
        onClick={() => dispatch(Action.setShow(true))}
      >
        <Typography fontWeight="bold" fontSize="2em" color="white">
          عرض الأختبار
        </Typography>
      </Button>
      {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
    </>
  );
};

export default Modal;
