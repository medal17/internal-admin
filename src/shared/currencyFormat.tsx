export function currencyFormat(num:number,currency?:string, noCurrency?:boolean) {
    return (noCurrency?'':(currency?Number(currency)+' ':'₦ ')) + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 export function decimalCurrency(num:number,currency?:string, noCurrency?:boolean) {
   return (noCurrency?'':(currency?currency+' ':'₦ ')) + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

 export function noSymbolCurrecncy(num:number, currency?:string, noCurrency?:boolean) {
    return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 export function noSymbolCount(num:number, currency?:string, noCurrency?:boolean) {
   return Number(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}