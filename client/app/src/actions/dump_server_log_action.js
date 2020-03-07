export const CHANGE_DUMPSERVER_LOGS = 'dump_server_logs';

export default function updateDumpServerStatusLogs(serverStatuslogs) {
    return {
        type: CHANGE_DUMPSERVER_LOGS,
        payload: {
            serverStatuslogs: serverStatuslogs
        }
    }
}