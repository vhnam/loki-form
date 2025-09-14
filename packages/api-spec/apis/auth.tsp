import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/auth")
@tag("Auth")
namespace LokiForm.Auth {
  @post
  @route("login")
  @summary("User authentication and login")
  @doc("Authenticates a user with their email and password credentials. Upon successful authentication, returns the user's complete profile information including personal details, preferences, and authentication status. This endpoint is the primary entry point for user authentication in the LokiForm application.")
  op signIn(
    @body payload: {
      email: string;
      password: string;
    },
  ): User;

  @post
  @route("register")
  @summary("Create new user account")
  @doc("Creates a new user account with the provided personal information and credentials. Validates email uniqueness and password requirements before account creation. Returns the authenticated user's complete profile information upon successful registration. This endpoint enables new users to join the LokiForm platform.")
  op register(
    @body payload: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
  ): User;

  @get
  @route("profile")
  @useAuth(Http.BearerAuth)
  @summary("Get authenticated user profile")
  @doc("Retrieves the authenticated user's complete profile information including personal details, account settings, interface preferences, and role information. This endpoint requires a valid Bearer authentication token and is used to display user information in the application interface.")
  op getProfile(): User;

  @put
  @route("profile")
  @useAuth(Http.BearerAuth)
  @summary("Update user profile information")
  @doc("Updates the authenticated user's profile information including personal details (name, email), password, interface preferences (theme mode, language), and account settings. All fields are optional and only provided fields will be updated. This endpoint requires a valid Bearer authentication token.")
  op updateProfile(
    @body payload: {
      firstName?: string;
      lastName?: string;
      password?: string;
      interfaceMode?: "light" | "dark" | "system";
      interfaceLanguage?: "en-US" | "vi-VN";
    },
  ): User;

  @post
  @route("change-password")
  @useAuth(Http.BearerAuth)
  @summary("Change user password")
  @doc("Updates the authenticated user's password by providing the current password and a new password. Validates the current password for security before applying the new password. This endpoint requires a valid Bearer authentication token and is used for secure password updates.")
  op changePassword(
    @body payload: {
      oldPassword: string;
      newPassword: string;
    },
  ): User;

  @post
  @route("forgot-password")
  @summary("Initiate password reset process")
  @doc("Initiates a password reset process by sending a secure reset token to the user's registered email address. This endpoint is used when users forget their password and need to reset it. The reset token is time-limited and can be used with the reset-password endpoint.")
  op forgotPassword(
    @body payload: {
      email: string;
    },
  ): User;

  @post
  @route("reset-password")
  @summary("Complete password reset with token")
  @doc("Completes the password reset process using a valid reset token received via email and a new password. Validates the token's authenticity and expiration before updating the password. This endpoint is used after the user receives a reset token via the forgot-password endpoint.")
  op resetPassword(
    @body payload: {
      token: string;
      newPassword: string;
    },
  ): User;

  @post
  @route("refresh")
  @summary("Refresh authentication token")
  @doc("Refreshes an expired authentication token using a valid refresh token. This endpoint maintains user sessions without requiring re-authentication, providing a seamless user experience. Returns a new access token and refresh token pair upon successful validation.")
  op refresh(
    @body payload: {
      refreshToken: string;
    },
  ): User;
}
