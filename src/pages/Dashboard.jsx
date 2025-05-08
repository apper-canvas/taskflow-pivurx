import { useState } from 'react';
import getIcon from '../utils/iconUtils';
import { format } from 'date-fns';
import Chart from 'react-apexcharts';

function Dashboard() {
  const CheckCircleIcon = getIcon('CheckCircle');
  const ClockIcon = getIcon('Clock');
  const AlertCircleIcon = getIcon('AlertCircle');
  const CalendarIcon = getIcon('Calendar');
  
  // Demo data
  const taskSummary = [
    { title: 'Completed', count: 24, icon: CheckCircleIcon, color: 'text-secondary bg-secondary-light/20' },
    { title: 'In Progress', count: 8, icon: ClockIcon, color: 'text-primary bg-primary-light/20' },
    { title: 'Overdue', count: 3, icon: AlertCircleIcon, color: 'text-red-500 bg-red-100 dark:bg-red-900/30' }
  ];
  
  const recentTasks = [
    { id: 1, title: 'Update dashboard layout', priority: 'High', status: 'In Progress', dueDate: '2023-08-15' },
    { id: 2, title: 'Create user onboarding flow', priority: 'Medium', status: 'Completed', dueDate: '2023-08-10' },
    { id: 3, title: 'Fix navigation responsiveness', priority: 'High', status: 'In Progress', dueDate: '2023-08-16' },
    { id: 4, title: 'Implement dark mode toggle', priority: 'Medium', status: 'Completed', dueDate: '2023-08-09' }
  ];

  // Chart options for task progress
  const chartOptions = {
    chart: {
      type: 'donut',
      background: 'transparent'
    },
    colors: ['#10b981', '#6366f1', '#f97316', '#ef4444'],
    labels: ['Completed', 'In Progress', 'To Do', 'Overdue'],
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: false
    }
  };
  
  const chartSeries = [24, 8, 12, 3];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {taskSummary.map((item, index) => (
          <div key={index} className="card flex items-center p-5">
            <div className={`p-3 rounded-xl mr-4 ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{item.count}</h3>
              <p className="text-sm text-surface-500">{item.title} Tasks</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Tasks</h2>
            <button className="btn-outline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700">
                  <th className="text-left pb-3 font-medium text-surface-500">Task</th>
                  <th className="text-left pb-3 font-medium text-surface-500">Priority</th>
                  <th className="text-left pb-3 font-medium text-surface-500">Status</th>
                  <th className="text-left pb-3 font-medium text-surface-500">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map(task => (
                  <tr key={task.id} className="border-b border-surface-200 dark:border-surface-700">
                    <td className="py-3">{task.title}</td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs ${task.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs ${task.status === 'Completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1 text-surface-500" />
                      {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Task Progress</h2>
          <Chart options={chartOptions} series={chartSeries} type="donut" height={300} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;