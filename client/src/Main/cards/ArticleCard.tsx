import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

interface Article {
    source: string;
    time: string;
    headline: string;
}

function ArticleCard({article} : {article: Article}) {
    return (
        <div className="mb-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {article.source}
                    </CardTitle>
                    <CardDescription>
                        {article.time}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {article.headline}
                </CardContent>
            </Card>
        </div>
    );
}

export default ArticleCard