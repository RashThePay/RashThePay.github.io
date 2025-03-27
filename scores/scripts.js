// Constants for political groups
const GROUPS = {
    LORDS: "اربابان",
    CLERICS: "مذهبیون",
    MILITARY: "نیروهای مسلح",
    PEASANTS: "روستاییان",
    CAPITALISTS: "سرمایه‌داران",
    PETTY_BOURGEOISIE: "خرده‌بورژوازی",
    INTELLECTUALS: "روشنفکران",
    WORKERS: "اتحادیه کارگران"
};

// Function to calculate scores based on rounds data
function calculateGroupScores(roundsData) {
    // Initialize scores and tracking objects
    const scores = {
        [GROUPS.LORDS]: { clout: 0, special: 0, laws: 0, events: 0 },
        [GROUPS.CLERICS]: { clout: 0, special: 0, laws: 0, events: 0 },
        [GROUPS.MILITARY]: { clout: 0, special: 0, laws: 0, events: 0 },
        [GROUPS.PEASANTS]: { clout: 0, special: 0, laws: 0, events: 0 },
        [GROUPS.CAPITALISTS]: { clout: 0, special: 0, laws: 0, events: 0 },
        [GROUPS.PETTY_BOURGEOISIE]: { clout: 0, special: 0, laws: 0, events: 0 },
        [GROUPS.INTELLECTUALS]: { clout: 0, special: 0, laws: 0, events: 0 },
        [GROUPS.WORKERS]: { clout: 0, special: 0, laws: 0, events: 0 }
    };

    const lawDuration = {}; // Track how many rounds each law has been active
    const specialEvents = { // Track special events that give bonus points
        lordsReturnToMonarchy: false,
        clericsReligiousRevolution: false,
        militaryPowerSeizure: false,
        peasantsMultipleGovs: new Set(),
        pettyAllRuled: new Set(),
        workersRedRevolution: false,
        intellectualsEarlyModern: false,
        tradersMaxWealth: 0, 
    };

    // Process each round
    roundsData.forEach((round, index) => {
        // Update law duration (skip first 3 rounds for initial laws)
        round.laws.forEach((law) => {
            if (!lawDuration[law.enacted]) {
                lawDuration[law.enacted] = 0;
            }
            if (index >= 3 || !isInitialLaw(law.enacted)) {
                lawDuration[law.enacted]++;
            }
            console.log(round.year, law.enacted, lawDuration[law.enacted]);
        });
        // Track special events
        specialEvents.peasantsMultipleGovs.add(round.government.type);
        specialEvents.pettyAllRuled.add(round.government.ruler);
        if (round.government.type === "پادشاهی" && index > 0 && roundsData[index - 1].government.type !== "پادشاهی") {
            specialEvents.lordsReturnToMonarchy = true;
        }
        if (round.government.type === "دین‌سالاری" && index > 0 && roundsData[index - 1].government.type !== "دین‌سالاری") {
            specialEvents.clericsReligiousRevolution = true;
        }
        if (round.government.type === "دیکتاتوری" && round.government.ruler === GROUPS.MILITARY) {
            specialEvents.militaryPowerSeizure = true;
        }
        if (round.academic.progress >= 100 && index < 20) {
            specialEvents.intellectualsEarlyModern = true;
        }
        if (round.government.type === "شورایی" && index > 0 && roundsData[index - 1].government.type !== "شورایی") {
            specialEvents.workersRedRevolution = true;
        }
        specialEvents.tradersMaxWealth = Math.max(specialEvents.tradersMaxWealth, round.people.find(p=>p.name=="تاجران" ).wealth);

    });

    // Calculate base scores from final influence
    const finalRound = roundsData[roundsData.length - 1];
    finalRound.groups.forEach((group) => {
        scores[group.name].clout = Math.min(Math.floor(group.clout * 400), 100); // 4 points per 1% influence, max 100
    });

    // Calculate special marker scores
    scores[GROUPS.LORDS].special += Math.min(Math.floor(finalRound.groups.find(g => g.name == GROUPS.LORDS).special.value * 50), 50);
    scores[GROUPS.CLERICS].special += Math.min(Math.floor(finalRound.groups.find(g => g.name == GROUPS.CLERICS).special.value * 50), 50);
    scores[GROUPS.MILITARY].special += Math.min(Math.floor(finalRound.government.military / 5), 50);
    scores[GROUPS.PEASANTS].special += Math.min(Math.floor((finalRound.people.find(p => p.name == "رعایا").population + finalRound.people.find(p => p.name == "کشاورزان").population) / 50000), 50);
    scores[GROUPS.CAPITALISTS].special += Math.min(finalRound.buildings.company.total, 50);
    scores[GROUPS.PETTY_BOURGEOISIE].special += Math.min(Math.max(finalRound.groups.find(g => g.name == GROUPS.PETTY_BOURGEOISIE).special.value * 100 - 50, 0), 50);
    scores[GROUPS.INTELLECTUALS].special += Math.min(finalRound.academic.literacy * 100, 50);
    scores[GROUPS.WORKERS].special += Math.min(Math.floor(finalRound.groups.find(g => g.name == GROUPS.WORKERS).special.value * 100 / 2), 50);

    // Calculate law-based scores
    scores[GROUPS.LORDS].laws += calculateLawScore(lawDuration, {
        "پادشاهی": 5, "مشروطه": 3, "زمین‌داری فئودالی": 5, "زارع مستاجر": 3,
        "سربازگیری": 3, "دیوان‌سالاری موروثی": 3, "حق رای بر اساس مالکیت": 5, "الیگارشی": 3
    });
    scores[GROUPS.CLERICS].laws += calculateLawScore(lawDuration, {
        "دین رسمی": 5, "آزادی عقیده": 3, "مدارس مذهبی": 3, "پادشاهی": 5,
        "دین‌سالاری": 3, "سانسور عقاید": 5, "ممنوعیت اعتراض": 3, "سرپرستی قانونی": 3
    });
    scores[GROUPS.MILITARY].laws += calculateLawScore(lawDuration, {
        "ارتش حرفه‌ای": 5, "خدمت سربازی": 3, "پلیس اختصاصی": 3, "پلیس نظامی": 5,
        "گارد ملی": 5, "پلیس مخفی": 3, "مالیات سرانه": 3, "ممنوعیت اعتراض": 3
    });
    scores[GROUPS.PEASANTS].laws += calculateLawScore(lawDuration, {
        "اسکان کشاورزان": 5, "کشاورزی اشتراکی": 3, "اقتصاد زراعت‌گرا": 5, "ممنوعیت صنعت": 3,
        "گارد ملی": 5, "مالیات بر مصرف": 3, "انزواگرایی": 3, "حمایت داخلی": 3
    });
    scores[GROUPS.CAPITALISTS].laws += calculateLawScore(lawDuration, {
        "اقتصاد آزاد": 5, "اقتصاد مداخله‌گرا": 3, "تجارت آزاد": 5, "سوداگرایی": 3,
        "مالیات سرانه": 5, "مالیات بر زمین": 3, "فقدان حقوق": 3, "مدارس خصوصی": 3
    });
    scores[GROUPS.PETTY_BOURGEOISIE].laws += calculateLawScore(lawDuration, {
        "دیوان‌سالاری انتخابی": 5, "دیوان‌سالاری انتصابی": 3, "مالیات تناسبی": 5,
        "مالیات سرانه": 3, "گارد ملی": 5, "پلیس مخفی": 3, "پلیس اختصاصی": 5,
        "پلیس نظامی": 3, "خودکامگی": 3, "دین‌سالاری": 3
    });
    scores[GROUPS.INTELLECTUALS].laws += calculateLawScore(lawDuration, {
        "جدایی کامل": 5, "آزادی عقیده": 3, "حق رای مشروط": 3, "حق رای همگانی": 5,
        "حق رای زنان": 5, "حق مالکیت زنان": 3, "حق کار زنان": 3, "حمایت از آزادی بیان": 5,
        "حق تجمع": 3, "جمهوری": 3, "آزادی‌ تضمینی": 3
    });
    scores[GROUPS.WORKERS].laws += calculateLawScore(lawDuration, {
        "مالکیت مشترک": 5, "اقتصاد دستوری": 3, "حمایت از آزادی بیان": 5, "حق تجمع": 3,
        "حق رای همگانی": 3, "حقوق حمایتی": 5, "نهادهای نظارتی": 3, "مالیات تصاعدی": 5,
        "مالیات تناسبی": 3
    });

    // Add special event bonuses
    if (specialEvents.lordsReturnToMonarchy) scores[GROUPS.LORDS].events += 50;
    if (specialEvents.clericsReligiousRevolution) scores[GROUPS.CLERICS].events += 50;
    if (specialEvents.militaryPowerSeizure) scores[GROUPS.MILITARY].events += 50;
    if (specialEvents.peasantsMultipleGovs.size >= 3) scores[GROUPS.PEASANTS].events += 50;
    if (specialEvents.pettyAllRuled.size > 2) scores[GROUPS.PETTY_BOURGEOISIE].events += Math.min(50, (specialEvents.pettyAllRuled.size - 2) * 5);
    if (specialEvents.intellectualsEarlyModern) scores[GROUPS.INTELLECTUALS].events += 50;
    if (specialEvents.workersRedRevolution) scores[GROUPS.WORKERS].events += 50;

    // Add capitalist merchant wealth bonus
    if (specialEvents.tradersMaxWealth > 40) scores[GROUPS.CAPITALISTS].events += Math.min(50, specialEvents.tradersMaxWealth - 40);

    return scores;
}

