import akshare as ak
from typing import Optional, List
from .base import BaseFetcher, Disclosure


class StockDisclosureFetcher(BaseFetcher):
    def fetch(self, symbol: str = None, **kwargs) -> List[Disclosure]:
        """
        获取上市公司公告数据

        Args:
            symbol: 股票代码，如 "603777"；如不提供则获取全部

        Returns:
            公告列表，每个元素包含 title, date, stock_code, stock_name, url
        """
        df = ak.stock_zh_a_disclosure_report_cninfo()

        if symbol:
            df = df[df["代码"] == symbol]
            if df.empty:
                df = ak.stock_zh_a_disclosure_report_cninfo()

        disclosure_list = []
        for _, row in df.iterrows():
            disclosure = Disclosure(
                title=str(row.get("公告标题", "")),
                date=str(row.get("公告时间", "")),
                stock_code=str(row.get("代码", "")),
                stock_name=str(row.get("简称", "")),
                url=str(row.get("公告链接", ""))
            )
            disclosure_list.append(disclosure)

        return disclosure_list


def get_stock_disclosure(symbol: str = None, save_path: Optional[str] = None) -> List[Disclosure]:
    """
    获取上市公司公告数据（便捷函数）

    Args:
        symbol: 股票代码，如 "603777"；如不提供则获取全部
        save_path: 保存路径，如提供则将公告保存为 CSV 文件

    Returns:
        公告列表
    """
    fetcher = StockDisclosureFetcher()
    disclosure_list = fetcher.fetch(symbol=symbol)

    if save_path:
        fetcher.save_to_csv(disclosure_list, save_path)

    return disclosure_list
