import React from 'react'
import { StatsArrowUp } from '../../../../assets/icons/StatsArrowUp'
import { currencyFormat, decimalCurrency, noSymbolCount, noSymbolCurrecncy } from '../../../../shared/currencyFormat'
import { PieChart } from '../../../../components/chart/PieChart'

interface DataCardProps {
    color: string,
    title: string,
    value: string | number,
    percentage: string,
    isCount?: boolean,
    gradientFrom?: string,
    gradientTo?: string,
    meterElement?: any

}
export const DataCard = (props: DataCardProps) => {
    const { color, isCount, gradientFrom, gradientTo } = props
    return (
        <div style={{ background: color }} className={`bg-[${color}] p-5 rounded-lg shadow-md`}>
            <p className={`text-[${color}]`}>{props.title}</p>
            <p className='font-[700] text-[32px] py-3'>
                {isCount ?
                    noSymbolCount(Number(props.value))
                    : decimalCurrency(Number(props.value))}
            </p>
            {/* <p className='text-xs font-[400] flex'>
                {props.percentage} Per Month &nbsp; <StatsArrowUp />
            </p> */}
        </div>
    )
}

export const StatsDataCard = (props: DataCardProps) => {
    const { color, isCount, gradientFrom, gradientTo } = props

    return (
        <div style={{ background: color }} className={`bg-[${color}] pt-6 shadow-sm  flex justify-between rounded-lg`}>
            <div className='p-5'>
                <p className={`text-[${color}]`}>{props.title}</p>
                <p className='font-[700] text-[32px] py-3'>
                    {isCount ?
                        noSymbolCount(Number(props.value))
                        : decimalCurrency(Number(props.value))}
                </p>
                {/* <p className='text-xs font-[400] flex'>
                    {props.percentage} Per Month &nbsp; <StatsArrowUp />
                </p> */}
            </div>
            <div className='mt-auto'>
                {props.meterElement}
                {/* <StatsMeter from={gradientFrom} tostring={gradientTo}/> */}
            </div>
        </div>
    )
}

export const PieChartCard = (props: { data: any[], labels: string[], title: string, value: number }) => {
    const { data, labels } = props
    const colors = data.map((item: any) => item?.color)
    console.log(colors)
    return (
        <div>
            <h3>{props.title}</h3>
            <h3 className='font-bold text-3xl pt-2 pb-5'>{currencyFormat(props.value)}</h3>
            <div className='flex my-auto'>
                <div>
                    <PieChart data={data} colors={[]} labels={labels} />
                </div>
                <div className='my-auto'>
                    {labels?.map(
                        (item: any, index: number) =>
                            <div className='flex align-middle my-3 text-darkGrey'>
                                <div style={{ background: colors[index] }}
                                    className={`h-3 w-7 mx-3 my-auto`}></div>
                                <div className='my-auto font-[400] text-sm'>{item}</div>
                            </div>)}
                </div>
            </div>
        </div>
    )
}
