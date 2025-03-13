import "./CustomPieChart.scss";
import { ChartsClipPath, ChartsLegend, ChartsTooltip } from '@mui/x-charts';
import { PiePlot } from '@mui/x-charts/PieChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { selectCustomerData } from '../../redux/app.slice';
import { useId } from 'react';
import { useSelector } from 'react-redux';
import pieChartIcon from "../../assets/images/pie-chart-icon.svg";

const CustomPieChart = () => {
  // Apply rounded styles in <rect> elements of chart legend
  document?.querySelectorAll(".MuiChartsLegend-mark")?.forEach(e => e.setAttribute("rx", "10"));

  const customerData = useSelector(selectCustomerData);
  const pieChartId = useId();
  const palette = [
    "#B9B9B9",
    "#006DC5", 
    "#007D2C", 
  ];

  return (
    <div className="custom-pie-chart">
      <div className="custom-pie-chart-header">
        <img src={pieChartIcon} alt="" />
        <span>Transaction Statuses</span>
      </div>
      <div className="custom-pie-chart-container">
        <ResponsiveChartContainer
          margin={{
            right: 0
          }}
          colors={palette}
          series={[
            {
              type: "pie",
              data: customerData?.pie_chart_data || [],
              innerRadius: "70%",
            }
          ]
          }
        >
          <g clipPath={`url(#${pieChartId})`}>
            <PiePlot />
          </g>
          <ChartsClipPath id={pieChartId} />
          <ChartsLegend
            direction="column"
            labelStyle={{
              fill: "#313131",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--main-font-family)"
            }}
            position={{
              horizontal: "left",
              vertical: "middle"
            }}
            itemMarkHeight={16}
            itemMarkWidth={16}
            markGap={14}
            itemGap={25}
            padding={0}
          />
          <ChartsTooltip trigger="item"/>
        </ResponsiveChartContainer>
      </div>
    </div>
  );
}

export default CustomPieChart