function renderTech(data) {
    document.querySelector("#tech-data").innerHTML = `<div class="data-row data-bg" style="flex: 1">
            <div class="data-label">
                <span>${icon("tech_btn", "lg")}
                نوآوری
                </span>
            </div>
            <div class="data-value" style="justify-content: space-between; align-items: end;">
                
                <div class="data-value" style="float:left">${new Intl.NumberFormat('fa-IR').format((data.academic.innovation).toFixed(2))}</div>
               <div style="font-size: small; color: #333300; font-weight: normal;"> با این سرعت ${Math.ceil((100-data.academic.progress*100)/data.academic.innovation).toLocaleString("fa-IR")} سال دیگر به مدرنیته می‌رسیم.</div>
                </div>
             
       
            </div><div class="data-row data-bg">
            <div class="data-label"><span>${icon("rail_transport", "md")}پیشرفت </span> <div class="data-value" style="float:left">${formatNumber(data.academic.progress)}</div></div>
             
        ${createProgressBar(data.academic.progress * 100, "#8bab34")}
            </div>
            <div class="data-row data-bg">
            <div class="data-label"><span>${icon("literacy", "md")}سواد عمومی </span> <div class="data-value" style="float:left">${(data.academic.literacy*100).toLocaleString('fa-IR')}%</div></div>
             
        ${createProgressBar(data.academic.literacy * 100, "#ab9b34")}
            </div>
            <div style="display: flex; gap: 10px;">
            <div class="data-row data-bg" style="flex: 1">
            <div class="data-label">
                <span>
                دسترسی به آموزش
                </span>
            </div>
            <div class="data-value">
                ${formatNumber(data.academic.access)}
            </div>
        </div>
        <div class="data-row data-bg" style="flex: 1">
            <div class="data-label">
            <span>
                سطح آموزش
                </span>
            </div>
            <div class="data-value">
                ${data.academic.education.toLocaleString("fa-IR")}
            </div>
        </div>
        </div>
            `
}