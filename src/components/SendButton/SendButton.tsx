import Send from "../../assets/images/send-icon.svg";
import FormButton from "react-bootstrap/Button";
import "./SendButton.scss";
import { ButtonProps } from "../../interfaces/ButtonProps";

const SendButton = ({ text, handleClick }: ButtonProps) => {
	return (
		<FormButton className="button" onClick={handleClick} type="submit">
			<img src={Send} alt={text} />
			<p className="button-text">{text}</p>
		</FormButton>
	);
};

export default SendButton;
