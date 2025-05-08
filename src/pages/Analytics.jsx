import { motion } from 'framer-motion';
import { useState } from 'react';
import getIcon from '../utils/iconUtils';

// Components
import TaskStatusChart from '../components/analytics/TaskStatusChart';
import ProjectChart from '../components/analytics/ProjectChart';
import ActivityChart from '../components/analytics/ActivityChart';
import MetricCard from '../components/analytics/MetricCard';

function Analytics() {
  const ChartIcon = getIcon('BarChart');
  const ClockIcon = getIcon('Clock');
  const CheckCircleIcon = getIcon('CheckCircle');
  const UsersIcon = getIcon('Users');
  const [timeRange, setTimeRange] = useState('month');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Analytics Dashboard</h1>
        
        <div className="inline-flex rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
          {['week', 'month', 'quarter', 'year'].map((range) => (
            <button
              key={range}
              className={`px-4 py-2 text-sm ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <MetricCard title="Total Tasks" value="286" change="+12.3%" Icon={CheckCircleIcon} isPositive={true} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard title="Completed Tasks" value="184" change="+8.7%" Icon={CheckCircleIcon} isPositive={true} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard title="Active Projects" value="12" change="-2" Icon={ChartIcon} isPositive={false} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard title="Team Productivity" value="94%" change="+5.2%" Icon={UsersIcon} isPositive={true} />
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold mb-4">Task Completion Trend</h2>
          <ActivityChart timeRange={timeRange} />
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Task Status</h2>
          <TaskStatusChart />
        </div>
      </div>
      
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
        <ProjectChart />
      </div>
    </div>
  );
}

export default Analytics;