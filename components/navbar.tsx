import { auth } from "@/auth";
import NavbarLoginButton from "./navbar-login-button";
import NavbarTitleLogo from "./navbar-title-logo";
import { UserDropDown } from "./user-dropdown";
import { ToggleThemeDropdown } from "./toggle-theme-dropdown";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav>
      <ul className="flex flex-row justify-between">
        <li>
          <NavbarTitleLogo />
        </li>

        <li className="flex flex-row gap-4">
          <span>
            {!session && <NavbarLoginButton />}
            {session && <UserDropDown session={session} />}
          </span>
          <span>
            <ToggleThemeDropdown />
          </span>
        </li>
      </ul>
    </nav>
  );
}
