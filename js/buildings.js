function renderBuildings(data) {
    const farsi = {
        "factory": "کارخانه",
    "farm": "مزرعه",
    "mine": "معدن",
    "university": "دانشگاه",
    "office": "اداره دولتی",
    "barracks":"پادگان",
    "manors": "عمارت",
    "company": "بنگاه",
    "city": "شهر",
     "village": "روستا",
     "production": "تولید",
     "level": "سطح",
     "profit": "سود",
     "private": "خصوصی",
     "wages": "دستمزد",
     "professional": "حرفه‌ای",
     "secular": "سکولار",
    "next": "بعدی",
    }

    let text = "";
    let array = Object.entries(data.buildings);
    for (const item of array) {
        text += `<div class="data-row building" style="display: flex">
            ${icon("buildings/"+item[0], "xl")}
            <div style="margin-inline-start: 10px">
            <div class="data-label" style="min-width: max-content"><span>${farsi[item[0]]}</span></div>
            <div class="data-value">${new Intl.NumberFormat('fa-IR').format((item[1].total).toFixed(0))}</div>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 5px; justify-content: end; width: 100%;">
                ${
                    Object.entries(item[1]).map(([key, value])=> {
                        if (key == "total" || key == "methods") return null;
                        let v;
                        if (typeof value == "number") {
                            v = formatNumber(value);
                        }
                        else if (typeof value == "object") {
                            v = formatNumber(Array.from(value).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
                        } else if (typeof value == "boolean") {
                            if (value) {
                                return (
                                    `<div style="border-radius: 10px; min-width: 45px; padding: 5px; background-color: ${stringToColorHSL(key)} ">
                                    <div> ${farsi[key]}</div>
                                    </div>
                                    `
                                )
                            } else return null;
                        }
                        else v = value;
                        
                        return (
                            `<div style="border-radius: 10px;min-width: 45px; padding: 5px; background-color: ${stringToColorHSL(key)} ">
                            <div style="font-size: small;"> ${farsi[key]}</div>
                            <div dir="ltr"><b>${v}</b></div>
                            </div>
                            `
                        )
                    }).join("")
                }

            </div>
        </div>
        `
    } 
    document.querySelector("#buildings-data").innerHTML = text
}