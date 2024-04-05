import TicketForm from '@/app/(Components)/TicketForm'
import React from 'react'

type Props = {
    params: {
        id: string
    }
}

export default function TicketPage({ params }: Props) {
    return (
        <TicketForm />
    )
}