import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sidebar } from '../App/Sidebar';
import { Header } from '../App/Header';
import { ContentContainer, GeralContainer } from '../Profile/styles';
import { StyledDiv } from '../Signup/styles';
import { api } from '../../lib/axios/axios';
import { ChartContainer, StyledCard } from './styles';

export const Timeline: React.FC = () => {
    const [loginData, setLoginData] = useState<any[]>([]);

    useEffect(() => {
        const userId = localStorage.getItem('loggedInUserId');
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }
        api.get(`/login-history/${userId}`)
            .then(response => {
                const organizedData = response.data.map((item: any) => {
                    const date = new Date(item.login_time);
                    const numericTime = date.getHours() + date.getMinutes() / 60;
                    return {
                        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                        time: numericTime
                    };
                });

                setLoginData(organizedData);
            })
            .catch(error => {
                console.error("Error fetching login history", error);
            });
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar/>
            <ContentContainer>
                <Header activeScreen="Perfil" fullWidth />
                <GeralContainer>
                    <StyledDiv>
                        <h2>Hora de Login</h2>
                    </StyledDiv>
                    <StyledDiv>
                        <div>
                            <StyledCard>
                                <ChartContainer>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={loginData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis domain={[0, 24]} />
                                            <Tooltip
                                                formatter={(value, name) => {
                                                    if (typeof value === "number") {
                                                        const hours = Math.floor(value);
                                                        const minutes = Math.floor((value - hours) * 60);
                                                        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
                                                        return [formattedTime, name];
                                                    } else {
                                                        return [value.toString(), name];
                                                    }
                                                }}
                                            />
                                            <Line type="monotone" dataKey="time" stroke="darkgreen" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </StyledCard>
                        </div>
                    </StyledDiv>
                </GeralContainer>
            </ContentContainer>
        </div>
    );
}
