/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Home,
  Truck,
  Building,
  Bike,
  Package,
  UserCheck,
  Warehouse,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Star,
  CheckCircle,
  HelpCircle,
  Menu,
  X,
  FileText,
  DollarSign,
  Briefcase,
  AlertTriangle,
  Send,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  Search,
  Check,
  Award,
  Users,
  Eye,
  Settings,
  Sun,
  Moon,
  MessageCircle,
  MessageSquare
} from 'lucide-react';

const iconsMap: Record<string, React.ComponentType<any>> = {
  Home,
  Truck,
  Building,
  Bike,
  Package,
  UserCheck,
  Warehouse,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Star,
  CheckCircle,
  HelpCircle,
  Menu,
  X,
  FileText,
  DollarSign,
  Briefcase,
  AlertTriangle,
  Send,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  Search,
  Check,
  Award,
  Users,
  Eye,
  Settings,
  Sun,
  Moon,
  MessageCircle,
  MessageSquare
};

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, className = '', size }) => {
  const IconComponent = iconsMap[name] || HelpCircle;
  return <IconComponent className={className} size={size} />;
};
