import React from 'react'

type Props = {
    value: string
}

function StatusDisplay({ value }: Props) {

    const getColor = (status: string) => {
        let color = "bg-slate-700"
        switch (status.toLowerCase()) {
            case "done":
                color = "bg-green-200"
                break
            case "not started":
                color = "bg-red-200"
                break
            case "in progress":
                color = "bg-yellow-200"
                break
            default:
                return color
        }
        return color
    }

    return (
        <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(value)}`}>
            {value}!
        </span>
    )
}

export default StatusDisplay