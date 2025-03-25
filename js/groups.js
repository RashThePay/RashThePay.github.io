function showGroup(index, data) {
    let group = data.groups[index]
    let chart = document.querySelector(".groups-chart-container");
    chart.style="height: 50px; width:50px; justify-self: unset;"
    
    let imgcontainer = document.querySelector(".group-image");
    imgcontainer.addEventListener("click", function (e){
        chart.style=""
        imgcontainer.innerHTML = ""
    })
    chart.addEventListener("click", function (e){
        chart.style=""
        imgcontainer.innerHTML = ""
    })
    let img = document.createElement("img");
    img.src = "./images/"+group.name+".jpg";
    imgcontainer.appendChild(img)
    document.querySelector("#group-contents").innerHTML = `
            <div class="data-row" style="display: flex; justify-content:space-between;">
            <div class="data-value">${icon(group.name, "lg")}${group.name}</div>
            <div style="display: inline; color: #01010188; border-radius: 10px; padding: 2px 5px ;background-color:${group.side == "اپوزیسیون"? "#cd7474": group.side == "حامی"? "#6bbd84": "#6d9de5"}">${group.side}</div>
            </div>
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

function renderPoliticalGroups(data) {
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
                showGroup(index, data)
            },
            plugins: {
                legend: { display: false },
            }
        }
    });
}