// Mock data for the dashboard demo
export const kpis = [
  { label: "Policy Coverage", value: "94%", trend: "+3.2% MoM", tone: "success" },
  { label: "Active Workspaces", value: "128", trend: "+12 this week", tone: "info" },
  { label: "Critical Alerts", value: "4", trend: "-2 vs. last week", tone: "warning" },
  { label: "Policy SLA", value: "99.4%", trend: "+0.4% QoQ", tone: "success" }
];

export const users = [
  { name: "Jordan Lee", role: "Global Admin", status: "Active", lastSeen: "2m ago" },
  { name: "Priya Kumar", role: "Policy Owner", status: "Active", lastSeen: "11m ago" },
  { name: "Samir Patel", role: "Auditor", status: "Invited", lastSeen: "—" },
  { name: "Alex Morgan", role: "Workspace Admin", status: "Active", lastSeen: "34m ago" }
];

export const roles = [
  {
    name: "Global Admin",
    permissions: ["Identity provider sync", "Tenant-wide policy changes", "Billing and invoicing", "Audit exports"]
  },
  {
    name: "Workspace Admin",
    permissions: ["Local role assignment", "Workspace policy overrides", "App provisioning", "Usage insights"]
  },
  {
    name: "Auditor",
    permissions: ["Read-only views", "Evidence downloads", "Change history", "Export CSV"]
  }
];

export const activity = [
  { label: "Jan", value: 22 },
  { label: "Feb", value: 30 },
  { label: "Mar", value: 28 },
  { label: "Apr", value: 35 },
  { label: "May", value: 40 },
  { label: "Jun", value: 38 }
];

export const settings = {
  region: "US-East (Virginia)",
  sso: "Enforced via SAML",
  auditRetention: "365 days",
  changeApprovals: "Two approvers minimum"
};

export const checkoutLinks = {
  free: "https://checkout.lemonsqueezy.com/your-free-plan",
  pro: "https://checkout.lemonsqueezy.com/your-pro-plan",
  enterprise: "https://checkout.lemonsqueezy.com/your-enterprise-plan"
};
