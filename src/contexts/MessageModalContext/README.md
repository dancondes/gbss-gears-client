# Message Modal Context

This context is the global popup manager for the app.

It centralizes these popups:
- Message modal
- Confirmation modal
- Blob viewer modal

Because popups are rendered once in the provider, pages/components no longer need to import `ConfirmationModal` or `BlobViewerModal` directly.

## Provider Setup

The provider is already mounted in `src/App.jsx`.

```jsx
import { MessageModalProvider } from '@/contexts/MessageModalContext'

function App() {
    return (
        <MessageModalProvider>
            {/* app content */}
        </MessageModalProvider>
    )
}
```

## Available Hooks

Use these hooks instead of importing popup components directly.

### 1) `useMessageModal`

For simple info/warn/error message popups.

```jsx
import useMessageModal from '@/hooks/use-message-modal'

function Example() {
    const { showMessageModal } = useMessageModal()

    function handleError() {
        showMessageModal('Failed to save record.', {
            type: 'error',
            title: 'Save Failed'
        })
    }

    return <button onClick={handleError}>Show Message</button>
}
```

### 2) `useConfirmationModal`

For Yes/No or Save/Delete confirmation flows.

```jsx
import useConfirmationModal from '@/hooks/use-confirmation-modal'

function Example() {
    const { showConfirmationModal } = useConfirmationModal()

    function handleDelete(item) {
        showConfirmationModal({
            title: 'Delete Item',
            message: `Are you sure you want to delete "${item.name}"?`,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            variant: 'danger',
            payload: item,
            onConfirm: handleConfirmDelete,
            onError: handleDeleteError,
        })
    }

    async function handleConfirmDelete(item) {
        // item is the payload passed above
        // call API here
    }

    function handleDeleteError(error) {
        // optional error handler
        console.error(error)
    }

    return <button onClick={function () { handleDelete({ name: 'Sample' }) }}>Delete</button>
}
```

Notes:
- `onConfirm` can be async.
- Global modal shows loading state while `onConfirm` is running.
- `payload` is optional and passed to `onConfirm(payload)`.

### 3) `useBlobViewerModal`

For previewing one or multiple attachments.

```jsx
import useBlobViewerModal from '@/hooks/use-blob-viewer-modal'

function Example() {
    const { openViewer, openViewerFromDocument } = useBlobViewerModal()

    function handleViewMany() {
        openViewer([
            { filename: 'resume.pdf', blobPath: 'Applicants/1/resume.pdf' },
            { filename: 'portfolio.png', blobPath: 'Applicants/1/portfolio.png' }
        ])
    }

    function handleViewOne(doc) {
        // doc expects shape: { name, path }
        openViewerFromDocument(doc)
    }

    return (
        <>
            <button onClick={handleViewMany}>View Files</button>
            <button onClick={function () { handleViewOne({ name: 'resume.pdf', path: 'Applicants/1/resume.pdf' }) }}>
                View One
            </button>
        </>
    )
}
```

### 4) `useDownloadFileButton`

For reusable file download actions.

```jsx
import useDownloadFileButton from '@/hooks/use-download-file-button'

function Example() {
    const { downloadFromDocument, downloadFromBlob } = useDownloadFileButton({
        onError: handleDownloadError,
    })

    async function handleDownload(doc) {
        // doc expects shape: { name, path }
        await downloadFromDocument(doc)
    }

    function handleDownloadError(error) {
        console.error(error)
    }

    function handleDownloadPreparedBlob(blob) {
        downloadFromBlob(blob, 'report.pdf')
    }

    return null
}
```

## Recommended Pattern

1. Trigger popup from action handler (`onClick`, `onSubmit`, etc.).
2. Keep API/write logic in the confirm callback.
3. Use `payload` for selected row/item.
4. Use `onError` for API failure handling.
5. Do not render modal components in page/component JSX.

## Quick Migration Checklist

- Remove `import ConfirmationModal ...` and `import BlobViewerModal ...`
- Remove local modal visibility state (`show*Modal`)
- Replace with hook calls:
  - `useConfirmationModal().showConfirmationModal(...)`
  - `useBlobViewerModal().openViewer(...)` or `openViewerFromDocument(...)`
- Remove `<ConfirmationModal />` and `<BlobViewerModal />` JSX from page components
- Keep business logic in confirm callback
