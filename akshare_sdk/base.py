import abc
from typing import Optional, List
from dataclasses import dataclass


@dataclass
class Article:
    title: str
    date: str
    content: str
    url: str
    source: str


@dataclass
class ResearchReport:
    title: str
    date: str
    stock_code: str
    stock_name: str
    rating: str
    institution: str
    industry: str
    pdf_url: str


@dataclass
class Disclosure:
    title: str
    date: str
    stock_code: str
    stock_name: str
    url: str


class BaseFetcher(abc.ABC):
    @abc.abstractmethod
    def fetch(self, symbol: str = None, **kwargs) -> List:
        pass

    def save_to_csv(self, data: List, file_path: str) -> None:
        import pandas as pd
        import os
        
        if not data:
            return
        
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        if isinstance(data[0], (Article, ResearchReport, Disclosure)):
            df = pd.DataFrame([item.__dict__ for item in data])
        else:
            df = pd.DataFrame(data)
        
        df.to_csv(file_path, index=False, encoding="utf-8-sig")
