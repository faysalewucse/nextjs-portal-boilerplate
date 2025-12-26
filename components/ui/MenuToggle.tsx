"use client";

import React from "react";
import { Menu } from "lucide-react";
import { useSidebar } from "@/lib/contexts/SidebarContext";
import { cn } from "@/lib/utils";

const MenuToggle: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        "rounded-lg p-2 hover:bg-accent transition-colors cursor-pointer",
        "flex items-center justify-center"
      )}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-5 w-5 text-muted-foreground" />
    </button>
  );
};

export default MenuToggle;
