export enum ChineseReciteStatusEnum {
    'NotStarted' = 0,
    'InProgress' = 1,
    'Completed' = 2,    
}

export enum ChineseReciteLevelEnum {
    'Easy' = 1,     // 20%
    'Normal' = 2,   // 50%
    'Hard' = 3,     // 100%

    'NormalWithTranslation' = 8,   // 50% but with translation
    'HardWithTranslation' = 9,     // 100% but with translation
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
