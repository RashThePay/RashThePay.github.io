function renderPops(data) {

    const people = data.people;

    const container = document.querySelector("#population-data");
    container.innerHTML = ""; // Clear previous content
    people.forEach(person => {
        const card = document.createElement('div');
        card.className = 'card';

        const maxPopulation = Math.max(...people.map(p => Math.log10(p.population/1000)));
        const maxWealth = Math.max(...people.map(p => p.wealth));
        const maxHappiness = Math.max(...people.map(p => Math.abs(p.happiness)));
        const maxInfluence = Math.max(...people.map(p => p.influence));

        card.innerHTML = `
            <img src="./icons/pops/${person.name}.png" class="icon" alt="${person.name}">
            <div class="info">
                <div class="name">${person.name}</div>
                <div class="details">
                    <div>جمعیت: <span class="value">${person.population.toLocaleString("fa-IR")} نفر</span></div>
                    <div class="bar population" style="width: ${(Math.log10(person.population/1000) / maxPopulation) * 100}%"></div>
                    <div>ثروت: <span class="value">${person.wealth.toLocaleString("fa-IR")}</span></div>
                    <div class="bar wealth" style="width: ${(person.wealth / maxWealth) * 100}%"></div>
                    <div>رضایت: <span class="value">${person.happiness.toLocaleString("fa-IR", {maximumFractionDigits: 1})}${person.happiness>0? "+":""}</span></div>
                    <div style="display:flex; width: 100%;">
                    <div class=" positive" style="height:8px; ${person.happiness>0? "border-left:1px black solid;":""} width: ${person.happiness>0?50:50+((person.happiness) / (maxHappiness)) * 50}%"></div>
                    <div class="bar happiness" style="border-radius:5px 0 0 5px;width: ${((person.happiness) / (maxHappiness)) * 50}%"></div>
                    <div class="bar unhappiness" style="border-radius: 0 5px 5px 0; width: ${((-person.happiness) / (maxHappiness)) * 50}%"></div>
                    <div class=" negative" style="height:8px; ${person.happiness<0? "border-right:1px black solid;":""} width: ${person.happiness<0?50:50-((person.happiness) / (maxHappiness)) * 50}%"></div>
                    </div>
                    <div>تاثیرگذاری: <span class="value">${formatNumber(person.influence)}</span></div>
                    <div class="bar influence" style="width: ${(person.influence / maxInfluence) * 100}%"></div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
        
}