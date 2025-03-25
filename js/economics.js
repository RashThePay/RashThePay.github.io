function renderEconomics(data) {
    let array = [0,1,2,3,4,5,6,7,8,9,10,11,12]
    let current = Math.floor(((data.economy.prices*100)+100)/13)
    console.log(current)
    document.querySelector("#economy-data").innerHTML = `<div class="data-row data-bg" style="overflow:hidden">
    <div class="data-label"><span>${icon("money (2)", "md")}قیمت‌ها</span></div>
    <div style="display:flex; justify-content:center; position: relative; margin: 25px 0px">${array.map((v,i)=>(`<div data-title="${v==6? "↑قیمت معیار": v+1 == current && current != 7 ? "↓"+formatNumber(data.economy.prices)+(v>6 ? " گران‌تر":" ارزان‌تر"):""}" class="price ${v+1==current? "price-current": v == 6 ? "price-mid":""}"><img width="${25}" height="${ 25}"  src="./icons/coins/coin_icon_${String(i+1).padStart(2,"0")}.png" /></div>`)).join("")}</div>
    </div>
    <div class="data-row data-bg">
     <div class="data-label"><span>${icon("event_trade", "md")}عرضه و تقاضا</span></div>
    <canvas id="supply-demand" height="100" ></canvas>
    </div>
    <div class="data-row data-bg">
     <div class="data-label"><span>${icon("budget_btn", "md")}بودجه دولت</span></div>
<canvas id="budget" ></canvas>
</div>
        `;
       
    createSupplyDemand(data)
    createBudget(data)
}

function createSupplyDemand(data) {
    const chart = new Chart(document.querySelector("#supply-demand"),{
        type: 'bar',
        data: {
            labels: [""],
            datasets: [{
                label:"تولید داخلی",
                data: [data.economy.production],
                backgroundColor: ["#6bbd84"]
            },{
                label:"نیاز داخلی",
                data: [ -data.economy.needs],
                backgroundColor: ["#cd7474"]
            },{
                label:"واردات خارجی",
                data: [ data.economy.imports],
                backgroundColor: ["#96ef96"]
            },{
                label:"صادرات خارجی",
                data: [ -data.economy.exports],
                backgroundColor: ["#ef9696"]
            },
            
        
        ]
        },
        options: {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            scales: {
                y: {
                    title: {
                        display: false
                    },
                    stacked: true,
                },
                x: {
                    title: {
                        display: false
                    },
                    stacked: true,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                    text:"عرضه و تقاضا"
                }
            }
            
        },
    });
}
function createBudget(data) {
    const chart = new Chart(document.querySelector("#budget"),{
        type: 'bar',
        data: {
            labels: [""],
            datasets: [{
                label:"صنایع ملی",
                data: [data.budget.production],
                backgroundColor: ['rgb(255, 159, 64)']
            },{
                label:"سرمایه‌گذاری",
                data: [ data.budget.investment],
                backgroundColor: ['rgb(153, 102, 255)']
            },{
                label:"تعرفه‌ها",
                data: [ data.budget.tariffs],
                backgroundColor: ['rgb(75, 192, 192)']
            },
            {
                label:"مالیات",
                data: [ data.budget.taxes],
                backgroundColor: ['rgb(255, 205, 86)']
            },
            {
                label:"بودجه از قبل",
                data: [ data.budget.previous],
                backgroundColor: ['rgb(201, 203, 207)']
            },
            {
                label:"هزینه‌های دولتی",
                data: [ -data.budget.expenditure],
                backgroundColor: ['rgb(216, 133, 122)']
            },
            {
                label:"بودجه کنونی",
                data: [ data.budget.total],
                backgroundColor: ['rgb(122, 216, 130)']
            },
        ]
        },
        options: {
            indexAxis: "x",
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            scales: {
            },
            responsive: true,
            plugins: {
                legend: {
                    rtl: true,
                    position: 'top',
                },
                title: {
                    display: false,
                    text: "بودجه دولتی"
                }
            }
            
        },
    });
}