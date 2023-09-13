import ProfileDropdown from "./components/ProfileDropdown";
import WelcomeBack from "./components/WelcomeBack";
import Dashboard from "./pages/Dashboard";

import { createClient } from "@supabase/supabase-js";

const supabase_url = import.meta.env.VITE_SUPABASE_URL;
const supabase_key = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabase_url ?? "", supabase_key ?? "");

function App() {
  console.log(import.meta.env.VITE_SOME_KEY);
  return (
    <div className="bg-stone-950 text-stone-50  dark lg:text-3xl text-2xl overflow-x-hidden">
      <header className="flex justify-between  py-4 px-4 sticky top-0 left-0  w-screen">
        <div></div>
        <div className="flex items-center gap-6">
          <WelcomeBack />
          <ProfileDropdown />
        </div>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
