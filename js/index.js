const getKey = ({ key, code, sound }) => {
  const keyP = document.getElementById("key");
  const codeP = document.getElementById("code");
  const soundP = document.getElementById("sound");

  keyP.innerHTML = `Pressed Key: ${key}`;
  codeP.innerHTML = `Key Code: ${code}`;
  soundP.innerHTML = `Sound: ${sound}`;
};

const getSound = (audio) => {
  const arrStr = audio.src.split('/');
  const len = arrStr.length;
  return arrStr[len - 1].replace('.wav', "");
}

const playSound = (e) => {
  let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  let key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) {
    return getKey({
      key: e.key,
      code: e.keyCode,
      sound: "No sound detected",
    });
  }

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();

  getKey({
    key: e.key,
    code: e.keyCode,
    sound: getSound(audio),
  });
};

const removeTransition = (e) => {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
};

const keys = document.querySelectorAll(".key");
keys.forEach((element) => {
  element.addEventListener("transitionend", removeTransition);
});

window.addEventListener("keydown", playSound);
