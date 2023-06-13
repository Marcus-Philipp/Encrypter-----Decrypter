// Caesar-Verschluesselung
class ShiftCipher {
  // Sprunggroeße für die Verschluesselung.
  constructor(jumpValue) {
    this.jumpValue = jumpValue;
  }

  //Nimmt einen Text und verschluesselt ihn.
  encrypt(text) {
    let string = '';
    for (let i = 0; i < text.length; i++) {
     let sum = text[i].toUpperCase().charCodeAt();
     if (sum < 65 || sum > 90) {
      string += text[i];
     } else if (sum + this.jumpValue > 90) {
      string += String.fromCharCode(sum + this.jumpValue - 26);
     } else {
       string += String.fromCharCode(sum + this.jumpValue);
     }
    }
    return string;
  }
  
  // Nimmt einen verschlüsselten Text und entschluesselt ihn.
  decrypt(crypt) {
    let cryptString = '';
    for (let j = 0; j < crypt.length; j++) {
      let cryptSum = crypt[j].toUpperCase().charCodeAt();
      if (cryptSum < 65 || cryptSum > 90) {
        cryptString += crypt[j];
      } else if (cryptSum - this.jumpValue < 65) {
        cryptString += String.fromCharCode(cryptSum - this.jumpValue + 26);
      } else {
        cryptString += String.fromCharCode(cryptSum - this.jumpValue);
      }
    }
    return cryptString.toLowerCase();
  }
}

// Erstellt ein neues ShiftCipher-Objekt
const cipher = new ShiftCipher(22);

// Abrufen von Elementen aus dem DOM.
const select = (selector) => {
  return document.querySelector(selector);
};

// Deklarieren von DOM-Elementen.
const lockFunction = select('.lock-function');
const encrypterButton = select('.encrypter-button');
const decrypterButton = select('.decrypter-button');
const titleChange = select('h1');
const lockElement = select('.button-container');
const resetCrypt = select('.reset-encrypt-decrypt');
const lock = select('.lock');
const cryptButton = select('.encrypt-decrypt');
const textarea = select('.textarea');
const resultBox = select('.result-container');
const result = select('.result');
const copyButton = select('.copy-button');

// Sichtbarkeit von Elementen.
const displayButton = (event) => {
  decrypterButton.style.display = event;
  encrypterButton.style.display = event;
};

// Sichtbarkeit des Schlosses.
const lockDisplay = (event) => {
  lock.style.display = event;
};

// Aktueller Modus.
let mode = '';

// Funktion zur Steuerung von Animationen beim Sperren.
const lockAnimations = () => {
  displayButton('none');
  lockDisplay('flex');
  lockElement.classList.add('lock-move-up');
  lockFunction.className = '';
};

// Funktionen zur Steuerung der Verschluesselung.
const encrypterEvent = () => {
  titleChange.textContent = 'Encrypter';
  cryptButton.textContent = 'ENCRYPT';
  resetCrypt.textContent = 'RESET ENCRYPT';
  lockFunction.classList.add('lock-function-open');
  mode = 'encrypt';
};

// Funktionen zur Steuerung der Entschluesselung.
const decrypterEvent = () => {
  titleChange.textContent = 'Decrypter';
  cryptButton.textContent = 'DECRYPT';
  resetCrypt.textContent = 'RESET DECRYPT';
  lockFunction.classList.add('lock-function-close');
  mode = 'decrypt';
};

//Ereignishandler fuer Verschluesselung.
encrypterButton.addEventListener('click', () => {
  lockAnimations();
  encrypterEvent();
});

//Ereignishandler fuer Entschluesselung.
decrypterButton.addEventListener('click', () => {
  lockAnimations();
  decrypterEvent();
});

// Funktionen zur Verschlüsselung von Text.
const encrypt = () => {
  lockFunction.classList.add('animation-close');
  result.innerHTML = cipher.encrypt(textarea.value);
};

// Funktionen zur Entschlüsselung von Text.
const decrypt = () => {
  lockFunction.classList.add('animation-open');
  result.innerHTML = cipher.decrypt(textarea.value);
};

// Funktion zur Steuerung von Animationen beim Verschluesseln und Entschluesseln.
const cryptAnimations = () => {
  setTimeout(() => {
    lock.classList.add('lock-disappear');
  }, 2000);

  setTimeout(() => {
    resultBox.classList.add('result-fade-in');
    lockDisplay('none');
    resultBox.style.display = 'flex';
  }, 3500);
};

// Ereignishandler fuer Verschlüsselung/Entschluesselung.
cryptButton.addEventListener('click', () => {
  if (mode === 'encrypt') {
      encrypt();
  } else if (mode === 'decrypt') {
      decrypt();
  }
  cryptAnimations();
});

// Ereignishandler zum kopieren des gesamten Crypttextes.
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(result.value);
    alert('Text kopiert!');
} catch (err) {
    console.error('Fehler beim Kopieren des Textes: ', err);
}
});

// Zuruecksetzen des Textes.
const resetText = () => {
  lockFunction.classList.remove('animation-close', 'animation-open');
  result.innerHTML = '';
  textarea.value = '';
  lock.classList.remove('lock-disappear');
  resultBox.classList.remove('result-fade-in');
  lockDisplay('flex');
  resultBox.style.display = 'none'
};

// Zuruecksetzen der vollstaendigen Anwendung.
const resetComplete = () => {
  resetText();
  mode = '';
  displayButton('flex');
  lockDisplay('none');
  lockElement.classList.remove('lock-move-up')
  titleChange.innerHTML = 'Encrypter & Decrypter';
};

// Ereignishandler Zuruecksetzen des Encrypters / Decrypters.

const resetEnDecrypter = select('.reset-encrypt-decrypt');
resetEnDecrypter.addEventListener('click', resetComplete);

// Ereignishandler Zuruecksetzen des Textes.
const resetButton = select('.reset-text');
resetButton.addEventListener('click', resetText);

// Ereignishandler Zuruecksetzen der vollstaendigen Anwendung.
const resetCompleteButton = select('.reset-complete');
resetCompleteButton.addEventListener('click', resetComplete);