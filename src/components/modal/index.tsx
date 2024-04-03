import React, { useEffect } from 'react';
import { Modal } from 'antd';
interface ModalModel {
  status: boolean;
  bgColor: string;
  component: JSX.Element;
  toggle: Function;
  width?: string;
  className?:string;
  size?:string
}
  
export const CustomModal = (props: ModalModel) => {

  return (
  //   <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  //   <p>Some contents...</p>
  //   <p>Some contents...</p>
  //   <p>Some contents...</p>
  // </Modal>
    <Modal 
      open={props.status} style={{width:props.size?props.size:'100px'}} footer={false}
      className='text-left px-0 mx-0 font-primary' width={props.size}
      centered onCancel={() => props.toggle()} 
    >
      {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
      {/* <ModalBody
        className={props.className?props.className:"text-center"}
        style={{
          background: props.bgColor,
          width: props.width,
          borderRadius: '8px',
        }}
      > */}
        {props.component}
      {/* </ModalBody> */}
    </Modal>
  );
};
