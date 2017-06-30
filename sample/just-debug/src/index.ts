import * as Atsumaru from "rpgatsumaru-api";

const contextValue = document.getElementById("contextValue") as HTMLInputElement;
const pushContext = document.getElementById("pushContext") as HTMLButtonElement;
const pushMinorContext = document.getElementById("pushMinorContext") as HTMLButtonElement;
const changeScene = document.getElementById("changeScene") as HTMLButtonElement;

const comment = new Atsumaru.CommentSystem();
pushContext.addEventListener("click", () => {
    comment.pushContextFactor(contextValue.value);
});

pushMinorContext.addEventListener("click", () => {
    comment.pushMinorContext();
});
let isTitle = true;
changeScene.addEventListener("click", () => {
    comment.changeScene(isTitle ? "scene_a" : "__title");
    isTitle = !isTitle;
});

const storageValue = document.getElementById("storageValue") as HTMLInputElement;
const save = document.getElementById("save") as HTMLButtonElement;

const storage = new Atsumaru.Storage();
storage.getItems()
    .then(items => {
        items = items.filter(item => item.key === "data1");
        if (items.length > 0) {
            storageValue.value = items[0].value;
        }
    });
save.addEventListener("click", () => {
    storage.setItems([{
        key: "data1",
        value: storageValue.value,
    }]);
});

const controller = new Atsumaru.DefaultController();
controller.subscribe(value => console.log(value));

const feature = new Atsumaru.PlayerFeatures();
feature.takeScreenShot = () => "data:image/jpeg;base64,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";

