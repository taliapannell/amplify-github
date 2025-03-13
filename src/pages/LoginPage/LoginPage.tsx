import "./LoginPage.scss";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import { ReactNode, useEffect } from "react";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import theme_colors from "../../assets/settings/theme_colors";
import { amplifySettings } from "../../services/amplify";
import { AppDispatch } from "../../redux/store.ts"; 
import { useDispatch } from "react-redux";
import { Hub } from "aws-amplify/utils";
import { updateUserId } from "../../redux/app.slice.ts";
import { getCurrentUser } from "aws-amplify/auth";

Amplify.configure(amplifySettings);

interface LoginPageProps {
	children: ReactNode;
}

const LoginPage = ({ children }: LoginPageProps) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		Hub.listen("auth", ({ payload }) => {
			const { event } = payload;
			if (event === "signedIn") {
				// Store user info on login for app-wide consumption
				loadCurrentUser();
			}
			if (event === "signedOut") {
				// Clear user info on logout
				dispatch(updateUserId(""));
			}
		});
		// Initialize the current user and persona's prompts on page load
		loadCurrentUser();
	}, []);

	const loadCurrentUser = async () => {
		try {
			const { signInDetails } = await getCurrentUser();
			const loginId = signInDetails?.loginId;
			if (loginId) {
				dispatch(updateUserId(loginId));
			}
		} catch (error) {
			console.log("Error loading current user: ", error);
		}
	};

	// A theme with custom blue colors for the tabs and buttons
	const theme = {
		name: 'conedison-theme',
		tokens: {
			colors: {
				primary: {
					10: { value: theme_colors.PRIMARY_LIGHT },
					80: { value: theme_colors.PRIMARY },
					90: { value: theme_colors.PRIMARY_DARK }
				},
			},
		},
	};

	return (
		<div className="auth-container">
			<HeaderBar />
			<ThemeProvider theme={theme}>
				<Authenticator className="authenticator">
					{() => <div>{children}</div>}
				</Authenticator>
			</ThemeProvider>
		</div>
	);
};

export default LoginPage;