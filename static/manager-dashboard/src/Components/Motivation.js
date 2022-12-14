import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import RadarChart from '../shared/RadarChart';
import './Motivation.css';
import { Grid, Card, CardHeader } from '@mui/material';

/**
 * Motivation page in manager dashboard.
 * @returns {*} Component with two radar charts of motivators and demotivators
 */
function Motivation() {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getMotivation').then(setData);
  }, []);

  /**
   * Title of motivators, to show in the radar chart.
   * @enum {string}
   */
  const motivatorsLabelEnum = {
    m1: 'Rewards and incentives',
    m2: 'Development needs addressed',
    m3: 'Variety of work',
    m4: 'Career path',
    m5: 'Empowerment',
    m6: 'Good management',
    m7: 'Sense of belonging',
    m8: 'Work/life balance',
    m9: 'Working in successful company',
    m10: 'Employee involvement',
    m11: 'Feedback',
    m12: 'Recognition',
    m13: 'Equity',
    m14: 'Trust',
    m15: 'Technically challenging work',
    m16: 'Job security',
    m17: 'Identify with the task',
    m18: 'Autonomy',
    m19: 'Appropriate working conditions',
    m20: 'Task significance',
    m21: 'Sufficient resources',
  };

  /**
   * Title of demotivators, to show in the radar chart.
   * @enum {string}
   */
  const deMotivatorsLabelEnum = {
    d1: 'Risk',
    d2: 'Stress',
    d3: 'Inequity',
    d4: 'Interesting work going to other parties',
    d5: 'Unfair reward system',
    d6: 'Lack of promotion opportunities',
    d7: 'Poor communication',
    d8: 'Uncompetitive pay',
    d9: 'Unrealistic goals',
    d10: 'Bad relationship with users and colleagues',
    d11: 'Poor working environment',
    d12: 'Poor management',
    d13: 'Producing poor quality software',
    d14: 'Poor cultural fit',
    d15: 'Lack of influence',
  };

  const motivatorLabels = [];
  const motivatorDataPoints = [];
  const deMotivatorLabels = [];
  const deMotivatorDataPoints = [];

  if (data != null) {
    for (const property in data.motivators) {
      //console.log(property, data.motivators[property]);
      motivatorLabels.push(motivatorsLabelEnum[`${property}`]); // push the label of motivators from enum
      motivatorDataPoints.push(data.motivators[`${property}`]); // push the count of motivators from data
    }

    for (const property in data.deMotivators) {
      deMotivatorLabels.push(deMotivatorsLabelEnum[`${property}`]); // push the label of demotivators from enum
      deMotivatorDataPoints.push(data.deMotivators[`${property}`]); // push the count of demotivators from data
    }
  }
  // radar chart colours
  const motBorderColour = 'rgb(54, 162, 235)'; // blue
  const motBackgroundColour = 'rgba(54, 162, 235, 0.2)';
  const demotBorderColour = 'rgb(255, 99, 132)'; // red
  const demotBackgroundColour = 'rgba(255, 99, 132, 0.2)';

  return (
    <Grid container spacing={2} className="page">
      <Grid item xs={12}>
        <Card
          variant="outlined"
          className="card-graph"
          sx={{ borderRadius: 2 }}
        >
          <CardHeader title={'Motivators'} />
          <RadarChart
            name="Motivators"
            labels={motivatorLabels}
            dataPoints={motivatorDataPoints}
            borderColour={motBorderColour}
            backgroundColour={motBackgroundColour}
          />
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card
          variant="outlined"
          className="card-graph"
          sx={{ borderRadius: 2 }}
        >
          <CardHeader title={'Demotivators'} />
          <RadarChart
            name="Demotivators"
            labels={deMotivatorLabels}
            dataPoints={deMotivatorDataPoints}
            borderColour={demotBorderColour}
            backgroundColour={demotBackgroundColour}
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default Motivation;
