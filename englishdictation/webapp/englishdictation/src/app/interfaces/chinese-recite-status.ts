export enum ChineseReciteStatusEnum {
    'NotStarted' = 0,
    'InProgress' = 1,
    'Completed' = 2,    
}

export enum ChineseReciteLevelEnum {
    'Easy' = 1,     // 20%
    'Normal' = 2,   // 50%
    'Hard' = 3,     // 100%
}

export interface ChineseReciteStatus {
    status: ChineseReciteStatusEnum;
    level: ChineseReciteLevelEnum;
    correctCount: number;
    incorrectCount: number;
    totalCount: number;
    startTime: Date;
    endTime: Date;
}
