import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


const SearchModule = ({ className, onValueSet }: { className?: string, onValueSet: Dispatch<SetStateAction<string>> }) => {
    const [value, setValue] = useState<string>("");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const search = (searchValue: string) => {
        onValueSet(searchValue);
        replace(`${pathname}?token=${searchValue}`);
    }

    useEffect(() => {
        const token = searchParams.get("token");
        onValueSet(token || "");
        setValue(token || "")
    }, [searchParams])

    return (
        <>
            <div className={cn(className, "flex w-full items-center space-x-2")}>
                <Input
                    value={value}
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