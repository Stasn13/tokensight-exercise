import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { baseUrl } from "@/lib/constants"
import { on } from "events"
import { Token } from "@/hooks/useTokens"


const SearchModule = ({ className, onValueSet }: { className?: string, onValueSet: Dispatch<SetStateAction<string>> }) => {
    const [value, setValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [token, setToken] = useState();
    const [pairs, setPairs] = useState([]);


    useEffect(() => {
        console.log(token, pairs, token || pairs.length)
        if (token || pairs.length) {
            setOpen(true)
            console.log("open")
        }
    }, [token, pairs]);

    const search = (searchValue: string) => {
        onValueSet(searchValue)
    }

    return (
        <>
            <div className={cn(className, "flex w-full items-center space-x-2")}>
                <Input
                    type="search"
                    placeholder="Fill with your token address"
                    onChange={(e) => setValue(e.target.value)}
                    className="max-w-[480px]"
                />
                <Button
                    type="submit"
                    onClick={() => search(value)}
                    className="w-[80px]"
                >
                    Search
                </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-4">
                *Currently supproted only for the Ethereum network
            </p>
        </>
    )
}

export default SearchModule