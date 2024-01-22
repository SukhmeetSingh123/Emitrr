import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReport } from '../redux/progressReport/progressReport';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Card } from 'react-bootstrap';

const ProgressReport = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchReport());

        // Cleanup on component unmount
        return () => {
            if (Chart.helpers && Chart.helpers.each) {
                Chart.helpers.each(Chart.instances, (instance) => {
                    instance.destroy();
                });
            }
        };
    }, [dispatch]);

    const { report } = useSelector((state) => state.progressReport);

    // Sample data for the pie chart
    const data = {
        labels: ['Wrong Answer', 'Right Answer'],
        datasets: [
            {
                data: [report[0]?.wrongAnswers || 0, report[0]?.correctAnswers || 0],
                backgroundColor: ['#FF6347', '#32CD32'],
            },
        ],
    };
    // Set options for the Pie chart
    const options = {
        responsive: true,
    };

    return (
        <Card style={{ maxWidth: '400px', margin: 'auto' }}>
        <Card.Body>
          <Card.Title>Progress Report</Card.Title>
          {report && <Pie data={data} options={options} />}
  
          <Card.Subtitle className="mt-3 mb-2 text-muted">Chosen Languages</Card.Subtitle>
          {report && report[0]?.choosenLanguages && (
            <ul>
              {report[0].choosenLanguages.slice(1).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          )}
  
          <Card.Text className="mt-3">
            Correct Answers: {report[0]?.correctAnswers || 0} | Wrong Answers: {report[0]?.wrongAnswers || 0}
          </Card.Text>
        </Card.Body>
      </Card>
    );
};

export default ProgressReport;
