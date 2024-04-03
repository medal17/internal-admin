// import { CustomModal } from '.';
// import { UserInfoModalProps } from '../../../../anambra-budget-app/src/modules/dashboard/settings/UserInfoModal';

// interface ActionModalProps extends UserInfoModalProps {
//   modalTitle: string;
//   subTitle: string;
//   btnTitle: string;
//   handleAction?: () => void;
//   icon?: JSX.Element;
//   extraButton?: boolean;
//   handleCancel?: () => void;
//   loading?: boolean;
// }

// const ActionModal = ({
//   isOpen,
//   bgColor,
//   handleToggle,
//   width,
//   modalTitle,
//   subTitle,
//   btnTitle,
//   handleAction,
//   icon,
//   extraButton,
//   handleCancel,
//   loading,
// }: ActionModalProps) => {
//   return (
//     <CustomModal
//       status={isOpen}
//       bgColor={bgColor}
//       toggle={handleToggle}
//       width={width}
//       component={
//         <div className="action__modal">
//           {icon}
//           <h3>{modalTitle}</h3>
//           <p>{subTitle}</p>
//           <div>
//             <button onClick={handleAction}>
//               {loading ? (
//                 <div className="d-flex align-items-middle py-2">
//                   <span className="dots-1 my-auto"></span>
//                 </div>
//               ) : (
//                 btnTitle
//               )}
//             </button>
//             {extraButton && <button onClick={handleCancel}>Cancel</button>}
//           </div>
//         </div>
//       }
//     />
//   );
// };

// export default ActionModal;
