import { useQuery } from '@tanstack/react-query'

export type Chart = {
    date: string
    price: number
}[]

const fetchChart = async (id = "aave"): Promise<Chart> => {
    const vsCurrency = "usd";
    const days = 365; // Might be used later as timeRange selector
    const tokenChart = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vsCurrency}&days=${days}`)

    const chartData = await tokenChart.json();
    const formatedChartData = chartData.prices.map(([timestamp, price]: [number, number]) => ({
        date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        price: parseFloat(price.toFixed(2))
      }))
    return formatedChartData
}

const useChart = (id?: string) => {
    return useQuery({
        queryKey: ['chart', id],
        queryFn: () => fetchChart(id),
        enabled: !!id,
    })
}

export { useChart, fetchChart }
