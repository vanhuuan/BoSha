import * as React from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import {useEffect} from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// import { orderService } from '../../services/order.services';

const PaymentFaild = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId')
    useEffect(() => {
        // orderService.notifyFailed(orderId);
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