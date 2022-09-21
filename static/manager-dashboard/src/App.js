import PerformancePieChart from './Components/PerformancePieChart';
import PerformanceSatisfactionBarChart from './Components/PerformanceSatisfactionBarChart';
import Motivation from './Components/Motivation';

function App() {
    return (
        <div>
            <Motivation/>
            <PerformancePieChart/>
            <PerformanceSatisfactionBarChart/>
        </div>
    );
}

export default App;