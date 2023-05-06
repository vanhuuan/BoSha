import * as React from 'react';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { buyBookService } from '../../services/buybook.services';
// import { orderService } from '../../services/order.services';

const PaymentFaild = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('validToken')
    let navigate = useNavigate()
    useEffect(() => {
        buyBookService.notifyFailed(orderId).then((rs) => {
            navigate("/book/"+rs.data)
        }).catch((e) => { navigate("/")})
    }, []);

    return(
        <>
            <Alert severity="error">
                <AlertTitle><strong>Thanh toán thất bại</strong></AlertTitle>
                Hãy quay lại ứng dụng
            </Alert>
        </>
    )
}

export default PaymentFaild;