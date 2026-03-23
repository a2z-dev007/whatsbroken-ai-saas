export type IssueSeverity = "critical" | "warning" | "info";

export interface BrokenCard {
  id: string;
  severity: IssueSeverity;
  title: string;
  explanation: string;
}

export interface NetworkRequest {
  id: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  status: number;
  time: number;
  requestHeaders: Record<string, string>;
  responseBody: unknown;
  payload?: unknown;
}

export interface ConsoleEntry {
  id: string;
  level: "log" | "warn" | "error";
  message: string;
  timestamp: string;
}

export interface JsError {
  id: string;
  message: string;
  file: string;
  line: number;
  count: number;
  stack: string;
}

export interface AiInsight {
  id: string;
  title: string;
  cause: string;
  fix: string;
  severity: IssueSeverity;
  impact: string;
  time: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  status: "healthy" | "issues";
  lastActivity: string;
  errorsCount: number;
}

export const exampleUrls = [
  "https://shop.example.com/checkout",
  "https://app.whatsbroken.com/dashboard",
  "https://demo.startup.com",
];

export const brokenCards: BrokenCard[] = [
  {
    id: "1",
    severity: "critical",
    title: "2 APIs failed",
    explanation:
      "Your checkout depends on login and payment endpoints. Two calls returned server errors.",
  },
  {
    id: "2",
    severity: "warning",
    title: "Page feels slow (3.2s)",
    explanation:
      "First meaningful paint took longer than ideal. Users may bounce before content appears.",
  },
  {
    id: "3",
    severity: "critical",
    title: "Frontend error detected",
    explanation:
      "JavaScript threw while rendering the cart. Some shoppers may see a blank section.",
  },
];

export const networkRequests: NetworkRequest[] = [
  {
    id: "n1",
    url: "/api/login",
    method: "POST",
    status: 500,
    time: 320,
    requestHeaders: {
      "Content-Type": "application/json",
      Authorization: "Bearer ***",
    },
    payload: { email: "user@example.com", password: "[redacted]" },
    responseBody: { error: "Internal Server Error", code: "AUTH_SERVICE_DOWN" },
  },
  {
    id: "n2",
    url: "/api/products",
    method: "GET",
    status: 200,
    time: 120,
    requestHeaders: { Accept: "application/json" },
    responseBody: { items: [{ id: 1, name: "Pro Plan" }], total: 1 },
  },
  {
    id: "n3",
    url: "/api/cart",
    method: "GET",
    status: 200,
    time: 89,
    requestHeaders: { Accept: "application/json" },
    responseBody: { lines: [], subtotal: 0 },
  },
  {
    id: "n4",
    url: "/api/payment/intent",
    method: "POST",
    status: 502,
    time: 2100,
    requestHeaders: { "Content-Type": "application/json" },
    payload: { amount: 4999, currency: "usd" },
    responseBody: { error: "Bad Gateway", upstream: "stripe-proxy" },
  },
  {
    id: "n5",
    url: "/api/telemetry",
    method: "POST",
    status: 204,
    time: 45,
    requestHeaders: { "Content-Type": "application/json" },
    payload: { event: "page_view" },
    responseBody: null,
  },
];

export const consoleLogs: ConsoleEntry[] = [
  {
    id: "c1",
    level: "error",
    message: "Cannot read properties of undefined (reading 'map')",
    timestamp: "14:32:01.204",
  },
  {
    id: "c2",
    level: "warn",
    message: "Deprecated API: use getCartV2 instead of getCart",
    timestamp: "14:32:00.881",
  },
  {
    id: "c3",
    level: "log",
    message: "User loaded dashboard",
    timestamp: "14:31:58.102",
  },
  {
    id: "c4",
    level: "log",
    message: "Feature flag checkout_v2: true",
    timestamp: "14:31:58.140",
  },
  {
    id: "c5",
    level: "warn",
    message: "Slow network: RTT 340ms",
    timestamp: "14:31:59.002",
  },
];

