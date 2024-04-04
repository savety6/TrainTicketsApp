import React from 'react'
import DeleteBlock from './DeleteBlock'
import PriorityDisplay from './PriorityDisplay'
import ProgressDisplay from './ProgressDisplay'
import StatusDisplay from './StatusDisplay'

type Props = {}

function TicketCard({ }: Props) {
    return (
        <div className='flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2'>
            <div className='flex mb-3'>
                <PriorityDisplay />
                <div className='ml-auto'>
                    <DeleteBlock />
                </div>
            </div>
            <h4>Title</h4>
            <hr className='h-px border-0 bg-page mb-0' />
            <p className='whitespace-pre-wrap'>this is the ticket description</p>
            <div className='flex-grow' />
            <div className='flex mt-2'>
                <div className='flex flex-col'>
                    <p className='text-xs my-1'>10/05/2023 18:30PM</p>
                    <ProgressDisplay />
                </div>
                <div className='flex ml-auto items-end'>
                    <StatusDisplay />
                </div>
            </div>
        </div>
    )
}

export default TicketCard