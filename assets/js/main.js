const koerperGroesseElement = document.getElementById("koerperGroesse");
const alterElement = document.getElementById("alter");
const gewichtElement = document.getElementById("gewicht");
const mannElement = document.getElementById("mann");
const faktorElement = document.getElementById("aktivitaet");

const grundUmsatzOutput = document.getElementById("grundUmsatzOutput");
const gesamtUmsatzOutput = document.getElementById("gesamtUmsatzOutput");
const calcBtn = document.getElementById("calcBtn");

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (mannElement.checked === true) {
        let grundUmsatz = (gewicht, koerperGroesse, alter) => grundUmsatz = 664.7 + (13.7 * gewicht) + (5 * koerperGroesse) - (6.8 * alter);
        let grundUmsatzValue = grundUmsatz(gewichtElement.value, koerperGroesseElement.value, alterElement.value);
        //grundUmsatzOutput.innerHTML = grundUmsatzValue;
        //gesamtUmsatzOutput.innerHTML = grundUmsatzValue * faktorElement.value;
        gesamtUmsatzOutputChart = grundUmsatzValue * faktorElement.value;
        generateChartMaennlich(grundUmsatzValue, gesamtUmsatzOutputChart);

    } else {
        let grundUmsatzWeiblich = (gewicht, koerperGroesse, alter) => grundUmsatzWeiblich = 655.1 + (9.6 * gewicht) + (1.8 * koerperGroesse) - (4.7 * alter);
        let grundUmsatzWeiblichValue = grundUmsatzWeiblich(gewichtElement.value, koerperGroesseElement.value, alterElement.value);
        //grundUmsatzOutput.innerHTML = grundUmsatzWeiblichValue;
        //gesamtUmsatzOutput = grundUmsatzWeiblichValue * faktorElement.value;
        gesamtUmsatzOutputChart = grundUmsatzWeiblichValue * faktorElement.value;
        generateChartWeiblich(grundUmsatzWeiblichValue, gesamtUmsatzOutputChart)
       
    }
})




function generateChartMaennlich(grundUmsatzValue, gesamtUmsatzOutputChart) {
    /*========== Chart code ==========*/
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // Themes end

        /**
         * Chart design taken from Samsung health app
         */

        var chart = am4core.create("chartdiv", am4charts.XYChart);
        var label = chart.chartContainer.createChild(am4core.Label);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.paddingBottom = 30;

        chart.data = [{
            "name": "Grundumsatz",
            "steps": grundUmsatzValue,
            "href": "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg",
        }, {
            "name": "Gesamtumsatz",
            "steps": gesamtUmsatzOutputChart,
            "href": "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg"
        }];

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.minGridDistance = 10;
        categoryAxis.renderer.labels.template.dy = 35;
        categoryAxis.renderer.tooltip.dy = 35;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inside = true;
        valueAxis.renderer.labels.template.fillOpacity = 0.3;
        valueAxis.renderer.grid.template.strokeOpacity = 0;
        valueAxis.min = 10;
        valueAxis.cursorTooltipEnabled = false;
        valueAxis.renderer.baseGrid.strokeOpacity = 0;

        var series = chart.series.push(new am4charts.ColumnSeries);
        series.dataFields.valueY = "steps";
        series.dataFields.categoryX = "name";
        series.tooltipText = "{valueY.value}";
        series.tooltip.pointerOrientation = "horizontal";
        series.tooltip.dy = - 6;
        series.columnsContainer.zIndex = 100;

        var columnTemplate = series.columns.template;
        columnTemplate.width = am4core.percent(50);
        columnTemplate.maxWidth = 66;
        columnTemplate.column.cornerRadius(4, 4, 4, 4);
        columnTemplate.strokeOpacity = 0;

        series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueY", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
        series.mainContainer.mask = undefined;

        var cursor = new am4charts.XYCursor();
        chart.cursor = cursor;
        cursor.lineX.disabled = true;
        cursor.lineY.disabled = true;
        cursor.behavior = "none";

        var bullet = columnTemplate.createChild(am4charts.CircleBullet);
        bullet.circle.radius = 30;
        bullet.valign = "bottom";
        bullet.align = "center";
        bullet.isMeasured = true;
        bullet.mouseEnabled = false;
        bullet.verticalCenter = "bottom";
        bullet.interactionsEnabled = false;

        var hoverState = bullet.states.create("hover");
        var outlineCircle = bullet.createChild(am4core.Circle);
        outlineCircle.adapter.add("radius", function (radius, target) {
            var circleBullet = target.parent;
            return circleBullet.circle.pixelRadius + 10;
        })

        var image = bullet.createChild(am4core.Image);
        image.width = 60;
        image.height = 60;
        image.horizontalCenter = "middle";
        image.verticalCenter = "middle";
        image.propertyFields.href = "href";

        image.adapter.add("mask", function (mask, target) {
            var circleBullet = target.parent;
            return circleBullet.circle;
        })

        var previousBullet;
        chart.cursor.events.on("cursorpositionchanged", function (event) {
            var dataItem = series.tooltipDataItem;

            if (dataItem.column) {
                var bullet = dataItem.column.children.getIndex(1);

                if (previousBullet && previousBullet != bullet) {
                    previousBullet.isHover = false;
                }

                if (previousBullet != bullet) {

                    var hs = bullet.states.getKey("hover");
                    hs.properties.dy = -bullet.parent.pixelHeight + 30;
                    bullet.isHover = true;

                    previousBullet = bullet;
                }
            }
        })

    });
}

