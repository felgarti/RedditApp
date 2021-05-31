import React, { Component } from 'react';
import { Modal } from './Modal';

export class Container extends Component {
  
  
showModal = () => {
  this.props.setPopup(true, () => {
  this.closeButton.focus();
});
this.toggleScrollLock();
};
closeModal = () => {
  this.props.setPopup(false)
 
 
  this.toggleScrollLock();
};
onKeyDown = (event) => {
if (event.keyCode === 27) {
  this.closeModal();
  }
 };
onClickOutside = (event) => {
 if (this.modal && this.modal.contains(event.target)) return;
 this.closeModal();
 };
toggleScrollLock = () => {
 document.querySelector('html').classList.toggle('scroll-lock');
};
render() {
return (
  <React.Fragment>
  
{ this.props.popup ? (
  <Modal firebase={this.props.firebase}
  user={this.props.user } setUser={this.props.setUser} 
  onSubmit={this.props.onSubmit}
  modalRef={(n) => (this.modal = n)}
  buttonRef={(n) => (this.closeButton = n)}
  closeModal={this.closeModal}
  onKeyDown={this.onKeyDown}
  onClickOutside={this.onClickOutside}
  />
) : null}
</React.Fragment>
  );
 }
}
export default Container;