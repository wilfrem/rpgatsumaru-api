
declare namespace RPGAtsumaru {
    // partial implementation of es-observable
    // see: https://github.com/tc39/proposal-observable
    export type NextFunc<T> = ((value: T) => void);
    export type ErrorFunc = (errorValue: any) => void;
    export type CompleteFunc = () => void;
    export interface ISubscription {
        unsubscribe(): void;
        closed: boolean;
    }
    export interface IObserver<T> {
        start?: (subscription: ISubscription) => void;
        next: NextFunc<T>;
        error: ErrorFunc;
        complete: CompleteFunc;
    }
    export interface IObservable<T> {
        subscribe(observer: IObserver<T>): ISubscription
        subscribe(onNext: NextFunc<T>, onError?: ErrorFunc, onComplete?: CompleteFunc): ISubscription
        subscribe(observerOrOnNext: IObserver<T> | NextFunc<T>, onError?: ErrorFunc, onComplete?: CompleteFunc): ISubscription
    }
    /**
     * save entry
     */
    export interface StorageItem {
        key: string;
        value: string;
    }
    /**
     * save API
     */
    export interface Storage {
        /**
         * get all save entries for this game.
         */
        getItems(): PromiseLike<StorageItem[]>;
        /**
         * set save entries.
         */
        setItems(items: StorageItem[]): PromiseLike<void>;
        /**
         * delete save entry
         */
        removeItem(key: string): PromiseLike<void>;
    }
    /**
     * input event data
     */
    export interface InputInfo {
        type: "keydown" | "keyup";
        /**
         * pressed key
         */
        key: string;
    }
    export interface Controller extends IObservable<InputInfo> {
    }
    export interface CommentItem {
        command: string;
        comment: string;
    }
    /**
     * comment system API
     */
    export interface CommentSystem {
        /**
         * send context factor to comment system
         */
        pushContextFactor(factor: string): void;
        /**
         * send increment minor context factor action to comment system
         */
        pushMinorContext(): void;
        /**
         * send change scene to comment system.
         */
        changeScene(sceneName: string): void;
        /**
         * send change scene and reset context value.
         */
        resetAndChangeScene(sceneName: string): void;
        /**
         * set context value.
         */
        setContext(context: string): void;
        /**
         * observable about comment came out(display)
         */
        readonly cameOut: IObservable<CommentItem[]>;
        /**
         * observable about comment posted.
         */
        readonly posted: IObservable<CommentItem>;
    }
    /**
     * volume API
     */
    export interface Volume {
        /**
         * get current volume value
         */
        getCurrentValue(): number;
        /**
         * observable about volume change
         */
        readonly changed: IObservable<number>;
    }
    /**
     * player features
     */
    export interface PlayerFeatures {
        /**
         * override screen shot
         */
        takeScreenShot: (() => string | Promise<string>) | null;
    }
    export interface RPGAtsumaru {
        readonly storage: Storage;
        readonly controllers: {
            readonly defaultController: Controller
        },
        readonly comment: CommentSystem,
        readonly volume: Volume,
        readonly playerFeatures: PlayerFeatures
    }
}

interface Window {
    RPGAtsumaru: RPGAtsumaru.RPGAtsumaru;
}
