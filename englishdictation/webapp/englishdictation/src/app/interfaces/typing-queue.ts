export interface TypingQueue {
    enword: string;
    cnword: string;
    completed: boolean;    
}

export interface TypingQueueResult {
    enword: string;
    correct: boolean;
}