import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {}

export default function DeleteBlock({ }: Props) {
    return (
        <FontAwesomeIcon icon={faX} className='text-red-300 hover:cursor-pointer hover:text-red-500'/>
    )
}