function renderGovernment(data) {
    document.querySelector("#year").innerHTML = "<div>"+new Date(Date.parse(data.year)+ new Date(Date.now()).getHours()*1296000000).toLocaleDateString("fa-IR", {dateStyle: "full", calendar:"gregory"}) + " میلادی</div><div>مصادف با " +new Date(Date.parse(data.year)+ new Date(Date.now()).getHours()*1296000000).toLocaleDateString("fa-IR", {dateStyle: "long", calendar:"persian"})+" خورشیدی</div>"
    const gov = data.government;
    let html = `
        <div style="display: flex; gap: 10px;">
            <div class="data-row data-bg" style="flex: 1">
            <div class="data-label">
                <span>
                نوع حکومت
                </span>
            </div>
            <div class="data-value">
                <img width="${30}" height="${30}" src="./laws/${gov.type}.png" />
                ${gov.type}
            </div>
        </div>
        <div class="data-row data-bg" style="flex: 1">
            <div class="data-label">
            <span>
                گروه حاکم
                </span>
            </div>
            <div class="data-value">
                ${icon(gov.ruler, "lg")}
                ${gov.ruler}
            </div>
        </div>
        </div>
        <div class="data-row data-bg">
            <div class="data-label"><span>مشروعیت </span> <div class="data-value" style="float:left">${formatNumber(gov.legitimacy)}</div></div>
             
        ${createProgressBar(gov.legitimacy * 100, "#5c3f8d")}
            </div>
      <div class="data-row data-bg">
            <div class="data-label"><span>قدرت نظامی  </span>
                <div class="data-value" style="float:left">${formatNumber(gov.military)}</div>
            </div>
            ${createTiles(gov.military / 10, "battalions")}
        </div>
        <div class="data-row data-bg">
            <div class="data-label"><span>امنیت </span> <div class="data-value" style="float:left">${formatNumber(gov.security)}</div></div>
             
        ${createProgressBar(gov.security * 100, "#708d3f")}
            </div>
         <div class="data-row data-bg">
            <div class="data-label"><span>طرفداران</span>
                <div class="data-value" style="float:left">${formatNumber(gov.loyals)} نفر </div>
              </div>
             ${createTiles(gov.loyals / 50000, "population_loyalist")}
        </div>
         <div class="data-row data-bg">
            <div class="data-label"><span>مخالفان </span>
                <div class="data-value" style="float:left">${formatNumber(gov.radicals)} نفر </div>
             </div>
               ${createTiles(gov.radicals / 50000, "population_radical")}
        </div>
    `;
    document.getElementById('government-data').innerHTML = html;
}