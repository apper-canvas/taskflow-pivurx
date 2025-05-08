import {
  Home,
  Folder,
  Calendar,
  BarChart,
  Users,
  Settings,
  Menu,
  ChevronLeft,
  Sun,
  Moon,
  Bell,
  Search,
  Clock,
  CheckCircle
} from 'lucide-react';

// Icon mapping object
const iconMap = {
  Home,
  Folder,
  Calendar,
  BarChart,
  Users,
  Settings,
  Menu,
  ChevronLeft,
  Sun,
  Moon,
  Bell,
  Search,
  Clock,
  CheckCircle
};

/**
 * Get icon component by name
 * @param {string} name - Icon name
 * @returns {React.ComponentType} Icon component
 */
const getIcon = (name) => iconMap[name] || null;

export default getIcon;