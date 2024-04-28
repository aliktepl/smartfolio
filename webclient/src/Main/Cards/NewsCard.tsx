import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";

function NewsCard(article, index) {
    return (
        <div key={index}>
            <Card>
                <CardHeader>
                    {article.source}
                </CardHeader>
                <CardContent>
                    {article.headline}
                </CardContent>
            </Card>
            {/*<h3 className="font-semibold">{article.source}</h3>*/}
            {/*<p>{article.headline}</p>*/}
        </div>
    )
}

export default NewsCard;