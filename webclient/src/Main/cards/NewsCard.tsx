import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

function NewsCard({article}) {
    return (
        <div className={'mb-4'}>
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
            {/*<h3 className="font-semibold">{article.source}</h3>*/}
            {/*<p>{article.headline}</p>*/}
        </div>
    );
}

export default NewsCard;