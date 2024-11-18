import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart.tsx";
import { Label, Pie, PieChart } from "recharts";
import { TrendingUp } from "lucide-react";

const pieChartConfig = {
    entries: {
        label: "Sentiment",
    },
    positive: {
        label: "Positive",
        color: "hsl(var(--chart-green))",
    },
    neutral: {
        label: "Neutral",
        color: "hsl(var(--chart-grey))",
    },
    negative: {
        label: "Negative",
        color: "hsl(var(--chart-red))",
    },
} satisfies ChartConfig;

// Explicitly define the prop types for the component
interface SentimentChartProps {
    pieChartData: Array<{ sentiment: string; entries: number }>;
    name: string
}

function SentimentChart({name, pieChartData }: SentimentChartProps) {
    const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    // Calculate total sentiment entries
    const totalSentiment = pieChartData.reduce((total, entry) => total + entry.entries, 0);

    return (
        <Card className="flex flex-col bg-transparent border-0">
            <CardHeader className="items-center pb-0">
                <CardTitle>{name}</CardTitle>
                <CardDescription>{currentDate}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={pieChartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={pieChartData}
                            dataKey="entries"
                            nameKey="sentiment"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalSentiment.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Sentiment
                                                </tspan>
                                            </text>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}

export default SentimentChart;
