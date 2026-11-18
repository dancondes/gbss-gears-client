import { useUpdateNoticeStore } from "@/store/update-notice-store"

export default function UpdateBanner() {
    const updateRequired = useUpdateNoticeStore((state) => state.updateRequired)

    if (!updateRequired) return null

    return (
        <div
            role="alert"
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-amber-100 text-amber-900 text-sm px-4 py-2 border-b border-amber-200 text-center"
        >
            <span>A new version is available. Please save any unsaved changes, then</span>
            <button
                onClick={function () { window.location.reload() }}
                className="font-semibold underline cursor-pointer"
            >
                reload the page
            </button>
            <span>to update.</span>
        </div>
    )
}