import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    percentage: {
        label: "Percentage",
        color: "hsl(var(--chart-blue))",
    },
} satisfies ChartConfig

// Explicitly define the prop types for the component
interface BarChartProps {
    barChartData: Array<{ grade: number; percentage: number; color?: string }>;
}

export function BarSentimentChart({barChartData} : BarChartProps) {
    return (
        <Card className='flex flex-col bg-transparent border-0'>
            <CardHeader>
                <CardTitle>Sentiment Breakdown</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={barChartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="grade"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="percentage"
                            radius={8}
                            fill={(entry) => entry.color || "hsl(var(--chart-blue))"} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
