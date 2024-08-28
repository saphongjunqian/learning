import { Component, OnInit } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from "@angular/material/divider";
import html2PDF from 'jspdf-html2canvas';
import { Footer } from "../../shared/footer/footer";
import {
    ChineseReciteDataFile, ChineseReciteStatus, ChineseReciteStatusEnum, ChineseReciteContent, ChineseReciteQueue,
    ChineseReciteQueueItem, ChineseReciteQueueItemTypeEnum, ChineseReciteLevelEnum,
    ChineseReciteQueueItemGroup
} from "../../interfaces";

@Component({
    selector: 'app-chinese-recite',
    standalone: true,
    imports: [Footer, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule,
        MatIconModule, MatButtonModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatProgressBarModule],
    templateUrl: './chinese-recites.component.html',
    styleUrl: './chinese-recites.component.scss'
})
export class ChineseRecitesComponent implements OnInit {
    allFiles: ChineseReciteDataFile[] = [];
    selectedFile?: ChineseReciteDataFile;
    countOfItems = 2;
    currentStatus: ChineseReciteStatus = {
        status: ChineseReciteStatusEnum.NotStarted,
        level: ChineseReciteLevelEnum.Normal,
        correctCount: 0,
        incorrectCount: 0,
        totalCount: 0,
        startTime: new Date(),
        endTime: new Date(),
    };
    recitequeues: ChineseReciteQueue[] = [];
    queueidx: number = -1;  // Current Queue
    allLevels = [
        { value: ChineseReciteLevelEnum.Easy, label: 'Easy' },
        { value: ChineseReciteLevelEnum.Normal, label: 'Normal' },
        { value: ChineseReciteLevelEnum.Hard, label: 'Hard' },
    ];

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
        return this.recitequeues[this.queueidx].subject.inputted;
    }
    get currentReciteContentAuthor(): string {
        return this.recitequeues[this.queueidx].author.inputted;
    }
    get currentReciteContentAudio(): string {
        return this.recitequeues[this.queueidx].audio ?? '';
    }
    get currentReciteContentItems(): ChineseReciteQueueItem[] {
        return this.recitequeues[this.queueidx].items;
    }
    get currentReciteContentItemsCount(): number {
        return this.recitequeues[this.queueidx].items.length;
    }
    get currentReciteContentGroups(): ChineseReciteQueueItemGroup[] {
        return this.recitequeues[this.queueidx].groups;
    }
    get currentReciteContentGroupsCount(): number {
        return this.recitequeues[this.queueidx].groups.length;
    }
    get isCurrentReciteContentCorrect(): boolean {
        let allcorrect = true;
        this.recitequeues[this.queueidx].items.forEach((item) => {
            if (allcorrect && !item.disabled && item.inputted !== item.original) {
                allcorrect = false;
            }
        });
        if (allcorrect) {
            this.recitequeues[this.queueidx].groups.forEach((grp) => {
                grp.items.forEach((item) => {
                    if (allcorrect && !item.disabled && item.inputted !== item.original) {
                        allcorrect = false;
                    }
                });
            });
        }
        return allcorrect;
    }
    get currentProgress(): number {
        return this.reciteContentCount === 0 ? 100 : this.queueidx * 100 / this.reciteContentCount;
    }
    get getLevelString(): string {
        switch(this.currentStatus.level) {
            case ChineseReciteLevelEnum.Easy: return 'Easy';
            case ChineseReciteLevelEnum.Normal: return 'Normal';
            case ChineseReciteLevelEnum.Hard: 
            default: 
                return 'Hard';
        }
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
            this.recitequeues = [];
            df.forEach((val) => {
                let items: ChineseReciteQueueItem[] = [];
                let grps: ChineseReciteQueueItemGroup[] = [];
                let subjectitem: ChineseReciteQueueItem = {
                    type: ChineseReciteQueueItemTypeEnum.subject,
                    contentidx: 0,
                    original: val.subject,
                    inputted: val.subject,
                    correct: true,
                    suffix: '',
                    disabled: true,
                };
                let authoritem: ChineseReciteQueueItem = {
                    type: ChineseReciteQueueItemTypeEnum.author,
                    contentidx: 1,
                    original: val.author,
                    inputted: val.author,
                    correct: true,
                    suffix: '',
                    disabled: true,
                };

                if (val.contentlength === undefined && val.content) {
                    let nprv = 0;
                    let nitem = 0;
                    for (let i = 0; i < val.content.length; i++) {
                        if (val.content[i] === '，' || val.content[i] === '。' || val.content[i] === '；' || val.content[i] === '！' || val.content[i] === '：' || val.content[i] === '？') {
                            let orgval = val.content.slice(nprv, i);
                            items.push({
                                type: ChineseReciteQueueItemTypeEnum.content,
                                contentidx: (nitem * 10) + 1,
                                original: orgval,
                                inputted: orgval,
                                correct: false,
                                suffix: val.content[i],
                                disabled: true,
                            });
                            nprv = i + 1;
                            nitem++;
                        }
                    }

                    // Sort items by the contentidx
                    items = items.sort((a, b) => a.contentidx - b.contentidx);
                } else if (val.contentlength) {
                    // For multiple content case
                    for (let i = 1; i <= val.contentlength; i++) {
                        let curgrp: ChineseReciteQueueItemGroup = {
                            grpidx: i,
                            items: []
                        };
                        let content = val[`content${i}` as keyof ChineseReciteContent] as string;
                        if (content) {
                            let nprv = 0;
                            let nitem = 0;
                            for (let i = 0; i < content.length; i++) {
                                if (content[i] === '，' || content[i] === '。' || content[i] === '；' || content[i] === '！' || content[i] === '：' || content[i] === '？') {
                                    let orgval = content.slice(nprv, i);
                                    curgrp.items.push({
                                        type: ChineseReciteQueueItemTypeEnum.content,
                                        contentidx: (nitem * 10) + 1,
                                        original: orgval,
                                        inputted: orgval,
                                        correct: false,
                                        suffix: content[i],
                                        disabled: true,
                                    });
                                    nprv = i + 1;
                                    nitem++;
                                }
                            }

                            // Sort items by the contentidx
                            curgrp.items = curgrp.items.sort((a, b) => a.contentidx - b.contentidx);

                            if (curgrp.items.length > 0) {
                                grps.push(curgrp);
                            }
                        }
                    }
                }

                this.recitequeues.push({
                    subject: subjectitem,
                    author: authoritem,
                    audio: val.audio,
                    items: items,
                    groups: grps,
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

        // Adjust queue by the level
        this.adjustQueueByLevel(this.recitequeues);

        this.queueidx = 0;
        this.currentStatus.status = ChineseReciteStatusEnum.InProgress;
        this.currentStatus.startTime = new Date();
        this.currentStatus.totalCount = this.recitequeues.length;
    }

    adjustQueueByLevel(queues: ChineseReciteQueue[]) {
        for(let i = 0; i < queues.length; i++) {
            // Group
            for(let j = 0; j < queues[i].groups.length; j++) {
                for(let l = 0; l < queues[i].groups[j].items.length; l++) {
                    let needinput = false;
                    if (this.currentStatus.level === ChineseReciteLevelEnum.Easy) {
                        needinput = Math.random() < 0.2;
                    } else if (this.currentStatus.level === ChineseReciteLevelEnum.Normal) {
                        needinput = Math.random() < 0.5;
                    } else if (this.currentStatus.level === ChineseReciteLevelEnum.Hard) {
                        needinput = true;
                    }

                    if (needinput) {
                        queues[i].groups[j].items[l].inputted = '';
                        queues[i].groups[j].items[l].disabled = false;
                    }
                }

                let allItemsNotEmpty = queues[i].groups[j].items.every((item) => item.inputted !== '');
                if (allItemsNotEmpty) {
                    // Handle the case where all items have non-empty inputted values
                    // For example, proceed with the next step or take appropriate action
                    let nidx = Math.floor(Math.random() * queues[i].groups[j].items.length);
                    queues[i].groups[j].items[nidx].inputted = '';
                    queues[i].groups[j].items[nidx].disabled = false;
                }
            }

            // Items
            for (let k = 0; k < queues[i].items.length; k++) {
                let needinput = false;
                if (this.currentStatus.level === ChineseReciteLevelEnum.Easy) {
                    needinput = Math.random() <= 0.2;
                } else if (this.currentStatus.level === ChineseReciteLevelEnum.Normal) {
                    needinput = Math.random() <= 0.5;
                } else if (this.currentStatus.level === ChineseReciteLevelEnum.Hard) {
                    needinput = true;
                }

                if (needinput) {
                    queues[i].items[k].inputted = '';
                    queues[i].items[k].disabled = false;
                }
            }
            if (queues[i].items.length > 0) {
                let allItemsNotEmpty = queues[i].items.every((item) => item.inputted !== '');
                if (allItemsNotEmpty) {
                    // Handle the case where all items have non-empty inputted values
                    // For example, proceed with the next step or take appropriate action
                    let nidx = Math.floor(Math.random() * queues[i].items.length);
                    queues[i].items[nidx].inputted = '';
                    queues[i].items[nidx].disabled = false;
                }
            }
        }
    }

    onPrint() {
        let printqueues = this.recitequeues.slice();

        if (printqueues.length > this.countOfItems) {
            // Randomize the array `this.wordqueues`
            printqueues = printqueues.sort(() => Math.random() - 0.5);
            // Keep only the first `this.countOfItems` items
            printqueues = printqueues.slice(0, this.countOfItems);
        }
        // Adjust queue by the level
        this.adjustQueueByLevel(printqueues);

        let objdiv = document.createElement('div');
        objdiv.classList.add('w-full');
        objdiv.style.fontSize = '24px';
        objdiv.style.margin = '10px';
    
        // Selected the document
        let titlep = document.createElement('p');
        titlep.innerText = this.selectedFile?.name!;
        objdiv.appendChild(titlep);
        // Level
        let levelp = document.createElement('p');
        levelp.innerText = this.getLevelString;
        objdiv.appendChild(levelp);
        // Count of items
        let countp = document.createElement('p');
        countp.innerText = `Count of items: ${printqueues.length}`;
        objdiv.appendChild(countp);
        // Date
        let datep = document.createElement('p');
        datep.innerText = new Date().toLocaleString();
        datep.style.paddingBottom = '20px';
        objdiv.appendChild(datep);
    
        for(let qidx = 0; qidx < printqueues.length; qidx++) {
            let qdiv = document.createElement('div');
            qdiv.style.width = '100%';

            let subjectp = document.createElement('p');
            let authorp = document.createElement('p');

            subjectp.innerText = "名称：" + printqueues[qidx].subject.original;
            authorp.innerText = "作者：" + printqueues[qidx].author.original;

            qdiv.appendChild(subjectp);
            qdiv.appendChild(authorp);

            // Items
            if (printqueues[qidx].items.length > 0) {
                let subjectitem = document.createElement('p');
                for(let itemidx = 0; itemidx < printqueues[qidx].items.length; itemidx++) {
                    let item = printqueues[qidx].items[itemidx];
                    let itemspan = document.createElement('span');
                    if (item.disabled === true) {
                        itemspan.innerText = item.original + item.suffix;
                    } else {
                        itemspan.innerText = item.original.replace(/./g, '____') + item.suffix;
                    }
                    subjectitem.appendChild(itemspan);
                }

                qdiv.appendChild(subjectitem);
            }

            // Groups
            for(let grpidx = 0; grpidx < printqueues[qidx].groups.length; grpidx++) {
                let subjectitem = document.createElement('p');
                if (printqueues[qidx].groups[grpidx].items.length > 0) {
                    for(let itemidx = 0; itemidx < printqueues[qidx].groups[grpidx].items.length; itemidx++) {
                        let item = printqueues[qidx].groups[grpidx].items[itemidx];
                        let itemspan = document.createElement('span');
                        if (item.disabled === true) {
                            itemspan.innerText = item.original + item.suffix;
                        } else {
                            itemspan.innerText = item.original.replace(/./g, '____') + item.suffix;
                        }
                        subjectitem.appendChild(itemspan);
                    }    
                }
                qdiv.appendChild(subjectitem);
            }

            objdiv.appendChild(qdiv);
        }

        // Final
        let finalp = document.createElement('p');
        finalp.innerText = '_________________________T_H_E_____E_N_D_______________________________';
        finalp.style.paddingBottom = '20px';
        objdiv.appendChild(finalp);
        document.body.appendChild(objdiv);

        html2PDF(objdiv, {
            jsPDF: {
              format: 'a4',
            },
            margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            },
            output: 'a4.pdf',
        });

        document.body.removeChild(objdiv);
    }

    onNeedHint() {
        // Find the first item that is not correct and correct it
        if (this.recitequeues[this.queueidx].items.length > 0) {
            let itemidx = this.recitequeues[this.queueidx].items.findIndex((item) => item.disabled === false && item.inputted !== item.original);
            if (itemidx !== -1) {
                this.recitequeues[this.queueidx].items[itemidx].inputted = this.recitequeues[this.queueidx].items[itemidx].original;
            }    
        } else {
            for(let grpidx = 0; grpidx < this.recitequeues[this.queueidx].groups.length; grpidx++) {
                let itemidx = this.recitequeues[this.queueidx].groups[grpidx].items.findIndex((item) => item.disabled === false && item.inputted !== item.original);
                if (itemidx !== -1) {
                    this.recitequeues[this.queueidx].groups[grpidx].items[itemidx].inputted = this.recitequeues[this.queueidx].groups[grpidx].items[itemidx].original;
                    return;
                }
            }
        }
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
