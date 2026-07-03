import { normalizePassword } from '../src/password/normalizePassword.js';

const testCase = normalizePassword("teste`", "NFC");
console.log(testCase); 

const testCase1 = normalizePassword("testé", "NFD");
console.log(testCase1); 

if(testCase === testCase1){
    console.log("The two normalized passwords are equal.");
}
else{
    console.log("The two normalized passwords are not equal.");
}