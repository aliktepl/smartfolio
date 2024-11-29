import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart.tsx";
import { Label, Pie, PieChart } from "recharts";

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

interface SentimentChartProps {
    pieChartData: Array<{ sentiment: string; entries: number }>;
    name: string
}

function SentimentChart({name, pieChartData }: SentimentChartProps) {
    const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const pos = pieChartData[0].entries
    const neutral = pieChartData[1].entries
    const neg = pieChartData[2].entries
    const maxSentiment = Math.max(pos, neutral, neg);
    let sentimentText = '';
    if (maxSentiment === pos) {
        sentimentText = 'Positive';
    } else if (maxSentiment === neg) {
        sentimentText = 'Negative';
    } else if (maxSentiment === neutral) {
        sentimentText = 'Neutral';
    }

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
                                                    {parseInt(String(maxSentiment), 10)}{"%"}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {sentimentText}
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
        </Card>
    );
}

export default SentimentChart;
