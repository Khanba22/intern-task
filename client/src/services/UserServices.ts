import Keycloak, { KeycloakInitOptions, KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM || "",
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "",
};

const keycloak = new Keycloak(keycloakConfig);

const initKeyCloak = (onAuthenticatedCallback: () => void): void => {
  const initOptions: KeycloakInitOptions = {
    onLoad: "login-required",
  };

  keycloak
    .init(initOptions)
    .then((authenticated: boolean) => {
      if (authenticated) {
        onAuthenticatedCallback();
      } else {
        console.warn("Not Authenticated");
        doLogin();
      }
    })
    .catch(console.error);
};

const doLogin = (): Promise<void> => keycloak.login();
const doLogout = (): Promise<void> => keycloak.logout();
const getToken = (): string | undefined => keycloak.token;

const updateToken = (successCallback: () => void): void => {
  keycloak.updateToken(5).then(successCallback).catch(doLogin);
};

const isAuthenticated = (): boolean | undefined => keycloak.authenticated;

const getUsername = async (): Promise<string | undefined> => {
  if (!keycloak.authenticated) {
    console.warn("User is not authenticated");
    return undefined;
  }

  try {
    await keycloak.loadUserProfile();
    const username = keycloak.tokenParsed
      ? keycloak.tokenParsed["preferred_username"]
      : undefined;
    return username;
  } catch (error) {
    console.error("Failed to load user profile", error);
    return undefined;
  }
};

const hasRole = (roles: string[]): boolean =>
  roles.some((role) => keycloak.hasRealmRole(role));

const userServices = {
  isAuthenticated,
  initKeyCloak,
  doLogin,
  doLogout,
  getToken,
  updateToken,
  getUsername,
  hasRole,
};

export default userServices;
