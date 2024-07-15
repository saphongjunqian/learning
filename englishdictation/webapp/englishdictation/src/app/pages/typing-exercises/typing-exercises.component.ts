import { Component, HostListener } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule,  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TypingQueue, TypingWord, TypingDataFile, TypingWordList } from '../../interfaces';
import { AudioService } from '../../services';

@Component({
  selector: 'app-typing-exercises',
  standalone: true,
  imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './typing-exercises.component.html',
  styleUrl: './typing-exercises.component.scss'
})
export class TypingExercisesComponent {
  private wordqueues: TypingQueue[] = [];
  private _arwords: TypingWord[] = [];
  private _wordidx = -1;
  private _keyidx = -1;
  isQueueCompleted = false;
  // dataSource = new MatTableDataSource<any>(sentences);
  allCollections: string[] = [];
  selectedCollection = '';
  allFiles: TypingDataFile[] = [];
  selectedFile?: TypingDataFile;
  countOfItems = 10;
  sourceAudioFile = '';

  get chararray(): TypingWord[] {
    return this._arwords;
  }
  get wordExplain(): string {
    if (this._wordidx >= 0 && this._wordidx < this.wordqueues.length) {
      return this.wordqueues[this._wordidx].cnword;
    }
    return '';
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this._keyidx >= 0 && this._keyidx < this._arwords.length) {
      if (event.key === 'Backspace') {
        this._keyidx--;
        if (this._keyidx >= 0) {
          this._arwords[this._keyidx].visible = false;
        } else {
          this._keyidx = 0;
        }
      } else {
        if (event.key === this._arwords[this._keyidx].letter) {
          this._arwords[this._keyidx].visible = true;
          this.audiosrv.playSound('Default.wav');

          this._keyidx++;
          if (this._keyidx === this._arwords.length) {
            this.setWordQueueIndex(this._wordidx + 1);
          }
        } else {
          // Sending the error indicator.
          this.audiosrv.playSound('beep.wav');
        }
      }
    }
  }

  constructor(private audiosrv: AudioService, private http: HttpClient) {
    // Constructor
  }

  ngOnInit(): void {
    // Using Angular HTTPClient to fetch the data from the server
    const datafile$ = this.http.get<TypingDataFile[]>('data/data.json');

    // 3. subscribe Observable
    datafile$.subscribe(df => {
      console.log(df);
      this.allFiles = df;
      // this.onRestart();
    });
  }

  ngAfterViewInit(): void {
    console.log(`Entering ngAfterViewInit`);
  }

  onFileSelectionChanged(event: any) {
    // Read the file.
    const datafile$ = this.http.get<TypingWordList[]>(`data/${event.value.file}`);
    datafile$.subscribe(df => {
      console.log(df);

      // Empty the wordqueues
      this.wordqueues = [];
      df.forEach((val) => {
        this.wordqueues.push({
          enword: val.enword,
          cnword: val.cnword,
          completed: false,
        });
      });
    });
  }

  onRestart() {
    this.isQueueCompleted = false;

    if (this.wordqueues.length > this.countOfItems) {
      // Randomize the array `this.wordqueues`
      this.wordqueues = this.wordqueues.sort(() => Math.random() - 0.5);
      // Keep only the first `this.countOfItems` items
      this.wordqueues = this.wordqueues.slice(0, this.countOfItems);
    }

    this._wordidx = -1;
    this.setWordQueueIndex();
  }

  setWordQueueIndex(idx = 0) {
    if (idx >= 0 && idx < this.wordqueues.length) {
      if (this._wordidx !== -1) {
        this.wordqueues[this._wordidx].completed = true;
      }

      this._wordidx = idx;
      this._arwords = [];

      const archars = this.wordqueues[idx].enword.split('');
      const pronunciationApi = 'https://dict.youdao.com/dictvoice?audio=';
      // export function generateWordSoundSrc(word: string, pronunciation: Exclude<PronunciationType, false>) {
      //   switch (pronunciation) {
      //     case 'uk':
      //       return `${pronunciationApi}${word}&type=1`
      //     case 'us':
      //       return `${pronunciationApi}${word}&type=2`
      //     case 'romaji':
      //       return `${pronunciationApi}${romajiToHiragana(word)}&le=jap`
      //     case 'zh':
      //       return `${pronunciationApi}${word}&le=zh`
      //     case 'ja':
      //       return `${pronunciationApi}${word}&le=jap`
      //     case 'de':
      //       return `${pronunciationApi}${word}&le=de`
      //   }
      // }
      this.sourceAudioFile = `${pronunciationApi}${this.wordqueues[idx].enword}&type=2`;

      archars.forEach((val, index: number) => {
        this._arwords.push({
          idx: index,
          visible: false,
          letter: val,
        });
      });
      this._keyidx = 0;
    } else if (idx === this.wordqueues.length) {
      if (this._wordidx !== -1) {
        this.wordqueues[this._wordidx].completed = true;
      }

      this.isQueueCompleted = this.wordqueues.findIndex((que) => que.completed === false) === -1 ? true : false;

      this.audiosrv.playSound('correct.wav');
      // Gone through the queues already
    }
  }
}
