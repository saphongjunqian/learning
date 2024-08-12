import { Component, OnInit } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule,  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from "@angular/material/divider";

import { Footer } from "../../shared/footer/footer";
import { ChineseReciteDataFile, ChineseReciteStatus, ChineseReciteStatusEnum, ChineseReciteContent, ChineseReciteQueue,
    ChineseReciteQueueItem, ChineseReciteQueueItemTypeEnum
} from "../../interfaces";

@Component({
    selector: 'app-chinese-recite',
    standalone: true,
    imports: [Footer, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule,
        MatIconModule, MatButtonModule, MatTableModule, MatCheckboxModule, MatDividerModule ],
    templateUrl: './chinese-recites.component.html',
    styleUrl: './chinese-recites.component.scss'
})
export class ChineseRecitesComponent implements OnInit {
    allFiles: ChineseReciteDataFile[] = [];
    selectedFile?: ChineseReciteDataFile;
    countOfItems = 2;
    currentStatus: ChineseReciteStatus = { 
        status: ChineseReciteStatusEnum.NotStarted,
        correctCount: 0,
        incorrectCount: 0,
        totalCount: 0,
        startTime: new Date(),
        endTime: new Date(),
    };
    recitequeues: ChineseReciteQueue[] = [];
    queueidx: number = -1;  // Current Queue
    
    get isRecitingNotStarted(): boolean { 
        return this.currentStatus.status === ChineseReciteStatusEnum.NotStarted;
    }
    get isRecitingInProgress(): boolean {
        return this.currentStatus.status === ChineseReciteStatusEnum.InProgress;
    }
    get isRecitingCompleted(): boolean {
        return this.currentStatus.status === ChineseReciteStatusEnum.Completed;
    }
    get reciteContentCount(): number {
        return this.recitequeues.length;
    }
    get currentReciteContentSubject(): string {
        return this.recitequeues[this.queueidx].items.find((item) => item.type === ChineseReciteQueueItemTypeEnum.subject)!.inputted;
    }
    get currentReciteContentAuthor(): string {
        return this.recitequeues[this.queueidx].items.find((item) => item.type === ChineseReciteQueueItemTypeEnum.author)!.inputted;
    }
    get currentReciteContentContent(): ChineseReciteQueueItem[] {
        return this.recitequeues[this.queueidx].items.filter((item) => item.type === ChineseReciteQueueItemTypeEnum.content);
    }
    get isCurrentReciteContentCorrect(): boolean {
        let allcorrect = true;
        this.recitequeues[this.queueidx].items.forEach((item) => {
            if (item.inputted === item.original) {
                allcorrect = false;
            }
        });
        return allcorrect;
    }

    constructor(private http: HttpClient) {
        // Constructor
    }

    ngOnInit(): void {
        // Using Angular HTTPClient to fetch the data from the server
        const datafile$ = this.http.get<ChineseReciteDataFile[]>('data/chinese.json');
    
        // 3. subscribe Observable
        datafile$.subscribe(df => {
          // console.log(df);
          this.allFiles = df;
        });
    }

    onFileSelectionChanged(event: any) {
        // Read the file.
        const datafile$ = this.http.get<ChineseReciteContent[]>(`data/${event.value.file}`);
        datafile$.subscribe(df => {
          // console.log(df);
   
          this.recitequeues = [];
          df.forEach((val) => {
            let items: ChineseReciteQueueItem[] = [];
            items.push({
              type: ChineseReciteQueueItemTypeEnum.subject,
              contentidx: 0,
              original: val.subject,
              inputted: val.subject,
              correct: true,
              suffix: '',
            });
            items.push({
              type: ChineseReciteQueueItemTypeEnum.author,
              contentidx: 1,
              original: val.author,
              inputted: val.author,
              correct: true,
              suffix: ''
            });

            let nprv = 0;
            let nitem = 0;
            for(let i = 0; i < val.content.length; i++) {
                if (val.content[i] === '，' || val.content[i] === '。' || val.content[i] === '！' || val.content[i] === '：' || val.content[i] === '？') {
                    console.log(val.content.slice(nprv, i));
                    items.push({
                        type: ChineseReciteQueueItemTypeEnum.content,
                        contentidx: nitem + 1,
                        original: val.content.slice(nprv, i),
                        inputted: '', // val.content.slice(nprv, i),
                        correct: false,
                        suffix: val.content[i],
                    });
                    nprv = i + 1;
                    nitem++;
                }
            }

            this.recitequeues.push({
                items: items,
                completed: false
            });
          });
        });
    }
    
    onStart() {
        if (this.recitequeues.length > this.countOfItems) {
            // Randomize the array `this.wordqueues`
            this.recitequeues = this.recitequeues.sort(() => Math.random() - 0.5);
            // Keep only the first `this.countOfItems` items
            this.recitequeues = this.recitequeues.slice(0, this.countOfItems);
        }
      
        this.queueidx = 0;
        this.currentStatus.status = ChineseReciteStatusEnum.InProgress;
        this.currentStatus.startTime = new Date();
        this.currentStatus.totalCount = this.recitequeues.length;
    }

    onNeedHint() {

    }

    onSubmitToNext() {
        // Check the validity
        let allcorrect = true;
        this.recitequeues[this.queueidx].items.forEach((item) => {
            if (item.correct === false) {
                allcorrect = false;
            }
        });
        this.setQueueIndex(this.queueidx + 1);
    }

    onNextWord() {
        this.setQueueIndex(this.queueidx + 1);
    }

    setQueueIndex(idx = 0) {
        if (idx >= 0 && idx < this.recitequeues.length) {
          if (this.queueidx !== -1) {
            this.recitequeues[this.queueidx].completed = true;
          }
    
          this.queueidx = idx;
        } else if (idx === this.recitequeues.length) {
          if (this.queueidx !== -1) {
            this.recitequeues[this.queueidx].completed = true;
          }
    
          let iscompled = this.recitequeues.findIndex((que) => que.completed === false) === -1 ? true : false;
          if (iscompled) {
            this.currentStatus.status = ChineseReciteStatusEnum.Completed;
            this.currentStatus.endTime = new Date();
            // this.currentStatus.correctCount = this.dataSourceResult.filter((val) => val.correct === true).length;
            // this.currentStatus.incorrectCount = this.dataSourceResult.filter((val) => val.correct === false).length;
          }
        }
    }
    
};
