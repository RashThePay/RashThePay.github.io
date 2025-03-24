function formatNumber(num) {
    if (num < 1.001) {
        return new Intl.NumberFormat('fa-IR').format((num * 100).toFixed(0),) + "%";
    } else {
        return new Intl.NumberFormat('fa-IR').format((num).toFixed(0))
    }
}
function createProgressBar(percent, color) {
    // محدودیت درصد بین 0 تا 100
    const clampedPercent = Math.min(Math.max(percent, 0), 100);

    return `
    
<div class="progress-container">
    <div class="progress-bar" style="width: ${clampedPercent}%; background-color: ${color}">
    </div>
</div>
`;
}
function createTiles(value, image) {
    let array = [];
    for (let i = 0; i < Math.floor(value); i++) {
        array.push(`<div style="height: 25px; width: 25px; background-image: url(./icons/${image}.png); background-size: contain;"></div>`)
    }
    return `<div style="display: flex; justify-content: end;flex-direction: row-reverse; width: 100%">${array.join("")}<div style="height: 25px; width: ${(value % 1) * 25}px; background-image: url(./icons/${image}.png); background-size: cover;"></div></div>`
}
function icon(name, size) {
    return `<img width="${size == "lg" ? 30 : size=="sm"? 15 : 20}" height="${size == "lg" ? 30 : size=="sm"? 15 : 20}" src="./icons/${name}.png" />`
}