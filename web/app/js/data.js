//#sourceURL=data.js

const allCharts = {
    strom: null,
    wasserdampf: null,
    druckluft: null,
    vakuum: null,
    cost: null,
}

const chartTypes = ['strom', 'wasserdampf', 'druckluft', 'vakuum'];


const formatDate = (date) => {
    return (
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds() +
        '.' +
        date.getMilliseconds()
    )
}

const getData = async (type) => {
    const res = await fetch('http://localhost:3001/api/data/' + type, {
        method: 'GET',
    })
    const data = await res.json()

    let sensor_id = data[0].sensor_id_fk
    let values = []
    let labels = []

    for (const d of data) {
        values.push(d.value)
        labels.push(formatDate(new Date(d.timestamp)))
    }
    values = values.reverse()
    labels = labels.reverse()

    return { values, labels, sensor_id }
}



const updateGraph = async (chart, type) => {
    const data = await getData(type);
    updateGraphValues(chart, data.values, data.labels);
}

const updateGraphValues = async (chart, data, labels) => {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

const getCost = async type => {
    const costData = await fetch('/api/cost/' + type, {
        method: 'GET',
    })
    const cost = await costData.json()
    return cost.cost
}

const updateCost = (type, newCost) => {
    return fetch('/api/cost', {
        method: 'PUT',
        body: JSON.stringify({ type: type, cost: newCost }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

const initialRender = async () => {
    let costData = []
    for (let i = 0; i < 10; ++i) costData.push(0)

    for (const type of chartTypes) {
        allCharts[type] = await getChart(type)
        const dataArray = allCharts[type].data.datasets[0].data
        const cost = await getCost(type)

        for (let i = 0; i < dataArray.length; ++i) {
            costData[i] += cost * dataArray[i]
        }
    }

    const labels = allCharts['strom'].data.labels;

    allCharts['cost'] = new Chart($('#costGraph'), getChartOptions(costData, labels, 'Cent'));
}

const updateCostGraph = async () => {
    let costData = []
    for (let i = 0; i < 10; ++i) costData.push(0)

    for (const type of chartTypes) {
        const dataArray = allCharts[type].data.datasets[0].data
        const cost = await getCost(type)

        for (let i = 0; i < dataArray.length; ++i) {
            costData[i] += cost * dataArray[i]
        }
    }
    const labels = allCharts['strom'].data.labels;
    updateGraphValues(allCharts['cost'], costData, labels);
}

const getChart = async (type) => {
    const data = await getData(type)
    return new Chart(
        $('#' + type + 'Graph'),
        getChartOptions(data.values, data.labels, 'Kubikmeter')
    )
}

let initial = true
const render = async () => {
    if (initial) {
        await initialRender()
        initial = false
    } else {
        for (const type of chartTypes) {
            await updateGraph(allCharts[type], type)
        }
        await updateCostGraph()
    }
}

const createGraphPopup = async (type) => {
    const $popupContainer = $('<div>').attr({ class: 'popupOverlay' })
    const $popup = $('<div>').attr({ class: 'popup' })
    const $header = $('<div>').attr({ class: 'header' })
    const $content = $('<div>').attr({ class: 'content' })
    const $canvas = $('<canvas>').attr({ id: 'graph-' + type + '-popup' })
    $content.append(
        $('<h2>').text(type[0].toUpperCase() + type.slice(1, type.length))
    )
    const data = await getData(type)

    $popupContainer.append($popup)
    $popup.append($header).append($content)
    $content.append($canvas)
    $('body').append($popupContainer)

    const cost = await getCost(type)

    $content.append(
        $('<p>')
            .text('Derzeitige Kosten pro Einheit: ' + cost + "c")
            .attr({ class: 'costText' })
    )

    $content.append(
        $('<input>').attr({
            placeholder: 'Ändere die Kosten',
            type: 'number',
            id: 'costPerUnitInput',
        })
    );
    


    $content.append(
        $('<button>')
            .text('Enter')
            .on('click', () => {
                const costInput = $('#costPerUnitInput').val()
                if (isNaN(costInput)) {
                    alert('Die Kosten müssen eine Zahl sein!')
                    return
                }

                updateCost(type, costInput)
                    .then(() => {
                        alert('Die Kosten wurden erfolgreich geändert')
                        $('.costText').text("Derzeitige Kosten pro Einheit: " + costInput + "c");
                    })
                    .catch((err) => {
                        alert(
                            'Die Kosten konnten nicht verändert werden: ',
                            err
                        )
                    })
            })
    )

    const chart = new Chart(
        $('#graph-' + type + '-popup'),
        getChartOptions(data.values, data.labels)
    )

    const update = () => {
        updateGraph(chart, type)
    }

    const refreshInterval = setInterval(update, 1000)
    $header.append(
        $('<img>')
            .attr({ src: 'img/x.svg' })
            .on('click', () => {
                $('.popupOverlay').remove()
                clearInterval(refreshInterval)
            })
    )
}

$(async () => {
    setInterval(render, 1000)

    for (const type of chartTypes) {
        $('#' + type + 'Graph').on('click', (ev) => {
            createGraphPopup(type)
        });
    }
})
