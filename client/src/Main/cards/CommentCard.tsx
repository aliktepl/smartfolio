import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";

export interface Comment {
    title: string;
    url: string;
    username: string;
}

export function CommentCard({comment}: { comment: Comment }) {
    return (
        <Link to={comment.url} viewTransition>
            <Card className="mb-4 w-full h-full hover:scale-105 transition-transform">
                <CardHeader>
                    <CardDescription>
                        {comment.username}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {comment.title}
                </CardContent>
            </Card>
        </Link>
    )
}