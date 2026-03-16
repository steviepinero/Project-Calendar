# Menu & Layout Redesign Spec

Design requirements for the MSP Project Calendar menu restructure. Use this as the implementation roadmap.

---

## MENU LAYOUT ✅

- **Hide Menu / show icons** – Collapsible sidebar with icon-only mode (click icons to expand)
- **Only 6 main entries, no sub-entries** in top-level menu (future)

---

## MENU ITEMS (6 main sections)

### 1. LEADS
- **Only data, no analysis**
- **Tabs:**
  - **Overview** ✅ – Base screen data (Client, Services, Contact's, Default Site Settings). Contacts: **LinkedIn**, **Facebook** added.
  - **Schedule** ✅ – Meetings grid + workflow phases (Gather Data, Set Initial Meeting, Present, Review)
  - **Tasks** ✅ – Renamed to "Todo's"; limited to action items and to-dos
  - **AI Summary** – How are you asking the AI engine? (design TBD)
  - **Dark Web**
  - **Touches** ✅ – Add Note, Send Email, Make Call action buttons
  - **Proposal** – Table: Name, Summary, Created, Status (multiple proposals per lead)
- **Remove from Leads:** Site Overview, Network Analysis, Device Analysis, Network Access → move to Endpoints (see below)

---

### 2. PROPOSALS ✅
- **Only data, no analysis**
- **Proposals grid** – All proposals page with grid (Name, Summary, Client, Created, Status). Grouping enabled, show all (no pagination).
- Leads tab has proposals grid per lead + Proposal Generator.

---

### 3. ENDPOINTS (new section)
- Combines: Site Overview, Network Analysis, Device Analysis (from Leads)
- **Integrate local agent results**
- **Dropdown** with entries below; mock graph + grid of endpoints (same data can be reused across dropdown options)
- **Dropdown options:**
  - Software
  - Life Cycle
  - Windows Version
  - Architecture
  - Patch Status
  - Antivirus
  - Account Type
  - OneDrive (different statuses to capture)
  - Other...
- **Site Survey** – See SharePoint: Leads\Site Survey. Need tool to map network (fake for now). IMAGE
- **Software** – Design specs TBD

---

### 4. CLIENTS
- Include same tabs as above
- **Projects / Tasks / Todo's**
- **Billing** – See SharePoint: Leads\Billing, needs design
- **Network Access** – Moved here from Leads

---

### 5. MANAGEMENT
- Aggregate-level view of some menu items above
- Needs design

---

### 6. BEST PRACTICES
- Keep what's currently there for now
- Discuss later

---

## CONFIGURATION (make into tabs) ✅

- Email Campaign | E-Signature | VoIP | Proposals – single Configuration page with 4 tabs

---

## NOTES / REQUIREMENTS

### GRIDS ✅
- Need to be able to **GROUP**
- **Show all entries** – no pagination (allowPaging: false on all grids)

### PROPOSALS
- Add grid to display all proposals created (multiple per lead/client)

### INTEGRATE LOCAL AGENT RESULTS
- Endpoints and related views should show data from local agent

---

## SHAREPOINT REFERENCES

- Site Survey: Leads\Site Survey
- Billing: Leads\Billing