export const jsErrors: JsError[] = [
  {
    id: "e1",
    message: "Cannot read property 'map' of undefined",
    file: "app.js",
    line: 42,
    count: 128,
    stack: `TypeError: Cannot read property 'map' of undefined
    at CartSummary (app.js:42:15)
    at renderWithHooks (react-dom.js:15496)
    at updateFunctionComponent (react-dom.js:19612)`,
  },
  {
    id: "e2",
    message: "ResizeObserver loop limit exceeded",
    file: "vendor.js",
    line: 1,
    count: 14,
    stack: `Error: ResizeObserver loop limit exceeded
    at flush (vendor.js:1:9021)`,
  },
];

export const aiInsights: AiInsight[] = [
  {
    id: "a1",
    title: "Checkout is failing",
    cause:
      "The payment API is returning 502 from the Stripe proxy. Login also returns 500, so sessions may be invalid.",
    fix: "Verify auth service health and payment proxy configuration. Retry with idempotency keys enabled.",
    severity: "critical",
    impact: "~18% of sessions in the last hour",
    time: "Just now",
  },
  {
    id: "a2",
    title: "Cart render crash",
    cause:
      "Cart lines are undefined when the API returns an empty object instead of an array.",
    fix: "Default cart.lines to [] before calling .map in CartSummary.",
    severity: "critical",
    impact: "All users on checkout step 2",
    time: "2 min ago",
  },
  {
    id: "a3",
    title: "Perceived slowness",
    cause: "Large bundle and a 2.1s blocked request on /api/payment/intent.",
    fix: "Code-split checkout route; add caching headers for static assets.",
    severity: "warning",
    impact: "Mobile users on 3G/4G",
    time: "8 min ago",
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    name: "Shop – Production",
    url: "shop.example.com",
    status: "issues",
    lastActivity: "2 min ago",
    errorsCount: 12,
  },
  {
    id: "p2",
    name: "Marketing site",
    url: "www.startup.com",
    status: "healthy",
    lastActivity: "1 hr ago",
    errorsCount: 0,
  },
  {
    id: "p3",
    name: "App dashboard",
    url: "app.startup.com",
    status: "issues",
    lastActivity: "Yesterday",
    errorsCount: 3,
  },
  {
    id: "p4",
    name: "Docs portal",
    url: "docs.startup.com",
    status: "healthy",
    lastActivity: "3 days ago",
    errorsCount: 0,
  },
];

export const summaryStats = {
  totalApiCalls: 47,
  failedRequests: 4,
  avgResponseTimeMs: 186,
  errorsCount: 7,
};

export const analyticsTrend = [
  { day: "Mon", errors: 12, p95: 420 },
  { day: "Tue", errors: 8, p95: 310 },
  { day: "Wed", errors: 15, p95: 510 },
  { day: "Thu", errors: 6, p95: 240 },
  { day: "Fri", errors: 9, p95: 290 },
  { day: "Sat", errors: 4, p95: 200 },
  { day: "Sun", errors: 7, p95: 265 },
];

export const aiTimeline = [
  { id: "t1", text: "Flagged login 500 spike", time: "Today 14:28" },
  { id: "t2", text: "Suggested null-check on cart lines", time: "Today 14:25" },
  { id: "t3", text: "Noticed payment proxy latency", time: "Today 14:10" },
];

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    yearly: 0,
    description: "Try WhatsBroken on a single site.",
    features: ["1 project", "24h history", "Email alerts"],
    highlighted: false,
  },
  {
    id: "basic",
    name: "Basic",
    monthly: 29,
    yearly: 290,
    description: "For small teams shipping weekly.",
    features: ["5 projects", "30-day history", "Slack alerts", "AI summaries"],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 79,
    yearly: 790,
    description: "For product teams that need depth.",
    features: [
      "Unlimited projects",
      "1-year history",
      "SSO",
      "Priority AI insights",
      "Custom dashboards",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    yearly: null,
    description: "Security, compliance, and support.",
    features: ["VPC option", "DPA", "Dedicated CSM", "SLA"],
    highlighted: false,
  },
];
