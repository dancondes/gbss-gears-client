import PropTypes from "prop-types"

export function SettingSection({ title, description, children }) {
    return (
        <div className="p-1">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    )
}

SettingSection.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}