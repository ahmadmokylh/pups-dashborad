import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DropdownUser from './dropdown-user';

export default function Userdropdown() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className=" size-11">
            <AvatarImage />
            <AvatarFallback>OR</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownUser />
      </DropdownMenu>
    </div>
  );
}
