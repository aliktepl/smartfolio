function NewsCard(article, index) {
    return (
        <div key={index} className="bg-gray-800 p-4 rounded">
            <h3 className="font-semibold">{article.source}</h3>
            <p>{article.headline}</p>
        </div>
    )
}

export default NewsCard;