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
    disabled: boolean;
}

export interface ChineseReciteContent {
    subject: string;
    author: string;
    contentlength?: number;
    audio?: string;
    content?: string;
    content1?: string;
    content2?: string;
    content3?: string;
    content4?: string;
    content5?: string;
    content6?: string;
    content7?: string;
    content8?: string;
    content9?: string;
    content10?: string;
    content11?: string;
    content12?: string;
    content13?: string;
    content14?: string;
    content15?: string;
    content16?: string;
    content17?: string;
    content18?: string;
    content19?: string;
    content20?: string;
}

export interface ChineseReciteQueueItemGroup {
    grpidx: number;
    items: ChineseReciteQueueItem[];
}

export interface ChineseReciteQueue {
    subject: ChineseReciteQueueItem;
    author: ChineseReciteQueueItem;
    audio?: string;
    items: ChineseReciteQueueItem[];
    groups: ChineseReciteQueueItemGroup[];
    completed: boolean;
}
