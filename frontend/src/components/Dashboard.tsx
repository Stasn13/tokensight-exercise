
import SearchModule from "./SearchModule"
import TokenView from "./TokenView"
import { useToken } from "@/hooks/useTokens"
import { useState } from "react"
import { useSecurityData } from "@/hooks/useSecurityData"
import { useChart } from "@/hooks/useChartData"

const Dashboard = () => {
    const [value, setValue] = useState<string>("");
    const { data } = useToken(value);
    const { data: dataSecurity, isLoading: loadingSecurity } = useSecurityData(value);
    const { data: dataChart, isLoading: loadingChart } = useChart(data?.attributes.coingecko_coin_id);

    // TODO: backlog
    /* 1. authentication
     * 2. user profile
     * 3. mobile responsive
     * 4. error handling
     * 5. pairs support
     * 6. test on other networks
     * 7. add menu links and improve btns
     * 8. deploy
    */

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