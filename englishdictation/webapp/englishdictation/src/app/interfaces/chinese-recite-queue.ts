export enum ChineseReciteQueueItemTypeEnum {
    "subject" = 0,
    "author" = 1,
    "content" = 2,
}

export interface ChineseReciteQueueItem {
    type: ChineseReciteQueueItemTypeEnum;
    // Index of the content, control the display order on the screen
    contentidx: number;
    original: string;
    inputted: string;
    suffix: string;
    correct: boolean;
}

export interface ChineseReciteContent {
    subject: string;
    author: string;
    content: string;
}

export interface ChineseReciteQueue {
    items: ChineseReciteQueueItem[];
    completed: boolean;    
}
