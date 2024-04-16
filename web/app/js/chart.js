

const getChartOptions = (data, labels, y_scale_label) => {
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    borderColor: '#3cba9f',
                    fill: false,
                },
            ],
        },
        options: {
            title: {
                display: false,
            },
            animation: {
                duration: 0,
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: y_scale_label
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Messzyklen"
                    }
                }
            },
        },
    }
}