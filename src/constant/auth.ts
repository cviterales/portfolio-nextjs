import type { AuthFlow, AuthLandingNode } from "@/types/auth";
import type { Box, Link } from "@/types/diagram";
import type { Localized } from "@/types/i18n";

export const AUTH_VIEWBOX = { w: 1000, h: 548 };

export const AUTH_CONSOLE: Box = { x: 30, y: 20, w: 940, h: 64 };
export const AUTH_LIB: Box = { x: 30, y: 112, w: 220, h: 112 };
export const AUTH_JFROG: Box = { x: 30, y: 268, w: 220, h: 96 };
export const AUTH_OIDC: Box = { x: 700, y: 112, w: 270, h: 380 };

export const AUTH_PACKAGE = "@org/auth-lib";

/** Fases del flujo. */
export const AUTH_STEP = {
  install: 0,
  login: 1,
  signin: 2,
  callback: 3,
  sso: 4,
  session: 5,
  refresh: 6,
  logout: 7,
  check: 8,
} as const;

export const AUTH_STEP_COUNT = 9;

/** Comando de la consola por fase (es código, no se traduce). */
export const AUTH_COMMANDS: readonly string[] = [
  `$ npm install ${AUTH_PACKAGE}`,
  "auth.login()  ->  GET /authorize",
  "user signs in  ->  SSO session created",
  "redirect_uri?code=...  ->  POST /token",
  "auth.sso()  ->  GET /authorize?prompt=none",
  "session found  ->  redirect_uri?code=...",
  "auth.refresh()  ->  POST /token (refresh_token)",
  "auth.logout()  ->  GET /end_session",
  "auth.sso()  ->  error=login_required",
];

/** Fases en las que el comando es un request (se muestra en azul). */
export const AUTH_REQUEST_STEPS: readonly number[] = [
  AUTH_STEP.login,
  AUTH_STEP.sso,
  AUTH_STEP.refresh,
  AUTH_STEP.logout,
  AUTH_STEP.check,
];

type PerStep = Partial<Record<number, string>>;

/** Método de la librería que usa cada landing en cada paso. */
export const AUTH_METHODS: Record<string, PerStep> = {
  a: {
    [AUTH_STEP.login]: "login()",
    [AUTH_STEP.callback]: "handleCallback()",
    [AUTH_STEP.refresh]: "refresh()",
    [AUTH_STEP.logout]: "logout()",
  },
  b: {
    [AUTH_STEP.sso]: "sso()",
    [AUTH_STEP.session]: "handleCallback()",
    [AUTH_STEP.check]: "sso()",
  },
};

/** Mensaje que viaja entre cada landing y el OIDC en cada paso. */
export const AUTH_WIRE: Record<string, PerStep> = {
  a: {
    [AUTH_STEP.login]: "authorize",
    [AUTH_STEP.callback]: "code",
    [AUTH_STEP.refresh]: "refresh_token",
    [AUTH_STEP.logout]: "end_session",
  },
  b: {
    [AUTH_STEP.sso]: "prompt=none",
    [AUTH_STEP.session]: "code",
    [AUTH_STEP.check]: "prompt=none",
  },
};

/**
 * Pasos en los que cada landing manda un request al OIDC y recibe la
 * respuesta. En los pasos con ida y vuelta, la vuelta sale 1 s después.
 */
export const AUTH_FLOWS: Record<string, AuthFlow> = {
  a: {
    request: [AUTH_STEP.login, AUTH_STEP.refresh, AUTH_STEP.logout],
    response: [AUTH_STEP.callback, AUTH_STEP.refresh, AUTH_STEP.logout],
    responseOnly: AUTH_STEP.callback,
  },
  b: {
    request: [AUTH_STEP.sso, AUTH_STEP.check],
    response: [AUTH_STEP.session, AUTH_STEP.check],
    responseOnly: AUTH_STEP.session,
  },
};

const PUB_X = AUTH_LIB.x + AUTH_LIB.w / 2;

/** Library -> JFrog. */
export const AUTH_PUBLISH_LINK: Link = {
  x0: PUB_X,
  y0: AUTH_LIB.y + AUTH_LIB.h,
  xm: PUB_X,
  x1: PUB_X,
  y1: AUTH_JFROG.y,
};

interface LandingSeed {
  id: string;
  name: string;
  domain: string;
  ghost: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
}

const LANDING_SEEDS: readonly LandingSeed[] = [
  { id: "a", name: "Landing A", domain: "domain-a.com", ghost: false, x: 330, y: 112, w: 250, h: 150 },
  { id: "b", name: "Landing B", domain: "domain-b.com", ghost: false, x: 330, y: 284, w: 250, h: 150 },
  { id: "n", name: "Landing N", domain: "", ghost: true, x: 330, y: 456, w: 250, h: 64 },
];

