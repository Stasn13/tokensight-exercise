
import SearchModule from "./SearchModule"
import TokenView from "./TokenView"
import { useToken } from "@/hooks/useTokens"
import { useCallback, useState } from "react"
import { useSecurityData } from "@/hooks/useSecurityData"
import { useChart } from "@/hooks/useChartData"
import { useAccount } from "wagmi"
import { cn } from "@/lib/utils"

const Dashboard = () => {
    const [value, setValue] = useState<string>("");
    const { data, isError } = useToken(value);
    const { data: dataSecurity, isLoading: loadingSecurity } = useSecurityData(value);
    const { data: dataChart, isLoading: loadingChart } = useChart(data?.attributes.coingecko_coin_id);
    const { isConnected } = useAccount();
    const [isShaking, setIsShaking] = useState(false);

    const handleClick = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 1000);
    };

    // TODO: backlog
    /* 
    * 1. add Readme
     * 2. user profile
     * 5. pairs support
     * 6. test on other networks
     * 8. deploy
    */

    return (
        <main>
            <SearchModule onValueSet={setValue} />
            {isConnected && isError &&  
                <p className="text-2xl font-bold fixed inset-x-[40px] md:inset-x-[100px] inset-y-[150px] flex items-center justify-center">Token not found</p>
            }
            {!isConnected &&
                <p
                    className={cn(isShaking && "scale-125", "text-center text-2xl font-bold fixed inset-0 flex items-center justify-center transition-transform")}
                    onClick={handleClick}
                >
                    Use "Connect Wallet" button to proceed
                </p>}
            {data && isConnected && value && !isError &&
                <TokenView
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