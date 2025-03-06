import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"><Menu className="w-5 h-5" /></Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded">
            Dashboard
          </Link>
          <Link href="/settings" className="p-2 hover:bg-gray-100 rounded">
            Settings
          </Link>
          <Link href="/profile" className="p-2 hover:bg-gray-100 rounded">
            Profile
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
