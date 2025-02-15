import React, { use } from "react";
import Logo from "./shared/Logo";
import { Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import { USER_API_END_POINT } from '@/utils/endpoints'

const Navbar = () => {
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      // const res = await axios.get("http://localhost:8000/api/v1/user/logout");
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      if(res.data.success) {
        // localStorage.removeItem("token");
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="border-b border-gray-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto h-16">
      <Logo />
      {user ? (
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <Button variant="link" onClick={logoutHandler}>Logout</Button>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/login"><Button variant="outline">Login</Button></Link>
          <Link to="/signup"><Button>Signup</Button></Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default Navbar;
