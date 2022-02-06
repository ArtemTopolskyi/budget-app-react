import React, { useEffect, useRef } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import './ModalWindow.scss';

export const ModalWindow = ({ children, isOpen, closeModal }) => {
  const wrapperRef = useRef(null);
  
  useOutsideClick(wrapperRef, closeModal);

  useEffect(() => {
    if(isOpen){
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen])

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='modal-window__page-background'
    >
      <div
        className='modal-window__container'
        ref={wrapperRef}
      >
        {children}
      </div>
    </div>
  );
}