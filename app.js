const p = 7.85; //плотность металла гр/см.куб
const kPr = 1.2; //коэф. расхода проволоки
const kN = 15; //г/А*ч, коэф. наплавки
let i = document.getElementById('i').value; //A, сила тока
i = parseInt(i);

//запрет на изменение значение в инпутах стрелками с клвы
document.getElementById('noKeyboard').addEventListener('keydown', function(e) {
    if (e.which === 38 || e.which === 40) {
        e.preventDefault();
    }
});

//Расчёт Т/Н/У
function rTH(i = 80) {
    
    let = k1, k2, l;

    k1 = document.getElementById('k1').value; //первый катет
    k1 = parseFloat(k1);

    k2 = document.getElementById('k2').value; //второй катет
    k2 = parseFloat(k2);

    l = document.getElementById('l').value; //длина шва
    l = parseInt(l);

    let s = 0.5 * k1 * k2; //катет прямоугольного треугольника
    let volume = s * l; //объём наплавленного металла
    console.log(volume);
    let mNM = volume * p; //масса наплавленного металла

    let weightWire =  ((mNM * kPr) / 1000) * 1.1; //масса сварочной проволоки
    let volumeGas = (((mNM * kPr) / 1000) * 1.2 * 0.24) * 1.1; //норма расхода газа
    let weldingTime = ((mNM/(kN * i)) * 60) * 1.1; //время сварки в мин

    weightWire = weightWire.toFixed(4); //обрезаем лишние символы после запятой + округление
    volumeGas = volumeGas.toFixed(4);
    weldingTime = weldingTime.toFixed(4);        

    document.getElementById('weightWire').innerHTML = weightWire; //вывод расхода проволоки
    document.getElementById('volumeGas').innerHTML = volumeGas; //вывод расхода газа
    document.getElementById('weldingTime').innerHTML = weldingTime; //вывод основного времени сварки
}
