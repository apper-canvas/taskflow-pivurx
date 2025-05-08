import {
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  BarChart2,
  FileText,
  Home,
  Settings,
  Users,
  Briefcase,
  Layout,
  PieChart
} from 'lucide-react';

const iconMap = {
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  BarChart2,
  FileText,
  Home,
  Settings,
  Users,
  Briefcase,
  Layout,
  PieChart
};

const getIcon = (name) => iconMap[name] || null;

export default getIcon;