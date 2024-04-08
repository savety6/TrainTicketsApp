"use client"

import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    id: string
}

export default function DeleteBlock({ id }: Props) {
    const router = useRouter()
    const deleteTicket = async() => {
        try {
            const response = await fetch(`http://localhost:3000/api/Tickets/${id}`,{method: 'DELETE'})
            if (response.ok) {
                router.refresh()
            }
        } catch (error) {
            console.error(error)
            alert('Failed to delete ticket')
        }
    }
    return (
        <FontAwesomeIcon 
            icon={faX} 
            className='text-red-300 hover:cursor-pointer hover:text-red-500'
            onClick={deleteTicket}
            />
    )
}