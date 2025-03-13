const amplify = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_DUDtKTYEl",
      userPoolClientId: "47gatf0ra7lfdch2csimr7h9nl",
      identityPoolId: "us-east-1:d70ce792-5b86-4178-b006-00947cc9fd5a",
      loginWith: {
        email: true,
      },
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

export { amplify }