import ProfileDropdown from "./components/ProfileDropdown";
import WelcomeBack from "./components/WelcomeBack";
import Dashboard from "./pages/Dashboard";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  return (
    <div className="dark  bg-stone-950 text-stone-50   lg:text-3xl text-2xl overflow-x-hidden ">
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
