import akshare as ak
from typing import Optional, List
from .base import BaseFetcher, Article


class StockNewsFetcher(BaseFetcher):
    def fetch(self, symbol: str, **kwargs) -> List[Article]:
        """
        获取指定股票的新闻数据

        Args:
            symbol: 股票代码，如 "603777"

        Returns:
            新闻列表，每个元素包含 title, date, content, url, source
        """
        df = ak.stock_news_em(symbol=symbol)

        news_list = []
        for _, row in df.iterrows():
            news = Article(
                title=str(row.get("新闻标题", "")),
                date=str(row.get("发布时间", "")),
                content=str(row.get("新闻内容", "")),
                url=str(row.get("新闻链接", "")),
                source=str(row.get("文章来源", ""))
            )
            news_list.append(news)

        return news_list


def get_stock_news(symbol: str, save_path: Optional[str] = None) -> List[Article]:
    """
    获取指定股票的新闻数据（便捷函数）

    Args:
        symbol: 股票代码，如 "603777"
        save_path: 保存路径，如提供则将新闻保存为 CSV 文件

    Returns:
        新闻列表
    """
    fetcher = StockNewsFetcher()
    news_list = fetcher.fetch(symbol=symbol)

    if save_path:
        fetcher.save_to_csv(news_list, save_path)

    return news_list
