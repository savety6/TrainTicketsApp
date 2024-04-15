"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import type { TicketData } from '@/Types'

type Props = {
    ticket: TicketData
}

const startTicketData: any = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "",
    category: "",
}

function TicketForm({ ticket }: Props) {
    const router = useRouter()

    const EDIT_MODE = ticket._id !== 'new'
    if (EDIT_MODE) {
        startTicketData["title"] = ticket.title
        startTicketData["description"] = ticket.description
        startTicketData["priority"] = ticket.priority
        startTicketData["progress"] = ticket.progress
        startTicketData["status"] = ticket.status
        startTicketData["category"] = ticket.category
    } else {
        startTicketData["title"] = ""
        startTicketData["description"] = ""
        startTicketData["priority"] = 1
        startTicketData["progress"] = 0
        startTicketData["status"] = "not started"
        startTicketData["category"] = "bug"
    }
    const [ticketData, setTicketData] = useState<TicketData>(startTicketData)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setTicketData((prev) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let res: Response
        if (EDIT_MODE) {
            res = await fetch(`/api/Tickets/${ticket._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData: ticketData }),
            })
        } else {
            res = await fetch('/api/Tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData: ticketData }),
            })
        }
        if (!res.ok) {
            throw new Error("Failed to create ticket")
        }

        router.push('/')
        router.refresh()
    }
    return (
        <div className='flex justify-center'>
            <form className='flex flex-col gap-3 w-1/2' method='post' onSubmit={handleSubmit}>
                <h3>{EDIT_MODE ? "Edit your ticket" : "Create your ticket"}</h3>

                <label>Title</label>
                <input type="text" name='title' id="title" value={ticketData.title} onChange={handleChange} required={true} />

                <label>Description</label>
                <textarea name='description' id="description" value={ticketData.description} onChange={handleChange} rows={5} />

                <label>Category</label>
                <select name='category' value={ticketData.category} onChange={handleChange} >
                    <option value="bug">Bug</option>
                    <option value="feature">Feature</option>
                    <option value="other">Other</option>
                </select>

                <label>Priority</label>
                <div>
                    <input type="radio" name='priority' id="priority-1" value={1} onChange={handleChange} checked={ticketData.priority == 1} />
                    <label>Low</label>
                    <input type="radio" name='priority' id="priority-2" value={2} onChange={handleChange} checked={ticketData.priority == 2} />
                    <label>Medium</label>
                    <input type="radio" name='priority' id="priority-3" value={3} onChange={handleChange} checked={ticketData.priority == 3} />
                    <label>High</label>
                    <input type="radio" name='priority' id="priority-4" value={4} onChange={handleChange} checked={ticketData.priority == 4} />
                    <label>Critical</label>
                    <input type="radio" name='priority' id="priority-5" value={5} onChange={handleChange} checked={ticketData.priority == 5} />
                    <label>Blocker</label>
                </div>
                {EDIT_MODE &&
                    <>
                        <label>Process</label>
                        <input type="range" name='progress' id="progress" value={ticketData.progress} onChange={handleChange} min={0} max={100} />
                    </>
                }

                <label>Status</label>
                <select name='status' value={ticketData.status} onChange={handleChange} >
                    <option value="not started">Not started</option>
                    <option value="in progress">in progress</option>
                    <option value="done">Done</option>
                </select>

                <input type="submit" className="btn" value="Create ticket" />
            </form>
        </div>
    )
}

export default TicketForm