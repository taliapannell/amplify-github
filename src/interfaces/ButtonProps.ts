export interface ButtonProps {
	text: string;
	handleClick: () => void;
}

export interface CustomButtonProps {
	label: string,
	handleClick: () => void,
	disabled: boolean,
}