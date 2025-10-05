# Saga Inventory - Design Guidelines

## Design Approach

**Selected Approach:** Design System - Material Design 3 with modern Shadcn/ui aesthetics

**Justification:** As a data-intensive business application requiring efficiency, reliability, and clarity, we need a proven design system that excels at information hierarchy and functional interfaces. Material Design 3's emphasis on data tables, forms, and adaptive layouts combined with Shadcn/ui's clean, modern aesthetic creates the perfect foundation for enterprise inventory management.

**Core Principles:**
- Clarity over decoration - every element serves a purpose
- Information hierarchy through consistent spacing and typography
- Efficient workflows with minimal clicks
- Responsive data visualization
- Professional, trustworthy appearance

## Color Palette

**Dark Mode (Primary):**
- Background: 222 47% 11% (deep slate)
- Surface: 217 33% 17% (elevated slate)
- Surface Variant: 217 33% 20% (cards/containers)
- Primary Brand: 221 83% 53% (vibrant blue - trust/reliability)
- Primary Hover: 221 83% 58%
- Success: 142 71% 45% (green - profit indicators)
- Warning: 38 92% 50% (amber - low stock alerts)
- Danger: 0 84% 60% (red - critical alerts)
- Text Primary: 210 40% 98%
- Text Secondary: 215 20% 65%
- Border: 217 33% 25%

**Light Mode:**
- Background: 0 0% 100%
- Surface: 210 20% 98%
- Surface Variant: 214 32% 95%
- Primary Brand: 221 83% 53% (consistent across modes)
- Text Primary: 222 47% 11%
- Text Secondary: 215 16% 47%
- Border: 214 32% 91%

## Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - exceptional readability for data-dense UIs
- Monospace: 'JetBrains Mono' - for stock codes, receipt numbers, prices

**Type Scale:**
- Hero/Dashboard Headers: text-4xl font-bold (36px)
- Section Headers: text-2xl font-semibold (24px)
- Card Headers: text-lg font-semibold (18px)
- Body Text: text-base (16px)
- Secondary/Meta: text-sm (14px)
- Table Data: text-sm font-medium
- Numeric Values: text-base font-mono font-semibold

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (form elements): p-2, gap-2
- Standard component padding: p-4, p-6
- Card/Section spacing: p-6, p-8
- Page margins: p-8, p-12
- Section breaks: mb-12, mb-16

**Grid System:**
- Dashboard: 12-column grid with responsive breakpoints
- Forms: Single column mobile, 2-column tablet, 2-3 column desktop
- Data tables: Full-width with horizontal scroll on mobile
- Analytics cards: 1 column mobile, 2-3 columns desktop

## Component Library

**Navigation:**
- Sidebar navigation (collapsible on mobile)
- Top bar with search, notifications, user profile
- Breadcrumbs for deep navigation paths
- Active state: primary brand color with left border accent

**Data Display:**
- Tables: Striped rows, hover states, sortable headers, pagination
- Cards: Elevated surfaces with subtle shadows, border-radius of 0.75rem
- Statistics widgets: Large numbers with trend indicators (arrows/percentages)
- Charts: Clean line/bar charts using Chart.js with brand color palette

**Forms:**
- Input fields: Outlined style with focus ring in primary color
- Labels: Above inputs, text-sm font-medium
- Validation: Inline error messages in danger color
- Select dropdowns: Custom styled with search capability
- Date pickers: Calendar overlay with range selection
- Buttons: Solid primary, outline secondary, ghost tertiary

**Overlays:**
- Modals: Centered, max-width 2xl, backdrop blur
- Dropdowns: Attached to trigger, shadow-lg
- Toasts: Top-right position, auto-dismiss with action buttons
- Confirmation dialogs: Centered, clear action buttons

**Action Buttons:**
- Primary CTA: bg-primary text-white, px-6 py-3, rounded-lg
- Secondary: variant="outline" with border-primary
- Danger actions: bg-danger for delete/cancel operations
- Icon buttons: p-2, rounded-md for table actions

**Status Indicators:**
- Stock levels: Green (In Stock), Amber (Low Stock), Red (Out of Stock)
- Payment status: Green (Paid), Amber (Partial), Red (Due)
- Badges: Rounded-full with colored backgrounds, px-3 py-1

## Page-Specific Layouts

**Dashboard:**
- 4 metric cards at top (Total Products, Today's Sales, Low Stock Alerts, Profit Today)
- 2-column layout: Recent transactions list + Quick actions sidebar
- Charts section: Sales trend line chart, Category distribution pie chart
- All metrics use large monospace numbers with trend indicators

**Product Management:**
- Search bar and filters at top
- Grid view of product cards (3-4 columns desktop) with stock badges
- Table view option with sortable columns
- Quick action buttons: Add Product (top-right), Edit/Delete (per row)

**Sales Interface:**
- 2-column layout: Product selection (left 60%) + Cart preview (right 40%)
- Product search with real-time results
- Cart items with quantity adjusters, remove buttons
- Discount input field with percentage/fixed toggle
- Payment method selection as prominent buttons
- Total calculation panel with breakdown (Subtotal, Discount, Final Total)

**Receipt View:**
- Clean, printable design with business header
- Two-column layout: Business info + Customer info
- Product table with columns: Code, Name, Qty, Price, Subtotal
- Summary section: Subtotal, Discount, Payment method, Total
- Footer with thank you message and QR code placeholder
- Print and Download PDF buttons (outline variant)

**Reports Dashboard:**
- Tab navigation for different report types
- Date range selector at top-right
- Export buttons (CSV, PDF) for each report
- Charts with interactive tooltips
- Filterable data tables below charts

## Animations

**Minimal, Purpose-Driven:**
- Page transitions: Fade in (200ms)
- Modal entrance: Scale from 0.95 to 1 (150ms)
- Toast notifications: Slide in from right (200ms)
- Hover states: Subtle background color transitions (150ms)
- Loading states: Spinner animations for async operations
- **No** scroll-triggered animations, parallax, or decorative motion

## Images

**No hero images required** - This is a utility application, not a marketing site.

**Icons Only:**
- Use Lucide React icons throughout (via CDN or package)
- Navigation: Dashboard, Package, ShoppingCart, Users, FileText, Settings icons
- Actions: Plus, Edit, Trash2, Download, Printer icons
- Status: AlertTriangle, CheckCircle, XCircle icons
- Consistent 20px size for buttons, 24px for headers

## Accessibility

- Maintain WCAG AA contrast ratios (4.5:1 minimum)
- All interactive elements keyboard accessible
- Focus visible states with 2px outline in primary color
- Form labels properly associated with inputs
- Error messages announced to screen readers
- Consistent dark mode across all inputs and text fields (no white backgrounds)