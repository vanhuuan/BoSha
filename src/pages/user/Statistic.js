import { Box, Card, Grid, TextField } from "@mui/material";
import React from "react";
import { CardSummary } from "../../components/chart/CardSumary";
import { CardBar } from "../../components/chart/CardBar";
import { BarChart } from "../../components/chart/BarChart";

export default function UserStatistic() {
    return (
        <Box>
            <Grid>
                <Grid container spacing={3}>
                    <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                        <CardSummary
                            title="Tổng thu nhập từ bán truyện"
                            value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(1000000)}
                            footer={<div>  </div>}
                        />
                    </Grid>
                    <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                        <CardSummary
                            title="Thu nhập thực tế của bạn "
                            value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(800000)}
                            footer={<div> 80% Tổng thu nhập từ bán truyện  </div>}
                        />
                    </Grid>
                    <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                        <CardSummary
                            title="Attendance"
                            value={`78%`}
                            footer={<div> 5% decrease from last week </div>}
                        />
                    </Grid>
                    <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                        <CardSummary
                            title="Total Points"
                            value={900}
                            footer={<div> 20% increase from last week </div>}
                        />
                    </Grid>
                    <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                        {/* <CardBar title="Activity" chart={<BarChart />} /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}