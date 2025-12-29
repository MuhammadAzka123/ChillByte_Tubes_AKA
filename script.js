    const legendX = padding + 10;
    const legendY = padding - 25;

    // Iteratif
    ctx.fillStyle = "#2563eb";
    ctx.fillRect(legendX, legendY, 12, 12);
    ctx.fillStyle = "#111827";
    ctx.fillText("Iteratif", legendX + 18, legendY + 11);

    // Rekursif
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(legendX + 90, legendY, 12, 12);
    ctx.fillStyle = "#111827";
    ctx.fillText("Rekursif", legendX + 108, legendY + 11);
