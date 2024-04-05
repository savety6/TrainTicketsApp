import React from 'react'
import DeleteBlock from './DeleteBlock'
import PriorityDisplay from './PriorityDisplay'
import ProgressDisplay from './ProgressDisplay'
import StatusDisplay from './StatusDisplay'

import type { TicketData } from '../(Types)'

type Props = {
    id: number
    ticket: TicketData
}

function TicketCard({ id, ticket }: Props) {
    return (
        <div id={`TicketCard-${id}`} className='flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2'>
            <div className='flex mb-3'>
                <PriorityDisplay value={ticket.priority} />
                <div className='ml-auto'>
                    <DeleteBlock />
                </div>
            </div>
            <h4>{ticket.title}</h4>
            <hr className='h-px border-0 bg-page mb-0' />
            <p className='whitespace-pre-wrap'>{ticket.description}</p>
            <div className='flex-grow' />
            <div className='flex mt-2'>
                <div className='flex flex-col'>
                    <p className='text-xs my-1'>{ticket.createdAt}</p>
                    <ProgressDisplay value={ticket.progress}/>
                </div>
                <div className='flex ml-auto items-end'>
                    <StatusDisplay value={ticket.status}/>
                </div>
            </div>
        </div>
    )
}

export default TicketCard