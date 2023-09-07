import { useState } from "react";
import { z } from "zod";
import { type AccountId } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Script from "next/script";

const header_map = {
  DAA: "Daily Active Accounts",
  MAA: "Monthly Active Accounts",
  MVT: "Monthly Average Transactions",
  DVT: "Daily Average Transactions",
} as const;

const metricsSchema = z.enum(["DAA", "MAA", "MVT", "DVT"]);
type Metric = z.infer<typeof metricsSchema>;

export function Stats({ accountId }: { accountId: AccountId }) {
  const [selectedMetric, setSelectedMetric] = useState<Metric>("MAA");

  if (!accountId) {
    return <div>Account not found</div>;
  }

  return (
    <div>
      <Select
        value={selectedMetric}
        onValueChange={(metric) => setSelectedMetric(metric as Metric)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="MAA" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(header_map).map(([metric, label]) => (
            <SelectItem key={metric} value={metric}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* <iframe */}
      {/*   src={`https://near.org/embed/y3k.near/widget/widgets.external.horizon_project_stats?project_name=${accountId}&selectedMetric=${selectedMetric}`} */}
      {/*   className="mt-4 h-[400px] w-full" */}
      {/* /> */}

      <Script src="https://unpkg.com/react@18/umd/react.development.js"></Script>
      <Script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js"></Script>

      <canvas id="myChart" className="relative w-full"></canvas>

      <Script id="chart">
        {`
    const initialState = {
      selectedMetric: "${header_map[selectedMetric] || header_map.MAA}",
      project_name: "${accountId}",
    };
    console.log(initialState);

    const colorGenerator = () => {
      const colors = [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(153, 102, 255)",
        "rgb(255, 159, 64)",
        "rgb(54, 162, 235)",
        "rgb(201, 203, 207)",
        "rgb(255, 205, 86)",
        "rgb(255, 99, 71)",
        "rgb(147, 112, 219)",
        "rgb(0, 128, 128)",
        "rgb(100, 149, 237)",
        "rgb(127, 255, 0)",
      ];

      let index = 0;

      return () => {
        if (index >= colors.length) {
          index = 0;
        }

        return colors[index++];
      };
    };

    const getBackgroundColor = colorGenerator();

    function filterByProjectName(arr, project_name) {
      return arr.filter((obj) => obj.PROJECT_NAME === project_name);
    }

    function sortByActivityDate(arr) {
      return arr.sort(
        (a, b) => new Date(a.ACTIVITY_DATE) - new Date(b.ACTIVITY_DATE)
      );
    }

    function parseUTCDate(dateString) {
      const [year, month, day] = dateString
        .split("-")
        .map((str) => parseInt(str, 10));
      // Subtract 1 from the month, as JavaScript months are zero-based
      const utcTimestamp = Date.UTC(year, month - 1, day);
      return new Date(utcTimestamp);
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    function updateProcessedData(filteredSortedData, selectedMetric) {
      const processedData = [];

      filteredSortedData.forEach((datum) => {
        if (!datum.ACTIVITY_DATE) {
          return;
        }

        const activity_date = parseUTCDate(datum.ACTIVITY_DATE);

        const month =
          months[
          parseInt(activity_date.toISOString().slice(0, 10).split("-")[1]) - 1
          ];

        let monthData = processedData.find((data) => data.label === month);

        if (!monthData) {
          monthData = {
            label: month,
            data: {},
            backgroundColor: getBackgroundColor(),
          };
          processedData.push(monthData);
        }

        monthData.data[activity_date.toISOString().slice(0, 10)] =
          datum[selectedMetric];
      });

      return processedData;
    }

    async function fetchData() {
      let response = await fetch(
        "https://api.flipsidecrypto.com/api/v2/queries/367eedd4-b79d-4cf8-929a-178bbcb0a4e4/data/latest",
        {
          subscribe: true,
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        }
      );

      let data = await response.json();

      const filteredData =
        filterByProjectName(data, initialState.project_name) || [];
      const filteredSortedData = sortByActivityDate(filteredData) || [];

      let newProcessedData = updateProcessedData(
        filteredSortedData,
        initialState.selectedMetric
      );

      newProcessedData = sortByActivityDate(newProcessedData) || [];
      console.log("newProcessedData");
      console.log(newProcessedData);

      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: months,
          datasets: newProcessedData,
        },
        options: {
          scales: {
            y: {
              stacked: true,
              grid: {
                color: "rgb(41,51,64)", // This will change the gridline color
                borderColor: "rgb(240,255,240)",
              },
              ticks: {
                color: "rgb(0,0,0)", // This will change the axis text label color
              },
            },
            x: {
              stacked: true,
              grid: {
                color: "rgb(41,51,64)", // This will change the gridline color
              },
              ticks: {
                color: "rgb(0,0,0)", // This will change the axis text label color
              },
            },
          },
        },
      });
    }

    fetchData();`}
      </Script>
    </div>
  );
}
