import React from 'react';
import InfoCards from '../components/dashboard/InfoCards';
import InfoChart from '../components/dashboard/InfoChart';
import TableList from '../components/dashboard/TableList';
import DoughnutChart from '../components/dashboard/DoughnutChart';

function Dashboard() {
  return (
    <div>
      <InfoCards />

      <div className="row mt-4">
        <div className="col-12 col-lg-9 mb-4">
          <InfoChart />
        </div>

        <div className="col-12 col-lg-3">
          <DoughnutChart />
        </div>
      </div>
      <TableList />
    </div>
  );
}

export default Dashboard;
