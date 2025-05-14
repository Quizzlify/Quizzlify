interface ModalProps {
    title: string;
}

const Modal: React.FC<ModalProps> = ({ title }) => {

    return (
        <h1>{title}</h1>
    )
}

export default Modal