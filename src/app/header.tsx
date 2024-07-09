import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export function Header() {
    return <div className="border-b py-3">
        <div className=" mx-10 justify-between flex items-center">
            <img src="https://www.blobo.in/assets/images/Blobo2.png" alt="Logo" />

            <div className="flex gap-5">
                <OrganizationSwitcher />
                <UserButton />
            </div>
        </div>
    </div>
}