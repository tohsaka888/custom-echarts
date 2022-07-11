declare namespace CustomEcharts {
  type Data = {
    name: string;
    value: number;
    color?: string;
    [args]: any;
  }
  type CustomChartProps = {
    data: Data[]
  }
}