class ShiftCipher {
    constructor(jumpValue) {
      this.jumpValue = jumpValue;
    }
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