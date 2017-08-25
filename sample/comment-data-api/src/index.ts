import * as Atsumaru from "rpgatsumaru-api";

const comment = new Atsumaru.CommentSystem();
comment.cameOut.subscribe(speech);
// 入力したコメントも取る場合
// comment.posted.subscribe(comment => speech([comment]));

let synth = window.speechSynthesis;
let voice: SpeechSynthesisVoice | null = null;
if (synth) {
    synth.addEventListener("voiceschanged", () => {
        const voices = synth.getVoices();
        for (let i = 0; i < voices.length; i++) {
            if (voices[i].name === "Google 日本語") {
                voice = voices[i];
                break;
            }
        }
        if (!voice) {
            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name.indexOf("日本語") !== -1) {
                    voice = voices[i];
                    break;
                }
            }
        }
    });
}

// コメントを無理やり流す
const posElem = document.getElementById("pos") as HTMLSpanElement;
let contextPressureCounter = 0;
setInterval(() => {
    contextPressureCounter++;
    if (contextPressureCounter >= 20) {
        contextPressureCounter = 0;
    }
    comment.pushContextFactor(String(contextPressureCounter));
    posElem.innerHTML = String(contextPressureCounter);
}, 5000);

async function speech(comments: { command: string, comment: string }[]) {
    if (!synth || !voice) {
        return;
    }
    for (let comment of comments) {
        await speechOne(comment);
    }
}

function speechOne(comment: { command: string, comment: string }) {
    return new Promise((resolve, reject) => {
        const utterThis = new SpeechSynthesisUtterance(comment.comment);
        utterThis.voice = voice as SpeechSynthesisVoice;
        synth.speak(utterThis);
        utterThis.addEventListener("end", resolve);
        utterThis.addEventListener("error", reject);
    });
}
