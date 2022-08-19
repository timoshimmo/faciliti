import Modal from './modal';
import { useModalAction, useModalState } from './modal-context.tsx';
import { ResidentOrder } from '../Resident/components/modal';
import { ServiceContract } from '../FacilityManager/components/modal';

const ModalManager = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'RESIDENT_ORDER' && <ResidentOrder row={data}/>}
      {view === 'SERVICE_CONTRACT' && <ServiceContract/>}
    </Modal>
  );
};

export default ModalManager;
