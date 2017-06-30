/// <reference path="../rpgatsumaru.d.ts" />
import { isRPGAtsumaru } from "./constants";
/**
 * save API
 */
export class Storage {
    /**
     * get all save entries for this game.
     */
    getItems(): Promise<RPGAtsumaru.StorageItem[]> {
        if (isRPGAtsumaru) {
            return Promise.resolve(window.RPGAtsumaru.storage.getItems());
        }
        if (typeof window !== "undefined") {
            Promise.resolve(Object.keys(window.localStorage).map(key => {
                return {
                    key,
                    value: window.localStorage.getItem(key),
                };
            }));
        }
        return Promise.resolve([]);
    }
    /**
     * set save entries.
     */
    setItems(items: RPGAtsumaru.StorageItem[]): Promise<void> {
        if (isRPGAtsumaru) {
            return Promise.resolve(window.RPGAtsumaru.storage.setItems(items));
        }
        if (typeof window !== "undefined") {
            items.forEach(item => {
                window.localStorage.setItem(item.key, item.value)
            });
            return Promise.resolve();
        }
        return Promise.resolve();
    }
    /**
     * delete save entry
     */
    removeItem(key: string): Promise<void> {
        if (isRPGAtsumaru) {
            return Promise.resolve(window.RPGAtsumaru.storage.removeItem(key));
        }
        if (typeof window !== "undefined") {
            window.localStorage.removeItem(key);
            return Promise.resolve();
        }
        return Promise.resolve();
    }
}
