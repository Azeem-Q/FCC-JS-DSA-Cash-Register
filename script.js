function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    let cashArr = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    let changeArr = [];
    for (let i = cid.length - 1; i > 0; --i) {
        if (changeDue > cashArr[i]) {
            let unit = 0
            while (unit < changeDue) {
                unit += cashArr[i];
            }
            changeDue = changeDue - unit;
            console.log(changeDue);
            changeArr.push([cid[0], unit]);
        }
    }
    console.log(JSON.stringify(changeArr));
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);