//import "./style.css";

const front = document.getElementById("front");
const back = document.getElementById("back");
const btn = document.getElementById("flip_btn");
const chart = document.getElementById("chartdiv")

//function handleFlip() {
//  front.classList.toggle("flipped");
//  back.classList.toggle("flipped");

//}

am5.ready(function () {
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0,
      paddingRight: 1,
    })
  );

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  cursor.lineY.set("visible", false);

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xRenderer = am5xy.AxisRendererX.new(root, {
    minGridDistance: 30,
    minorGridEnabled: true,
  });

  xRenderer.labels.template.setAll({
    rotation: -90,
    centerY: am5.p50,
    centerX: am5.p100,
    paddingRight: 15,
  });

  xRenderer.grid.template.setAll({
    location: 1,
  });

  var xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.1,
      categoryField: "event",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  var yRenderer = am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1,
  });

  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0.1,
      renderer: yRenderer,
    })
  );

  // Create series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Events Count",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "event",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}",
      }),
    })
  );

  series.columns.template.setAll({
    cornerRadiusTL: 3,
    cornerRadiusTR: 3,
    strokeOpacity: 0,
  });
  series.animate({
      key: "startAngle",
      to: 180,
      loops: Infinity,
      duration: 2000,
      easing:am5.ease.yoyo(am5.ease.cubic) 
  })
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  // Set data
  var data = [
    {
      event: "1",
      value: 602703,
    },
    {
      event: "2",
      value: 565042,
    },
    {
      event: "3",
      value: 391608,
    },
    {
      event: "4",
      value: 571931,
    },
    {
      event: "5",
      value: 508806,
    },
    {
      event: "6",
      value: 561741,
    },
    {
      event: "7",
      value: 464760,
    },
    {
      event: "8",
      value: 574428,
    },
    {
      event: "9",
        value: 456755,
    },
  ];

  xAxis.data.setAll(data);
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
}); // end am5.ready()
//
const url = "https://puma-quiet-martin.ngrok-free.app";
fetch(url, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

function handleFlip() {
  front.classList.toggle("flipped");
  back.classList.toggle("flipped");
}
btn.addEventListener("click", handleFlip);


