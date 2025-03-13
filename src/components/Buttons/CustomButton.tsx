import { CustomButtonProps } from "../../types/props/ButtonProps";
import "./CustomButton.scss";

const CustomButton = ({ label, handleClick, disabled }: CustomButtonProps) => {
  const styling = disabled ? "disabled-custom-button-container" : "custom-button-container";
  return (
    <div
      className={styling}
      onClick={() => {
        if (!disabled) {
          handleClick()
        }
      }
      }
    >
      <h3 className="custom-button">{label}</h3>
    </div>
  );
};

export default CustomButton;