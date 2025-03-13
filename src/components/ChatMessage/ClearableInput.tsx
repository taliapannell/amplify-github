import { useState } from "react";
import closeIcon from "../../assets/images/close-icon.svg";
import "./ClearableInput.scss";

interface ClearableInputProps {
  placeholder: any;
  onSubmit: (value: any) => void
}

const ClearableInput = ({ placeholder, onSubmit }: ClearableInputProps) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    onSubmit(value); // Submit the value when the input loses focus
    // setValue("");
    setIsFocused(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(value);
    // setValue("");
    // Blur the input
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleClear = (e: any) => {
    e.stopPropagation(), setValue("");
    setIsFocused(false);
  };

  return (
    <div className="clearable-input-container">
      <form onSubmit={handleSubmit}>
        <input
          className="clearable-input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {isFocused && (
          <button
            className="clearable-input-clear-button"
            type="button"
            onMouseDown={handleClear}
          >
            <img src={closeIcon} alt="Clear comment" />
          </button>
        )}
      </form>
    </div>
  );
};

export default ClearableInput;
