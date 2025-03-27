import {QueryType} from "../../../../1_commonTypes/commonTypes";


export type QueryGetSalesType = QueryType & {
    searchScentTerm: string
    category: string
    scent: string
    paymentMethod: string
    pointOfSale: string
}