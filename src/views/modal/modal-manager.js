import React from 'react';
import Modal from './modal';
import { useModalAction, useModalState } from './modal-context.tsx';
import { ResidentOrder } from '../Resident/components/modal';
import { ServiceContract } from '../FacilityManager/components/modal';
import { MakePayment } from '../FacilityManager/components/modal';
import { Payment } from '../FacilityManager/components/modal';

const ModalManager = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'RESIDENT_ORDER' && <ResidentOrder row={data}/>}
      {view === 'SERVICE_CONTRACT' && <ServiceContract/>}
      {view === 'PAYMENT_FM' && <Payment/>}
      {view === 'MAKE_PAYMENT' && <MakePayment/>}
    </Modal>
  );
};

export default ModalManager;
