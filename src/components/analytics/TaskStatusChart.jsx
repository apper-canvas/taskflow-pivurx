import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { getTaskStatusData } from '../../utils/analyticsUtils';

function TaskStatusChart() {
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
    const mockData = getTaskStatusData();
    
    setChartData({
      options: {
        chart: {
          type: 'donut',
          fontFamily: 'Inter, sans-serif',
          foreColor: isDarkMode ? '#cbd5e1' : '#475569',
        },
        colors: ['#10b981', '#f97316', '#6366f1', '#ef4444'],
        labels: ['Completed', 'In Progress', 'Planned', 'Overdue'],
        legend: {
          position: 'bottom',
          formatter: function(seriesName, opts) {
            return [seriesName, ' - ', opts.w.globals.series[opts.seriesIndex]];
          }
        },
        tooltip: {
          y: {
            formatter: function(value) {
              return value + ' tasks';
            }
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '60%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total Tasks',
                  formatter: function(w) {
                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  }
                },
                value: {
                  fontSize: '22px',
                  fontWeight: 600,
                  formatter: function(value) {
                    return value;
                  }
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                height: 280
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ],
        theme: {
          mode: isDarkMode ? 'dark' : 'light'
        }
      },
      series: mockData
    });
  }, [isDarkMode]);

  if (!chartData) return <div className="min-h-[300px] flex items-center justify-center">Loading chart...</div>;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm">
        <Chart options={chartData.options} series={chartData.series} type="donut" height={330} />
      </div>
    </div>
  );
}

export default TaskStatusChart;