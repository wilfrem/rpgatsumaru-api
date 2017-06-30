/// <reference path="../rpgatsumaru.d.ts" />
import {isRPGAtsumaru} from "./constants";

export type TakeScreenShot = (() => string | Promise<string>);

/**
 * player features
 */
export class PlayerFeatures {
    /**
     * override screen shot
     */
    get takeScreenShot(): TakeScreenShot | null {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.playerFeatures.takeScreenShot;
        }
        return null;
    }
    set takeScreenShot(func: TakeScreenShot | null) {
        if (isRPGAtsumaru) {
            window.RPGAtsumaru.playerFeatures.takeScreenShot = func;
        }
    }
}
