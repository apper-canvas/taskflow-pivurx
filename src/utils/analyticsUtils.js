// Generate random number between min and max
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate activity data for completed and created tasks
export const generateActivityData = (dataPoints) => {
  // Base patterns with some randomness to simulate real data
  const completed = Array.from({ length: dataPoints }, () => randomNumber(5, 35));
  const created = Array.from({ length: dataPoints }, () => randomNumber(8, 40));
  
  // Add a trend to make data look more realistic
  for (let i = 1; i < dataPoints; i++) {
    // Simulate a slight upward trend
    completed[i] = Math.max(5, Math.min(35, completed[i-1] + randomNumber(-5, 7)));
    created[i] = Math.max(8, Math.min(40, created[i-1] + randomNumber(-4, 6)));
  }
  
  return { completed, created };
};

// Generate data for task status donut chart
export const getTaskStatusData = () => {
  // [Completed, In Progress, Planned, Overdue]
  return [64, 28, 15, 7];
};

// Generate project data for the project chart
export const getProjectData = () => {
  return [
    {
      name: 'Website Redesign',
      progress: 85,
      tasksCompleted: 17,
      tasksPending: 3
    },
    {
      name: 'Mobile App Development',
      progress: 72,
      tasksCompleted: 26,
      tasksPending: 10
    },
    {
      name: 'Analytics Dashboard',
      progress: 53,
      tasksCompleted: 8,
      tasksPending: 7
    },
    {
      name: 'Marketing Campaign',
      progress: 92,
      tasksCompleted: 22,
      tasksPending: 2
    },
    {
      name: 'Product Launch',
      progress: 38,
      tasksCompleted: 5,
      tasksPending: 8
    },
    {
      name: 'User Testing',
      progress: 66,
      tasksCompleted: 14,
      tasksPending: 7
    }
  ];
};