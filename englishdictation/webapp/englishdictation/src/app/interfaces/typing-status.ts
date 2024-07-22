export enum TypingStatusEnum {
    'NotStarted' = 0,
    'InProgress' = 1,
    'Completed' = 2,    
}

export interface TypingStatus {
    status: TypingStatusEnum;
    correctWordCount: number;
    incorrectWordCount: number;
    totalWordCount: number;
    startTime: Date;
    endTime: Date;
}
