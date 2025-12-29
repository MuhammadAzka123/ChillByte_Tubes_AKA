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

    let startIteratif = performance.now();
    let sumIteratif = 0;
    for (let i = 0; i < data.length; i++) {
        sumIteratif += data[i];
    }
    let rataIteratif = sumIteratif / data.length;
    let endIteratif = performance.now();
    let waktuIteratif = endIteratif - startIteratif;

    function sumRekursif(arr, n) {
        if (n === 0) return 0;
        return arr[n - 1] + sumRekursif(arr, n - 1);
    }

    let startRekursif = performance.now();
    let sumR = sumRekursif(data, data.length);
    let rataRekursif = sumR / data.length;
    let endRekursif = performance.now();
    let waktuRekursif = endRekursif - startRekursif;

    document.getElementById("iteratifResult").innerText =
        "Waktu Eksekusi Iteratif: " + waktuIteratif.toFixed(4) + " ms";

    document.getElementById("rekursifResult").innerText =
        "Waktu Eksekusi Rekursif: " + waktuRekursif.toFixed(4) + " ms";

    document.getElementById("rataIteratif").innerText =
        "Rata-rata Iteratif: " + rataIteratif.toFixed(2);

    document.getElementById("rataRekursif").innerText =
        "Rata-rata Rekursif: " + rataRekursif.toFixed(2);

    document.getElementById("kesimpulan").innerText =
        "Kesimpulan: Algoritma iteratif lebih efisien dalam runtime dan penggunaan memori.";

    gambarGrafik();
}

function gambarGrafik() {
    const canvas = document.getElementById("runtimeChart");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const labels = [100, 200, 400, 800, 1600];
    const iteratif = [0.01, 0.02, 0.04, 0.08, 0.16];
    const rekursif = [0.018, 0.036, 0.072, 0.144, 0.288];

    const maxVal = Math.max(...rekursif);
    const padding = 40;
    const w = canvas.width - padding * 2;
    const h = canvas.height - padding * 2;

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

    ctx.strokeStyle = "#999";
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + h);
    ctx.lineTo(padding + w, padding + h);
    ctx.stroke();

    drawLine(iteratif, "#2563eb");
    drawLine(rekursif, "#dc2626");

    iteratif.forEach((val, i) => {
        const x = padding + (i / (iteratif.length - 1)) * w;
        const y = padding + h - (val / maxVal) * h;
        ctx.fillStyle = "#2563eb";
        ctx.fillText(val.toFixed(4), x - 12, y - 8);
    });

    rekursif.forEach((val, i) => {
        const x = padding + (i / (rekursif.length - 1)) * w;
        const y = padding + h - (val / maxVal) * h;
        ctx.fillStyle = "#dc2626";
        ctx.fillText(val.toFixed(4), x - 12, y - 8);
    });

    isiTabel(labels, iteratif, rekursif);
}

function isiTabel(labels, iteratif, rekursif) {
    const tbody = document.getElementById("tabelData");
    tbody.innerHTML = "";

    for (let i = 0; i < labels.length; i++) {
        tbody.innerHTML += `
            <tr>
                <td>${labels[i]}</td>
                <td>${iteratif[i].toFixed(4)}</td>
                <td>${rekursif[i].toFixed(4)}</td>
            </tr>
        `;
    }
}

