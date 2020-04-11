export const CHANGE_DUMPSERVER_STATUS = 'dump_server_status';

export default function updateDumpServerStatus(serverStatus) {
    return {
        type: CHANGE_DUMPSERVER_STATUS,
        payload: {
            serverStatus: serverStatus
        }
    }
}