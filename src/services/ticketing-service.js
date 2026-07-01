import { ROUTES } from "@/constants/routes";
import { uploadFile } from "@/utilities/api";

export function createTicket(ticketData, files = [], onUploadProgress = null) {
    const queryParams = new URLSearchParams()

    const fields = {
        TaskName: ticketData.taskName,
        Details: ticketData.details,
        StatusId: ticketData.statusId,
        Comments: ticketData.comments,
        'RequestedBy.Id': ticketData.requestedById,
        'RequestedBy.Name': ticketData.requestedByName,
        ClosedById: ticketData.closedById,
        AssignedToId: ticketData.assignedToId,
        PriorityId: ticketData.priorityId,
        TargetDate: ticketData.targetDate,
        'Team.Id': ticketData.teamId,
        'Team.Description': ticketData.teamDescription,
    }

    Object.entries(fields).forEach(function ([key, value]) {
        if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value)
        }
    })

    const formData = new FormData()
    files.forEach(function (file) {
        formData.append('Attachments', file)
    })

    const url = `${ROUTES.TICKETING.CREATE}?${queryParams.toString()}`
    return uploadFile(url, formData, onUploadProgress, 'post', true)
}