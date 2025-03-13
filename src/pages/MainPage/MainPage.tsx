import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import "./MainPage.scss";
import CustomTable from "../../components/CustomTable/CustomTable";

const MainPage = () => {

  return (
    <div className="main-page">

      <div className="charts">
        <CustomPieChart />
        <CustomBarChart />
      </div>

      <div className="table">
        <CustomTable />
      </div>
    </div>
  );
};

export default MainPage;
