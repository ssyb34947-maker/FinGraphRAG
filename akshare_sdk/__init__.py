from .base import Article, ResearchReport, Disclosure, BaseFetcher
from .stock_news import StockNewsFetcher, get_stock_news
from .stock_research import StockResearchFetcher, get_stock_research
from .stock_disclosure import StockDisclosureFetcher, get_stock_disclosure
from .utils import to_text, generate_filename, ensure_directory


__all__ = [
    "Article",
    "ResearchReport",
    "Disclosure",
    "BaseFetcher",
    "StockNewsFetcher",
    "get_stock_news",
    "StockResearchFetcher",
    "get_stock_research",
    "StockDisclosureFetcher",
    "get_stock_disclosure",
    "to_text",
    "generate_filename",
    "ensure_directory",
]


class AKShareClient:
    def __init__(self):
        self.news_fetcher = StockNewsFetcher()
        self.research_fetcher = StockResearchFetcher()
        self.disclosure_fetcher = StockDisclosureFetcher()

    def get_news(self, symbol: str, save_path: str = None):
        return get_stock_news(symbol, save_path)

    def get_research(self, symbol: str = None, save_path: str = None):
        return get_stock_research(symbol, save_path)

    def get_disclosure(self, symbol: str = None, save_path: str = None):
        return get_stock_disclosure(symbol, save_path)

    def fetch_all(self, symbol: str, save_dir: str = None):
        news = self.get_news(symbol)
        research = self.get_research(symbol)
        disclosure = self.get_disclosure(symbol)

        if save_dir:
            ensure_directory(save_dir)
            if news:
                self.news_fetcher.save_to_csv(news, os.path.join(save_dir, f"news_{symbol}.csv"))
            if research:
                self.research_fetcher.save_to_csv(research, os.path.join(save_dir, f"research_{symbol}.csv"))
            if disclosure:
                self.disclosure_fetcher.save_to_csv(disclosure, os.path.join(save_dir, f"disclosure_{symbol}.csv"))

        return {
            "news": news,
            "research": research,
            "disclosure": disclosure
        }


import os
