import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { withScreenSize } from "@visx/responsive";

const budgetData = [
  { marker: "Available", amount: 600, color: "#62F163" },
  { marker: "Spent", amount: 400, color: "#FE0002" },
];


function BudgetGraph() {
  const width = 60;
  const half = width / 2;
  const [active, setActive] = useState(null);
  return (
    <div>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={budgetData}
            pieValue={(data) => data.amount}
            outerRadius={half}
            innerRadius={({ data }) => {
              const size = active && active.marker == data.marker ? 12 : 8;
              return half - size;
            }}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.marker}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {" "}
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>
          <>
            <Text textAnchor="middle" verticalAnchor="middle" fill="#62F163">
              {"60%"}
            </Text>
          </>
        </Group>
      </svg>
    </div>
  );
}

export default withScreenSize(BudgetGraph);
