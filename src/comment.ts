/// <reference path="../rpgatsumaru.d.ts" />
import { isRPGAtsumaru } from "./constants";
/**
 * comment system API
 */
export class CommentSystem {
    /**
     * send context factor to comment system
     */
    pushContextFactor(factor: string): void {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.comment.pushContextFactor(factor);
        }
    }
    /**
     * send increment minor context factor action to comment system
     */
    pushMinorContext(): void {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.comment.pushMinorContext();
        }
    }
    /**
     * send change scene to comment system.
     */
    changeScene(sceneName: string): void {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.comment.changeScene(sceneName);
        }
    }
    /**
     * send change scene and reset context value.
     */
    resetAndChangeScene(sceneName: string): void {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.comment.resetAndChangeScene(sceneName);
        }
    }
    /**
     * set context value.
     */
    setContext(context: string): void {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.comment.setContext(context);
        }
    }
    /**
     * observable about comments came out event.
     */
    get cameOut(): RPGAtsumaru.IObservable<RPGAtsumaru.CommentItem[]> {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.comment.cameOut;
        } else {
            return {
                subscribe: () => ({ unsubscribe: () => { }, closed: true })
            };
        }
    }
    /**
     * observable about comment posted event.
     */
    get posted(): RPGAtsumaru.IObservable<RPGAtsumaru.CommentItem> {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.comment.posted;
        } else {
            return {
                subscribe: () => ({ unsubscribe: () => { }, closed: true })
            };
        }
    }
}
