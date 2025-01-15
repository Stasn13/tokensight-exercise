import { useQuery } from '@tanstack/react-query'

type SecurityData = {
    buy_tax: string
    sell_tax: string
    holder_count: string
    is_open_source: string
    is_proxy: string
    gas_abuse?: string
    lp_total_supply?: string
    lp_holder_count?: string
}

const fetchSecurityData = async (addr: string): Promise<SecurityData> => {
    const securityResponse = await fetch(`https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${addr}`)

    const obj = await securityResponse.json();
    return Object.values(obj.result)[0] as SecurityData
}

const useSecurityData = (addr: string) => {
    return useQuery({
        queryKey: ['securityData'],
        queryFn: () => fetchSecurityData(addr),
        enabled: !!addr,
    })
}

export { useSecurityData, fetchSecurityData }
