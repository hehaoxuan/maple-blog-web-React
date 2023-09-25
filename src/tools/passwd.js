import CryptoJS from 'crypto-js'
export const encrypt = (word) => {
    var key = CryptoJS.enc.Utf8.parse("TGt3XDAteMdqZ64f");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

export const decrypt = (word) => {
    var key = CryptoJS.enc.Utf8.parse("TGt3XDAteMdqZ64f");
    var decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
