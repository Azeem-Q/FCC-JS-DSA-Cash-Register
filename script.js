// Cash Register
let numeral = require('numeral');
function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    let cashArr = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    console.log('cashArr', ...cashArr);
    let changeArr = [];
    let cidSum = 0;
    for (let i of cid) {
        cidSum += i[1];
    }
    if (changeDue == cidSum) {
        return {
            status: "CLOSED",
            change: cid
        }
    }
    let iArr = [];
    for (let i = cid.length - 1; i > -1; --i) {
        iArr.push(i);
        console.log('cd', changeDue, 'cid', cashArr[i]);
        if (changeDue > cashArr[i]) {
            let unit = 0
            while (unit < changeDue && unit < cid[i][1]) {
                unit += cashArr[i];
            }
            //unit -= cashArr[i];
            if (unit > changeDue) {
                unit -= cashArr[i];
            }
            changeDue = changeDue - unit;
            console.log('change', changeDue);
            changeArr.push([cid[i][0], unit]);
            console.log(i, changeDue);
        }   else {
            continue;
        }
    }
    console.log('finalDue', changeDue);
    console.log(...iArr);
    console.log(...changeArr);
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
    //console.log(JSON.stringify(changeArr));
}

console.log(JSON.stringify(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])));

const money = numeral(0.3).subtract(0.2);

console.log(money.value());

