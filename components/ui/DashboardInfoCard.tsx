import React from "react";
import { Icon } from "phosphor-react";

interface DashboardInfoCardProps {
  title: string;
  value: string | number;
  icon: Icon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: {
    value: string;
    label: string;
    isPositive?: boolean;
  };
  variant?: "primary" | "secondary" | "tertiary" | "warning" | "success" | "info";
}

const variantStyles = {
  primary: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  secondary: {
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  tertiary: {
    iconBg: "bg-tertiary/10",
    iconColor: "text-tertiary",
  },
  warning: {
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  success: {
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  info: {
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
};

const DashboardInfoCard: React.FC<DashboardInfoCardProps> = ({
  title,
  value,
  icon: IconComponent,
  iconColor,
  iconBgColor,
  trend,
  variant = "primary",
}) => {
  const styles = variantStyles[variant];

  return (
    <div className="rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-xs font-semibold ${
                  trend.isPositive !== false ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.value}
              </span>
              <span className="text-xs text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        <div
          className={`h-10 w-10 rounded-lg ${
            iconBgColor || styles.iconBg
          } flex items-center justify-center flex-shrink-0`}
        >
          <IconComponent
            className={iconColor || styles.iconColor}
            size={20}
            weight="duotone"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardInfoCard;
