import { Button } from '@nextui-org/button'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/modal'
import { ReactNode } from 'react'

interface IProps {
  buttonText: string
  title: string
  children: ReactNode
  buttonVariant?:
    | 'light'
    | 'solid'
    | 'bordered'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost'
    | undefined
  buttonClassName?: string
}

const ModalController = ({
  buttonText,
  title,
  children,
  buttonVariant = 'light',
  buttonClassName,
}: IProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        className={buttonClassName}
        variant={buttonVariant}
        onPress={onOpen}
      >
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalController
