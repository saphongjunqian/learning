import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';

const TYPING_SOUND_URL = 'sounds/';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  playSound(filename: string): void {
    const path = TYPING_SOUND_URL + filename;
    const sound = new Howl({
      src: path,
      format: ['wav'],
    });
    Howler.volume(1);
    sound.play();
  }
}
