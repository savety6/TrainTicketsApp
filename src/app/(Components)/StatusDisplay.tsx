import React from 'react'

type Props = {
    value: string
}

function StatusDisplay({ value }: Props) {
    return (
        <span className='inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 bg-green-200'>
            {value}!
        </span>
    )
}

export default StatusDisplay