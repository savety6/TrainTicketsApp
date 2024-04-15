import TicketForm from '@/Components/TicketForm'
import React from 'react'

type Props = {
    params: {
        id: string
    }
}

const getTicketDataById = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`,{
        method: 'GET',
        cache: 'no-store'
    })
    if (!res.ok) {
        throw new Error('Failed to fetch ticket data')
    }
    const data = await res.json()
    return data
}

export default async function TicketPage({ params }: Props) {
    const EDIT_MODE = params.id !== 'new'
    let updateTicketData: any = {}

    if(EDIT_MODE) {
        updateTicketData = await getTicketDataById(params.id)
        updateTicketData = updateTicketData.ticket 
        
    }else{
        updateTicketData = {
            _id: "new"
        }
    }
    return (
        <TicketForm ticket={updateTicketData} />
    )
}