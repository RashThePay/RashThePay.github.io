function renderPublic(data) {
    const costs = [{
        "name": "سرکوب",
        "authority_cost": 100,
        "budget_cost": 0,
        "administration_cost": 0
    },
    {
        "name": "پشتیبانی",
        "authority_cost": 100,
        "budget_cost": 0,
        "administration_cost": 0
    },
    {
        "name": "حکومت نظامی",
        "authority_cost": 200,
        "budget_cost": 0,
        "administration_cost": 0
    },
    {
        "name": "مقابله با تشکل",
        "authority_cost": 150,
        "budget_cost": 0,
        "administration_cost": 0
    },

    {
        "name": "تجارت خارجی",
        "authority_cost": 0,
        "budget_cost": 0,
        "administration_cost": 50
    },
    {
        "name": "ملی‌سازی",
        "authority_cost": 0,
        "budget_cost": 500,
        "administration_cost": 25
    },
    {
        "name": "خصوصی‌سازی",
        "authority_cost": 0,
        "budget_cost": 0,
        "administration_cost": 0,
        "note": "Only in free economy; generates 500 budget revenue"
    },
    {
        "name": "سرمایه‌گذاری",
        "authority_cost": 0,
        "budget_cost": "variable",
        "administration_cost": 10,
        "note": "Amount chosen by government, returns with at least 15% profit next round"
    },
    {
        "name": "تشویق صنایع",
        "authority_cost": 50,
        "budget_cost": 0,
        "administration_cost": 0
    }
        ,

    {
        "name": "ساخت کارخانه",
        "authority_cost": 0,
        "budget_cost": 200,
        "administration_cost": 15
    },
    {
        "name": "ساخت مزرعه",
        "authority_cost": 0,
        "budget_cost": 50,
        "administration_cost": 15
    },
    {
        "name": "ساخت معدن",
        "authority_cost": 0,
        "budget_cost": 100,
        "administration_cost": 20
    },
    {
        "name": "بهبود جاده‌ها",
        "authority_cost": 0,
        "budget_cost": 200,
        "administration_cost": 8
    },
    {
        "name": "ساخت راه‌آهن",
        "authority_cost": 0,
        "budget_cost": 2500,
        "administration_cost": 70,
        "condition": "Progress at least 45%"
    },
    {
        "name": "ساخت بندر",
        "authority_cost": 0,
        "budget_cost": 3000,
        "administration_cost": 100,
        "condition": "Only once in the game"
    }
        ,

    {
        "name": "ساخت دانشگاه",
        "authority_cost": 0,
        "budget_cost": 100,
        "administration_cost": 15
    },
    {
        "name": "ترویج رشد اجتماعی",
        "authority_cost": 50,
        "budget_cost": 0,
        "administration_cost": 0
    }
        ,

    {
        "name": "ساخت اداره دولتی",
        "authority_cost": 0,
        "budget_cost": 50,
        "administration_cost": 0
    },
    {
        "name": "تنظیم بودجه نظامی",
        "authority_cost": 0,
        "budget_cost": 0,
        "administration_cost": 5,
        "note": "Adjusts military budget and wages (low: -20%, medium: 0%, high: +20%)"
    },
    {
        "name": "تنظیم بودجه اداری",
        "authority_cost": 0,
        "budget_cost": 0,
        "administration_cost": 5,
        "note": "Adjusts administrative budget and wages (low: -20%, medium: 0%, high: +20%)"
    }
        ,

    {
        "name": "ساخت پادگان",
        "authority_cost": 0,
        "budget_cost": 50,
        "administration_cost": 0
    }
    ]
    const container = document.querySelector("#public-data");
    container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 10px">
    <div class="data-row data-bg">
    <div class="data-label"><span>${icon("authority_icon", "md")}اقتدار</span></div>
    <div class="data-value" style="float: left;">${formatNumber(data.public.authority)}</div>
    </div>
     <div class="data-row data-bg">
    <div class="data-label"><span>${icon("bureaucracy_icon", "md")}اداره</span></div>
    <div class="data-value" style="float: left;">${formatNumber(data.public.bureaucracy)}</div>
    </div>
    <div class="data-row data-bg">
    <div class="data-label"><span>سرکوب</span> <span style="float: left; font-size: xx-small" >۱۰۰ اقتدار</span></div>
    <div class="data-value" style="float: left;">${data.public.actions.find(a => a.name == "سرکوب").value.split(", ").map(v => v.length ? icon(v, "lg") : "-").join("")}</div>
    </div>
     <div class="data-row data-bg">
    <div class="data-label"><span>پشتیبانی</span> <span style="float: left; font-size: xx-small" >۱۰۰ اقتدار</span></div>
    <div class="data-value" style="float: left;">${data.public.actions.find(a => a.name == "پشتیبانی").value.split(", ").map(v => v.length ? icon(v, "lg") : "-").join("")}</div>
    </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 10px">
    ${data.public.actions.filter(a => typeof a.value == "boolean").map(a => {
        let cost, cost_text = "";
        let icon_name = "bureaucracy_icon"
        if (a.name != "دارای بندر") {
            cost = costs.find(c => c.name == a.name);
            cost_text = cost.authority_cost ? formatNumber(cost.authority_cost) + " اقتدار" : "";
            cost_text += cost.administration_cost ? formatNumber(cost.administration_cost * data.public.needed_buro) + " اداره" : "";
            cost_text += cost.administration_cost && cost.budget_cost ? "، " : "";
            cost_text += cost.budget_cost ? formatNumber(cost.budget_cost) + " بودجه" : "";
            icon_name = cost.authority_cost ? "authority_icon" : a.name.includes("ساخت") ? "has_construction" : "bureaucracy_icon"
        }
        return (
            `<div class="data-row data-bg">
    <div class="data-label"><div style="display: block">${icon(icon_name, "sm")}${a.name}<span >${cost_text}</span></div>
    <div class="data-value" style="float: left;">${icon(a.value ? "checkbox_greencheck" : "checkbox_simple", "lg")}</div>
    </div></div>`
        )
    }).join("")}
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 10px">
        ${data.public.actions.filter(a => String(a.name).includes("ساخت") && !a.name.includes("زیر") && typeof a.value != "boolean").map(a => {
        let cost = costs.find(c => c.name == a.name);
        !cost && console.log(a.name)
        let cost_text = cost.authority_cost ? formatNumber(cost.authority_cost) + " اقتدار" : "";
        cost_text += cost.administration_cost ? formatNumber(cost.administration_cost * data.public.needed_buro) + " اداره" : "";
        cost_text += cost.administration_cost && cost.budget_cost ? "، " : "";
        cost_text += cost.budget_cost ? formatNumber(cost.budget_cost) + " بودجه" : "";
        let icon_name = cost.authority_cost ? "authority_icon" : a.name.includes("ساخت") ? "has_construction" : "bureaucracy_icon"
        return (`
                <div class="data-row data-bg">
    <div class="data-label"><div style="display: block;">${icon(icon_name, "sm")}${a.name}<span >${cost_text}</span></div>
    <div class="data-value" style="float: left;">${(typeof a.value == "number" ? a.value : 0).toLocaleString("fa")}</div>
    </div></div>
                `)
    }).join("")}
    </div>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); column-gap: 10px">
    <div class="data-row data-bg">
    <div class="data-label"><span>${icon("export_focused", "md")}صادرات</span></div>
    <div class="data-value" style="float: left; width: 100%; justify-content: space-between;">
        <div style="display: block">
            <div style="font-size: xx-small">
            حجم صادرات
            </div>
            ${data.public.actions.find(a => a.name == "حجم صادرات").value}
        </div>
        <div style="display: block">
            <div style="font-size: xx-small">
            تعرفه صادرات
            </div>
            ${data.public.actions.find(a => a.name == "تعرفه صادرات").value * data.public.actions.find(a => a.name == "حجم صادرات").value}
        </div>
        <div style="display: block">
            <div style="font-size: xx-small">
            اداره لازم
            </div>
            ${data.public.actions.find(a => a.name == "اداره هر صادرات").value * data.public.actions.find(a => a.name == "حجم صادرات").value / 100}
        </div>
    </div>
    </div>
     <div class="data-row data-bg">
    <div class="data-label"><span>${icon("import_focused", "md")}واردات</span></div>
    <div class="data-value" style="float: left; width: 100%; justify-content: space-between;">
    <div style="display: block">
            <div style="font-size: xx-small">
            حجم واردات
            </div>
            ${data.public.actions.find(a => a.name == "حجم واردات").value}
        </div>
        <div style="display: block">
            <div style="font-size: xx-small">
            تعرفه واردات
            </div>
            ${data.public.actions.find(a => a.name == "تعرفه واردات").value * data.public.actions.find(a => a.name == "حجم واردات").value}
        </div>
        <div style="display: block">
            <div style="font-size: xx-small">
            اداره لازم
            </div>
            ${data.public.actions.find(a => a.name == "اداره هر واردات").value * data.public.actions.find(a => a.name == "حجم واردات").value / 100}
        </div>
    </div>
    </div>
    </div>
    <div class="data-row data-bg">
    <div class="data-label"><span>زیرساخت</span></div>
    <div class="data-value" style="float: left; width: 100%; justify-content: space-between;">
    <div style="display: block">
            <div style="font-size: xx-small">
            زیرساخت
            </div>
            ${data.public.actions.find(a => a.name == "زیرساخت آزاد").value.toLocaleString("fa-IR")} از ${data.public.actions.find(a => a.name == "زیرساخت کل").value.toLocaleString("fa-IR")}
        </div>
        <div style="display: block">
            <div style="font-size: xx-small">
            سهمیه ساخت‌وساز دولتی
            </div>
            ${data.public.actions.find(a => a.name == "سهمیه دولت").value.toLocaleString("fa-IR")}
        </div>
        <div style="display: block">
            <div style="font-size: xx-small">
            سهمیه ساخت‌وساز خصوصی
            </div>
            ${data.public.actions.find(a => a.name == "سهمیه خصوصی").value.toLocaleString("fa-IR")}
        </div>
    </div>
    </div
    `
}