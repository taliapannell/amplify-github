import React, { forwardRef } from "react";
import Form from "react-bootstrap/Form";
import "./TextArea.scss";
import { TextAreaProps } from "../../interfaces/TextAreaProps";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((
	{
		hint,
		rows = 1,
		value = undefined,
		handleChange = undefined,
		onKeyDown = undefined
	}, ref) => {
	return (
		<Form.Group className="form-control-group">
			<Form.Control
				className="form-control"
				as="textarea"
				id={`text-form-${hint.replace(/ /g, "")}`}
				placeholder={hint}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					if (handleChange !== undefined) {
						handleChange(event?.target?.value);
					}
				}}
				onKeyDown={onKeyDown}
				value={value}
				rows={rows}
				ref={ref}
			/>
		</Form.Group>
	);
});

export default TextArea;