// Helper function to calculate law-based scores
function calculateLawScore(lawDuration, lawPoints) {
    let score = 0;
    Object.entries(lawPoints).forEach(([law, points]) => {
        score += (lawDuration[law] || 0) * points;
    });
    return score;
}

// Helper function to check if a law is an initial law
function isInitialLaw(lawName) {
    const initialLaws = ["پادشاهی",
        "خودکامگی", "سوداگرایی", "مالیات بر مصرف", "زمین‌داری فئودالی", "دین رسمی", "دیوان‌سالاری موروثی",
        "سربازگیری", "عدم نظارت", "اقتصاد معیشتی",
        "فقدان نیروی انتظامی", "فقدان سیستم آموزشی", "سانسور عقاید",
        "فقدان حقوق", "سرپرستی قانونی"
    ];
    return initialLaws.includes(lawName);
}

// Example usage
const rounds = [...history, data]
const scores = calculateGroupScores(rounds);
const groupScores = Object.entries(scores).map(([group, data]) => ({
    name: group,
    total: data.clout + data.special + data.laws + data.events,
    ...data
})).sort((a, b) => b.total - a.total);
const desc = {
    "اربابان": {
        "clout": "۴ امتیاز به ازای هر ۱٪ نفوذ در راند آخر، تا سقف ۱۰۰",
        "special": "۱ امتیاز به ازای هر ۲٪ اعتبار اشرافی، تا سقف ۵۰",
        "laws": {
            "پادشاهی": 5,
            "مشروطه": 3,
            "زمین‌داری فئودالی": 5,
            "زارع مستاجر": 3,
            "سربازگیری": 3,
            "دیوان‌سالاری موروثی": 3,
            "حق رای بر اساس مالکیت": 5,
            "الیگارشی": 3
        },
        "events": "۵۰ امتیاز در صورت بازگشت به پادشاهی"
    },
    "مذهبیون": {
        "clout": "۴ امتیاز به ازای هر ۱٪ نفوذ در راند آخر، تا سقف ۱۰۰",
        "special": "۱ امتیاز به ازای هر ۲٪ تعصب دینی، تا سقف ۵۰",
        "laws": {
            "دین رسمی": 5,
            "آزادی عقیده": 3,
            "مدارس مذهبی": 3,
            "پادشاهی": 5,
            "دین‌سالاری": 3,
            "سانسور عقاید": 5,
            "ممنوعیت اعتراض": 3,
            "سرپرستی قانونی": 3
        },
        "events": "۵۰ امتیاز در صورت انقلاب مذهبی"
    },
    "نیروهای مسلح": {
        "clout": "۴ امتیاز به ازای هر ۱٪ نفوذ در راند آخر، تا سقف ۱۰۰",
        "special": "۱ امتیاز به ازای هر ۵ واحد قدرت نظامی، تا سقف ۵۰",
        "laws": {
            "ارتش حرفه‌ای": 5,
            "خدمت سربازی": 3,
            "پلیس اختصاصی": 3,
            "پلیس نظامی": 5,
            "گارد ملی": 5,
            "پلیس مخفی": 3,
            "مالیات سرانه": 3,
            "ممنوعیت اعتراض": 3
        },
        "events": "۵۰ امتیاز در صورت تصرف قدرت"
    },
    "روستاییان": {
        "clout": "۴ امتیاز به ازای هر ۱٪ نفوذ در راند آخر، تا سقف ۱۰۰",
        "special": "۱ امتیاز به ازای هر ۵۰ هزار نفر رعیت یا کشاورز، تا سقف ۵۰",
        "laws": {
            "اسکان کشاورزان": 5,
            "کشاورزی اشتراکی": 3,
            "زراعت‌گرا": 5,
            "ممنوعیت صنعت": 3,
            "گارد ملی": 5,
            "مالیات بر مصرف": 3,
            "انزواگرایی": 3,
            "حمایت داخلی": 3
        },
        "events": "۵۰ امتیاز اگر حداقل ۳ نوع حکومت برقرار شده باشد"
    },
    "سرمایه‌داران": {
        "clout": "۴ امتیاز به ازای هر ۱٪ نفوذ در راند آخر، تا سقف ۱۰۰",
        "special": "۱ امتیاز به ازای هر بنگاه، تا سقف ۵۰",
        "laws": {
            "اقتصاد آزاد": 5,
            "مداخله‌گرا": 3,
            "تجارت آزاد": 5,
            "سوداگرایی": 3,
            "مالیات سرانه": 5,
            "مالیات بر زمین": 3,
            "بدون قانون": 3,
            "مدارس خصوصی": 3
        },
        "events": "۱ امتیاز به ازای هر واحد بیشینه ثروت تاجران در طول بازی منهای ۴۰"
    },
    "خرده‌بورژوازی": {
        "clout": "۴ امتیاز به ازای هر ۱٪ نفوذ در راند آخر، تا سقف ۱۰۰",
        "special": "۱ امتیاز به ازای هر ۱٪ تعادل اجتماعی بالای ۵۰٪، تا سقف ۵۰",
        "laws": {
            "دیوان‌سالاری انتخابی": 5,
            "دیوان‌سالاری انتصابی": 3,
            "مالیات تناسبی": 5,
            "مالیات سرانه": 3,
            "گارد ملی": 5,
            "پلیس مخفی": 3,
            "پلیس اختصاصی": 5,
            "پلیس نظامی": 3,
            "خودکامگی": 3,
            "دین‌سالاری": 3
        },
        "events": "۱۰ امتیاز به ازای هر گروهی که در بازی حاکم شده‌ (به جز دو گروه حاکم اول) تا ۵۰ امتیاز."
    },
    "روشنفکران": {
        "clout": "۴ امتیاز به ازای هر ۱٪ نفوذ در راند آخر، تا سقف ۱۰۰",
        "special": "۱ امتیاز به ازای هر ۱٪ نرخ سواد عمومی، تا سقف ۵۰",
        "laws": {
            "جدایی کامل": 5,
            "آزادی عقیده": 3,
            "حق رای مشروط": 3,
            "حق رای همگانی": 5,
            "حق رای زنان": 5,
            "حق مالکیت زنان": 3,
            "حق کار زنان": 3,
            "حمایت از آزادی بیان": 5,
            "حق تجمع": 3,
            "جمهوری": 3,
            "آزادی‌ تضمینی": 3
        },
        "events": "۵۰ امتیاز اگر پیشرفت قبل از ۱۹۰۰ به ۱۰۰٪ برسد"
    },
    "اتحادیه کارگران": {
        "clout": "۴ امتیاز به ازای هر ۱٪ نفوذ در راند آخر، تا سقف ۱۰۰",
        "special": "۱ امتیاز به ازای هر ۲٪ تشکل، تا سقف ۵۰",
        "laws": {
            "مالکیت مشترک": 5,
            "اقتصاد دستوری": 3,
            "حمایت از آزادی بیان": 5,
            "حق تجمع": 3,
            "حق رای همگانی": 3,
            "حقوق حمایتی": 5,
            "نهادهای نظارتی": 3,
            "مالیات تصاعدی": 5,
            "مالیات تناسبی": 3
        },
        "events": "۵۰ امتیاز اگر انقلاب سرخ رخ داده باشد"
    }
}
groupScores.forEach((group) =>
    document.querySelector(".scores-grid").innerHTML += `
    <div class="section">
                    <div class="section-header">
                    <img width="${35}" height="${35}" src="../icons/${group.name}.png" />
                    ${group.name}</div>
                    <div class="data-scores">
                    <div class="data-row data-bg">
                    <div class="data-label"><span>نفوذ</span></div>
                    <div class="data-value">${Math.floor(group.clout).toLocaleString('fa-IR')} امتیاز</div>
                    <div class="data-desc">${desc[group.name].clout}</div>
                    </div>
                    <div class="data-row data-bg">
                    <div class="data-label"><span>نشانگر ویژه</span></div>
                    <div class="data-value">${Math.floor(group.special).toLocaleString('fa-IR')} امتیاز</div>
                    <div class="data-desc">${desc[group.name].special}</div>
                    </div>
                    <div class="data-row data-bg">
                    <div class="data-label"><span>قوانین</span>
                    </div>
                    <div class="data-value">${Math.floor(group.laws).toLocaleString('fa-IR')} امتیاز</div>
                    <div class="data-desc">${Object.entries(desc[group.name].laws).map(([law, points]) => `${law} (${points.toLocaleString("fa-IR")} امتیاز)`).join("، ")}</div>
                    </div>
                    <div class="data-row data-bg">
                    <div class="data-label"><span>رویدادها</span>
                    </div>
                    <div class="data-value">${Math.floor(group.events).toLocaleString('fa-IR')} امتیاز</div>
                    <div class="data-desc">${desc[group.name].events}</div>
                    </div>
                    </div>
                    <div class="data-row data-bg data-total">
                    <div class="data-label"><span>امتیاز کل</span></div><div class="data-value">${Math.floor(group.total).toLocaleString('fa-IR')} امتیاز</div></div>
                    </div>
    `
)