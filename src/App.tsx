import { useEffect } from 'react';
import { Root, percent } from '@amcharts/amcharts5';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import './App.css';
import { PieChart } from '@amcharts/amcharts5/.internal/charts/pie/PieChart';
import { PieSeries } from '@amcharts/amcharts5/.internal/charts/pie/PieSeries';


function App() {
  
  let rootChart = Root.new( "rootChartDiv" );
  
  useEffect(() => {
    
    
    rootChart.setThemes([ am5themes_Animated.new( rootChart ) ]);
    
    let chart = rootChart.container.children.push( 
      PieChart.new(rootChart, {
        layout: rootChart.verticalLayout,
        innerRadius: percent( 40 )
      }) 
    );

    let series0 = chart.series.push( PieSeries.new( rootChart, {
      valueField: "bottles",
      categoryField: "country",
      alignLabels: false
    }));
    
    var bgColor = rootChart.interfaceColors.get( "background" );

    series0.ticks.template.setAll({  forceHidden: true });
    series0.labels.template.setAll({ forceHidden: true });
    series0.slices.template.setAll({
      stroke: bgColor,
      strokeWidth: 2,
      tooltipText:
        "{category}: {valuePercentTotal.formatNumber('0.00')}% ({value} bottles)"
    });

    series0.slices.template.states.create("hover", { scale: 0.95 });

    var series1 = chart.series.push( PieSeries.new( rootChart, {
      valueField: "litres",
      categoryField: "country",
      alignLabels: true
    }));

    series1.slices.template.setAll({
      stroke: bgColor,
      strokeWidth: 2,
      tooltipText:
        "{category}: {valuePercentTotal.formatNumber('0.00')}% ({value} litres)"
    });

    var data = [{
      country: "Lithuania",
      litres: 501.9,
      bottles: 1500
    }, {
      country: "Czech Republic",
      litres: 301.9,
      bottles: 990
    }, {
      country: "Ireland",
      litres: 201.1,
      bottles: 785
    }, {
      country: "Germany",
      litres: 165.8,
      bottles: 255
    }, {
      country: "Australia",
      litres: 139.9,
      bottles: 452
    }, {
      country: "Austria",
      litres: 128.3,
      bottles: 332
    }, {
      country: "UK",
      litres: 99,
      bottles: 150
    }, {
      country: "Belgium",
      litres: 60,
      bottles: 178
    }, {
      country: "The Netherlands",
      litres: 50,
      bottles: 50
    }];
    
    series0.data.setAll( data );
    series1.data.setAll( data );

    series0.appear(1000, 100);
    series1.appear(1000, 100);

      return () => {
        rootChart.dispose();
      }

  }, []);
  
  return (
      <div id="rootChartDiv" style={{ width: "100%", height: "500px" }}></div>
  )
}

export default App
