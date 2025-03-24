function showGroup(index) {
    let group = data.groups[index]
    document.querySelector("#group-contents").innerHTML = `
            <div class="data-value">${icon(group.name, "lg")}${group.name}</div>
            <div style="display: flex; gap: 10px">
             <div class="data-row data-bg">
                <div class="data-label" ><span>${icon("trade_agreement", "md")}نفوذ</span></div><div class="data-value" dir="ltr"> ${formatNumber(group.clout)}</div>
                </div>
                <div class="data-row data-bg">
                <div class="data-label"><span>${icon("humiliation", "md")}قدرت سیاسی</span></div><div class="data-value" dir="ltr"> ${formatNumber(group.power)}</div>
                </div>
            </div>
            <div class="data-row data-bg">
                <div class="data-label"><span>${icon(group.special.name, "md")}${group.special.name}</span></div><div class="data-value" dir="ltr">${formatNumber(group.special.value)}</div>
                 ${(group.special.value<1.1)?createProgressBar(group.special.value*100, ["#927FD4", "#518D6B", "#9D825F", "#84AB5F", "#C78E4F", "#699FCE", "#FCD569", "#B1524E"][index]):""}
                </div>
        `;
}

function renderPoliticalGroups() {
    const ctx = document.getElementById("group-chart");
    Chart.defaults.font.family = "Vazir";
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.groups.map(p => p.name),
            datasets: [{
                label: 'نفوذ%',
                data: data.groups.map(p => (p.clout * 100)),
                rotate: 0,
                backgroundColor: ["#927FD4", "#518D6B", "#9D825F", "#84AB5F", "#C78E4F", "#699FCE", "#FCD569", "#B1524E"],
            }],
        },
        options: {
            animation: {
                animateScale: true
            },
            responsive: true,
            maintainAspectRatio: false,
            onClick: (e) => {
                let index = chart.getActiveElements()[0].index
                showGroup(index)
            },
            plugins: {
                legend: { display: false },
            }
        }
    });
}