function generateChartWeiblich(grundUmsatzWeiblichValue, gesamtUmsatzOutputChart) {
    /*========== Chart code ==========*/
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // Themes end

        /**
         * Chart design taken from Samsung health app
         */

        var chart = am4core.create("chartdiv", am4charts.XYChart);
        var label = chart.chartContainer.createChild(am4core.Label);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.paddingBottom = 30;

        chart.data = [{
            "name": "Grundumsatz",
            "steps": grundUmsatzWeiblichValue,
            "href": "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg",
        }, {
            "name": "Gesamtumsatz",
            "steps": gesamtUmsatzOutputChart,
            "href": "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg"
        }];

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.minGridDistance = 10;
        categoryAxis.renderer.labels.template.dy = 35;
        categoryAxis.renderer.tooltip.dy = 35;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inside = true;
        valueAxis.renderer.labels.template.fillOpacity = 0.3;
        valueAxis.renderer.grid.template.strokeOpacity = 0;
        valueAxis.min = 10;
        valueAxis.cursorTooltipEnabled = false;
        valueAxis.renderer.baseGrid.strokeOpacity = 0;

        var series = chart.series.push(new am4charts.ColumnSeries);
        series.dataFields.valueY = "steps";
        series.dataFields.categoryX = "name";
        series.tooltipText = "{valueY.value}";
        series.tooltip.pointerOrientation = "horizontal";
        series.tooltip.dy = - 6;
        series.columnsContainer.zIndex = 100;

        var columnTemplate = series.columns.template;
        columnTemplate.width = am4core.percent(50);
        columnTemplate.maxWidth = 66;
        columnTemplate.column.cornerRadius(4, 4, 4, 4);
        columnTemplate.strokeOpacity = 0;

        series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueY", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
        series.mainContainer.mask = undefined;

        var cursor = new am4charts.XYCursor();
        chart.cursor = cursor;
        cursor.lineX.disabled = true;
        cursor.lineY.disabled = true;
        cursor.behavior = "none";

        var bullet = columnTemplate.createChild(am4charts.CircleBullet);
        bullet.circle.radius = 30;
        bullet.valign = "bottom";
        bullet.align = "center";
        bullet.isMeasured = true;
        bullet.mouseEnabled = false;
        bullet.verticalCenter = "bottom";
        bullet.interactionsEnabled = false;

        var hoverState = bullet.states.create("hover");
        var outlineCircle = bullet.createChild(am4core.Circle);
        outlineCircle.adapter.add("radius", function (radius, target) {
            var circleBullet = target.parent;
            return circleBullet.circle.pixelRadius + 10;
        })

        var image = bullet.createChild(am4core.Image);
        image.width = 60;
        image.height = 60;
        image.horizontalCenter = "middle";
        image.verticalCenter = "middle";
        image.propertyFields.href = "href";

        image.adapter.add("mask", function (mask, target) {
            var circleBullet = target.parent;
            return circleBullet.circle;
        })

        var previousBullet;
        chart.cursor.events.on("cursorpositionchanged", function (event) {
            var dataItem = series.tooltipDataItem;

            if (dataItem.column) {
                var bullet = dataItem.column.children.getIndex(1);

                if (previousBullet && previousBullet != bullet) {
                    previousBullet.isHover = false;
                }

                if (previousBullet != bullet) {

                    var hs = bullet.states.getKey("hover");
                    hs.properties.dy = -bullet.parent.pixelHeight + 30;
                    bullet.isHover = true;

                    previousBullet = bullet;
                }
            }
        })

    });
}