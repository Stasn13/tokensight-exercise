import Link from "next/link"
import { Card } from "./ui/card"
import { LayoutDashboard, Search } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

const Navigation = () => {

    return (
        <TooltipProvider delayDuration={200}>
            <Card className="bg-foreground-light !h-[fit-content] flex flex-col gap-4 pt-4 px-2 pb-6 mt-4 items-center">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/"
                            className="[&.active]:border-white rounded-lg border border-transparent transition"
                        >
                            <LayoutDashboard />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>to Home page</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/?token=0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
                            className="[&.active]:border-white rounded-lg border border-transparent transition"
                        >
                            <Search />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>search AAVE token</p>
                    </TooltipContent>
                </Tooltip>
            </Card>
        </TooltipProvider>
    )
}

export default Navigation