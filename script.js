// Cash Register

// Real World Version with Numeral.js library
/*
let numeral = require('numeral');
function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    let cashArr = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    let changeArr = [];
    let cidSum = 0;
    for (let i of cid) {
        cidSum = numeral(cidSum).add(i[1]);
        cidSum = cidSum.value();
    }
    if (changeDue == cidSum) {
        return {
            status: "CLOSED",
            change: cid
        }
    }
    for (let i = cid.length - 1; i >= 0; --i) {
        if (changeDue > cashArr[i]) {
            let unit = 0
            while (unit < changeDue && unit < cid[i][1]) {
                unit = numeral(unit).add(cashArr[i]);
                unit = unit.value()
            }
            if (unit > changeDue) {
                unit = numeral(unit).subtract(cashArr[i]);
                unit = unit.value();
            }
            
            changeDue = numeral(changeDue).subtract(unit);
            changeDue = changeDue.value();
            changeArr.push([cid[i][0], unit]);
        }   else {
            continue;
        }
    }
    if (changeDue > 0) {
        return {
            status: "INSUFFICIENT_FUNDS", 
            change: []
        }
    }   else {
        return {
            status: "OPEN",
            change: changeArr
        }
    }
}

console.log(JSON.stringify(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])));
*/

// FCC Version Without Library by converting money to cents

function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    changeDue *= 100;
    let cashArr = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
    for (let i of cid) {
        i[1] = Math.round(i[1] * 100);
    }
    let changeArr = [];
    let cidSum = 0;
    for (let i of cid) {
        cidSum += i[1];
    }
    console.log(cidSum, changeDue);
    if (changeDue == cidSum) {
        for (let i of cid) {
            i[1] = i[1] / 100;
        }
        return {
            status: "CLOSED",
            change: cid
        }
    }
    for (let i = cid.length - 1; i >= 0; --i) {
        if (changeDue > cashArr[i]) {
            let unit = 0
            while (unit < changeDue && unit < cid[i][1]) {
                unit += cashArr[i];
            }
            if (unit > changeDue) {
                unit -= cashArr[i];
            }
            changeDue = changeDue - unit;
            changeArr.push([cid[i][0], unit / 100]);
        }   else {
            continue;
        }
    }
    if (changeDue > 0) {
        return {
            status: "INSUFFICIENT_FUNDS", 
            change: []
        }
    }   else {
        return {
            status: "OPEN",
            change: changeArr
        }
    }
}

console.log(JSON.stringify(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])));
