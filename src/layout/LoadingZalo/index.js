import React, {useEffect} from 'react';
import colors from '../../constants/colors';
import ReactLoading from "react-loading";
import '../../resource/style/loadingStyle.css';
import { useNavigate } from 'react-router-dom';
import {loginZaloAction} from "../../redux/auth/auth.actions";
import {useDispatch} from "react-redux";

function LoadingZalo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const oaId = params.get('oa_id');
        const code = params.get('code');

        if (oaId && code) {
            localStorage.setItem('zalo_code', code);
            dispatch(loginZaloAction({ code:code }));
            navigate('/sale/setting');
        }
    }, [navigate]);

    return(
        <div className="loading-wrapper">
            <ReactLoading type={"spinningBubbles"} color={colors.blueColor} height={"5%"} width={"5%"} />
        </div>
    )
}
export default LoadingZalo;
