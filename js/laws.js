function renderLaws(data) {
    const container = document.getElementById('laws-data');
    data.laws.forEach(law => {
        container.innerHTML += `
                <div class="data-row data-bg">
                    <div class="data-label"><span>${law.group}<span></div>
                    <div class="data-value"><img src="./laws/${law.enacted}.png" class="icon" alt="${law.group}">${law.enacted}</div>
                </div>
            `;
    });
}