//запрет на изменение значение в инпутах стрелками с клавы
document.getElementById('noKeyboard').addEventListener('keydown', function(e) {
    if (e.which === 38 || e.which === 40) {
        e.preventDefault();
    }
});

const p = 7.85; //плотность металла гр/см.куб
const kPr = 1.2; //коэф. расхода проволоки
const kN = 15; //г/А*ч, коэф. наплавки

//Расчёт Т/Н/У
function rTH() {

    let i_1 = parseInt(document.getElementById('i_1').value); //A, сила тока первого шва
    let i_2 = parseInt(document.getElementById('i_2').value); //A, сила тока второго шва

    //переменные катетов и длины швов
    let = k1_1, k2_1, l_1, k1_2, k2_2, l_2;      
    //первый шов
    k1_1 = secondWire(document.getElementById('k1_1').value); //первый катет    
    k2_1 = secondWire(document.getElementById('k2_1').value); //второй катет    
    l_1 = secondWire(document.getElementById('l_1').value); //длина шва        
    //второй шов
    k1_2 = secondWire(document.getElementById('k1_2').value); //первый катет. проверка через функцию secondWire присваивает значение 0, если не происходит расчёт второго шва.. иначе ошибку выдатё!!!    
    k2_2 = secondWire(document.getElementById('k2_2').value); //второй катет  
    l_2 = secondWire(document.getElementById('l_2').value); //длина шва
    //функция парсит переданное значение катета и длины или присваивает 0, для работы расчёта.. иначе ошибка
    function secondWire (kl) { 
        if(kl > 0) {
            kl = parseFloat(kl);
        } else {
            kl = 0;
        }
        return kl;
    }
    //функция расчёта массы наплавленного металла
    function mNM(k1, k2, l){
        let s = 0.5 * k1 * k2; //площадь прямоугольного треугольника
        let volume = s * l; //объём наплавленного металла    
        let mNM = volume * p; //масса наплавленного металла
        return mNM;
    }

    let mNM_1 = mNM(k1_1, k2_1, l_1); //вызов функции расчёта массы наплавленного металла шва №1
    let mNM_2 = mNM(k1_2, k2_2, l_2); //вызов функции расчёта массы наплавленного металла шва №2

    let cleanWeightWire1 = (mNM_1 * kPr) / 1000; //читсый вес проволоки для первого шва
    let cleanWeightWire2 = (mNM_2 * kPr) / 1000; //читсый вес проволоки для второго шва

    let weightWire = (cleanWeightWire1 * 1.1) + (cleanWeightWire2 * 1.1); //масса сварочной проволоки с поправочный коэф.
    let volumeGas = ((cleanWeightWire1 * 1.2 * 0.24) * 1.1) + ((cleanWeightWire2 * 1.2 * 0.24) * 1.1); //норма расхода газа
    let weldingTime = (((mNM_1/(kN * i_1)) * 60) * 1.1) + (((mNM_2/(kN * i_2)) * 60) * 1.1); //время сварки в мин

    weightWire = weightWire.toFixed(4); //обрезаем лишние символы после запятой + округление
    volumeGas = volumeGas.toFixed(4);
    weldingTime = weldingTime.toFixed(4);        

    document.getElementById('weightWire').innerHTML = weightWire; //вывод расхода проволоки
    document.getElementById('volumeGas').innerHTML = volumeGas; //вывод расхода газа
    document.getElementById('weldingTime').innerHTML = weldingTime; //вывод основного времени сварки
}

//функция для ленивых, сбрасывает параметры шва №1 и №2 без обновления страницы
function resTH(znach1, znach2, znach3){
    document.getElementById(znach1).value = '';
    document.getElementById(znach2).value = '';
    document.getElementById(znach3).value = '';
    document.getElementById('weightWire').innerHTML = 0; //сброс расхода проволоки
    document.getElementById('volumeGas').innerHTML = 0; //сброс расхода газа
    document.getElementById('weldingTime').innerHTML = 0; //сброс основного времени сварки
}

//Расчёт С
function rC() {    

    let i = parseInt(document.getElementById('i').value); //A, сила тока стыкового шва
    
    let s, b, e, q, l;
    //первый шов
    s = parseFloat(document.getElementById('s').value); //толщина детали    
    b = parseFloat(document.getElementById('b').value); //ширина зазора между деталями    
    e = parseFloat(document.getElementById('e').value); //ширина усиления шва
    q = parseFloat(document.getElementById('q').value); //высота усиления шва    
    l = parseInt(document.getElementById('l').value); //длина шва
    
    // //расчёт массы наплавленного металла стыкового шва
    let s1 = s * b; //площадь зазора
    let s2 = e * q; //площадь усиления
    let sO = s1 + s2; //общая площадь
    let volume = sO * l; //объём наплавленного металла    
    let mNM = volume * p; //масса наплавленного металла    

    let cleanWeightWire = (mNM * kPr) / 1000; //читсый вес проволоки шва
    
    let weightWireC = cleanWeightWire * 1.1; //масса сварочной проволоки с поправочный коэф.
    let volumeGasC = (cleanWeightWire * 1.2 * 0.24) * 1.1; //норма расхода газа
    let weldingTimeC = ((mNM/(kN * i)) * 60) * 1.1; //время сварки в мин

    weightWireC = weightWireC.toFixed(4); //обрезаем лишние символы после запятой + округление
    volumeGasC = volumeGasC.toFixed(4);
    weldingTimeC = weldingTimeC.toFixed(4);        

    document.getElementById('weightWireC').innerHTML = weightWireC; //вывод расхода проволоки
    document.getElementById('volumeGasC').innerHTML = volumeGasC; //вывод расхода газа
    document.getElementById('weldingTimeC').innerHTML = weldingTimeC; //вывод основного времени сварки
}

//функция для ленивых, сбрасывает параметры прямоугольника S1 и S2 без обновления страницы
function resCS(znach1, znach2){
    document.getElementById(znach1).value = '';
    document.getElementById(znach2).value = '';
    document.getElementById('weightWireC').innerHTML = 0; //сброс расхода проволоки
    document.getElementById('volumeGasC').innerHTML = 0; //сброс расхода газа
    document.getElementById('weldingTimeC').innerHTML = 0; //сброс основного времени сварки
}

//Расчёт Kt
const kKt = 0.093; //переводной коэф точечной сварки
function rKt() {    

    let nKt = parseInt(document.getElementById('kt').value); //количество точек       
    
    let weldingTimeKt = nKt * kKt; //время сварки в мин

    weldingTimeKt = weldingTimeKt.toFixed(2);        

    document.getElementById('weldingTimeKt').innerHTML = weldingTimeKt; //вывод основного времени сварки
}
//функция для ленивых, сбрасывает количество точек без обновления страницы
function resKt(){ 
    document.getElementById('kt').value = '';
    document.getElementById('weldingTimeKt').innerHTML = 0; //сброс основного времени сварки
}