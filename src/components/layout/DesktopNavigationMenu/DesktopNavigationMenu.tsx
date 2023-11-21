import { NavigationMenuItems } from "routers/navigation";
import NavigationItem from "./NavigationItem";

function DesktopNavigationMenu() {
  return (
    <ul className="flex items-center space-x-1 relative">
      {NavigationMenuItems.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default DesktopNavigationMenu;
