import { BsFingerprint } from 'react-icons/bs'
import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../../Modal/BecomeSellerModal'

const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Loans' address='my-loans' />
      <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} />
    </>
  )
}

export default CustomerMenu