export const AUTH_LANDINGS: readonly AuthLandingNode[] = LANDING_SEEDS.map((l, i) => {
  const cy = l.y + l.h / 2;

  return {
    ...l,
    installLink: { x0: AUTH_JFROG.x + AUTH_JFROG.w, y0: 296 + i * 20, xm: 290, x1: l.x, y1: cy },
    oidcLink: {
      x0: l.x + l.w,
      y0: cy,
      xm: (l.x + l.w + AUTH_OIDC.x) / 2,
      x1: AUTH_OIDC.x,
      y1: cy,
    },
  };
});

interface AuthCopy {
  library: string;
  librarySub: string;
  libraryOut: string;
  registry: string;
  registrySub: string;
  oidc: string;
  oidcSub: string;
  session: string;
  sessionRow: string;
  active: string;
  none: string;
  endpoints: string;
  hosted: string;
  signIn: string;
  loggedIn: string;
  loggedOut: string;
  ghostSub: string;
  console: string;
  publish: string;
  steps: readonly string[];
  captions: readonly string[];
}

export const AUTH_COPY: Localized<AuthCopy> = {
  en: {
    library: "Auth lib",
    librarySub: "Own repo, built with Rollup",
    libraryOut: "dist: esm, cjs",
    registry: "JFrog",
    registrySub: "Private npm registry",
    oidc: "OIDC",
    oidcSub: "Session lives on its own domain",
    session: "SSO session",
    sessionRow: "session cookie",
    active: "active",
    none: "none",
    endpoints: "Endpoints",
    hosted: "Hosted login",
    signIn: "sign-in page",
    loggedIn: "logged in",
    loggedOut: "logged out",
    ghostSub: "any number of domains",
    console: "Current step",
    publish: "npm publish",
    steps: ["Install", "Login", "Sign in", "Callback", "SSO", "Session", "Refresh", "Logout", "Check"],
    captions: [
      "The auth library is built with Rollup, published to JFrog and installed by every landing. Nobody rewrites the flow.",
      "The user clicks login on Landing A. The library redirects the browser to the OIDC provider.",
      "The user signs in at the OIDC provider, which starts its own SSO session.",
      "OIDC sends the user back to Landing A with a code. The library exchanges it for tokens.",
      "The user navigates to Landing B, on a different domain. The library starts an SSO check with prompt=none.",
      "OIDC finds the active session and answers with a code. Landing B shows the user as logged in.",
      "Before the token expires, the library renews it with the refresh token. No interruptions.",
      "Logout follows the same standard flow. The library ends the session at the OIDC provider.",
      "Landing B checks again with SSO. No session is left, so the user is logged out everywhere.",
    ],
  },
  es: {
    library: "Auth lib",
    librarySub: "Repo propio, build con Rollup",
    libraryOut: "dist: esm, cjs",
    registry: "JFrog",
    registrySub: "Registry npm privado",
    oidc: "OIDC",
    oidcSub: "La sesión vive en su propio dominio",
    session: "Sesión SSO",
    sessionRow: "session cookie",
    active: "activa",
    none: "ninguna",
    endpoints: "Endpoints",
    hosted: "Login hosteado",
    signIn: "página de login",
    loggedIn: "con sesión",
    loggedOut: "sin sesión",
    ghostSub: "cualquier cantidad de dominios",
    console: "Paso actual",
    publish: "npm publish",
    steps: ["Install", "Login", "Sign in", "Callback", "SSO", "Session", "Refresh", "Logout", "Check"],
    captions: [
      "La librería de auth se buildea con Rollup, se publica en JFrog y cada landing la instala. Nadie reescribe el flujo.",
      "El usuario hace click en login en la Landing A. La librería redirige el navegador al proveedor OIDC.",
      "El usuario inicia sesión en el proveedor OIDC, que abre su propia sesión SSO.",
      "OIDC devuelve al usuario a la Landing A con un code. La librería lo canjea por tokens.",
      "El usuario navega a la Landing B, en otro dominio. La librería inicia un chequeo SSO con prompt=none.",
      "OIDC encuentra la sesión activa y responde con un code. La Landing B muestra al usuario logueado.",
      "Antes de que expire el token, la librería lo renueva con el refresh token. Sin interrupciones.",
      "El logout sigue el mismo flujo estándar. La librería cierra la sesión en el proveedor OIDC.",
      "La Landing B vuelve a chequear con SSO. Ya no hay sesión, así que el usuario queda deslogueado en todas.",
    ],
  },
};
