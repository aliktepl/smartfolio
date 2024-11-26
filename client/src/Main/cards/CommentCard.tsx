import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export interface Comment {

}

export function CommentCard({comment} : {comment: Comment}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>

                </CardTitle>
                <CardDescription>

                </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
    )
}