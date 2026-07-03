import PropTypes from "prop-types";

export default function OpenTicketModal({
    setIsOpen
}) {
    return (
        <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color: "#111827",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
                e.currentTarget.style.borderColor = "#9ca3af";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.borderColor = "#d1d5db";
            }}
        >
            <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
            >
                {/* envelope body */}
                <rect x="3" y="5" width="18" height="14" rx="2" />
                {/* envelope flap */}
                <path d="m3 7 9 6 9-6" />
            </svg>
            <span>Create a Ticket for Leave Concerns</span>
        </button>
    )
}

OpenTicketModal.propTypes = {
    setIsOpen: PropTypes.func.isRequired,
}