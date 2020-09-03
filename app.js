const p = 7.85; //плотность металла гр/см.куб
const kPr = 1.2; //коэф. расхода проволоки
function umn() {
    
    let = k1, k2, l;

    k1 = document.getElementById('k1').value;
    k1 = parseFloat(k1);

    k2 = document.getElementById('k2').value;
    k2 = parseFloat(k2);

    l = document.getElementById('l').value;
    l = parseInt(l);

    let s = 0.5 * k1 * k2; //катет прямоугольного треугольника
    let volume = s * l; //объём наплавленного металла
    console.log(volume);
    let mNM = volume * p; //масса наплавленного металла

    let rPr =  ((mNM * kPr) / 1000) * 1.1; //норма расхода проволоки
    let rGz = (rPr * 1.2 * 0.24) * 1.1; //норма расхода газа
    rPr = rPr.toFixed(4); //округление

    

    document.getElementById('rPr').innerHTML = rPr; //вывод результата
    document.getElementById('rGz').innerHTML = rGz; //расход газа
}
