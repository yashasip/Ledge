import { useContext, useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { withScreenSize } from "@visx/responsive";

import BudgetContext from "../context/Budget/BudgetContext";



function BudgetGraph() {
  const budgetContext = useContext(BudgetContext);
  const budgetData = [
    { marker: "Available", amount: budgetContext.budget.budgetAmount - budgetContext.budget.budgetSpent, color: "#62F163" },
    { marker: "Spent", amount: budgetContext.budget.budgetSpent, color: "#FE0002" },
  ];

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
              const size = active && active.marker === data.marker ? 12 : 8;
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
            <Text textAnchor="middle" verticalAnchor="middle" fill={budgetContext.budget.budgetAmount <= budgetContext.budget.budgetSpent ? '#FE0002' : "#62F163"}>
              {Math.floor(budgetContext.budget.budgetSpent /
                budgetContext.budget.budgetAmount * 100) +
                "%"}
            </Text>
          </>
        </Group>
      </svg>
    </div>
  );
}

export default withScreenSize(BudgetGraph);
