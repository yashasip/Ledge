// import React, { useMemo, useCallback } from "react";
// import { AreaClosed, Line, Bar } from "@visx/shape";
// import { Group } from "@visx/group";
// import { Text } from "@visx/text";
// import { withScreenSize } from "@visx/responsive";

// function TrackGraph() {
//   return (
//     <div>
//       <svg width={width} height={height}>
//         <rect
//           x={0}
//           y={0}
//           width={width}
//           height={height}
//           fill="url(#area-background-gradient)"
//           rx={14}
//         />
//         <GridRows
//           left={margin.left}
//           scale={stockValueScale}
//           width={innerWidth}
//           strokeDasharray="1,3"
//           stroke={accentColor}
//           strokeOpacity={0}
//           pointerEvents="none"
//         />
//         <GridColumns
//           top={margin.top}
//           scale={dateScale}
//           height={innerHeight}
//           strokeDasharray="1,3"
//           stroke={accentColor}
//           strokeOpacity={0.2}
//           pointerEvents="none"
//         />
//         <Bar
//           x={margin.left}
//           y={margin.top}
//           width={innerWidth}
//           height={innerHeight}
//           fill="transparent"
//           rx={14}
//           onTouchStart={handleTooltip}
//           onTouchMove={handleTooltip}
//           onMouseMove={handleTooltip}
//           onMouseLeave={() => hideTooltip()}
//         />
//         {tooltipData && (
//           <g>
//             <Line
//               from={{ x: tooltipLeft, y: margin.top }}
//               to={{ x: tooltipLeft, y: innerHeight + margin.top }}
//               stroke={accentColorDark}
//               strokeWidth={2}
//               pointerEvents="none"
//               strokeDasharray="5,2"
//             />
//             <circle
//               cx={tooltipLeft}
//               cy={tooltipTop + 1}
//               r={4}
//               fill="black"
//               fillOpacity={0.1}
//               stroke="black"
//               strokeOpacity={0.1}
//               strokeWidth={2}
//               pointerEvents="none"
//             />
//             <circle
//               cx={tooltipLeft}
//               cy={tooltipTop}
//               r={4}
//               fill={accentColorDark}
//               stroke="white"
//               strokeWidth={2}
//               pointerEvents="none"
//             />
//           </g>
//         )}
//       </svg>
//       {tooltipData && (
//         <div>
//           <TooltipWithBounds
//             key={Math.random()}
//             top={tooltipTop - 12}
//             left={tooltipLeft + 12}
//             style={tooltipStyles}
//           >
//             {`$${getStockValue(tooltipData)}`}
//           </TooltipWithBounds>
//           <Tooltip
//             top={innerHeight + margin.top - 14}
//             left={tooltipLeft}
//             style={{
//               ...defaultStyles,
//               minWidth: 72,
//               textAlign: "center",
//               transform: "translateX(-50%)",
//             }}
//           >
//             {formatDate(getDate(tooltipData))}
//           </Tooltip>
//         </div>
//       )}
//     </div>
//   );
// }

// export default withScreenSize(TrackGraph)
