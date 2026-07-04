import os
from typing import List, Any


def ensure_directory(path: str) -> None:
    os.makedirs(path, exist_ok=True)


def generate_filename(prefix: str, symbol: str = None, ext: str = "csv") -> str:
    if symbol:
        return f"{prefix}_{symbol}.{ext}"
    return f"{prefix}.{ext}"


def to_text(articles: List[Any]) -> str:
    """
    将文章列表转换为纯文本格式，用于 GraphRAG 处理

    Args:
        articles: 文章列表（Article, ResearchReport, Disclosure）

    Returns:
        合并后的纯文本
    """
    texts = []
    for item in articles:
        if hasattr(item, "content"):
            texts.append(f"标题: {item.title}\n日期: {item.date}\n来源: {item.source}\n内容:\n{item.content}\n\n")
        elif hasattr(item, "institution"):
            texts.append(f"报告标题: {item.title}\n日期: {item.date}\n股票: {item.stock_name}({item.stock_code})\n机构: {item.institution}\n评级: {item.rating}\n行业: {item.industry}\n\n")
        else:
            texts.append(f"公告标题: {item.title}\n日期: {item.date}\n股票: {item.stock_name}({item.stock_code})\n\n")
    
    return "\n".join(texts)
