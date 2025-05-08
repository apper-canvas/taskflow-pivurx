import { motion } from 'framer-motion';

function MetricCard({ title, value, change, Icon, isPositive }) {
  return (
    <div className="card h-full">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          
          <div className="flex items-center mt-2">
            <span className={`text-xs font-medium ${isPositive ? 'text-secondary' : 'text-accent'}`}>
              {change}
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400 ml-1">vs previous period</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default MetricCard;