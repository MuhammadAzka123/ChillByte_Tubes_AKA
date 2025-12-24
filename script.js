function mulaiAnalisis() {
    const n = parseInt(document.getElementById("jumlahData").value);

    if (isNaN(n) || n <= 0) {
        alert("Masukkan jumlah data yang valid!");
        return;
    }

    // Generate data waktu eksekusi (simulasi dalam nanosecond)
    let data = [];
    for (let i = 0; i < n; i++) {
        data.push(Math.floor(Math.random() * 1000) + 1);
    }

    // ================= ITERATIF =================
    let startIteratif = performance.now();
    let sumIteratif = 0;
    for (let i = 0; i < data.length; i++) {
        sumIteratif += data[i];
    }
    let rataIteratif = sumIteratif / data.length;
    let endIteratif = performance.now();
    let waktuIteratif = endIteratif - startIteratif;

    // ================= REKURSIF =================
    function sumRekursif(arr, n) {
        if (n === 0) return 0;
        return arr[n - 1] + sumRekursif(arr, n - 1);
    }

    let startRekursif = performance.now();
    let sumR = sumRekursif(data, data.length);
    let rataRekursif = sumR / data.length;
    let endRekursif = performance.now();
    let waktuRekursif = endRekursif - startRekursif;

    // ================= OUTPUT =================
    document.getElementById("iteratifResult").innerText =
        "Waktu Eksekusi Iteratif: " + waktuIteratif.toFixed(4) + " ms";

    document.getElementById("rekursifResult").innerText =
        "Waktu Eksekusi Rekursif: " + waktuRekursif.toFixed(4) + " ms";

    document.getElementById("rataIteratif").innerText =
        "Rata-rata Iteratif: " + rataIteratif.toFixed(2);

    document.getElementById("rataRekursif").innerText =
        "Rata-rata Rekursif: " + rataRekursif.toFixed(2);

    let kesimpulan = "";
    if (waktuIteratif < waktuRekursif) {
        kesimpulan = "Algoritma iteratif lebih efisien dalam runtime dan penggunaan memori.";
    } else {
        kesimpulan = "Algoritma rekursif memiliki runtime lebih besar akibat pemanggilan fungsi berulang.";
    }

    document.getElementById("kesimpulan").innerText =
        "Kesimpulan: " + kesimpulan;
}
