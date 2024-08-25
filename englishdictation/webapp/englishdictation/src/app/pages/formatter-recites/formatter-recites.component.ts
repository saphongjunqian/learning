import { Component, OnDestroy, OnInit } from "@angular/core";
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
    FormatterReciteContent, FormatterReciteDataFile,
} from "../../interfaces";

@Component({
    selector: 'app-formatter-recite',
    standalone: true,
    imports: [Footer, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule,
        MatIconModule, MatButtonModule, MatTableModule, MatCheckboxModule, MatDividerModule, MatProgressBarModule],
    templateUrl: './formatter-recites.component.html',
    styleUrl: './formatter-recites.component.scss',
})
export class FormatterRecitesComponent implements OnInit, OnDestroy {
    allFiles: FormatterReciteDataFile[] = [];
    selectedFile?: FormatterReciteDataFile;
    countOfItems = 2;
    // currentStatus: ChineseReciteStatus = {
    //     status: ChineseReciteStatusEnum.NotStarted,
    //     level: ChineseReciteLevelEnum.Normal,
    //     correctCount: 0,
    //     incorrectCount: 0,
    //     totalCount: 0,
    //     startTime: new Date(),
    //     endTime: new Date(),
    // };
    recitequeues: FormatterReciteContent[] = [];
    queueidx: number = -1;  // Current Queue
    scriptElement?: HTMLScriptElement;

    get reciteContentCount(): number {
        return this.recitequeues.length;
    }

    constructor(private http: HttpClient) {
        // Constructor
    }

    ngOnInit(): void {
        // Load mathjax
        this.scriptElement = document.createElement('script');
        this.scriptElement.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
        document.head.appendChild(this.scriptElement);

        // Using Angular HTTPClient to fetch the data from the server
        const datafile$ = this.http.get<FormatterReciteDataFile[]>('data/formatter.json');

        // 3. subscribe Observable
        datafile$.subscribe(df => {
            // console.log(df);
            this.allFiles = df;
        });
    }

    ngOnDestroy(): void {
        if (this.scriptElement) {
            document.head.removeChild(this.scriptElement);
            this.scriptElement = undefined;
        }
    }

    onFileSelectionChanged(event: any) {
        // Read the file.
        const datafile$ = this.http.get<FormatterReciteContent[]>(`data/${event.value.file}`);
        datafile$.subscribe(df => {
            this.recitequeues = [];
            df.forEach((val) => {
                // this.recitequeues.push({
                //     subject: subjectitem,
                //     author: authoritem,
                //     audio: val.audio,
                //     items: items,
                //     groups: grps,
                //     completed: false
                // });
                this.recitequeues.push(val);
            });
        });
    }

    onStart() {
        // if (this.recitequeues.length > this.countOfItems) {
        //     // Randomize the array `this.wordqueues`
        //     this.recitequeues = this.recitequeues.sort(() => Math.random() - 0.5);
        //     // Keep only the first `this.countOfItems` items
        //     this.recitequeues = this.recitequeues.slice(0, this.countOfItems);
        // }

        // this.queueidx = 0;
        // this.currentStatus.status = ChineseReciteStatusEnum.InProgress;
        // this.currentStatus.startTime = new Date();
        // this.currentStatus.totalCount = this.recitequeues.length;
    }

