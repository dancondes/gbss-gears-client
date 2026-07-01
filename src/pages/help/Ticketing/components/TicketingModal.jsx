import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'
import TicketingForm from './TicketingForm'

function TicketingModal({
    defaultValues = {},
    isOpen,
    onClose,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Ticketing"
            size="4xl"
        >
            <TicketingForm defaultValues={defaultValues} onCancel={onClose} />
        </Modal>
    )
}

TicketingModal.propTypes = {
    defaultValues: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default TicketingModal
