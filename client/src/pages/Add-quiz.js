import React, { useState } from "react";

const AddQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [answer, setAnswer] = useState("");

  const onChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const onChangeOption = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const onAddOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
  };

  const onRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const quiz = {
      question,
      options,
      answer,
    };

    console.log(quiz);

    // TODO: Add API call to insert quiz
  };

  return (
    <div>
      <h3>Add New Quiz</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Question: </label>
          <input
            type="text"
            className="form-control"
            value={question}
            onChange={onChangeQuestion}
          />
        </div>
        <div className="form-group">
          <label>Options: </label>
          {options.map((option, index) => (
            <div key={index} className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={option}
                onChange={(e) => onChangeOption(e, index)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => onRemoveOption(index)}
                >
                  -
                </button>
              </div>
            </div>
          ))}
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onAddOption}
          >
            Add Option
          </button>
        </div>
        <div className="form-group">
          <label>Answer: </label>
          <input
            type="text"
            className="form-control"
            value={answer}
            onChange={onChangeAnswer}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Add Quiz" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default AddQuiz;
