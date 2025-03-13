import FormButton from "react-bootstrap/Button";
import "./SubmitButton.scss";
import { ButtonProps } from "../../../types/props/ButtonProps";

const SubmitButton = ({ text, handleClick }: ButtonProps) => {
	return (
		<FormButton className="button" onClick={handleClick} type="submit">
			<p className="button-text">{text}</p>
		</FormButton>
	);
};

export default SubmitButton;
