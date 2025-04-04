
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ArrowBigRight } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {

    const {user, logout} = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>{user?.username.charAt(0)||"U"}</AvatarFallback>
    </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
        onClick={logout}
        >
          Logout <ArrowBigRight className="ml-auto" />
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
