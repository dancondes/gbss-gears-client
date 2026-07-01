import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'

function ViewBodyModal({
    isOpen,
    onClose,
    bulletin
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={bulletin?.subject}
            size="4xl"
        >
            <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: bulletin?.body || '' }}
            />
        </Modal>
    )
}

ViewBodyModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    bulletin: PropTypes.shape({
        subject: PropTypes.string,
        body: PropTypes.string
    })
}

export default ViewBodyModal