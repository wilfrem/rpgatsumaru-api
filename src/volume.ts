/// <reference path="../rpgatsumaru.d.ts" />
import { isRPGAtsumaru } from "./constants";

/**
 * volume API
 */
export class Volume {
    /**
     * get current volume value
     */
    getCurrentValue(): number {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.volume.getCurrentValue();
        } else {
            return 0.5;
        }
    }
    /**
     * observable about volume change
     */
    get changed(): RPGAtsumaru.IObservable<number> {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.volume.changed;
        } else {
            return {
                subscribe: () => ({ unsubscribe: () => { }, closed: true })
            };
        }
    }
}
