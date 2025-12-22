const MOCK_KPIS = [
  { label: "Policies Monitored", value: "1,284", trend: "up" },
  { label: "Open Exceptions", value: "32", trend: "warning" },
  { label: "Automation Coverage", value: "87%", trend: "up" },
  { label: "Time to Remediate", value: "< 5 min", trend: "success" }
];

const MOCK_USERS = [
  { name: "Lena Patel", role: "Platform Lead", status: "active" },
  { name: "Michael Chen", role: "CISO", status: "active" },
  { name: "Ravi Kumar", role: "GPO Admin", status: "pending" },
  { name: "Sara Lopez", role: "Compliance", status: "active" }
];

const MOCK_ROLES = [
  { name: "Org Admin", permissions: "Full access, audit, approvals" },
  { name: "Security", permissions: "Policy authoring, exception workflows" },
  { name: "Audit", permissions: "Read-only, evidence export" }
];

const MOCK_ACTIVITY = [
  { title: "Policy baseline synced", detail: "Region: EU Central", status: "success" },
  { title: "Exception awaiting approval", detail: "PCI scope", status: "warning" },
  { title: "Configuration drift detected", detail: "Endpoint hardening", status: "danger" }
];

const MOCK_ANALYTICS = [
  { metric: "Access reviews completed", value: "96%", change: "+4% MoM" },
  { metric: "Segregation of duties", value: "14 flagged", change: "-2 vs last week" },
  { metric: "Policy drift", value: "3 systems", change: "-1 vs last scan" }
];

const MOCK_SETTINGS = [
  { name: "SAML SSO", status: "Enabled" },
  { name: "MFA enforcement", status: "Mandatory" },
  { name: "Audit retention", status: "365 days" },
  { name: "API tokens", status: "5 active" }
];
