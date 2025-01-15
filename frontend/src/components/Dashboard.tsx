import Link from "next/link"
import { Card } from "./ui/card"
import { LayoutDashboard, Search } from "lucide-react"
import SearchModule from "./SearchModule"
import TokenView from "./TokenView"
import { useToken } from "@/hooks/useTokens"
import { useState } from "react"
import { QueryClient } from "@tanstack/react-query"
import { useSecurityData } from "@/hooks/useSecurityData"
import { useChart } from "@/hooks/useChartData"

const Dashboard = () => {
    const [value, setValue] = useState<string>("");
    const { data } = useToken(value);
    const { data: dataSecurity, isLoading: loadingSecurity } = useSecurityData(value);
    const { data: dataChart, isLoading: loadingChart } = useChart(data?.attributes.coingecko_coin_id);

    return (
        <main>
            <SearchModule onValueSet={setValue} />
            {data && <TokenView
                commonData={data}
                chartData={dataChart}
                securityData={dataSecurity}
                loadingSecurity={loadingSecurity}
                loadingChart={loadingChart}
            />}
        </main>
    )
}

export default Dashboard