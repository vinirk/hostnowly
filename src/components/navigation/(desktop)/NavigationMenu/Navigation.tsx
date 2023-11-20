import { NavigationItems } from '../../../../routers/navigation';
import NavigationItem from './NavigationItem';

function Navigation() {
  return (
    <ul className='flex items-center space-x-1 relative'>
      {NavigationItems.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
