<h1 align="center">FinGraphRAG</h1>
<p align="center">
  <strong>西南财经大学《知识图谱》课程项目</strong>
</p>

<p align="center">
  <a href="#">
    <img src="https://img.shields.io/badge/Python-3.10+-blue.svg" alt="Python">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/AI-Agent-red.svg" alt="AI">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/GraphRAG-图增强-green.svg" alt="图增强">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Neo4j-Database-green.svg" alt="Neo4j数据库">
  </a>
</p>

---

FinGraphRAG 是 基于 GraphRAG 的 Agent 系统，在 **金融投资**，尤其是 **A股市场** 进行垂直研发和优化。

我们发现，在 **量化交易** 中，我们往往会遇到大量的非结构化数据，而这些数据又往往对价格走势和分析复盘起着巨大作用，我们将其称为 **消息情绪面**。

在以往基于LLM的Agent系统中，往往利用chunk RAG的方式进行信息增强，再直接利用LLM的能力进行分析。这种方法忽略了数据中蕴含的大量的关系逻辑信息。我针对这一痛点提出了FinGraphRAG。

FinGraphRAG 基于GraphRAG,通过将非结构化的消息（也可以叫 **小作文**）进行实体抽取和关系建模，将其转换为结构化的知识图谱，再以 **多跳** 的逻辑链路实现对 Agent 的知识增强，从而捕获海量数据中的关系逻辑，并通过其独特的社区算法，实现对某一标的或某些标的的综合全面分析。

本项目还提供了完善了UI-UX界面和开发环境，可以通过部署本项目，实现你关心的金融小圈子的分析和决策。

<img src="img/home.png" alt="Interaction主页" align="center">

<p align="center">
  <strong>交互主页</strong>
</p>