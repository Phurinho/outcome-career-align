
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserCheck, GraduationCap, Users, ChevronDown } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: 'admin' | 'educator' | 'student';
  onRoleChange: (role: 'admin' | 'educator' | 'student') => void;
}

const RoleSelector = ({ selectedRole, onRoleChange }: RoleSelectorProps) => {
  const roles = [
    { id: 'admin' as const, label: 'Admin', icon: UserCheck, description: 'System administration' },
    { id: 'educator' as const, label: 'Educator', icon: GraduationCap, description: 'Course management' },
    { id: 'student' as const, label: 'Student', icon: Users, description: 'Career insights' }
  ];

  const currentRole = roles.find(role => role.id === selectedRole);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          {currentRole && <currentRole.icon className="h-4 w-4" />}
          {currentRole?.label}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white">
        {roles.map((role) => (
          <DropdownMenuItem 
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
          >
            <role.icon className="h-4 w-4" />
            <div>
              <div className="font-medium">{role.label}</div>
              <div className="text-xs text-gray-500">{role.description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSelector;
