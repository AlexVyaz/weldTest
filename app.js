function umn() {
    let = k1, k2;
    k1 = document.getElementById('k1').value;
    k1 = parseFloat(k1);

    k2 = document.getElementById('k2').value;
    k2 = parseFloat(k2);

    result = k1 * k2;

    document.getElementById('rez').innerHTML = result;
}
