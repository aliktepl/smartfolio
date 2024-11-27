import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";

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
    // Calculate the min and max price for the Y-axis scale
    const minPrice = Math.min(...lineChartData.map((data) => data.price));
    const maxPrice = Math.max(...lineChartData.map((data) => data.price));

    // Optionally format the price values on the Y-axis
    const formatPrice = (value: number) => {
        return `$${value}`;
    };

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
                            angle={-45}
                            textAnchor="end"
                        />
                        <YAxis
                            domain={[minPrice - (maxPrice - minPrice) * 0.05, maxPrice + (maxPrice - minPrice) * 0.05]}  // Add a buffer to the price range
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={formatPrice} // Format Y-axis ticks as currency
                        />
                        <ChartTooltip cursor content={<ChartTooltipContent/>}/>
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
