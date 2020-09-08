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

    let i_1 = document.getElementById('i_1').value; //A, сила тока первого шва
    i_1 = parseInt(i_1);

    let i_2 = document.getElementById('i_2').value; //A, сила тока второго шва
    i_2 = parseInt(i_2);

    //переменные катетов и длины швов
    let = k1_1, k2_1, l_1, k1_2, k2_2, l_2;
      
    //первый шов
    k1_1 = parseFloat(document.getElementById('k1_1').value); //первый катет
    
    k2_1 = parseFloat(document.getElementById('k2_1').value); //второй катет
    
    l_1 = parseInt(document.getElementById('l_1').value); //длина шва
        
    //второй шов
    k1_2 = secondWire(document.getElementById('k1_2').value); //первый катет. проверка через функцию secondWire присваивает значение 0, если не происходит расчёт второго шва.. иначе ошибку выдатё!!!
        
    k2_2 = secondWire(document.getElementById('k2_2').value); //второй катет
        
    l_2 = secondWire(document.getElementById('l_2').value); //длина шва       
    
    function secondWire (kl) { //парсит переданное значение катета и длины или приисваивает 0, для работы расчёта.. иначе ошибка
        if(kl > 0) {
            kl = parseFloat(kl);
        } else {
            kl = 0;
        }
        return kl;
    }
    
    //расчёт массы наплавленного металла первого шва
    let s_1 = 0.5 * k1_1 * k2_1; //площадь прямоугольного треугольника
    let volume_1 = s_1 * l_1; //объём наплавленного металла    
    let mNM_1 = volume_1 * p; //масса наплавленного металла

    //расчёт массы наплавленного металла второго шва
    let s_2 = 0.5 * k1_2 * k2_2; //площадь прямоугольного треугольника
    let volume_2 = s_2 * l_2; //объём наплавленного металла    
    let mNM_2 = volume_2 * p; //масса наплавленного металла

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

//Расчёт С
function rC() {    

    let i = document.getElementById('i').value; //A, сила тока стыкового шва
    i = parseInt(i);

    let s, b, e, q, l;
    //первый шов
    s = document.getElementById('s').value; //толщина детали
    s = parseFloat(s);

    b = document.getElementById('b').value; //ширина зазора между деталями
    b = parseFloat(b);

    e = document.getElementById('e').value; //ширина усиления шва
    e = parseFloat(e);

    q = document.getElementById('q').value; //высота усиления шва
    q = parseFloat(q);

    l = document.getElementById('l').value; //длина шва
    l = parseInt(l);    
    
    // //расчёт массы наплавленного металла стыкового шва
    let s1 = s * b; //площадь зазора
    let s2 = e * q; //площадь усиления
    let sO = s1 + s2; //общая площадь
    let volume = sO * l; //объём наплавленного металла    
    let mNM = volume * p; //масса наплавленного металла    

    let cleanWeightWire = (mNM * kPr) / 1000; //читсый вес проволоки для первого шва
    
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

//Расчёт Kt
const kKt = 0.093; //переводной коэф точечной сварки
function rKt() {    

    let nKt = parseInt(document.getElementById('kt').value); //количество точек       
    
    let weldingTimeKt = nKt * kKt; //время сварки в мин

    weldingTimeKt = weldingTimeKt.toFixed(2);        

    document.getElementById('weldingTimeKt').innerHTML = weldingTimeKt; //вывод основного времени сварки
}