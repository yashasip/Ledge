import { useContext, useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { withScreenSize } from "@visx/responsive";
import { OverlayTrigger,Tooltip } from "react-bootstrap";

import BudgetContext from "../context/Budget/BudgetContext";



function BudgetGraph() {
  const budgetContext = useContext(BudgetContext);
  const budgetData = [
    { marker: "Available", amount: Math.max(budgetContext.budget.budgetAmount - budgetContext.budget.budgetSpent, 0), color: "#62F163" },
    { marker: "Spent", amount: budgetContext.budget.budgetSpent, color: "#FE0002" },
  ];

  const width = 60;
  const half = width / 2;
  const [active, setActive] = useState(null);
  return (
    <div>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>
            {" "}
            {"Remains: " +
              Math.max(
                budgetContext.budget.budgetAmount -
                  budgetContext.budget.budgetSpent,
                0
              )}
            {",\nSpent: " +
              (budgetContext.budget.budgetSpent
                ? budgetContext.budget.budgetSpent
                : 0)}
          </Tooltip>
        }
      >
        <svg width={width} height={width}>
          <Group top={half} left={half}>
            <Pie
              data={budgetData}
              pieValue={(data) => data.amount}
              outerRadius={half}
              innerRadius={({ data }) => {
                const size = active && active.marker === data.marker ? 9 : 8;
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
              <Text
                textAnchor="middle"
                verticalAnchor="middle"
                fill={
                  budgetContext.budget.budgetAmount <=
                  budgetContext.budget.budgetSpent
                    ? "#FE0002"
                    : "#62F163"
                }
              >
                {budgetContext.budget.budgetAmount ? (Math.min(
                  Math.floor(
                    (budgetContext.budget.budgetSpent /
                      budgetContext.budget.budgetAmount) *
                      100
                  ),
                  100
                ) + "%"): ''}
              </Text>
            </>
          </Group>
        </svg>
      </OverlayTrigger>
    </div>
  );
}

export default withScreenSize(BudgetGraph);
