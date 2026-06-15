# Table Component Documentation

A feature-rich, reusable table component built on [TanStack Table](https://tanstack.com/table/v8) with built-in support for sorting, filtering, pagination, and Excel export.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Props Reference](#props-reference)
- [Column Configuration](#column-configuration)
- [Features](#features)
  - [Sorting](#sorting)
  - [Filtering](#filtering)
  - [Pagination](#pagination)
  - [Row Interactions](#row-interactions)
  - [Excel Export](#excel-export)
- [Real-World Examples](#real-world-examples)

---

## Basic Usage

```jsx
import Table from '@/components/Table'

function MyComponent() {
  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
  ]

  return (
    <Table
      data={users}
      columns={columns}
    />
  )
}
```

---

## Props Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `array` | Array of data objects to display in the table |
| `columns` | `array` | Column definitions (see [Column Configuration](#column-configuration)) |

### Optional Props

#### Feature Toggles

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSorting` | `boolean` | `true` | Enable column sorting |
| `enablePagination` | `boolean` | `true` | Enable pagination controls |
| `isStripes` | `boolean` | `true` | Enable alternating row colors |
| `isCollapsible` | `boolean` | `true` | Wrap filters in a collapsible container |
| `defaultOpen` | `boolean` | `false` | Whether the collapsible filters section is open by default |
| `isLoading` | `boolean` | `false` | Show loading state in table body |

#### Sorting

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultSorting` | `array` | `[]` | Initial sorting configuration |

**Example:**
```jsx
defaultSorting={[{ id: 'name', desc: false }]}
```

#### Pagination

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageSize` | `number` | `10` | Number of rows per page |

#### Filtering

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `globalFilterColumns` | `array` | `[]` | Column IDs to include in global search |
| `columnFilters` | `object` | `{}` | Column-specific filter configurations (see [Filtering](#filtering)) |
| `dateRange` | `object` | `{}` | Date range filter configuration |

#### Row Interactions

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onRowClick` | `function` | `undefined` | Callback when a row is clicked |
| `onRowRightClick` | `function` | `undefined` | Callback when a row is right-clicked |
| `onDoubleClick` | `function` | `undefined` | Callback when a row is double-clicked |
| `doubleClickDelay` | `number` | `300` | Time window for double-click detection (ms) |

#### Appearance

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialColumnVisibility` | `object` | `{}` | Initial column visibility state |
| `minHeight` | `string` | `undefined` | Minimum height for the table container |
| `maxHeight` | `string` | `'500px'` | Maximum height for the table container |

#### Export

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `excelFileName` | `string` | `undefined` | Filename for Excel export (enables export button) |

#### State Persistence

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `storageKey` | `string` | `undefined` | Unique key for persisting table state in sessionStorage |

---

## Column Configuration

### Basic Column Definition

```jsx
{
  accessorKey: 'name',        // Data property to access
  header: 'Name',              // Column header text
  width: 120,                  // Optional: Fixed column width
  enableSorting: true,         // Optional: Override global sorting
}
```

### Built-in Type Formatters

The Table component includes built-in formatters for common data types. Specify the `type` property to automatically format cell values:

| Type | Description | Example Output |
|------|-------------|----------------|
| `date` | Format date values | `01/12/2026` |
| `time` | Format time values | `02:30 PM` |
| `datetime` | Format date and time | `01/12/2026 02:30 PM` |
| `number` | Format numbers with commas | `1,234` |
| `decimal` | Format decimals (2 places) | `1,234.56` |
| `boolean` | Display Yes/No | `Yes` |
| `email` | Render as clickable mailto link | `user@example.com` |
| `link` | Render as clickable URL | `https://example.com` |

**Example:**
```jsx
{
  accessorKey: 'createdDate',
  header: 'Created',
  type: 'date'
}
```

### Custom Cell Rendering

For custom formatting, use the `cell` property:

```jsx
{
  accessorKey: 'status',
  header: 'Status',
  cell: (info) => (
    <span className={info.getValue() === 'Active' ? 'text-green-600' : 'text-gray-400'}>
      {info.getValue()}
    </span>
  )
}
```

### Nested Data Access

Access nested object properties:

```jsx
{
  accessorKey: 'user.profile.name',
  header: 'User Name'
}
```

---

## Features

### Sorting

#### Default Sorting

Set initial sort order:

```jsx
<Table
  data={data}
  columns={columns}
  defaultSorting={[
    { id: 'name', desc: false },
    { id: 'createdDate', desc: true }
  ]}
/>
```

#### Disable Sorting

Disable sorting for the entire table or specific columns:

```jsx
// Disable for entire table
<Table enableSorting={false} />

// Disable for specific column
columns={[
  { accessorKey: 'name', header: 'Name', enableSorting: false }
]}
```

#### Smart Sorting

The Table component automatically handles sorting for complex data types:
- Objects: Searches for common fields (`description`, `name`, `label`, `title`, etc.)
- Strings: Case-insensitive, locale-aware sorting
- Numbers: Numeric comparison

---

### Filtering

#### Global Search

Enable search across multiple columns:

```jsx
<Table
  data={data}
  columns={columns}
  globalFilterColumns={['name', 'email', 'company']}
/>
```

#### Column Filters

Add dropdown filters for specific columns:

```jsx
columnFilters={{
  status: {
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]
  },
  department: {
    label: 'Department',
    options: departmentOptions
  }
}}
```

#### Default Filter Value

Set a default value for a column filter:

```jsx
columnFilters={{
  status: {
    label: 'Status',
    options: statusOptions,
    value: 'Active'  // Pre-select "Active"
  }
}}
```

#### Typeahead Filters

For large option lists, use typeahead filters:

```jsx
columnFilters={{
  employee: {
    label: 'Employee',
    type: 'typeahead',
    options: employeeOptions
  }
}}
```

#### Date Filters

Add date filtering to a specific column:

```jsx
columnFilters={{
  workDate: {
    label: 'Work Date',
    type: 'date',
    value: getCurrentDate()  // Set default date
  }
}}
```

#### Date Range Filtering

Filter rows within a date range:

```jsx
<Table
  data={data}
  columns={columns}
  dateRange={{
    column: 'createdDate',
    start: '2026-01-01',
    end: '2026-12-31'
  }}
/>
```

#### Exact vs Partial Matching

Control whether filters match exactly or partially (default is exact):

```jsx
columnFilters={{
  logType: {
    label: 'Log Type',
    options: logTypeOptions,
    exactValue: true  // Default: "In" only matches "In"
  },
  description: {
    label: 'Description',
    options: descOptions,
    exactValue: false  // "test" matches "test", "testing", "latest"
  }
}}
```

**When to use:**
- `exactValue: true` (default) - For categorical data where precision matters (e.g., status codes, log types)
- `exactValue: false` - For text fields where partial matches are useful (e.g., descriptions, names)

#### Custom Filter Logic

For complex filtering scenarios, use custom accessors:

```jsx
columnFilters={{
  status: {
    label: 'Status',
    options: statusOptions,
    exactValue: true,  // Apply exact matching (default)
    // Access nested object
    filterAccessor: (val) => val.id,
    // Compute value from row
    rowAccessor: (row) => row.isActive ? 'active' : 'inactive'
  }
}}
```

---

### Pagination

#### Basic Pagination

```jsx
<Table
  data={data}
  columns={columns}
  enablePagination={true}
  pageSize={25}
/>
```

#### Disable Pagination

```jsx
<Table enablePagination={false} />
```

---

### Row Interactions

#### Single Click

Navigate or perform actions on row click:

```jsx
function handleRowClick(rowData) {
  navigate(`/details/${rowData.id}`)
}

<Table onRowClick={handleRowClick} />
```

#### Right Click (Context Menu)

Display a custom context menu on right-click:

```jsx
import { useState } from 'react'
import Table from '@/components/Table'
import ContextMenu from '@/components/ContextMenu'

function MyComponent() {
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
    rowData: null,
  })

  function handleRightClick(event, rowData) {
    setContextMenu({
      isOpen: true,
      position: { x: event.clientX, y: event.clientY },
      rowData,
    })
  }

  function handleCloseContextMenu() {
    setContextMenu({
      isOpen: false,
      position: { x: 0, y: 0 },
      rowData: null,
    })
  }

  const contextMenuItems = [
    {
      label: 'Edit',
      onClick: () => console.log('Edit', contextMenu.rowData),
      icon: <EditIcon />,
    },
    {
      label: 'Delete',
      onClick: () => console.log('Delete', contextMenu.rowData),
      icon: <DeleteIcon />,
      danger: true,
    },
  ]

  return (
    <>
      <Table
        data={data}
        columns={columns}
        onRowRightClick={handleRightClick}
      />
      
      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={handleCloseContextMenu}
        title={contextMenu.rowData?.name}
        items={contextMenuItems}
      />
    </>
  )
}
```

**ContextMenu Props:**
- `isOpen` (boolean): Controls visibility
- `position` ({ x: number, y: number }): Menu position (automatically adjusts to stay in viewport)
- `onClose` (function): Callback when menu should close
- `title` (string, optional): Header text displayed at top of menu
- `items` (array): Menu item configurations

**Menu Item Configuration:**
```jsx
{
  label: 'Action Label',           // Text to display
  onClick: () => {},               // Click handler
  icon: <IconComponent />,         // Optional icon (16x16 or 24x24)
  disabled: false,                 // Optional: disable item
  danger: false,                   // Optional: red styling for destructive actions
  type: 'divider'                  // Optional: render as divider instead of button
}
```

#### Double Click

Differentiate between single and double clicks:

```jsx
<Table
  onRowClick={(row) => console.log('Single click', row)}
  onDoubleClick={(row) => console.log('Double click', row)}
  doubleClickDelay={300}
/>
```

#### Preventing Click Bubbling

Stop row clicks from triggering when clicking interactive elements:

```jsx
{
  accessorKey: 'email',
  header: 'Email',
  cell: (info) => (
    <a
      href={`mailto:${info.getValue()}`}
      onClick={(e) => e.stopPropagation()}
    >
      {info.getValue()}
    </a>
  )
}
```

---

### Excel Export

Enable Excel export by providing a filename:

```jsx
<Table
  data={data}
  columns={columns}
  excelFileName="employees_report"
/>
```

The export button will automatically:
- Respect all active filters
- Include only visible/filtered data
- Format data based on column types

---

### State Persistence

Preserve table search and filter state across navigation by providing a unique `storageKey`:

```jsx
<Table
  data={data}
  columns={columns}
  globalFilterColumns={['name', 'email']}
  columnFilters={{
    status: {
      label: 'Status',
      options: statusOptions
    }
  }}
  storageKey="employees-table"
/>
```

**How it works:**
- Search text, applied filters, and date ranges are automatically saved to `sessionStorage`
- When users navigate away and return, their previous filters are restored
- State persists for the browser session (clears when tab is closed)
- Each table needs a unique `storageKey` to avoid conflicts

**When to use:**
- Tables users frequently search/filter (e.g., Applicants, Employees, Clients)
- Pages where losing filters would be frustrating for users

**When to skip:**
- Simple lookup tables
- Modal/temporary tables
- Tables that change context frequently

**Example:**
```jsx
// Applicants table
<Table storageKey="applicants-table" ... />

// Employees table
<Table storageKey="employees-table" ... />

// No persistence needed
<Table ... />
```

---

## Real-World Examples

### Example 1: Basic Employee Table

```jsx
import Table from '@/components/Table'
import { useNavigate } from 'react-router-dom'

function Employees() {
  const navigate = useNavigate()

  const columns = [
    { accessorKey: 'empNo', header: 'Emp No.', width: 100 },
    { accessorKey: 'firstName', header: 'First Name' },
    { accessorKey: 'lastName', header: 'Last Name' },
    { accessorKey: 'position', header: 'Position' },
    { accessorKey: 'email', header: 'Email', type: 'email' },
    { accessorKey: 'startDate', header: 'Start Date', type: 'date' },
  ]

  function handleRowClick(employee) {
    navigate(`/employees/${employee.id}`)
  }

  return (
    <Table
      data={employees}
      columns={columns}
      onRowClick={handleRowClick}
      globalFilterColumns={['firstName', 'lastName', 'empNo']}
      pageSize={50}
      storageKey="employees-table"
    />
  )
}
```

### Example 2: Clients Table with Filters

```jsx
import Table from '@/components/Table'
import { useFetchOptions } from '@/hooks/use-fetch-options'
import { getClientTypeList, getClientStatusList } from '@/services/list-service'

function ClientsTable({ clientsList, isLoading }) {
  const navigate = useNavigate()

  const { options: clientTypeOptions } = useFetchOptions(getClientTypeList)
  const { options: clientStatusOptions } = useFetchOptions(getClientStatusList)

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'processType', header: 'Type' },
    { accessorKey: 'accountType', header: 'Status' },
    { accessorKey: 'employeeCount', header: 'No. of Staff', type: 'number' },
    { accessorKey: 'lastHiredDate', header: 'Last Hired', type: 'date' },
  ]

  return (
    <Table
      data={clientsList}
      columns={columns}
      onRowClick={(client) => navigate(`/clients/${client.id}`)}
      pageSize={50}
      isLoading={isLoading}
      globalFilterColumns={['name']}
      defaultSorting={[{ id: 'name', desc: false }]}
      columnFilters={{
        accountType: {
          label: 'Status',
          options: clientStatusOptions,
          value: 'Current'
        },
        processType: {
          label: 'Type',
          options: clientTypeOptions
        }
      }}
      minHeight="300px"
      storageKey="clients-table"
    />
  )
}
```

### Example 3: Attendance with Date Range and Export

```jsx
import Table from '@/components/Table'
import { getCurrentDate } from '@/utilities/date-utilities'

function AttendanceTab({ employee }) {
  const columns = [
    { accessorKey: 'date', header: 'Work Date', type: 'date' },
    { accessorKey: 'punctualityType', header: 'Punctuality Type' },
    { accessorKey: 'timeLength', header: 'Time Length (mins)', type: 'number' },
    { accessorKey: 'absentType', header: 'Absent Type' },
    { accessorKey: 'comments', header: 'Comments' },
  ]

  return (
    <Table
      data={employee.attendance}
      columns={columns}
      enableSorting={true}
      enablePagination={true}
      pageSize={10}
      dateRange={{
        column: 'date',
        start: getCurrentDate(-6),
        end: getCurrentDate()
      }}
      columnFilters={{
        absentType: {
          label: 'Absent Type',
          options: absentTypeOptions
        }
      }}
      excelFileName={`Attendance_${employee.firstName}_${employee.lastName}`}
    />
  )
}
```

### Example 4: Notification Recipients with Custom Columns

```jsx
import Table from '@/components/Table'

function EmailRecipients({ client }) {
  const notificationTypes = [
    { code: 'INV', label: 'INV - Invoices' },
    { code: 'REP', label: 'REP - Reports' },
    { code: 'ALT', label: 'ALT - Alerts' }
  ]

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue()}</span>
      ),
      enableSorting: true
    },
    ...notificationTypes.map(({ code, label }) => ({
      accessorKey: `notification_${code}`,
      header: code,
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.notifications?.includes(code)}
          readOnly
          className="h-4 w-4 text-primary border-gray-300 rounded pointer-events-none"
        />
      ),
      enableSorting: false,
      meta: { headerTitle: label }
    }))
  ]

  return (
    <Table
      data={recipients}
      columns={columns}
      onRowClick={(recipient) => handleEdit(recipient)}
      pageSize={20}
    />
  )
}
```

### Example 5: Simple Table without Filters

```jsx
function HolidaysTable() {
  const columns = [
    { accessorKey: 'holidayDate', header: 'Holiday Date', type: 'date' },
    { accessorKey: 'holidayType', header: 'Holiday Type' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'country', header: 'Country' },
  ]

  return (
    <Table
      data={holidays}
      columns={columns}
      onRowClick={handleEdit}
      globalFilterColumns={['description']}
      columnFilters={{
        country: {
          label: 'Country',
          options: countryOptions
        }
      }}
      pageSize={50}
    />
  )
}
```

---

## Advanced Tips

### Performance Optimization

- Use `React.memo` on column definitions:
  ```jsx
  const columns = useMemo(() => [...], [])
  ```

- The Table component is already wrapped in `React.memo`

### Conditional Column Visibility

```jsx
<Table
  data={data}
  columns={columns}
  initialColumnVisibility={{
    internalNotes: false,  // Hide by default
    id: false
  }}
/>
```

### Custom Styling

Adjust table height:
```jsx
<Table
  minHeight="200px"
  maxHeight="800px"
/>
```

Disable alternating row colors:
```jsx
<Table isStripes={false} />
```

---

## Component Architecture

The Table component is built with the following internal structure:

```
Table/
├── index.js                  // Barrel export
├── Table.jsx                 // Main component
├── TableFilters.jsx          // Search and filter UI
├── TablePagination.jsx       // Pagination controls
├── hooks/
│   ├── useTableFilters.js    // Filter state management
│   ├── useTableColumns.jsx   // Column processing
│   └── useRowClick.js        // Click detection
└── README.md                 // This file
```

### Key Dependencies

- [TanStack Table v8](https://tanstack.com/table/v8) - Core table functionality
- React - UI library
- PropTypes - Runtime type checking

---

## Migration Guide

### From Legacy Table Components

If migrating from older table implementations:

1. Replace `Table` import path
2. Update column definitions to use `accessorKey` instead of `accessor`
3. Replace custom filter logic with `columnFilters` prop
4. Use built-in type formatters instead of manual `cell` functions where possible

---

## Troubleshooting

### Filters Not Working

- Ensure `globalFilterColumns` contains valid `accessorKey` values
- For column filters, verify options have both `value` and `label` properties
- Check that filter values match data exactly (case-sensitive by default)

### Sorting Issues

- For nested objects, use `filterAccessor` or `rowAccessor` in column filters
- Disable sorting on computed columns if needed: `enableSorting: false`

### Performance Issues

- Consider reducing `pageSize` for large datasets
- Use `useMemo` for column definitions
- Avoid heavy computations in `cell` renderers

---

## Support

For issues or questions, please contact the development team or refer to the [TanStack Table documentation](https://tanstack.com/table/v8/docs/introduction).
