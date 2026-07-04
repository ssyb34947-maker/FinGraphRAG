import akshare as ak
from typing import Optional, List
from .base import BaseFetcher, ResearchReport


class StockResearchFetcher(BaseFetcher):
    def fetch(self, symbol: str = None, **kwargs) -> List[ResearchReport]:
        """
        获取股票研报数据

        Args:
            symbol: 股票代码，如 "603777"；如不提供则获取全部

        Returns:
            研报列表，每个元素包含 title, date, stock_code, stock_name, rating, institution, industry, pdf_url
        """
        df = ak.stock_research_report_em(symbol=symbol if symbol else "")

        report_list = []
        for _, row in df.iterrows():
            report = ResearchReport(
                title=str(row.get("报告名称", "")),
                date=str(row.get("日期", "")),
                stock_code=str(row.get("股票代码", "")),
                stock_name=str(row.get("股票简称", "")),
                rating=str(row.get("东财评级", "")),
                institution=str(row.get("机构", "")),
                industry=str(row.get("行业", "")),
                pdf_url=str(row.get("报告PDF链接", ""))
            )
            report_list.append(report)

        return report_list


def get_stock_research(symbol: str = None, save_path: Optional[str] = None) -> List[ResearchReport]:
    """
    获取股票研报数据（便捷函数）

    Args:
        symbol: 股票代码，如 "603777"；如不提供则获取全部
        save_path: 保存路径，如提供则将研报保存为 CSV 文件

    Returns:
        研报列表
    """
    fetcher = StockResearchFetcher()
    report_list = fetcher.fetch(symbol=symbol)

    if save_path:
        fetcher.save_to_csv(report_list, save_path)

    return report_list
