function createBarChart() {
    const people = data.people.sort((a, b) => (b.population - a.population))
    const ctx = document.getElementById('population-chart');
    Chart.defaults.font.family = "Vazir";
    new Chart(ctx, {
        type: 'doughnut',

        data: {
            labels: people.map(p => p.name),
            datasets: [{
                label: 'جمعیت',
                data: people.map(p => p.population),
                backgroundColor: colors,
                borderColor: '#6b5d4d',
                borderWidth: 1
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: { display: false },
            }
        }
    });

}