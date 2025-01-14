import Link from "next/link"
import { Card } from "./ui/card"
import { LayoutDashboard, Search } from "lucide-react"

const Navigation = () => {
    return (
        <Card className="bg-foreground-light !h-[fit-content] flex flex-col gap-4 pt-4 px-2 pb-6 mt-4 items-center">
            <Link
                href="/"
                className="[&.active]:border-white rounded-lg border border-transparent transition"
            >
                <LayoutDashboard  className="p-2" />
            </Link>
            <Link
                href="/discover"
                className="[&.active]:border-white rounded-lg border border-transparent transition"
            >
                <Search className="rounded-lg p-2" />
            </Link>
        </Card>
    )
}

export default Navigation