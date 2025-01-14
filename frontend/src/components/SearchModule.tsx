import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { baseUrl } from "@/lib/constants"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"

const SearchModule = ({ className }: { className?: string }) => {
    const [value, setValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    // TODO: move fetches outside ui component
    const fetchTokens = (searchValue: string) => fetch(`${baseUrl}/networks/eth/tokens/${searchValue}`).then((res) => res.json())
    const fetchPairs = (searchValue: string) => fetch(`${baseUrl}/search/pools?page=1&query=${searchValue}&network=eth`).then((res) => res.json())

    const search = (searchValue: string) => {
        Promise.all([fetchTokens(searchValue), fetchPairs(searchValue)]).then((values) => {
            console.log(values);
            setIsLoading(false);
        });
    }
    console.log(value)
    return (
        <div className={cn(className, "flex w-full max-w-sm items-center space-x-2")}>
            <div>
                <Input
                    type="search"
                    placeholder="Fill with your token address"
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button
                    type="submit"
                    onClick={() => search(value)}
                >
                    Search
                </Button>
            </div>
            <DropdownMenu>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default SearchModule