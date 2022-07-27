/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom';
import data from './data.json';
import DataTable from 'react-data-table-component';
import Chart from "react-google-charts";
import CanvasJSReact from  '../../assets/admin/js/canvasjs.react.js';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Phone',
      selector: 'phone',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'DOB',
      selector: 'dob',
    },
  ];

  


const Dashboard = () => {

    const options = {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "Number of Product Sold"
        },
        axisY: {
            title: "Number of Service ( in Million )",
            includeZero: false,
        },
        data: [
        {
            type: "area",
            xValueFormatString: "YYYY",
            yValueFormatString: "#,##0.## Million",
            dataPoints: [
                { x: new Date(2017, 0), y: 7.6},
                { x: new Date(2016, 0), y: 7.3},
                { x: new Date(2015, 0), y: 6.4},
                { x: new Date(2014, 0), y: 5.3},
                { x: new Date(2013, 0), y: 4.5},
                { x: new Date(2012, 0), y: 3.8},
                { x: new Date(2011, 0), y: 3.2}
            ]
        }
        ]
    }

    
    return (
        <div>
            <main>
                   <div className="container-fluid px-4">
                   <h1 className="mt-4">Dashboard</h1>
                       
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Primary Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                <Link className="small text-white stretched-link" to="#">View Details</Link>
                                <div className="small text-white"><i className="fas fa-angle-right" /></div>
                                </div>
                            </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Warning Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                <Link className="small text-white stretched-link" to="#">View Details</Link>
                                <div className="small text-white"><i className="fas fa-angle-right" /></div>
                                </div>
                            </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">Success Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                <Link className="small text-white stretched-link" to="#">View Details</Link>
                                <div className="small text-white"><i className="fas fa-angle-right" /></div>
                                </div>
                            </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                            <div className="card bg-danger text-white mb-4">
                                <div className="card-body">Danger Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                <Link className="small text-white stretched-link" to="#">View Details</Link>
                                <div className="small text-white"><i className="fas fa-angle-right" /></div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6">
                            <div className="card mb-4">
                                <div className="card-header" style={{paddingTop:"20px"}}>
                                <i className="fas fa-chart-area me-1" />
                                Area Chart Example
                                </div>
                                <div className="card-body">
                                <Chart
                                width={'700px'}
                                height={'500px'}
                                chartType="AreaChart"
                                loader={<div>Loading Area Chart</div>}
                                data={[
                                    ['Student', 'English', 'Maths', 'History', 'Geography'],
                                    ['A', 80, 70, 45, 87],
                                    ['B', 90, 47, 88, 90],
                                    ['C', 88, 67, 82, 95],
                                    ['D', 50, 70, 56, 63]
                                ]}
                                options={{
                                    title: 'Company Performance',
                                    hAxis: { title: 'Customers', titleTextStyle: { color: '#333' } },
                                    vAxis: { minValue: 0 },
                                    chartArea: { width: '50%', height: '50%' },
                                }}
                            />
                                </div>
                            </div>
                            </div>
                            <div className="col-xl-6">
                            <div className="card mb-4">
                                <div className="card-header" style={{paddingTop:"20px"}}>
                                <i className="fas fa-chart-bar me-1" />
                                Bar Chart Example
                                </div>
                                <div className="card-body">
                                <CanvasJSChart options = {options} 
                                    /* onRef={ref => this.chart = ref} */
                                />
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-header" style={{paddingTop:"20px"}}>
                                <h4>DataTable</h4>
                            </div>
                            <div className="card-body">
                            <DataTable
                                title="Customers List"
                                columns={columns}
                                data={data}
                                pagination
                                highlightOnHover
                            />
                            </div>
                        </div>
                    </div>

                </main>
        </div>
    )
}

export default Dashboard