import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { LayoutDashboard, LockOpen, Search, UsersRound } from "lucide-react"
import { Token, useToken } from "@/hooks/useTokens"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useMemo } from "react"
import { currentDate } from "@/lib/utils"
import { SecurityData } from "@/hooks/useSecurityData"

const TokenView = ({ commonData, chartData, securityData }: { commonData: Token, chartData: any, securityData: SecurityData }) => {
    const groupDataRow = useMemo(() => ([{
        title: "Price",
        ammount: commonData?.attributes?.price_usd,
        addText: currentDate(),
    }, {
        title: "Market Cap",
        ammount: Number(commonData?.attributes?.market_cap_usd).toFixed(2),
        addText: currentDate(),
    }, {
        title: "FDV",
        ammount: commonData?.attributes?.fdv_usd,
        addText: currentDate(),
    }, {
        title: "Total Reserve",
        ammount: Number(commonData?.attributes?.total_reserve_in_usd).toFixed(2),
        addText: currentDate(),
    }]), [commonData]);

    const groupSecurityData = useMemo(() => ([{
        title: "Open Source",
        value: !!Number(securityData?.is_open_source) ? "Yes" : "Private", // TODO: undefined values should be handled as well
    }, {
        title: "Proxy Contract",
        value: !!Number(securityData?.is_proxy) ? "Yes" : "No",
    }, {
        title: "Gas abuse",
        value: !!Number(securityData?.gas_abuse) ? "Yes" : "Safe",
    }]), [securityData]);

    const groupDataProfile = useMemo(() => ([{
        title: "LP Token Total Supply:",
        ammount: securityData?.lp_total_supply,
        addText: currentDate(),
    }, {
        title: "LP Token Total Supply:",
        ammount: securityData?.lp_holder_count,
        addText: currentDate(),
    }, {
        title: "Number of holders:",
        ammount: securityData?.holder_count,
        addText: currentDate(),
    }]), [securityData]);

    return (
        <div className="mt-6 flex flex-col gap-4">
            <div>
                <Card className="inline-block mb-4 text-2xl font-bold inline-black animate-pulse bg-foreground-light">
                    {commonData?.attributes?.name}
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {groupDataRow.map((item) => (
                    <Card key={item.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {item.title}
                            </CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${item.ammount}</div>
                            <p className="text-xs text-muted-foreground">
                                captured for {item.addText}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-4">
                <Card className="md: w-3/4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold mb-2">
                            Security profile
                        </CardTitle>
                        <LockOpen />
                    </CardHeader>
                    {groupSecurityData.map((item) => (
                        <div className="flex items-center mb-2" key={item.title}>
                            <div className="ml-4 space-y-1 mr-2">
                                <p className="text-sm font-medium leading-none">{item.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    might be volatile, always check the latest data
                                </p>
                            </div>
                            <div className="ml-auto font-medium">{item.value}</div>
                        </div>
                    ))}
                </Card>
                <Card className="md:w-1/4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold mb-2">
                            Token Taxes
                        </CardTitle>
                    </CardHeader>
                    <div className="flex items-center mb-2">
                        <div className="ml-4 space-y-1 mr-2">
                            <p className="text-sm font-medium leading-none">Buy tax</p>
                        </div>
                        <div className="ml-auto font-medium">{Number(securityData?.buy_tax) || "n/a"}</div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="ml-4 space-y-1 mr-2">
                            <p className="text-sm font-medium leading-none">Sell tax</p>
                        </div>
                        <div className="ml-auto font-medium">{Number(securityData?.sell_tax) || "n/a"}</div>
                    </div>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {groupDataProfile.map((item) => (
                    <Card key={item.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {item.title}
                            </CardTitle>
                            <UsersRound />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.ammount}</div>
                            <p className="text-xs text-muted-foreground">
                                captured for {item.addText}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className="w-full bg-black text-white">
                <CardHeader>
                    <CardTitle className="text-white">AAVE Token Price Chart</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            price: {
                                label: "Price (USD)",
                                color: "white",
                            },
                        }}
                        className="w-full h-[300px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(value) => value}
                                    interval={30}
                                    stroke="#666"
                                />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                                    stroke="#666"
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }}
                                    labelStyle={{ color: '#999' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="white"
                                    name="Price (USD)"
                                    strokeWidth={2}
                                    dot={false}
                                // tension={0.4}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default TokenView