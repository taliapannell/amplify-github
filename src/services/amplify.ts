import { ResourcesConfig } from "aws-amplify";

export const amplifySettings: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_ORbSRUkXm",
      userPoolClientId: "1660fgphol6gnjapcmmeddj7l5",
      identityPoolId: "us-east-1:00148e43-d5ef-4c99-adaf-ac5a66f31343",
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
};
