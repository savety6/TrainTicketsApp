import { faHome, faTicket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

type Props = {}

export default function Nav({ }: Props) {
    return (
        <nav className='flex justify-between bg-nav p-4 '>
            <Link href='/' className='text-2xl text-default-text'>Logo</Link>
            <div className='flex items-center space-x-4'>
                <Link href='/'>
                    <FontAwesomeIcon icon={faHome} className='icon' />
                </Link>
                <Link href='/TicketPage/new'>
                    <FontAwesomeIcon icon={faTicket} className='icon' />
                </Link>
                <p className='text-default-text cursor-pointer hover:opacity-90'>example@gmai.com</p>
            </div>
        </nav>
    )
}