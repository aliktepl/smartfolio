import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {CartesianGrid, Line, LineChart, XAxis} from "recharts";

const lineChartConfig = {
    price: {
        label: "Price",
        color: "hsl(var(--chart-blue))",
    },
} satisfies ChartConfig;

interface TechnicalChartProps {
    lineChartData: Array<{ time: string; price: number }>;
}

function TechnicalChart({lineChartData}: TechnicalChartProps): JSX.Element {
    return (
        <Card className="flex flex-col bg-transparent border-0">
            <CardHeader className="items-center pb-0">
                <CardTitle>Technical Analysis</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={lineChartConfig}>
                    <LineChart
                        data={lineChartData}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 20,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor
                            content={<ChartTooltipContent/>}
                        />
                        <Line
                            dataKey="price"
                            type="monotone"
                            stroke="hsl(var(--chart-blue))"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default TechnicalChart;