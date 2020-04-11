export const CHANGE_CONNECTION_STATUS = 'connection_tool_status';

export default function connectionToolAction(connectionToolDetails) {
    return {
        type: CHANGE_CONNECTION_STATUS,
        payload: {
            connectionToolDetails: connectionToolDetails
        }
    }
}