import React, { useEffect, useState } from 'react';
import authService from './api-authorization/AuthorizeService';

const Dashboard = () => {
    const [financialData, setFinancialData] = useState([]);
    const [loading, setLoading] = useState(true);

    const populateFinancialData = async () => {
        const token = await authService.getAccessToken();
        const response = await fetch('api/dashboard', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        setFinancialData(data);
        setLoading(false);
    };

    useEffect(() => {
        populateFinancialData();
    }, []);

    const renderFinancialDataTable = (data) => {
        return (
            <table className='table table-striped' aria-labelledby='tableLabel'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.category}</td>
                            <td>{item.amount}</td>
                            <td>{item.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const contents = loading ? (
        <p>
            <em>Loading...</em>
        </p>
    ) : (
        renderFinancialDataTable(financialData)
    );

    return (
        <div>
            <h1 id='tableLabel'>Financial Data</h1>
            <p>Welcome to your financial dashboard.</p>
            {contents}
        </div>
    );
};

export default Dashboard;
