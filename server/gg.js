
let IO = 0
let OO = 0


let array = [[1, 1 / 3, 1 / 5, 3],
[3, 1, 1 / 3, 5],
[5, 3, 1, 7],
[1 / 3, 1 / 5, 1 / 7, 1]]

let values = [1, 3, 5, 7, 9, 1 / 3, 1 / 5, 1 / 7, 1 / 9]

function mathOperation(array) {
    console.log(array)
    console.log(values)
    let X1sred = array[0].reduce((accumulator, currentValue) => accumulator + currentValue, 0) ** (1 / 4)
    let X2sred = array[1].reduce((accumulator, currentValue) => accumulator + currentValue, 0) ** (1 / 4)
    let X3sred = array[2].reduce((accumulator, currentValue) => accumulator + currentValue, 0) ** (1 / 4)
    let X4sred = array[3].reduce((accumulator, currentValue) => accumulator + currentValue, 0) ** (1 / 4)
    let Xsred = X1sred + X2sred + X3sred + X4sred
    console.log(X1sred)
    console.log(X2sred)
    console.log(X3sred)
    console.log(X4sred)
    console.log(Xsred)

    let w1 = X1sred / Xsred
    let w2 = X2sred / Xsred
    let w3 = X3sred / Xsred
    let w4 = X4sred / Xsred
    let w = w1 + w2 + w3 + w4

    // console.log("w1 = ", w1)
    // console.log("w2 = ", w2)
    // console.log("w3 = ", w3)
    // console.log("w4 = ", w4)
    // console.log("w = ", w)
    let priorities = [w1, w2, w3, w4];

    let resultMatrix = [];
    let unitMatrix = [
        [1, 1, 1, 1]
    ];
    for (let i = 0; i < unitMatrix.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < array.length; k++) {
                sum += unitMatrix[i][k] * array[k][j];
            }
            resultMatrix.push(sum);
        }
    }


    // let temp = resultMatrix[0]
    // resultMatrix[0] = resultMatrix[1]
    // resultMatrix[1] = temp
    // temp = resultMatrix[2]
    // resultMatrix[2] = resultMatrix[3]
    // resultMatrix[3] = temp
    console.log('Матрица приоритетов * единичня матрица:', resultMatrix);
    let Lmax = 0;

    for (let i = 0; i < resultMatrix.length; i++) {
        Lmax += resultMatrix[i] * priorities[i];
    }


    console.log('Lmax:', Lmax);
    console.log("r = ", resultMatrix)

    IO = (Lmax - 4) / 3
    OO = IO / 0.9

    console.log("IO = ", IO)
    console.log("OO = ", OO)
    return { IO: IO, OO: OO, Lmax: Lmax }
}



let data = mathOperation(array)
console.log("data1 = ", data)
function generateRandomArray(size) {
    let newMatrix = [];

    // Создаем матрицу с нужными значениями
    for (let i = 0; i < size; i++) {
        newMatrix[i] = new Array(size).fill(0);
    }

    // Заполняем матрицу, соблюдая правило 1/x
    for (let i = 0; i < size; i++) {
        for (let j = i; j < size; j++) {
            if (i === j) {
                newMatrix[i][j] = 1;  // Главная диагональ равна 1
            } else {
                let randomValue = values[Math.floor(Math.random() * values.length)];
                newMatrix[i][j] = randomValue;
                newMatrix[j][i] = 1 / randomValue;
            }
        }
    }

    return newMatrix;
}

while(true){
    if (data.OO > 0.1) {
        let randomArray = generateRandomArray(4);
        console.log("Сгенерированная матрица:", randomArray);
        data = mathOperation(randomArray)
    } else {
        console.log("Условие OO <= 0.1, матрица не сгенерирована");
        break
        
    }
}


console.log("data2 = ", data)