    onPrint() {
        let printqueues = this.recitequeues.slice();

        if (printqueues.length > this.countOfItems) {
            // Randomize the array `this.wordqueues`
            printqueues = printqueues.sort(() => Math.random() - 0.5);
            // Keep only the first `this.countOfItems` items
            printqueues = printqueues.slice(0, this.countOfItems);
        }

        let objdiv = document.createElement('div');
        objdiv.classList.add('w-full');
        objdiv.style.fontSize = '24px';
        objdiv.style.margin = '10px';
    
        // Selected the document
        let titlep = document.createElement('p');
        titlep.innerText = this.selectedFile?.name!;
        objdiv.appendChild(titlep);
        // Count of items
        let countp = document.createElement('p');
        countp.innerText = `Count of items: ${printqueues.length}`;
        objdiv.appendChild(countp);
        // Date
        let datep = document.createElement('p');
        datep.innerText = new Date().toLocaleString();
        datep.style.paddingBottom = '20px';
        objdiv.appendChild(datep);
    
        let containdiv = document.createElement('div');
        containdiv.classList.add('grid'); 
        containdiv.classList.add('grid-cols-2');
        containdiv.classList.add('gap-4');
        objdiv.appendChild(containdiv);

        for(let qidx = 0; qidx < printqueues.length; qidx++) {
            let qdiv = document.createElement('div');
            qdiv.classList.add('w-full');
            qdiv.innerText = printqueues[qidx].name;
            containdiv.appendChild(qdiv);
            
            qdiv = document.createElement('div');
            qdiv.classList.add('w-full');
            qdiv.innerText = '________________________';
            containdiv.appendChild(qdiv);
        }

        // Comment out because KATEX is not working for PDF printing yet

        // Splitter
        let splitp = document.createElement('p');
        splitp.classList.add('w-full');
        splitp.style.paddingTop = '40px';
        splitp.style.paddingBottom = '40px';
        splitp.innerText = '__________________________ANSWER BELOW______________________';
        objdiv.appendChild(splitp);

        // Answer
        let awrdiv = document.createElement('div');
        awrdiv.classList.add('w-full');
        objdiv.appendChild(awrdiv);

        for (let qidx = 0; qidx < printqueues.length; qidx++) {
            let qdiv = document.createElement('div');
            qdiv.classList.add('w-full');
            if (printqueues[qidx].math) {
                let mj = (window as any).MathJax;
                const res = mj.tex2svg(printqueues[qidx].value);
                qdiv.appendChild(res.children[0]);
            } else {
                qdiv.innerText = printqueues[qidx].value;
            }
            awrdiv.appendChild(qdiv);
        }

        // Finally one.
        let finalp = document.createElement('p');
        finalp.innerText = 'The End';
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

    // onNeedHint() {
    //     // Find the first item that is not correct and correct it
    //     if (this.recitequeues[this.queueidx].items.length > 0) {
    //         let itemidx = this.recitequeues[this.queueidx].items.findIndex((item) => item.disabled === false && item.inputted !== item.original);
    //         if (itemidx !== -1) {
    //             this.recitequeues[this.queueidx].items[itemidx].inputted = this.recitequeues[this.queueidx].items[itemidx].original;
    //         }    
    //     } else {
    //         for(let grpidx = 0; grpidx < this.recitequeues[this.queueidx].groups.length; grpidx++) {
    //             let itemidx = this.recitequeues[this.queueidx].groups[grpidx].items.findIndex((item) => item.disabled === false && item.inputted !== item.original);
    //             if (itemidx !== -1) {
    //                 this.recitequeues[this.queueidx].groups[grpidx].items[itemidx].inputted = this.recitequeues[this.queueidx].groups[grpidx].items[itemidx].original;
    //                 return;
    //             }
    //         }
    //     }
    // }

    // onSubmitToNext() {
    //     // Check the validity
    //     let allcorrect = true;
    //     this.recitequeues[this.queueidx].items.forEach((item) => {
    //         if (item.correct === false) {
    //             allcorrect = false;
    //         }
    //     });
    //     this.setQueueIndex(this.queueidx + 1);
    // }

    // onNextWord() {
    //     this.setQueueIndex(this.queueidx + 1);
    // }

    // setQueueIndex(idx = 0) {
    //     if (idx >= 0 && idx < this.recitequeues.length) {
    //         if (this.queueidx !== -1) {
    //             this.recitequeues[this.queueidx].completed = true;
    //         }

    //         this.queueidx = idx;
    //     } else if (idx === this.recitequeues.length) {
    //         if (this.queueidx !== -1) {
    //             this.recitequeues[this.queueidx].completed = true;
    //         }

    //         let iscompled = this.recitequeues.findIndex((que) => que.completed === false) === -1 ? true : false;
    //         if (iscompled) {
    //             this.currentStatus.status = ChineseReciteStatusEnum.Completed;
    //             this.currentStatus.endTime = new Date();
    //             // this.currentStatus.correctCount = this.dataSourceResult.filter((val) => val.correct === true).length;
    //             // this.currentStatus.incorrectCount = this.dataSourceResult.filter((val) => val.correct === false).length;
    //         }
    //     }
    // }
};
