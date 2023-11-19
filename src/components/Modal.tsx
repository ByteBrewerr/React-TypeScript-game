import React, { FC } from 'react';
import ReactDom from 'react-dom'
import Teams from '../enums/Teams.enum';

interface ModalProps {
    handleModalOpen: ()=>void
}

const Modal:FC<ModalProps> = ({handleModalOpen}) => {
    const portalRoot = document.getElementById('portal-root');
    if (!portalRoot) {
        alert('Портал не найден')
        return null;
      }
    return ReactDom.createPortal(
        <div className='w-[500px] h-[500px] bg-red-500'>
            sdf
        </div>,
        portalRoot
    );
}

export default Modal;
