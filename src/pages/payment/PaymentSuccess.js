import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { buyBookService } from '../../services/buybook.services';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId2 = searchParams.get('validToken')
    let navigate = useNavigate()
    useEffect(() => {
        buyBookService.notifySuccess(orderId2).then((rs) => {
            navigate("/book/"+rs.data)
        }).catch((e) => { navigate("/")})
    }, []);
    return (
        <>
            <Alert severity="success">
                <AlertTitle><strong>Thanh toán thành công</strong></AlertTitle>
                Hãy quay lại ứng dụng!
            </Alert>
        </>
    )
}

export default PaymentSuccess