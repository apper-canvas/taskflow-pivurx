import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { format, subDays, subMonths, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns';
import { generateActivityData } from '../../utils/analyticsUtils';

function ActivityChart({ timeRange = 'month' }) {
  const [chartData, setChartData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  // Listen for dark mode changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Generate date range based on timeRange
    let startDate;
    let dateInterval;
    let dateFormat;
    const endDate = new Date();
    
    switch(timeRange) {
      case 'week':
        startDate = subDays(endDate, 7);
        dateInterval = eachDayOfInterval({ start: startDate, end: endDate });
        dateFormat = 'EEE';
        break;
      case 'month':
        startDate = subDays(endDate, 30);
        dateInterval = eachDayOfInterval({ start: startDate, end: endDate });
        dateFormat = 'MMM dd';
        break;
      case 'quarter':
        startDate = subMonths(endDate, 3);
        dateInterval = eachWeekOfInterval({ start: startDate, end: endDate });
        dateFormat = 'MMM dd';
        break;
      case 'year':
        startDate = subMonths(endDate, 12);
        dateInterval = eachMonthOfInterval({ start: startDate, end: endDate });
        dateFormat = 'MMM';
        break;
      default:
        startDate = subDays(endDate, 30);
        dateInterval = eachDayOfInterval({ start: startDate, end: endDate });
        dateFormat = 'MMM dd';
    }

    // Format dates for chart labels
    const categories = dateInterval.map(date => format(date, dateFormat));
    
    // Generate mock data for the chart
    const { completed, created } = generateActivityData(dateInterval.length);

    setChartData({
      options: {
        chart: {
          type: 'area',
          toolbar: {
            show: false
          },
          fontFamily: 'Inter, sans-serif',
          foreColor: isDarkMode ? '#cbd5e1' : '#475569',
        },
        colors: ['#10b981', '#6366f1'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.1,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          categories: categories,
          axisBorder: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          labels: {
            formatter: (value) => { return Math.round(value) }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right'
        },
        grid: {
          borderColor: isDarkMode ? '#334155' : '#e2e8f0',
          strokeDashArray: 5,
        },
        theme: {
          mode: isDarkMode ? 'dark' : 'light'
        }
      },
      series: [
        { name: 'Completed Tasks', data: completed },
        { name: 'Created Tasks', data: created }
      ]
    });
  }, [timeRange, isDarkMode]);

  if (!chartData) return <div className="min-h-[300px] flex items-center justify-center">Loading chart...</div>;

  return <Chart options={chartData.options} series={chartData.series} type="area" height={350} />;
}

export default ActivityChart;