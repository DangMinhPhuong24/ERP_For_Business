import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    appShowToastStatusState,
    appToastMessageState,
    appToastIsSuccessState
} from "../../redux/app/app.selectors";
import { showToastAction } from '../../redux/app/app.actions';

const Toast = () => {
    const isShowToast = useSelector(appShowToastStatusState);
    const message = useSelector(appToastMessageState);
    const isSuccess = useSelector(appToastIsSuccessState);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (isShowToast) {
            if (isSuccess === 'success') {
                toast.success(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => dispatch(showToastAction(false)),
                });
            } else {
                toast.error(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => dispatch(showToastAction(false)),
                });
            }
        }
    }, [isShowToast, isSuccess, message, dispatch]);

    return <ToastContainer />;
}

export default Toast;
