import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import classnames from "classnames";

const ProfileDropdown = () => {
  // const router = useRouter();

  // async function signOut() {
  //   const { error } = await supabase.auth.signOut();
  //   router.push("/login");
  // }

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button className="md:w-12 md:h-12 h-10 w-10 min-w-0 bg-transparent p-1 border border-stone-50 rounded-full flex justify-center align-items-center">
          <img
            src="/profile.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={classnames("bg-stone-800 text-lg mt-2")}>
        <div>My Account</div>
        <Button
          // onPress={signOut}
          className="flex items-center text-lg bg-transparent  hover:text-teal-500 mt-3"
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileDropdown;
