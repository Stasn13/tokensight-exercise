import { baseUrl } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
// todo: fix types
type Token = {
    attributes: {
        name: string
        symbol: string
        coingecko_coin_id: string
        price_usd: string
        fdv_usd: string
        market_cap_usd: string
        total_reserve_in_usd: string
    }
    id: number
}

const fetchToken = async (searchValue: string): Promise<Token> => {
    const id = "aave"; // todo: should change
    const vsCurrency = "usd";
    const days = 365;
    const response = await fetch(`${baseUrl}/networks/eth/tokens/${searchValue}`)
    const detailedfResponse = await fetch(`https://api.coingecko.com/api/v3/coins/eth/contract/${searchValue}`)
    const tokenChart = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vsCurrency}&days=${days}`)

    const chartData = await tokenChart.json();
    const formatedChartData = chartData.prices.map(([timestamp, price]: [number, number]) => ({
        date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        price: parseFloat(price.toFixed(2))
      }))
    const token = await response.json()
    return formatedChartData
}

const useToken = (searchValue: string) => {
    return useQuery({
        queryKey: ['token'],
        queryFn: () => fetchToken(searchValue),
        enabled: !!searchValue,
    })
}

export { useToken, fetchToken }
