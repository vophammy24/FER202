import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({
    show,
    title,
    message,
    onConfirm,
    onHide,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmVariant = 'primary',
    disableConfirm = false,
}) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {cancelLabel}
                </Button>
                <Button variant={confirmVariant} onClick={onConfirm} disabled={disableConfirm}>
                    {confirmLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;