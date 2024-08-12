export enum ChineseReciteStatusEnum {
    'NotStarted' = 0,
    'InProgress' = 1,
    'Completed' = 2,    
}

export interface ChineseReciteStatus {
    status: ChineseReciteStatusEnum;
    correctCount: number;
    incorrectCount: number;
    totalCount: number;
    startTime: Date;
    endTime: Date;
}
