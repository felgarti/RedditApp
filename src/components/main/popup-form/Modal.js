import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import './popup.css'
import Signin from "../../authentification/components/SignIn" ;
import Signup from "../../authentification/components/SignUp";

export const Modal = ({
 onClickOutside,
 onKeyDown,
 modalRef,
 buttonRef,
 closeModal,
 onSubmit,
 main,
 firebase,
 user,setUser
}) => {
return ReactDOM.createPortal(
<FocusTrap>
  <aside
  tag="aside"
  role="dialog"
  tabIndex="-1"
  aria-modal="true"
  className="modal-cover"
  onClick={onClickOutside}
  onKeyDown={onKeyDown}
>
    <div className="modal-area" ref={modalRef}>
    <button
    ref={buttonRef}
    aria-label="Close Modal"
    aria-labelledby="close-modal"
    className="_modal-close"
    onClick={closeModal}
    >
  
  <i class="far fa-times-circle"></i>
   
    
    </button>
<div className="modal-body">

  <div className="modal-item"> <Signin  user={user} setUser={setUser} close={closeModal} firebase={firebase}  onSubmit={onSubmit} /></div> <div className="modal-item"><Signup  user={user} setUser={setUser} close={closeModal} firebase={firebase}  onSubmit={onSubmit} /></div>
  </div>
   </div>
   </aside>
 </FocusTrap>,
document.body
);
};
export default Modal;