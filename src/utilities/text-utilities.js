export function getAlertMessageForAddAndView(canAdd, canView, itemName = 'items') {
    if (canView && canAdd) {
        return `Click on any row to view ${itemName} details`
    } else if (canView) {
        return `Click on any row to view ${itemName} details`
    } else if (canAdd) {
        return `You're only allowed to add new ${itemName}, you won't be able to view details of existing ${itemName}`
    } else {
        return `You do not have permission to perform any actions`
    }
}

export function getAlertMessageForAddAndSave(canAdd, canSave, itemName = 'items') {
    if (canSave && canAdd) {
        return `Click on any row to edit ${itemName} details`
    } else if (canSave) {
        return `Click on any row to edit ${itemName} details`
    } else if (canAdd) {
        return `You're only allowed to add new ${itemName}, you won't be able to edit details of existing ${itemName}`
    } else {
        return `Click on any row to view ${itemName} details`
    }
}