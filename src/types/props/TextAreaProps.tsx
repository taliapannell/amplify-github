export interface TextAreaProps {
	hint: string;
	rows?: number;
	value?: string | undefined;
	handleChange?: (data: string) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	ref: any
}
