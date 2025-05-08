import { 
  Home, 
  Folder, 
  Calendar, 
  BarChart, 
  Users, 
  Settings, 
  Menu, 
  ChevronLeft, 
  CheckSquare, 
  Briefcase, 
  CalendarClock, 
  Clock,
  Bug,
  Star,
  FileText,
  Circle
} from 'lucide-react';

export default function getIcon(iconName) {
  const icons = { Home, Folder, Calendar, BarChart, Users, Settings, Menu, ChevronLeft, CheckSquare, Briefcase, CalendarClock, Clock, Bug, Star, FileText, Circle };
  return icons[iconName] || Circle; // Return the requested icon or a default Circle icon
}