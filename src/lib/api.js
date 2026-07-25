// Tiny fetch wrapper around the backend API.
// Base URL comes from VITE_API_URL (defaults to "/api" for same-origin Vercel).

const BASE = import.meta.env.VITE_API_URL || "/api";
const TOKEN_KEY = "admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function logout() {
  setToken(null);
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message = (data && data.error) || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  return data;
}

// ---- Auth ----
export const authApi = {
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password } }),
  me: () => request("/auth/me", { auth: true }),
};

// ---- Generic resource helper (projects, experience, skills, education) ----
export function resource(name) {
  return {
    list: () => request(`/${name}`),
    get: (id) => request(`/${name}/${id}`),
    create: (payload) =>
      request(`/${name}`, { method: "POST", body: payload, auth: true }),
    update: (id, payload) =>
      request(`/${name}/${id}`, { method: "PUT", body: payload, auth: true }),
    remove: (id) =>
      request(`/${name}/${id}`, { method: "DELETE", auth: true }),
  };
}

export const projectsApi = resource("projects");
export const experienceApi = resource("experience");
export const skillsApi = resource("skills");
export const educationApi = resource("education");
