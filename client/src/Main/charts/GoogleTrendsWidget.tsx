const GoogleTrendsWidget = ({ keyword = 'bitcoin', geo = '', time = 'now 7-d' }) => {
    // Construct the iframe URL with query parameters
    const trendsEmbedUrl = `/trends-widget.html?keyword=${encodeURIComponent(keyword)}&geo=${geo}&time=${time}`;

    return (
        <div className="w-full md:h-[350px] h-[300px] overflow-hidden relative">
            <iframe
                src={trendsEmbedUrl}
                title="Google Trends Widget"
                className="w-full h-full border-0 dark:hue-rotate-180 dark:invert"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
            ></iframe>
        </div>
    );
};

export default GoogleTrendsWidget;