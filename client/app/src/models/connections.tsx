export interface AppConnections {
    connectionMethod: string;
    connectionProtocol: string;
    connectionAddress: string;
    connectionPort: string;
    connectionTime: string;
    connectionMethodTopics: Array<string>;
    connectionMethodTopicsMessages: Array<string>;
    connectionMethodLogs: Array<string>;
}