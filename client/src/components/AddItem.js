import React, { useRef } from "react";
import { FaPlus } from "react-icons/fa";

function AddItem({
  label,
  placeholder,
  pattern,
  newItem,
  setNewItem,
  handleSubmit,
  onKeyPress,
}) {
  const inputRef = useRef();
  return (
    <form
      htmlFor="addForm"
      className="addForm"
      onSubmit={(e) => handleSubmit(e)}
    >
      <label htmlFor="addItem"> {label} </label>
      <input
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder={placeholder}
        pattern={pattern}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={(e) => onKeyPress(e)}
        onInvalid={(e) => e.target.setCustomValidity("لم يتم إدخال بيانات")}
        required
      />
      <button
        type="submit"
        aria-label="Add Item"
        // onClick={() => inputRef.current.foucs}
      >
        <FaPlus />
      </button>
    </form>
  );
}

export default AddItem;
