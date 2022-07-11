import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as echarts from 'echarts'

function CustomChart({ data }: CustomEcharts.CustomChartProps) {

  const chartInitRef = useRef<HTMLDivElement>(null!)
  const chartRef = useRef<echarts.EChartsType>(null!)
  const [activeName, setActiveName] = useState<string>('企业职工养老保险')

  // 初始化echarts
  useEffect(() => {
    if (chartInitRef.current) {
      chartRef.current = echarts.init(chartInitRef.current)
    }
  }, [])

  useEffect(() => {
    const intervalId = window.setTimeout(() => {
      let cur = data.findIndex(item => item.name === activeName)
      if (cur === data.length - 1) {
        setActiveName(data[0].name)
      } else {
        setActiveName(data[cur + 1].name)
      }
    }, 2000)
    return () => {
      window.clearInterval(intervalId)
    }
  }, [activeName, data])

  // TODO: 设置echarts
  const option = useMemo(() => {
    const dataSource: any[] = []
    const legendData: any[] = []
    data.forEach((item) => {
      dataSource.push({
        ...item,
        itemStyle: {
          color: item.name === activeName ? item.color : item.color + 'cf'
        },
        emphasis: {
          itemStyle: {
            color: item.color === activeName ? item.color : item.color + 'cf',
          }
        }
      })
      legendData.push({
        ...item,
        itemStyle: {
          color: item.name === activeName ? item.color : item.color + 'cf',
        },
        textStyle: {
          color: '#333333',
          fontSize: 16,
          padding: 5,
          width: 400,
          backgroundColor: item.name === activeName ? 'rgba(49,117,233,0.15)' : 'transparent'
        }
      })
    })
    return {
      legend: {
        top: 'middle',
        left: 500,
        icon: 'rect',
        itemWidth: 9,
        itemHeight: 28,
        data: legendData
      },
      series: [
        {
          type: 'pie',
          zlevel: 2,
          width: 500,
          radius: ['50%', '70%'],
          center: [250, '50%'],
          data: dataSource,
          legendHoverLink: false,
          label: {
            show: false
          },
          itemStyle: {
            color: '#93ABD3',
            borderWidth: 5,
            borderColor: '#fff'
          },
          emphasis: {
            scale: false,
            itemStyle: {
              color: '#3175E9'
            }
          },
        }
      ]
    }
  }, [activeName, data])

  // 设置echarts series
  useEffect(() => {
    chartRef.current.setOption(option)
  }, [option])

  return (
    <div ref={chartInitRef} style={{ width: '800px', height: '500px' }} />
  )
}

export default CustomChart