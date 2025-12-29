function mulaiAnalisis() {
    const n = parseInt(document.getElementById("jumlahData").value);

    if (isNaN(n) || n <= 0) {
        alert("Masukkan jumlah data yang valid!");
        return;
    }

    let data = [];
    for (let i = 0; i < n; i++) {
        data.push(Math.floor(Math.random() * 1000) + 1);
    }

    const REPEAT = 500;

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

    function sumRekursif(arr, n) {
        if (n === 0) return 0;
        return arr[n - 1] + sumRekursif(arr, n - 1);
    }

    let startRekursif = performance.now();
    let sumR = 0;

    for (let r = 0; r < REPEAT; r++) {
        sumR = sumRekursif(data, data.length);
    }

    let rataRekursif = sumR / data.length;
    let endRekursif = performance.now();
    let waktuRekursif = endRekursif - startRekursif;

    document.getElementById("iteratifResult").innerText =
        "Waktu Eksekusi Iteratif: " + waktuIteratif.toFixed(3) + " ms";

    document.getElementById("rekursifResult").innerText =
        "Waktu Eksekusi Rekursif: " + waktuRekursif.toFixed(3) + " ms";

    document.getElementById("rataIteratif").innerText =
        "Rata-rata Iteratif: " + rataIteratif.toFixed(2);

    document.getElementById("rataRekursif").innerText =
        "Rata-rata Rekursif: " + rataRekursif.toFixed(2);

    let kesimpulan = "";
    if (waktuIteratif < waktuRekursif) {
    kesimpulan = "Algoritma iteratif lebih efisien dalam waktu eksekusi karena tidak memiliki overhead pemanggilan fungsi.";
    } else {
    kesimpulan = "Algoritma rekursif membutuhkan waktu eksekusi lebih besar akibat overhead pemanggilan fungsi berulang.";  
    }

    document.getElementById("kesimpulan").innerText = "Kesimpulan: " + kesimpulan;

    gambarGrafik(waktuIteratif, waktuRekursif);
    isiTabel(n, waktuIteratif, waktuRekursif);
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


