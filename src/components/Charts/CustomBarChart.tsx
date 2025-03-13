import "./CustomBarChart.scss";
import { BarPlot } from '@mui/x-charts/BarChart';
import { selectCustomerData } from '../../redux/app.slice';
import { useEffect, useId, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import barChartIcon from "../../assets/images/bar-chart-icon.svg";
import { ChartsClipPath, ChartsTooltip, ChartsXAxis, ChartsYAxis, ResponsiveChartContainer } from "@mui/x-charts";


const truncateLabel = (text: string, maxLength = 20) => {
  const words = text?.split(" ");
  if (words.length > 1) {
    text = text.toLowerCase();
  }

  text = text.replace(/\b\w/g, letter => letter.toUpperCase());
  if (text.length <= maxLength)
    return text;
  return `${text.slice(0, maxLength)}...`;
};

interface TransformedData {
  data: number[];
  labels: string[];
}

const CustomBarChart = () => {
  const barChartContainer = useRef(null);
  const barChartId = useId();
  const customerData = useSelector(selectCustomerData);
  const [transformedData, setTransformedData] = useState<TransformedData>({
    data: [],
    labels: []
  });

  useEffect(() => {
    if (customerData?.bar_chart_data?.length) {
      const barChartData = customerData?.bar_chart_data;
      const transformed: TransformedData = {
        data: barChartData.map(item => item.value),
        labels: barChartData.map(item => item.label)
      };
      setTransformedData(transformed);
    }
  }, [customerData]);

  return (
    <>
      <div className="custom-bar-chart">
        <div className="custom-bar-chart-header">
          <img src={barChartIcon} alt="" />
          <span>Customers by Provider</span>
        </div>

        <div className="custom-bar-chart-container" ref={barChartContainer}>
          <ResponsiveChartContainer
            dataset={transformedData.data.map((value, index) => ({
              value,
              label: transformedData.labels[index]
            }))}
            xAxis={[{
              scaleType: "linear",
              data: transformedData.data,
              valueFormatter: (value) => value.toLocaleString(),
              position: "bottom",

            }]}
            yAxis={[{
              scaleType: "band",
              data: transformedData.labels,
              tickLabelStyle: {
                padding: 0,
                width: 200,
                textAnchor: "end"
              },
              valueFormatter: (value: string) => truncateLabel(value, 20),
            }]}
            series={[{
              type: 'bar',
              dataKey: 'value',
              color: '#1976d2',
              layout: "horizontal",

            }]}
            margin={{
              left: 160
            }}
          >
            <g clipPath={`url(#${barChartId})`}>
              <BarPlot />
            </g>
            <ChartsClipPath id={barChartId} />
            <ChartsXAxis />
            <ChartsYAxis />
            <ChartsTooltip trigger="item" />
          </ResponsiveChartContainer>

        </div>

      </div>
    </>
  );
}

export default CustomBarChart