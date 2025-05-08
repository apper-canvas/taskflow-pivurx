import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { getProjectData } from '../../utils/analyticsUtils';

function ProjectChart() {
  const [chartData, setChartData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const [view, setView] = useState('progress'); // 'progress' or 'tasks'

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
    const mockData = getProjectData();
    
    let series;
    if (view === 'progress') {
      series = [{
        name: 'Progress',
        data: mockData.map(project => project.progress)
      }];
    } else {
      series = [
        {
          name: 'Completed',
          data: mockData.map(project => project.tasksCompleted)
        },
        {
          name: 'Pending',
          data: mockData.map(project => project.tasksPending)
        }
      ];
    }

    setChartData({
      options: {
        chart: {
          type: view === 'progress' ? 'bar' : 'bar',
          stacked: view === 'tasks',
          toolbar: {
            show: false
          },
          fontFamily: 'Inter, sans-serif',
          foreColor: isDarkMode ? '#cbd5e1' : '#475569',
        },
        colors: view === 'progress' 
          ? ['#6366f1'] 
          : ['#10b981', '#f97316'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '70%',
            borderRadius: 6,
            distributed: view === 'progress',
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: view === 'progress',
          formatter: function(val) {
            return val + '%';
          },
          offsetX: 30,
          style: {
            fontSize: '12px',
            fontWeight: 600,
            colors: [isDarkMode ? '#f8fafc' : '#0f172a']
          }
        },
        stroke: {
          width: 1,
          colors: [isDarkMode ? '#1e293b' : '#ffffff']
        },
        grid: {
          borderColor: isDarkMode ? '#334155' : '#e2e8f0',
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        xaxis: {
          categories: mockData.map(project => project.name),
          labels: {
            formatter: function(val) {
              return view === 'progress' ? val + '%' : val;
            }
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          labels: {
            maxWidth: 150,
            style: {
              fontSize: '13px'
            }
          }
        },
        theme: {
          mode: isDarkMode ? 'dark' : 'light'
        },
        legend: {
          position: 'top'
        }
      },
      series: series
    });
  }, [view, isDarkMode]);

  if (!chartData) return <div className="min-h-[300px] flex items-center justify-center">Loading chart...</div>;

  return (
    <div>
      <div className="flex mb-4 justify-end space-x-2">
        <button onClick={() => setView('progress')} className={`text-sm px-3 py-1 rounded-lg ${view === 'progress' ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700'}`}>Progress</button>
        <button onClick={() => setView('tasks')} className={`text-sm px-3 py-1 rounded-lg ${view === 'tasks' ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700'}`}>Tasks</button>
      </div>
      <Chart options={chartData.options} series={chartData.series} type={view === 'progress' ? 'bar' : 'bar'} height={350} />
    </div>
  );
}

export default ProjectChart;