import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";

interface Article {
    source: string;
    link: string;
    title: string;
}

function ArticleCard({article} : {article: Article}) {
    return (
        <Link to={article.link} className="mb-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {article.source}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {article.title}
                </CardContent>
            </Card>
        </Link>
    );
}

export default ArticleCard