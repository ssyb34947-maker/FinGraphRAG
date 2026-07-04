import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from akshare_sdk import get_stock_news


def generate_stock_news_txt(symbol: str, output_dir: str) -> str:
    """
    获取股票新闻并生成为 txt 文件

    Args:
        symbol: 股票代码，如 "603777"
        output_dir: 输出目录

    Returns:
        生成的文件路径
    """
    news_list = get_stock_news(symbol=symbol)

    if not news_list:
        print(f"警告：股票 {symbol} 没有获取到新闻数据")
        return None

    os.makedirs(output_dir, exist_ok=True)

    output_path = os.path.join(output_dir, f"{symbol}.txt")

    with open(output_path, "w", encoding="utf-8") as f:
        for i, news in enumerate(news_list, 1):
            f.write(f"=== 新闻 {i} ===\n")
            f.write(f"时间戳: {news.date}\n")
            f.write(f"标题: {news.title}\n")
            f.write(f"来源: {news.source}\n")
            f.write(f"正文:\n{news.content}\n")
            f.write("\n" + "=" * 80 + "\n\n")

    print(f"已生成文件: {output_path}")
    print(f"包含 {len(news_list)} 条新闻")

    return output_path


def batch_generate(symbols: list, output_dir: str):
    """
    批量生成多个股票的新闻 txt 文件

    Args:
        symbols: 股票代码列表
        output_dir: 输出目录
    """
    print(f"开始批量生成 {len(symbols)} 只股票的新闻数据...\n")

    for symbol in symbols:
        print(f"处理股票: {symbol}")
        generate_stock_news_txt(symbol, output_dir)
        print()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法: python generate_test_input.py <股票代码1> [<股票代码2> ...]")
        print("示例: python generate_test_input.py 603777 600519")
        sys.exit(1)

    symbols = sys.argv[1:]
    output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "finGraph", "test_input")

    batch_generate(symbols, output_dir)

    print("批量生成完成！")
