let data = [];
let tabelDataset = [];

function mulaiAnalisis() {
    const n = parseInt(document.getElementById("jumlahData").value);

    if (isNaN(n) || n <= 0) {
        alert("Masukkan jumlah data yang valid!");
        return;
    }

    data = [];
    for (let i = 0; i < n; i++) {
    data.push(Math.floor(Math.random() * 1000) + 1);
    }

    const REPEAT = 500;

    //Iteratif
    let startIteratif = performance.now();
    let sumIteratif = 0;

    for (let r = 0; r < REPEAT; r++) {
        sumIteratif = 0;
        for (let i = 0; i < data.length; i++) {
            sumIteratif += data[i];
        }
    }

    let rataIteratif = sumIteratif / data.length;
    let endIteratif = performance.now();
    let waktuIteratif = endIteratif - startIteratif;

    //Rekursif
    let waktuRekursif = 0;
    let rataRekursif = 0;
    let errorRekursif = null;

    try {
        let startRekursif = performance.now();
        let sumR = 0;

        for (let r = 0; r < REPEAT; r++) {
            sumR = sumRekursif(globalData, globalData.length);
        }

        let endRekursif = performance.now();
        waktuRekursif = endRekursif - startRekursif;
        rataRekursif = sumR / globalData.length;
    } catch (e) {
        errorRekursif = e.message;
    }

    if (errorRekursif) {
    document.getElementById("rekursifResult").innerText =
        "Waktu Eksekusi Rekursif: GAGAL (Stack Overflow)";
    document.getElementById("rataRekursif").innerText =
        "Rata-rata Rekursif: -";
    } else {
    document.getElementById("rekursifResult").innerText =
        "Waktu Eksekusi Rekursif: " + waktuRekursif.toFixed(3) + " ms";
    document.getElementById("rataRekursif").innerText =
        "Rata-rata Rekursif: " + rataRekursif.toFixed(2);
    }

    let kesimpulan = "";

    if (waktuIteratif < waktuRekursif) {
    kesimpulan = "Algoritma iteratif lebih efisien dalam waktu eksekusi karena tidak memiliki overhead pemanggilan fungsi.";
    } 
    else if (waktuIteratif > waktuRekursif) {
    kesimpulan = "Algoritma rekursif membutuhkan waktu eksekusi lebih besar akibat overhead pemanggilan fungsi berulang.";
    } 
    else {
    kesimpulan = "Kedua algoritma memiliki waktu eksekusi yang relatif sama pada ukuran data ini.";
    }

    document.getElementById("kesimpulan").innerText = "Kesimpulan: " + kesimpulan;

    gambarGrafik(waktuIteratif, waktuRekursif);
    isiTabel(n, waktuIteratif, waktuRekursif);
    tabelDataset.push({n:  n,iteratif: waktuIteratif,rekursif: waktuRekursif});
}

function gambarGrafik(wIteratif, wRekursif) {
    const canvas = document.getElementById("runtimeChart");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 50;
    const w = canvas.width - padding * 2;
    const h = canvas.height - padding * 2;

    const maxVal = Math.max(wIteratif, wRekursif) * 1.2;

    ctx.strokeStyle = "#9ca3af";
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + h);
    ctx.lineTo(padding + w, padding + h);
    ctx.stroke();

    ctx.fillStyle = "#374151";
    ctx.font = "12px Arial";
    const ySteps = 5;

    for (let i = 0; i <= ySteps; i++) {
        const val = (maxVal / ySteps) * i;
        const y = padding + h - (i / ySteps) * h;

        ctx.fillText(val.toFixed(2), 5, y + 4);

        ctx.strokeStyle = "#e5e7eb";
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + w, y);
        ctx.stroke();
    }

    const labels = ["Iteratif", "Rekursif"];
    const iteratif = [0, wIteratif];
    const rekursif = [0, wRekursif];

    function drawLine(data, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        data.forEach((val, i) => {
            const x = padding + (i / (data.length - 1)) * w;
            const y = padding + h - (val / maxVal) * h;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });

        ctx.stroke();
    }

    drawLine(iteratif, "#2563eb");
    drawLine(rekursif, "#dc2626");

    ctx.fillStyle = "#2563eb";
    ctx.beginPath();
    ctx.arc(padding + w, padding + h - (wIteratif / maxVal) * h, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(wIteratif.toFixed(2) + " ms",
        padding + w - 60,
        padding + h - (wIteratif / maxVal) * h - 8
    );

    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.arc(padding + w, padding + h - (wRekursif / maxVal) * h, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(wRekursif.toFixed(2) + " ms",
        padding + w - 60,
        padding + h - (wRekursif / maxVal) * h - 8
    );

    const legendX = padding + 10;
    const legendY = padding - 25;

    ctx.fillStyle = "#2563eb";
    ctx.fillRect(legendX, legendY, 12, 12);
    ctx.fillStyle = "#111827";
    ctx.fillText("Iteratif", legendX + 18, legendY + 11);

    ctx.fillStyle = "#dc2626";
    ctx.fillRect(legendX + 90, legendY, 12, 12);
    ctx.fillStyle = "#111827";
    ctx.fillText("Rekursif", legendX + 108, legendY + 11);
}

function isiTabel(n, waktuIteratif, waktuRekursif) {
    const tbody = document.getElementById("tabelData");

    const row = document.createElement("tr");

    const colN = document.createElement("td");
    colN.innerText = n;

    const colI = document.createElement("td");
    colI.innerText = waktuIteratif.toFixed(2);

    const colR = document.createElement("td");
    colR.innerText = waktuRekursif.toFixed(2);

    row.appendChild(colN);
    row.appendChild(colI);
    row.appendChild(colR);

    tbody.appendChild(row);
}

//BubbleSort
function BubbleSort() {
    if (tabelDataset.length === 0) {
        alert("Tabel masih kosong!");
        return;
    }
    let arr = [...tabelDataset];
    let start = performance.now();

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].iteratif > arr[j + 1].iteratif) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    let end = performance.now();

    document.getElementById("sortResult").innerText =
        "Hasil Sorting (Iteratif): " +
        arr.map(d => `n=${d.n} → ${d.iteratif.toFixed(2)} ms`).join(" | ");

    document.getElementById("sortTime").innerText =
        "Waktu Sorting: " + (end - start).toFixed(3) + " ms";
}

//LinearSearch
function LinearSearch() {
    if (tabelDataset.length === 0) {
        alert("Tabel masih kosong!");
        return;
    }

    const target = parseInt(document.getElementById("nilaiCari").value);
    if (isNaN(target)) {
        alert("Masukkan nilai n yang dicari!");
        return;
    }

    const REPEAT = 1000;
    let start = performance.now();
    let hasil = null;
    let found = false;

    for (let r = 0; r < REPEAT; r++) {
        found = false;
        hasil = null;

        for (let i = 0; i < tabelDataset.length; i++) {
            if (tabelDataset[i].n === target) {
                hasil = tabelDataset[i];
                found = true;
                break;
            }
        }
    }

    let end = performance.now();
    let avg = (end - start) / REPEAT;

    if (found) {
        document.getElementById("searchResult").innerText =
            `Data ditemukan → n=${hasil.n}, Iteratif=${hasil.iteratif.toFixed(2)} ms, Rekursif=${hasil.rekursif.toFixed(2)} ms`;
    } else {
        document.getElementById("searchResult").innerText =
            "Data tidak ditemukan di tabel";
    }

    document.getElementById("searchTime").innerText =
        "Waktu Pencarian (rata-rata): " + avg.toFixed(3) + " ms";
}
