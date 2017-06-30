/// <reference path="./rpgatsumaru.d.ts" />
import { isRPGAtsumaru } from "./constants";

/**
 * アツマール標準ゲームパッド
 */
export class DefaultController {
    subscribe(onNext: RPGAtsumaru.NextFunc<RPGAtsumaru.InputInfo>): RPGAtsumaru.ISubscription {
        if (isRPGAtsumaru) {
            return window.RPGAtsumaru.controllers.defaultController.subscribe(onNext);
        }
        return {
            unsubscribe: () => { },
            closed: true,
        };
    }
}
