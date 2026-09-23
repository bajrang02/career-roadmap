// ─────────────────────────────────────────────────────────────────────────────
// Long-tail resource library — Part B1 (technical clusters A–D)
// Keys are the last component of each node's nodePathId (== builder topicSlug).
// Companion to longtail-resources-a.mjs; same entry shape.
// ─────────────────────────────────────────────────────────────────────────────

export const LONGTAIL_B1 = {
  // ── ai-application-developer ──────────────────────────────────────────────
  "llm-integration-patterns": [
    { title: "Prompt engineering — patterns for LLM apps", url: "https://www.promptingguide.ai/", type: "reference", qualityScore: 5 },
    { title: "Building effective agents — Anthropic", url: "https://www.anthropic.com/engineering/building-effective-agents", type: "article", qualityScore: 5 },
  ],
  "rag-architecture": [
    { title: "Retrieval Augmented Generation (RAG) — LlamaIndex", url: "https://docs.llamaindex.ai/en/stable/understanding/rag/", type: "official-doc", qualityScore: 5 },
    { title: "RAG tutorial — LangChain", url: "https://python.langchain.com/docs/tutorials/rag/", type: "official-doc", qualityScore: 5 },
  ],
  "retrieval-augmented-generation": [
    { title: "Retrieval-augmented generation — Wikipedia", url: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation", type: "reference", qualityScore: 4 },
    { title: "Retrieval Augmented Generation (RAG) — LlamaIndex", url: "https://docs.llamaindex.ai/en/stable/understanding/rag/", type: "official-doc", qualityScore: 5 },
  ],
  "chunking-strategies": [
    { title: "Chunking strategies for LLM applications — Pinecone Learn", url: "https://www.pinecone.io/learn/chunking-strategies/", type: "article", qualityScore: 5 },
    { title: "Text splitters — LangChain docs", url: "https://python.langchain.com/docs/concepts/text_splitters/", type: "official-doc", qualityScore: 4 },
  ],
  "vector-stores-pinecone-chroma-weaviate": [
    { title: "What is a Vector Database? — Pinecone Learn", url: "https://www.pinecone.io/learn/vector-database/", type: "article", qualityScore: 5 },
    { title: "Vector stores — LangChain docs", url: "https://python.langchain.com/docs/concepts/vectorstores/", type: "official-doc", qualityScore: 4 },
  ],
  "agent-design-patterns": [
    { title: "Building effective agents — Anthropic", url: "https://www.anthropic.com/engineering/building-effective-agents", type: "article", qualityScore: 5 },
    { title: "AI agents — Wikipedia", url: "https://en.wikipedia.org/wiki/Intelligent_agent", type: "reference", qualityScore: 3 },
  ],
  "vector-database-integration": [
    { title: "What is a Vector Database? — Pinecone Learn", url: "https://www.pinecone.io/learn/vector-database/", type: "article", qualityScore: 5 },
    { title: "Chroma — getting started", url: "https://docs.trychroma.com/docs/overview/getting-started", type: "official-doc", qualityScore: 4 },
  ],
  "ai-application-security": [
    { title: "OWASP Top 10 for LLM Applications", url: "https://genai.owasp.org/llm-top-10/", type: "official-doc", qualityScore: 5 },
    { title: "Prompt injection — Wikipedia", url: "https://en.wikipedia.org/wiki/Prompt_injection", type: "reference", qualityScore: 4 },
  ],
  "chain-construction": [
    { title: "Chains — LangChain concepts", url: "https://python.langchain.com/docs/concepts/#chains", type: "official-doc", qualityScore: 4 },
    { title: "LCEL — LangChain Expression Language", url: "https://python.langchain.com/docs/concepts/lcel/", type: "official-doc", qualityScore: 4 },
  ],
  "tool-integration": [
    { title: "Tool calling — LangChain docs", url: "https://python.langchain.com/docs/concepts/tool_calling/", type: "official-doc", qualityScore: 4 },
    { title: "Function calling — OpenAI docs", url: "https://platform.openai.com/docs/guides/function-calling", type: "official-doc", qualityScore: 5 },
  ],
  "custom-chains": [
    { title: "How to create a custom chain — LangChain", url: "https://python.langchain.com/docs/how_to/custom_chain/", type: "official-doc", qualityScore: 4 },
    { title: "LCEL — LangChain Expression Language", url: "https://python.langchain.com/docs/concepts/lcel/", type: "official-doc", qualityScore: 4 },
  ],
  "document-loaders": [
    { title: "Document loaders — LangChain docs", url: "https://python.langchain.com/docs/concepts/document_loaders/", type: "official-doc", qualityScore: 4 },
    { title: "Data connectors — LlamaIndex", url: "https://docs.llamaindex.ai/en/stable/module_guides/loading/connector/", type: "official-doc", qualityScore: 4 },
  ],
  "embeddings-openai-cohere": [
    { title: "Embeddings guide — OpenAI", url: "https://platform.openai.com/docs/guides/embeddings", type: "official-doc", qualityScore: 5 },
    { title: "Embeddings — Cohere docs", url: "https://docs.cohere.com/docs/embeddings", type: "official-doc", qualityScore: 4 },
  ],
  "chroma-pinecone-weaviate": [
    { title: "Chroma — getting started", url: "https://docs.trychroma.com/docs/overview/getting-started", type: "official-doc", qualityScore: 4 },
    { title: "Pinecone — quickstart", url: "https://docs.pinecone.io/guides/get-started/quickstart", type: "official-doc", qualityScore: 4 },
  ],
  "index-optimization": [
    { title: "Index overview — Pinecone Learn", url: "https://www.pinecone.io/learn/vector-indexes/", type: "article", qualityScore: 4 },
    { title: "ANN indexes — Weaviate concepts", url: "https://weaviate.io/developers/academy/py/vector_index", type: "official-doc", qualityScore: 4 },
  ],
  "openai-api-advanced": [
    { title: "OpenAI API reference", url: "https://platform.openai.com/docs/api-reference", type: "official-doc", qualityScore: 5 },
    { title: "Text generation guide — OpenAI", url: "https://platform.openai.com/docs/guides/text-generation", type: "official-doc", qualityScore: 4 },
  ],
  "streaming-async": [
    { title: "Streaming responses — OpenAI docs", url: "https://platform.openai.com/docs/api-reference/streaming", type: "official-doc", qualityScore: 4 },
    { title: "Async programming — LangChain concepts", url: "https://python.langchain.com/docs/concepts/async/", type: "official-doc", qualityScore: 4 },
  ],
  "rate-limiting-cost": [
    { title: "Rate limits — OpenAI docs", url: "https://platform.openai.com/docs/guides/rate-limits", type: "official-doc", qualityScore: 5 },
    { title: "Token usage & billing — OpenAI help", url: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them", type: "official-doc", qualityScore: 4 },
  ],
  "model-deployment": [
    { title: "Inference endpoints — Hugging Face docs", url: "https://huggingface.co/docs/inference-endpoints/index", type: "official-doc", qualityScore: 5 },
    { title: "MLflow models — serving docs", url: "https://mlflow.org/docs/latest/models.html#mlflow-models", type: "official-doc", qualityScore: 4 },
  ],
  "caching-performance": [
    { title: "Semantic caching — GPTCache project", url: "https://github.com/zilliztech/GPTCache", type: "repository", qualityScore: 4 },
    { title: "Prompt caching — OpenAI docs", url: "https://platform.openai.com/docs/guides/prompt-caching", type: "official-doc", qualityScore: 4 },
  ],
  "monitoring-ai-outputs": [
    { title: "Evaluations — OpenAI docs", url: "https://platform.openai.com/docs/guides/evals", type: "official-doc", qualityScore: 4 },
    { title: "LangSmith — observability docs", url: "https://docs.smith.langchain.com/", type: "official-doc", qualityScore: 4 },
  ],
  "ai-chatbot-with-rag": [
    { title: "RAG tutorial — LangChain", url: "https://python.langchain.com/docs/tutorials/rag/", type: "official-doc", qualityScore: 5 },
    { title: "Build a chatbot — LangChain tutorial", url: "https://python.langchain.com/docs/tutorials/chatbot/", type: "official-doc", qualityScore: 4 },
  ],
  "document-analysis-tool": [
    { title: "Document loaders — LangChain docs", url: "https://python.langchain.com/docs/concepts/document_loaders/", type: "official-doc", qualityScore: 4 },
    { title: "RAG tutorial — LangChain", url: "https://python.langchain.com/docs/tutorials/rag/", type: "official-doc", qualityScore: 4 },
  ],
  "ai-content-platform": [
    { title: "Text generation guide — OpenAI", url: "https://platform.openai.com/docs/guides/text-generation", type: "official-doc", qualityScore: 4 },
    { title: "Prompt engineering guide — OpenAI", url: "https://platform.openai.com/docs/guides/prompt-engineering", type: "official-doc", qualityScore: 5 },
  ],
  "multi-modal-ai-app": [
    { title: "Vision — OpenAI docs", url: "https://platform.openai.com/docs/guides/images-vision", type: "official-doc", qualityScore: 4 },
    { title: "Multimodality — LlamaIndex module guide", url: "https://docs.llamaindex.ai/en/stable/module_guides/models/multi_modal/", type: "official-doc", qualityScore: 4 },
  ],
  "ai-architecture-design": [
    { title: "Building effective agents — Anthropic", url: "https://www.anthropic.com/engineering/building-effective-agents", type: "article", qualityScore: 5 },
  ],
  "cost-vs-performance-tradeoffs": [
    { title: "Models overview & pricing — OpenAI", url: "https://platform.openai.com/docs/models", type: "official-doc", qualityScore: 4 },
    { title: "Rate limits — OpenAI docs", url: "https://platform.openai.com/docs/guides/rate-limits", type: "official-doc", qualityScore: 4 },
  ],
  "ethics-in-ai-applications": [
    { title: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework", type: "official-doc", qualityScore: 5 },
    { title: "Ethics of artificial intelligence — Wikipedia", url: "https://en.wikipedia.org/wiki/Ethics_of_artificial_intelligence", type: "reference", qualityScore: 4 },
  ],

  // ── api-developer / api-development (shared keys) ─────────────────────────
  "restful-design": [
    { title: "RESTful API design guidelines — restfulapi.net", url: "https://restfulapi.net/", type: "reference", qualityScore: 5 },
    { title: "REST API tutorial — restfulapi.net/resource-naming", url: "https://restfulapi.net/resource-naming/", type: "article", qualityScore: 4 },
  ],
  "restful-design-principles": [
    { title: "Representational state transfer (REST) — Wikipedia", url: "https://en.wikipedia.org/wiki/Representational_state_transfer", type: "reference", qualityScore: 4 },
    { title: "RESTful API design guidelines — restfulapi.net", url: "https://restfulapi.net/", type: "reference", qualityScore: 5 },
  ],
  "resource-modeling": [
    { title: "Resource naming — restfulapi.net", url: "https://restfulapi.net/resource-naming/", type: "article", qualityScore: 4 },
    { title: "Resource-oriented design — Google AIP", url: "https://google.aip.dev/121", type: "official-doc", qualityScore: 5 },
  ],
  "url-structure": [
    { title: "URL — MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/API/URL", type: "official-doc", qualityScore: 4 },
    { title: "Resource naming — restfulapi.net", url: "https://restfulapi.net/resource-naming/", type: "article", qualityScore: 4 },
  ],
  "nested-resources": [
    { title: "Resource naming — restfulapi.net", url: "https://restfulapi.net/resource-naming/", type: "article", qualityScore: 4 },
    { title: "Nested resources — Google AIP 133", url: "https://google.aip.dev/133", type: "official-doc", qualityScore: 5 },
  ],
  "http-methods-status-codes": [
    { title: "HTTP request methods — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods", type: "official-doc", qualityScore: 5 },
    { title: "HTTP response status codes — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", type: "official-doc", qualityScore: 5 },
  ],
  "get-post-put-patch-delete": [
    { title: "HTTP request methods — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods", type: "official-doc", qualityScore: 5 },
    { title: "RESTful API HTTP methods — restfulapi.net", url: "https://restfulapi.net/http-methods/", type: "article", qualityScore: 4 },
  ],
  "2xx-3xx-4xx-5xx-codes": [
    { title: "HTTP response status codes — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", type: "official-doc", qualityScore: 5 },
    { title: "HTTP status — restfulapi.net", url: "https://restfulapi.net/http-status-codes/", type: "article", qualityScore: 4 },
  ],
  "content-negotiation": [
    { title: "Content negotiation — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation", type: "official-doc", qualityScore: 5 },
    { title: "Content negotiation — Wikipedia", url: "https://en.wikipedia.org/wiki/Content_negotiation", type: "reference", qualityScore: 3 },
  ],
  "api-versioning": [
    { title: "API versioning — restfulapi.net", url: "https://restfulapi.net/versioning/", type: "article", qualityScore: 4 },
    { title: "API versioning — Google AIP 180", url: "https://google.aip.dev/180", type: "official-doc", qualityScore: 5 },
  ],
  "versioning-strategy-discussion": [
    { title: "API versioning — restfulapi.net", url: "https://restfulapi.net/versioning/", type: "article", qualityScore: 4 },
    { title: "API versioning — Google AIP 180", url: "https://google.aip.dev/180", type: "official-doc", qualityScore: 5 },
  ],
  "framework-setup": [
    { title: "Express — installation guide", url: "https://expressjs.com/en/starter/installing.html", type: "official-doc", qualityScore: 5 },
    { title: "Django REST framework — quickstart", url: "https://www.django-rest-framework.org/tutorial/quickstart/", type: "official-doc", qualityScore: 5 },
  ],
  "request-validation": [
    { title: "Validation — Express (express-validator guide)", url: "https://expressjs.com/en/advanced/best-practice-performance.html", type: "official-doc", qualityScore: 3 },
    { title: "Request data validation — FastAPI docs", url: "https://fastapi.tiangolo.com/tutorial/path-params-numeric-validations/", type: "official-doc", qualityScore: 5 },
  ],
  "queries-mutations": [
    { title: "Queries and mutations — GraphQL docs", url: "https://graphql.org/learn/queries/", type: "official-doc", qualityScore: 5 },
    { title: "Schemas and types — GraphQL docs", url: "https://graphql.org/learn/schema/", type: "official-doc", qualityScore: 4 },
  ],
  "n-1-problem-dataloader": [
    { title: "GraphQL — execution & N+1 with DataLoader", url: "https://graphql.org/learn/execution/", type: "official-doc", qualityScore: 4 },
    { title: "DataLoader — coalescing requests", url: "https://github.com/graphql/dataloader", type: "repository", qualityScore: 5 },
  ],
  "compression": [
    { title: "HTTP compression — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding", type: "official-doc", qualityScore: 4 },
    { title: "Compression — Wikipedia (HTTP)", url: "https://en.wikipedia.org/wiki/HTTP_compression", type: "reference", qualityScore: 3 },
  ],
  "database-query-optimization": [
    { title: "Optimizing queries — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/queries.html", type: "official-doc", qualityScore: 5 },
    { title: "Query optimization — Use The Index, Luke", url: "https://use-the-index-luke.com/", type: "reference", qualityScore: 5 },
  ],
  "mock-servers": [
    { title: "Mock servers — Postman docs", url: "https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/setting-up-mock/", type: "official-doc", qualityScore: 4 },
    { title: "JSON Server — fake REST API", url: "https://github.com/typicode/json-server", type: "repository", qualityScore: 4 },
  ],
  "restful-blog-api": [
    { title: "Django REST framework — quickstart tutorial", url: "https://www.django-rest-framework.org/tutorial/quickstart/", type: "official-doc", qualityScore: 5 },
    { title: "Express — REST API with router tutorial", url: "https://expressjs.com/en/guide/routing.html", type: "official-doc", qualityScore: 4 },
  ],
  "real-time-chat-api": [
    { title: "WebSockets — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API", type: "official-doc", qualityScore: 5 },
    { title: "Socket.IO — get started (chat tutorial)", url: "https://socket.io/get-started/chat", type: "official-doc", qualityScore: 5 },
  ],
  "real-time-websocket-api": [
    { title: "WebSockets — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API", type: "official-doc", qualityScore: 5 },
    { title: "Socket.IO — get started (chat tutorial)", url: "https://socket.io/get-started/chat", type: "official-doc", qualityScore: 5 },
  ],
  "graphql-api": [
    { title: "GraphQL — learn (official)", url: "https://graphql.org/learn/", type: "official-doc", qualityScore: 5 },
    { title: "Apollo Server — getting started", url: "https://www.apollographql.com/docs/apollo-server/getting-started/", type: "official-doc", qualityScore: 5 },
  ],
  "e-commerce-api": [
    { title: "Stripe API — checkout quickstart", url: "https://stripe.com/docs/api", type: "official-doc", qualityScore: 5 },
    { title: "Django REST framework — quickstart tutorial", url: "https://www.django-rest-framework.org/tutorial/quickstart/", type: "official-doc", qualityScore: 4 },
  ],
  "public-api-with-sdk": [
    { title: "SDK generation — OpenAPI Generator", url: "https://github.com/OpenAPITools/openapi-generator", type: "repository", qualityScore: 5 },
    { title: "Specifying an OpenAPI document — FastAPI docs", url: "https://fastapi.tiangolo.com/how-to/extending-openapi/", type: "official-doc", qualityScore: 4 },
  ],
  "api-with-sdk-generation": [
    { title: "SDK generation — OpenAPI Generator", url: "https://github.com/OpenAPITools/openapi-generator", type: "repository", qualityScore: 5 },
    { title: "OpenAPI specification — official", url: "https://spec.openapis.org/oas/latest.html", type: "official-doc", qualityScore: 5 },
  ],
  "security-scenario-questions": [
    { title: "OWASP API Security Top 10", url: "https://owasp.org/API-Security/", type: "official-doc", qualityScore: 5 },
  ],

  // ── ar-vr-developer ───────────────────────────────────────────────────────
  "unreal-vr-framework": [
    { title: "Developing for VR/AR — Unreal Engine docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/developing-for-vr-and-ar-in-unreal-engine", type: "official-doc", qualityScore: 5 },
    { title: "XR development basics — Unreal docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/xr-development-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "blueprint-vr": [
    { title: "Blueprints — Unreal Engine docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/blueprints-visual-scripting-in-unreal-engine", type: "official-doc", qualityScore: 5 },
    { title: "XR development in Unreal — documentation", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/xr-development-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "unreal-ar": [
    { title: "Augmented reality — Unreal Engine docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/augmented-reality-in-unreal-engine", type: "official-doc", qualityScore: 4 },
    { title: "Handheld AR template — Unreal docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/handheld-ar-template-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "unreal-xr-optimization": [
    { title: "VR performance & features — Unreal docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/vr-performance-and-features-in-unreal-engine", type: "official-doc", qualityScore: 4 },
    { title: "XR development in Unreal — documentation", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/xr-development-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "unreal-xr-publishing": [
    { title: "Packaging projects — Unreal Engine docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-projects-in-unreal-engine", type: "official-doc", qualityScore: 4 },
    { title: "XR development in Unreal — documentation", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/xr-development-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "spatial-tracking": [
    { title: "Spatial mapping — Microsoft Mixed Reality docs", url: "https://learn.microsoft.com/en-us/windows/mixed-reality/design/spatial-mapping", type: "official-doc", qualityScore: 5 },
    { title: "World tracking — Apple ARKit docs", url: "https://developer.apple.com/documentation/arkit/arsession", type: "official-doc", qualityScore: 4 },
  ],
  "hand-controller-input": [
    { title: "Motion controllers — Microsoft Mixed Reality", url: "https://learn.microsoft.com/en-us/windows/mixed-reality/design/motion-controllers", type: "official-doc", qualityScore: 5 },
    { title: "Input — Unreal XR docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/inputs-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "passthrough-ar": [
    { title: "Passthrough — Meta Quest developer docs", url: "https://developers.meta.com/horizon/documentation/unity/unity-passthrough/", type: "official-doc", qualityScore: 4 },
    { title: "Augmented reality — Unreal Engine docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/augmented-reality-in-unreal-engine", type: "official-doc", qualityScore: 3 },
  ],
  "cross-platform-deployment": [
    { title: "Multi-platform XR development — Unity docs", url: "https://docs.unity3d.com/Packages/com.unity.xr.management@latest", type: "official-doc", qualityScore: 4 },
    { title: "Supported XR platforms — Unreal docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/supported-ar-and-vr-platforms-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "optimized-3d-assets": [
    { title: "Optimization recommendations for XR — Unity docs", url: "https://docs.unity3d.com/Manual/XR.html", type: "official-doc", qualityScore: 4 },
    { title: "3D asset optimization — Khronos glTF", url: "https://www.khronos.org/gltf/", type: "official-doc", qualityScore: 4 },
  ],
  "3d-asset-pipeline": [
    { title: "glTF 2.0 — Khronos specification", url: "https://www.khronos.org/gltf/", type: "official-doc", qualityScore: 5 },
    { title: "Importing assets — Unreal docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/importing-assets-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "vr-training-module": [
    { title: "XR development in Unreal — documentation", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/xr-development-in-unreal-engine", type: "official-doc", qualityScore: 4 },
    { title: "VR training design — Unity learn", url: "https://learn.unity.com/course/create-with-code", type: "course", qualityScore: 4 },
  ],
  "ar-product-viewer": [
    { title: "Quick Look — Apple AR (ARKit)", url: "https://developer.apple.com/augmented-reality/quick-look/", type: "official-doc", qualityScore: 5 },
    { title: "Scene Viewer — Google AR developer docs", url: "https://developers.google.com/ar/develop/java/scene-viewer", type: "official-doc", qualityScore: 4 },
  ],
  "social-vr-space": [
    { title: "Multiplayer networking — Unity docs", url: "https://docs-multiplayer.unity3d.com/netcode/current/about/", type: "official-doc", qualityScore: 4 },
    { title: "VR development — Meta Horizon platform docs", url: "https://developers.meta.com/horizon/", type: "official-doc", qualityScore: 4 },
  ],
  "mixed-reality-dashboard": [
    { title: "Mixed Reality design guidelines — Microsoft", url: "https://learn.microsoft.com/en-us/windows/mixed-reality/design/", type: "official-doc", qualityScore: 5 },
    { title: "UI design for XR — Unity docs", url: "https://docs.unity3d.com/Manual/UISystem.html", type: "official-doc", qualityScore: 4 },
  ],
  "xr-architecture-design": [
    { title: "Mixed Reality design guidelines — Microsoft", url: "https://learn.microsoft.com/en-us/windows/mixed-reality/design/", type: "official-doc", qualityScore: 5 },
    { title: "XR development in Unreal — documentation", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/xr-development-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "ux-for-xr": [
    { title: "Mixed Reality design guidelines — Microsoft", url: "https://learn.microsoft.com/en-us/windows/mixed-reality/design/", type: "official-doc", qualityScore: 5, scope: "parent" },
    { title: "Designing for VR — Meta developer docs", url: "https://developers.meta.com/horizon/design/", type: "official-doc", qualityScore: 4, scope: "parent" },
  ],
  "ux-for-web3": [
    { title: "Web3 UX — design considerations (design.systems)", url: "https://en.wikipedia.org/wiki/User_experience_design", type: "article", qualityScore: 3 },
    { title: "Wallet UX guidelines — MetaMask docs", url: "https://docs.metamask.io/wallet/", type: "official-doc", qualityScore: 4 },
  ],
  "3d-math-questions": [
    { title: "3D math basics — Unity docs (vectors & transforms)", url: "https://docs.unity3d.com/Manual/VectorCookbook.html", type: "official-doc", qualityScore: 4 },
    { title: "Linear algebra — Khan Academy (vectors & matrices)", url: "https://www.khanacademy.org/math/linear-algebra", type: "course", qualityScore: 5 },
  ],

  // ── backend-developer (leftovers) ─────────────────────────────────────────
  "migrations": [
    { title: "Migrations — Django docs", url: "https://docs.djangoproject.com/en/stable/topics/migrations/", type: "official-doc", qualityScore: 5 },
    { title: "Migrations — Prisma docs", url: "https://www.prisma.io/docs/orm/prisma-client/queries/custom-models", type: "official-doc", qualityScore: 3 },
  ],
  "graphql": [
    { title: "GraphQL — learn (official)", url: "https://graphql.org/learn/", type: "official-doc", qualityScore: 5 },
    { title: "Queries and mutations — GraphQL docs", url: "https://graphql.org/learn/queries/", type: "official-doc", qualityScore: 4 },
  ],

  // ── bi-developer ──────────────────────────────────────────────────────────
  "bi-architecture": [
    { title: "Enterprise BI — Azure Architecture Center", url: "https://learn.microsoft.com/en-us/azure/architecture/example-scenario/data/data-warehouse", type: "official-doc", qualityScore: 5 },
    { title: "Business intelligence — Wikipedia", url: "https://en.wikipedia.org/wiki/Business_intelligence", type: "reference", qualityScore: 4 },
  ],
  "bi-architecture-questions": [
    { title: "Business intelligence — Wikipedia", url: "https://en.wikipedia.org/wiki/Business_intelligence", type: "reference", qualityScore: 3 },
  ],
  "data-warehouse-concepts": [
    { title: "Data warehousing in Azure — Architecture Center", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/data-warehousing", type: "official-doc", qualityScore: 5 },
    { title: "Data warehouse — Wikipedia", url: "https://en.wikipedia.org/wiki/Data_warehouse", type: "reference", qualityScore: 4 },
  ],
  "etl-vs-elt": [
    { title: "ETL — IBM topics", url: "https://www.ibm.com/topics/etl", type: "article", qualityScore: 5 },
    { title: "ETL vs ELT — Microsoft Azure (explained)", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/etl", type: "official-doc", qualityScore: 5 },
  ],
  "bi-tools-landscape": [
    { title: "Business intelligence — Gartner glossary", url: "https://www.gartner.com/en/information-technology/glossary/business-intelligence-bi", type: "reference", qualityScore: 4 },
    { title: "Power BI vs Tableau — Microsoft comparison guide", url: "https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview", type: "official-doc", qualityScore: 3 },
  ],
  "star-schema-design": [
    { title: "Star schema — Wikipedia", url: "https://en.wikipedia.org/wiki/Star_schema", type: "reference", qualityScore: 4 },
    { title: "Star and snowflake schema — GeeksforGeeks", url: "https://www.geeksforgeeks.org/star-schema-in-data-warehouse-modeling/", type: "tutorial", qualityScore: 3 },
  ],
  "snowflake-schema": [
    { title: "Snowflake schema — Wikipedia", url: "https://en.wikipedia.org/wiki/Snowflake_schema", type: "reference", qualityScore: 4 },
    { title: "Snowflaking — Kimball Group glossary", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/", type: "reference", qualityScore: 5 },
  ],
  "fact-table-design": [
    { title: "Dimensional modeling techniques — Kimball Group", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/", type: "reference", qualityScore: 5 },
    { title: "Fact table — Wikipedia", url: "https://en.wikipedia.org/wiki/Fact_table", type: "reference", qualityScore: 4 },
  ],
  "dimension-table-design": [
    { title: "Dimension table — Wikipedia", url: "https://en.wikipedia.org/wiki/Dimension_table", type: "reference", qualityScore: 4 },
    { title: "Dimensional modeling techniques — Kimball Group", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/", type: "reference", qualityScore: 5 },
  ],
  "ssis-informatica-basics": [
    { title: "SQL Server Integration Services — Microsoft docs", url: "https://learn.microsoft.com/en-us/sql/integration-services/sql-server-integration-services", type: "official-doc", qualityScore: 5 },
    { title: "Informatica PowerCenter — developer documentation", url: "https://docs.informatica.com/", type: "official-doc", qualityScore: 4 },
  ],
  "data-transformation": [
    { title: "Power Query — transform data (Microsoft Learn)", url: "https://learn.microsoft.com/en-us/power-query/", type: "official-doc", qualityScore: 5 },
    { title: "dbt — data transformation docs", url: "https://docs.getdbt.com/docs/introduction", type: "official-doc", qualityScore: 5 },
  ],
  "data-loading": [
    { title: "Load data into Azure Synapse — Architecture Center", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/etl", type: "official-doc", qualityScore: 4 },
    { title: "COPY — bulk loading (PostgreSQL docs)", url: "https://www.postgresql.org/docs/current/sql-copy.html", type: "official-doc", qualityScore: 5 },
  ],
  "real-time-dashboards": [
    { title: "Grafana — dashboards documentation", url: "https://grafana.com/docs/grafana/latest/dashboards/", type: "official-doc", qualityScore: 4 },
  ],
  "embedded-analytics": [
    { title: "Embedded analytics — Power BI embedded analytics docs", url: "https://learn.microsoft.com/en-us/power-bi/developer/embedded/embedding", type: "official-doc", qualityScore: 5 },
    { title: "Tableau Embedded Analytics — official docs", url: "https://help.tableau.com/current/api/embedding_api/en-us/index.html", type: "official-doc", qualityScore: 4 },
  ],
  "data-governance": [
    { title: "Data governance — Wikipedia", url: "https://en.wikipedia.org/wiki/Data_governance", type: "reference", qualityScore: 4 },
    { title: "Purview — Microsoft data governance docs", url: "https://learn.microsoft.com/en-us/purview/purview", type: "official-doc", qualityScore: 5 },
  ],
  "master-data-management": [
    { title: "Master data management — Wikipedia", url: "https://en.wikipedia.org/wiki/Master_data_management", type: "reference", qualityScore: 4 },
    { title: "MDM — Microsoft SQL Server docs", url: "https://learn.microsoft.com/en-us/sql/master-data-services/master-data-services-overview-mds", type: "official-doc", qualityScore: 4 },
  ],
  "advanced-analytics": [
    { title: "Advanced analytics — Microsoft Fabric docs", url: "https://learn.microsoft.com/en-us/fabric/data-science/", type: "official-doc", qualityScore: 4 },
    { title: "Analytics — Wikipedia", url: "https://en.wikipedia.org/wiki/Analytics", type: "reference", qualityScore: 3 },
  ],
  "sales-analytics-dashboard": [
    { title: "Dashboards in the Power BI service — Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards", type: "official-doc", qualityScore: 5 },
    { title: "Sales dashboard tutorial — Tableau", url: "https://help.tableau.com/current/pro/desktop/en-us/dashboards_create.htm", type: "official-doc", qualityScore: 4 },
  ],
  "financial-bi-system": [
    { title: "Financial reporting — Power BI (Microsoft Learn)", url: "https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview", type: "official-doc", qualityScore: 3 },
    { title: "Dashboards in the Power BI service — Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards", type: "official-doc", qualityScore: 4 },
  ],
  "marketing-analytics-platform": [
    { title: "GA4 — Google Analytics official docs", url: "https://support.google.com/analytics/answer/10089681?hl=en", type: "official-doc", qualityScore: 5 },
    { title: "Dashboards in the Power BI service — Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards", type: "official-doc", qualityScore: 4 },
  ],
  "executive-kpi-dashboard": [
    { title: "Dashboards in the Power BI service — Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards", type: "official-doc", qualityScore: 5 },
    { title: "Storytelling with Data — blog & resources", url: "https://www.storytellingwithdata.com/blog", type: "article", qualityScore: 4 },
  ],
  "dashboard-design-review": [
    { title: "Dashboard design best practices — Tableau", url: "https://www.tableau.com/learn/articles/dashboard-design", type: "article", qualityScore: 4 },
    { title: "Storytelling with Data — blog & resources", url: "https://www.storytellingwithdata.com/blog", type: "article", qualityScore: 4 },
  ],

  // ── bioinformatics-engineer ───────────────────────────────────────────────
  "sequence-alignment-blast": [
    { title: "BLAST — NCBI Bookshelf (chapter)", url: "https://www.ncbi.nlm.nih.gov/books/NBK21097/", type: "reference", qualityScore: 5 },
    { title: "Sequence alignment — Wikipedia", url: "https://en.wikipedia.org/wiki/Sequence_alignment", type: "reference", qualityScore: 4 },
  ],
  "multiple-sequence-alignment": [
    { title: "Multiple sequence alignment — Wikipedia", url: "https://en.wikipedia.org/wiki/Multiple_sequence_alignment", type: "reference", qualityScore: 4 },
    { title: "Clustal Omega — EBI training", url: "https://www.ebi.ac.uk/training/online/", type: "official-doc", qualityScore: 4 },
  ],
  "phylogenetic-analysis": [
    { title: "Phylogenetics — EBI training resources", url: "https://www.ebi.ac.uk/training/online/", type: "official-doc", qualityScore: 4 },
    { title: "Phylogenetic tree — Wikipedia", url: "https://en.wikipedia.org/wiki/Phylogenetic_tree", type: "reference", qualityScore: 4 },
  ],
  "gene-finding": [
    { title: "Gene prediction — Wikipedia", url: "https://en.wikipedia.org/wiki/Gene_prediction", type: "reference", qualityScore: 4 },
    { title: "GeneMark — official site & docs", url: "http://exon.gatech.edu/", type: "official-doc", qualityScore: 3 },
  ],
  "motif-discovery": [
    { title: "Sequence motif — Wikipedia", url: "https://en.wikipedia.org/wiki/Sequence_motif", type: "reference", qualityScore: 4 },
    { title: "MEME Suite — motif discovery tools", url: "https://meme-suite.org/", type: "official-doc", qualityScore: 5 },
  ],
  "read-alignment-bwa-star": [
    { title: "BWA — Burrows-Wheeler aligner (GitHub)", url: "https://github.com/lh3/bwa", type: "repository", qualityScore: 5 },
    { title: "STAR — RNA-seq aligner (GitHub)", url: "https://github.com/alexdobin/STAR", type: "repository", qualityScore: 5 },
  ],
  "variant-calling-gatk": [
    { title: "GATK — best practices workflows", url: "https://gatk.broadinstitute.org/hc/en-us/articles/360035535932-Germline-short-variant-discovery-SNPs-Indels", type: "official-doc", qualityScore: 5 },
    { title: "Variant calling — Wikipedia", url: "https://en.wikipedia.org/wiki/Variant_calling", type: "reference", qualityScore: 3 },
  ],
  "rna-seq-analysis": [
    { title: "RNA-seq analysis — Harvard Chan Bioinformatics Core", url: "https://hbctraining.github.io/main/", type: "course", qualityScore: 5 },
    { title: "DESeq2 — RNA-seq workflow (bioconductor)", url: "https://bioconductor.org/packages/release/bioc/vignettes/DESeq2/inst/doc/DESeq2.html", type: "official-doc", qualityScore: 5 },
  ],
  "chip-seq-analysis": [
    { title: "ChIP-seq guidelines — ENCODE project", url: "https://www.encodeproject.org/chip-seq/", type: "official-doc", qualityScore: 5 },
    { title: "ChIP-seq analysis — HBC training", url: "https://hbctraining.github.io/main/", type: "course", qualityScore: 4 },
  ],
  "pipeline-management-nextflow": [
    { title: "Nextflow — official documentation", url: "https://www.nextflow.io/docs/latest/", type: "official-doc", qualityScore: 5 },
    { title: "nf-core — community pipelines", url: "https://nf-co.re/pipelines", type: "repository", qualityScore: 5 },
  ],
  "protein-structure-prediction": [
    { title: "AlphaFold — database & docs", url: "https://alphafold.ebi.ac.uk/", type: "official-doc", qualityScore: 5 },
    { title: "Protein structure prediction — Wikipedia", url: "https://en.wikipedia.org/wiki/Protein_structure_prediction", type: "reference", qualityScore: 4 },
  ],
  "molecular-docking": [
    { title: "AutoDock Vina — molecular docking (docs)", url: "https://autodock.scripps.edu/", type: "official-doc", qualityScore: 5 },
    { title: "Molecular docking — Wikipedia", url: "https://en.wikipedia.org/wiki/Docking_(molecular)", type: "reference", qualityScore: 4 },
  ],
  "structure-visualization": [
    { title: "PyMOL — molecular visualization", url: "https://pymol.org/", type: "official-doc", qualityScore: 5 },
    { title: "ChimeraX — visualization docs", url: "https://www.cgl.ucsf.edu/chimerax/docs/user/index.html", type: "official-doc", qualityScore: 4 },
  ],
  "pdb-database": [
    { title: "RCSB Protein Data Bank — PDB", url: "https://www.rcsb.org/docs/", type: "official-doc", qualityScore: 5 },
    { title: "wwPDB — worldwide PDB", url: "https://www.wwpdb.org/documentation/", type: "official-doc", qualityScore: 4 },
  ],
  "homology-modeling": [
    { title: "SWISS-MODEL — homology modeling server", url: "https://swissmodel.expasy.org/", type: "official-doc", qualityScore: 5 },
    { title: "Homology modeling — Wikipedia", url: "https://en.wikipedia.org/wiki/Homology_modeling", type: "reference", qualityScore: 4 },
  ],
  "biopython-bioconductor": [
    { title: "Biopython — tutorial & documentation", url: "https://biopython.org/wiki/Documentation", type: "official-doc", qualityScore: 5 },
    { title: "Bioconductor — start here", url: "https://bioconductor.org/help/", type: "official-doc", qualityScore: 5 },
  ],
  "galaxy-platform": [
    { title: "Galaxy Project — training materials", url: "https://training.galaxyproject.org/training-material/topics/introduction/", type: "course", qualityScore: 5 },
    { title: "Use Galaxy — public platform", url: "https://toolshed.g2.bx.psu.edu/", type: "official-doc", qualityScore: 4 },
  ],
  "r-for-statistics": [
    { title: "R for Data Science (free book)", url: "https://r4ds.hadley.nz/data-transform", type: "book", qualityScore: 5 },
    { title: "Modern Statistics with R — free companion", url: "https://ggplot2.tidyverse.org/reference/index.html", type: "book", qualityScore: 4 },
  ],
  "cloud-for-genomics": [
    { title: "Genomics — Google Cloud solutions", url: "https://cloud.google.com/life-sciences", type: "official-doc", qualityScore: 4 },
    { title: "AWS for genomics — Amazon Omics docs", url: "https://aws.amazon.com/omics/", type: "official-doc", qualityScore: 4 },
  ],
  "variant-calling-pipeline": [
    { title: "GATK — best practices workflows", url: "https://gatk.broadinstitute.org/hc/en-us/articles/360035535932-Germline-short-variant-discovery-SNPs-Indels", type: "official-doc", qualityScore: 5 },
    { title: "nf-core/sarek — variant calling pipeline", url: "https://nf-co.re/sarek", type: "repository", qualityScore: 5 },
  ],
  "protein-analysis-tool": [
    { title: "ExPASy — bioinformatics portal (SIB)", url: "https://www.expasy.org/", type: "official-doc", qualityScore: 5 },
    { title: "Biopython — tutorial & documentation", url: "https://biopython.org/wiki/Documentation", type: "official-doc", qualityScore: 4 },
  ],
  "genomic-database-query-system": [
    { title: "NCBI Entrez — database search system", url: "https://www.ncbi.nlm.nih.gov/books/NBK25499/", type: "official-doc", qualityScore: 5 },
    { title: "Ensembl — genome browser & REST API", url: "https://rest.ensembl.org/", type: "official-doc", qualityScore: 5 },
  ],
  "biology-cs-integration": [
    { title: "Rosalind — bioinformatics problem solving", url: "https://rosalind.info/problems/list-view/", type: "practice", qualityScore: 5 },
    { title: "Sequence alignment — bioinformatics algorithms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sequence_alignment", type: "reference", qualityScore: 4 },
  ],
  "pipeline-design": [
    { title: "Nextflow — official documentation", url: "https://www.nextflow.io/docs/latest/", type: "official-doc", qualityScore: 5 },
    { title: "Workflow patterns — nf-core guidelines", url: "https://nf-co.re/docs/contributing/guidelines", type: "official-doc", qualityScore: 4 },
  ],
  "data-analysis-discussion": [
    { title: "Bioinformatics — Wikipedia overview", url: "https://en.wikipedia.org/wiki/Bioinformatics", type: "community", qualityScore: 4 },
    { title: "Bioinformatics questions — Rosalind forum", url: "https://rosalind.info/problems/list-view/", type: "practice", qualityScore: 4 },
  ],
  "tool-selection": [
    { title: "OMICTOOLS — bioinformatics tool directory", url: "https://omictools.com/", type: "reference", qualityScore: 4 },
    { title: "Bioinformatics tools — EBI services guide", url: "https://www.ebi.ac.uk/services", type: "official-doc", qualityScore: 5 },
  ],

  // ── biomedical-engineer / computer-vision (medical-imaging) ───────────────
  "x-ray-ct": [
    { title: "CT — Radiopaedia reference", url: "https://radiopaedia.org/articles/computed-tomography-ct", type: "reference", qualityScore: 5 },
    { title: "X-ray imaging — Radiopaedia", url: "https://radiopaedia.org/articles/radiography", type: "reference", qualityScore: 4 },
  ],
  "mri": [
    { title: "MRI — Radiopaedia reference", url: "https://radiopaedia.org/articles/mri", type: "reference", qualityScore: 5 },
    { title: "Magnetic resonance imaging — Wikipedia", url: "https://en.wikipedia.org/wiki/Magnetic_resonance_imaging", type: "reference", qualityScore: 4 },
  ],
  "ultrasound": [
    { title: "Ultrasound — Radiopaedia reference", url: "https://radiopaedia.org/articles/ultrasound", type: "reference", qualityScore: 5 },
    { title: "Medical ultrasound — Wikipedia", url: "https://en.wikipedia.org/wiki/Medical_ultrasound", type: "reference", qualityScore: 4 },
  ],
  "nuclear-medicine": [
    { title: "Nuclear medicine — Radiopaedia", url: "https://radiopaedia.org/articles/nuclear-medicine", type: "reference", qualityScore: 5 },
    { title: "Positron emission tomography — Wikipedia", url: "https://en.wikipedia.org/wiki/Positron_emission_tomography", type: "reference", qualityScore: 4 },
  ],
  "image-processing": [
    { title: "OpenCV — image processing documentation", url: "https://docs.opencv.org/4.x/d7/da8/tutorial_table_of_content_imgproc.html", type: "official-doc", qualityScore: 5 },
    { title: "Digital image processing — Wikipedia", url: "https://en.wikipedia.org/wiki/Digital_image_processing", type: "reference", qualityScore: 4 },
  ],
  "medical-imaging": [
    { title: "DICOM — medical imaging standard (official)", url: "https://www.dicomstandard.org/", type: "official-doc", qualityScore: 5 },
    { title: "Medical imaging — Wikipedia", url: "https://en.wikipedia.org/wiki/Medical_imaging", type: "reference", qualityScore: 4 },
  ],

  // ── blockchain-developer ──────────────────────────────────────────────────
  "solidity-fundamentals": [
    { title: "Solidity — official documentation (intro to smart contracts)", url: "https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html", type: "official-doc", qualityScore: 5 },
    { title: "Solidity by Example", url: "https://solidity-by-example.org/", type: "tutorial", qualityScore: 5 },
  ],
  "contract-design-patterns": [
    { title: "Smart contract patterns — Ethereum.org developer docs", url: "https://ethereum.org/en/developers/docs/smart-contracts/", type: "official-doc", qualityScore: 5 },
    { title: "OpenZeppelin contracts — library docs", url: "https://docs.openzeppelin.com/contracts/", type: "official-doc", qualityScore: 5 },
  ],
  "gas-optimization": [
    { title: "Solidity gas optimization — EIP-1167 & patterns guide (fravoll)", url: "https://github.com/harendra-shakya/gas-optimization", type: "repository", qualityScore: 3 },
    { title: "Gas — Ethereum.org docs", url: "https://ethereum.org/en/developers/docs/gas/", type: "official-doc", qualityScore: 5 },
  ],
  "web3-js-ethers-js": [
    { title: "ethers.js — documentation", url: "https://docs.ethers.org/v6/", type: "official-doc", qualityScore: 5 },
    { title: "web3.js — getting started", url: "https://docs.web3js.org/", type: "official-doc", qualityScore: 4 },
  ],
  "ipfs-for-storage": [
    { title: "IPFS — official docs", url: "https://docs.ipfs.tech/", type: "official-doc", qualityScore: 5 },
    { title: "InterPlanetary File System — Wikipedia", url: "https://en.wikipedia.org/wiki/InterPlanetary_File_System", type: "reference", qualityScore: 4 },
  ],
  "wallet-integration": [
    { title: "MetaMask — wallet integration docs", url: "https://docs.metamask.io/wallet/", type: "official-doc", qualityScore: 5 },
    { title: "WalletConnect — developer docs", url: "https://docs.walletconnect.com/web3wallet/about", type: "official-doc", qualityScore: 4 },
  ],
  "transaction-management": [
    { title: "Transactions — Ethereum.org developer docs", url: "https://ethereum.org/en/developers/docs/transactions/", type: "official-doc", qualityScore: 5 },
    { title: "Sending transactions — ethers.js docs", url: "https://docs.ethers.org/v6/getting-started/", type: "official-doc", qualityScore: 4 },
  ],
  "dex-design": [
    { title: "Uniswap v2 — protocol docs (AMM design)", url: "https://docs.uniswap.org/contracts/v2/concepts/protocol-overview/how-uniswap-works", type: "official-doc", qualityScore: 5 },
    { title: "Automated market maker — Wikipedia", url: "https://en.wikipedia.org/wiki/Automated_market_maker", type: "reference", qualityScore: 3 },
  ],
  "lending-protocols": [
    { title: "Aave V3 core protocol — source repository (GitHub)", url: "https://github.com/aave/aave-v3-core", type: "official-doc", qualityScore: 5 },
    { title: "Compound — protocol docs", url: "https://docs.compound.finance/v2/", type: "official-doc", qualityScore: 4 },
  ],
  "token-economics": [
    { title: "Tokenomics — Ethereum.org docs", url: "https://ethereum.org/en/developers/docs/", type: "official-doc", qualityScore: 3 },
    { title: "Tokenomics — Wikipedia", url: "https://en.wikipedia.org/wiki/Tokenomics", type: "reference", qualityScore: 4 },
  ],
  "stablecoins": [
    { title: "Stablecoin — Wikipedia", url: "https://en.wikipedia.org/wiki/Stablecoin", type: "reference", qualityScore: 4 },
    { title: "MakerDAO — DAI documentation", url: "https://docs.makerdao.com/", type: "official-doc", qualityScore: 4 },
  ],
  "governance-tokens": [
    { title: "DAOs — Ethereum.org developer docs", url: "https://ethereum.org/en/dao/", type: "official-doc", qualityScore: 5 },
    { title: "OpenZeppelin governance — contracts docs", url: "https://docs.openzeppelin.com/contracts/4.x/governance", type: "official-doc", qualityScore: 4 },
  ],
  "defi-lending-protocol": [
    { title: "Aave V3 core protocol — source repository (GitHub)", url: "https://github.com/aave/aave-v3-core", type: "official-doc", qualityScore: 5 },
    { title: "DeFi — Ethereum.org developer docs", url: "https://ethereum.org/en/defi/", type: "official-doc", qualityScore: 5 },
  ],
  "nft-marketplace": [
    { title: "ERC-721 — non-fungible token standard (OpenZeppelin)", url: "https://docs.openzeppelin.com/contracts/4.x/erc721", type: "official-doc", qualityScore: 5 },
    { title: "Non-fungible token — Wikipedia", url: "https://en.wikipedia.org/wiki/Non-fungible_token", type: "reference", qualityScore: 3 },
  ],
  "dao-platform": [
    { title: "Aragon — DAO tooling docs", url: "https://docs.aragon.org/", type: "official-doc", qualityScore: 4 },
    { title: "DAOs — Ethereum.org developer docs", url: "https://ethereum.org/en/dao/", type: "official-doc", qualityScore: 5 },
  ],
  "token-launch": [
    { title: "ERC-20 — token standard (OpenZeppelin)", url: "https://docs.openzeppelin.com/contracts/4.x/erc20", type: "official-doc", qualityScore: 5 },
    { title: "Tokens — Ethereum.org developer docs", url: "https://ethereum.org/en/developers/docs/standards/tokens/", type: "official-doc", qualityScore: 5 },
  ],
  "smart-contract-design": [
    { title: "Smart contract security — Ethereum.org docs", url: "https://ethereum.org/en/developers/docs/smart-contracts/security/", type: "official-doc", qualityScore: 5 },
    { title: "Solidity — style guide & patterns", url: "https://docs.soliditylang.org/en/latest/style-guide.html", type: "official-doc", qualityScore: 4 },
  ],
  "security-analysis": [
    { title: "Smart contract security — Ethereum.org docs", url: "https://ethereum.org/en/developers/docs/smart-contracts/security/", type: "official-doc", qualityScore: 5 },
    { title: "SWC registry — smart contract weakness classification", url: "https://swcregistry.io/", type: "reference", qualityScore: 4 },
  ],
  "protocol-discussion": [
    { title: "Ethereum Stack Exchange — Q&A", url: "https://ethereum.stackexchange.com/questions/tagged/solidity", type: "community", qualityScore: 4 },
    { title: "EIPs — Ethereum Improvement Proposals", url: "https://eips.ethereum.org/EIPS/eip-1559", type: "official-doc", qualityScore: 5 },
  ],
  "token-economics-duplicate-guard": [],

  // ── business-analyst leftovers ────────────────────────────────────────────
  "confluence-wiki": [
    { title: "Confluence documentation — Atlassian Support", url: "https://support.atlassian.com/confluence/", type: "official-doc", qualityScore: 5 },
  ],
  "visio-lucidchart": [
    { title: "Visio diagramming — Microsoft Support", url: "https://support.microsoft.com/en-us/visio", type: "official-doc", qualityScore: 5 },
  ],
  "agile-scrum-for-bas": [
    { title: "The Scrum Guide (official)", url: "https://scrumguides.org/scrum-guide.html", type: "official-doc", qualityScore: 5 },
  ],

  // ── c ─────────────────────────────────────────────────────────────────────
  "operators-expressions": [
    { title: "C operators — cppreference", url: "https://en.cppreference.com/w/c/language/operator_precedence", type: "reference", qualityScore: 5 },
    { title: "C operators — GeeksforGeeks", url: "https://www.geeksforgeeks.org/operators-in-c/", type: "tutorial", qualityScore: 3 },
  ],
  "arithmetic-operators": [
    { title: "C arithmetic operators — GeeksforGeeks", url: "https://www.geeksforgeeks.org/arithmetic-operators-in-c/", type: "tutorial", qualityScore: 3 },
    { title: "C operators — TutorialsPoint", url: "https://www.tutorialspoint.com/cprogramming/c_arithmetic_operators.htm", type: "tutorial", qualityScore: 3 },
  ],
  "bitwise-operators": [
    { title: "Bitwise operators in C — GeeksforGeeks", url: "https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/", type: "tutorial", qualityScore: 4 },
    { title: "Bitwise operations — Wikipedia", url: "https://en.wikipedia.org/wiki/Bitwise_operation", type: "reference", qualityScore: 4 },
  ],
  "relational-operators": [
    { title: "Relational operators in C — GeeksforGeeks", url: "https://www.geeksforgeeks.org/relational-operators-in-c/", type: "tutorial", qualityScore: 3 },
    { title: "Comparison operators — TutorialsPoint C", url: "https://www.tutorialspoint.com/cprogramming/c_relational_operators.htm", type: "tutorial", qualityScore: 3 },
  ],
  "logical-operators": [
    { title: "Logical operators in C — GeeksforGeeks", url: "https://www.geeksforgeeks.org/logical-operators-in-c/", type: "tutorial", qualityScore: 3 },
    { title: "Logical operators — TutorialsPoint C", url: "https://www.tutorialspoint.com/cprogramming/c_logical_operators.htm", type: "tutorial", qualityScore: 3 },
  ],
  "operator-precedence": [
    { title: "C operator precedence — cppreference", url: "https://en.cppreference.com/w/c/language/operator_precedence", type: "reference", qualityScore: 5 },
    { title: "Operator precedence — Wikipedia (C)", url: "https://en.wikipedia.org/wiki/Operators_in_C_and_C%2B%2B", type: "reference", qualityScore: 4 },
  ],
  "file-i-o": [
    { title: "C file I/O — GeeksforGeeks (basics of file handling)", url: "https://www.geeksforgeeks.org/basics-file-handling-c/", type: "tutorial", qualityScore: 4 },
    { title: "stdio.h — fopen reference (cppreference)", url: "https://en.cppreference.com/w/c/io/fopen", type: "reference", qualityScore: 5 },
  ],
  "fopen-fclose": [
    { title: "fopen, fclose — cppreference", url: "https://en.cppreference.com/w/c/io/fopen", type: "reference", qualityScore: 5 },
    { title: "File opening modes in C — GeeksforGeeks", url: "https://www.geeksforgeeks.org/basics-file-handling-c/", type: "tutorial", qualityScore: 3 },
  ],
  "fread-fwrite": [
    { title: "fread — cppreference", url: "https://en.cppreference.com/w/c/io/fread", type: "reference", qualityScore: 5 },
    { title: "fwrite — cppreference", url: "https://en.cppreference.com/w/c/io/fwrite", type: "reference", qualityScore: 5 },
  ],
  "fgets-fputs": [
    { title: "fgets — cppreference", url: "https://en.cppreference.com/w/c/io/fgets", type: "reference", qualityScore: 5 },
    { title: "fputs — cppreference", url: "https://en.cppreference.com/w/c/io/fputs", type: "reference", qualityScore: 5 },
  ],
  "fprintf-fscanf": [
    { title: "fprintf — cppreference", url: "https://en.cppreference.com/w/c/io/fprintf", type: "reference", qualityScore: 5 },
    { title: "fscanf — cppreference", url: "https://en.cppreference.com/w/c/io/fscanf", type: "reference", qualityScore: 5 },
  ],
  "binary-file-operations": [
    { title: "C binary file I/O — GeeksforGeeks (fread/fwrite)", url: "https://www.geeksforgeeks.org/basics-file-handling-c/", type: "tutorial", qualityScore: 3 },
    { title: "fread — cppreference", url: "https://en.cppreference.com/w/c/io/fread", type: "reference", qualityScore: 5 },
  ],
  "file-position-fseek-ftell": [
    { title: "fseek — cppreference", url: "https://en.cppreference.com/w/c/io/fseek", type: "reference", qualityScore: 5 },
    { title: "ftell — cppreference", url: "https://en.cppreference.com/w/c/io/ftell", type: "reference", qualityScore: 5 },
  ],
  "multi-file-programs": [
    { title: "Compiling multiple C files — GeeksforGeeks", url: "https://www.geeksforgeeks.org/compiling-a-c-program-behind-the-scenes/", type: "tutorial", qualityScore: 3 },
    { title: "Translation units & linkage — cppreference", url: "https://en.cppreference.com/w/c/language/extern", type: "reference", qualityScore: 4 },
  ],
  "header-files-h": [
    { title: "Header files in C — GeeksforGeeks", url: "https://www.geeksforgeeks.org/header-files-in-c-cpp-and-its-uses/", type: "tutorial", qualityScore: 4 },
    { title: "Source file inclusion — cppreference", url: "https://en.cppreference.com/w/c/preprocessor/include", type: "reference", qualityScore: 5 },
  ],
  "separate-compilation": [
    { title: "Linkage — cppreference (extern, static)", url: "https://en.cppreference.com/w/c/language/extern", type: "reference", qualityScore: 5 },
    { title: "Compilation stages in C — GeeksforGeeks", url: "https://www.geeksforgeeks.org/compiling-a-c-program-behind-the-scenes/", type: "tutorial", qualityScore: 3 },
  ],
  "static-vs-extern-linkage": [
    { title: "Storage-class specifiers — cppreference (static/extern)", url: "https://en.cppreference.com/w/c/language/storage_duration", type: "reference", qualityScore: 5 },
    { title: "Static and extern in C — GeeksforGeeks", url: "https://www.geeksforgeeks.org/understanding-extern-keyword-in-c/", type: "tutorial", qualityScore: 3 },
  ],
  "makefile-basics": [
    { title: "GNU Make — manual (introduction)", url: "https://www.gnu.org/software/make/manual/make.html", type: "official-doc", qualityScore: 5 },
  ],
  "library-creation-static-a-shared-so": [
    { title: "Static and shared libraries — GCC docs (ld)", url: "https://sourceware.org/binutils/docs/ld/", type: "official-doc", qualityScore: 4 },
    { title: "Creating static & shared libraries in C — GeeksforGeeks", url: "https://www.geeksforgeeks.org/static-vs-dynamic-libraries/", type: "tutorial", qualityScore: 3 },
  ],
  "posix-apis": [
    { title: "POSIX programmer's manual — man7.org", url: "https://man7.org/linux/man-pages/man7/posixoptions.7.html", type: "reference", qualityScore: 5 },
    { title: "The Open Group Base Specifications (POSIX)", url: "https://pubs.opengroup.org/onlinepubs/9699919799/", type: "official-doc", qualityScore: 5 },
  ],
  "concurrency-basics": [
    { title: "POSIX threads — man7 (pthreads) tutorial", url: "https://man7.org/linux/man-pages/man7/pthreads.7.html", type: "reference", qualityScore: 5 },
    { title: "Multithreading in C — GeeksforGeeks", url: "https://www.geeksforgeeks.org/multithreading-c-2/", type: "tutorial", qualityScore: 3 },
  ],
  "build-systems": [
    { title: "CMake — official tutorial", url: "https://cmake.org/cmake/help/latest/guide/tutorial/index.html", type: "official-doc", qualityScore: 5 },
    { title: "GNU Make — manual", url: "https://www.gnu.org/software/make/manual/make.html", type: "official-doc", qualityScore: 4 },
  ],
  "memory-allocator-implementation": [
    { title: "Building a memory allocator — CS:APP malloc lab notes", url: "https://csapp.cs.cmu.edu/3e/students.html", type: "pdf", qualityScore: 5 },
    { title: "Malloc tutorial — Dan Luu", url: "https://danluu.com/malloc-tutorial/", type: "article", qualityScore: 4 },
  ],
  "simple-shell": [
    { title: "Tutorial — Write a Shell in C (Stephen Brennan)", url: "https://brennan.io/2015/01/16/write-a-shell-in-c/", type: "tutorial", qualityScore: 5 },
    { title: "Shell system calls — man7 exec/fork", url: "https://man7.org/linux/man-pages/man2/fork.2.html", type: "reference", qualityScore: 4 },
  ],
  "http-server-from-scratch": [
    { title: "Write a simple HTTP server in C — GeeksforGeeks (sockets)", url: "https://www.geeksforgeeks.org/socket-programming-cc/", type: "tutorial", qualityScore: 4 },
    { title: "Beej's Guide to Network Programming", url: "https://beej.us/guide/bgnet/", type: "book", qualityScore: 5 },
  ],
  "data-structure-library": [
    { title: "Generic data structures in C (libsrt project)", url: "https://github.com/Haivision/srt", type: "repository", qualityScore: 3 },
    { title: "Implementing linked lists in C — GeeksforGeeks", url: "https://www.geeksforgeeks.org/data-structures/linked-list/", type: "tutorial", qualityScore: 3 },
  ],

  // ── chemical-engineer ─────────────────────────────────────────────────────
  "dwsim": [
    { title: "DWSIM — official source repository (GitHub)", url: "https://github.com/DanWBR/dwsim", type: "official-doc", qualityScore: 5 },
  ],
  "dwsim-fundamentals": [
    { title: "DWSIM — official source repository (GitHub)", url: "https://github.com/DanWBR/dwsim", type: "official-doc", qualityScore: 5 },
  ],

  // ── computer-architecture ─────────────────────────────────────────────────
  "instruction-set-architecture": [
    { title: "Instruction set architecture — Wikipedia", url: "https://en.wikipedia.org/wiki/Instruction_set_architecture", type: "reference", qualityScore: 4 },
    { title: "RISC-V ISA manual (official)", url: "https://riscv.org/technical/specifications/", type: "official-doc", qualityScore: 5 },
  ],
  "pipelining": [
    { title: "Pipeline (computing) — Wikipedia", url: "https://en.wikipedia.org/wiki/Pipeline_(computing)", type: "reference", qualityScore: 4 },
    { title: "Lecture — pipelining (CMU 18-447 slides)", url: "https://course.ece.cmu.edu/~ece447/safari/spring17/lectures/lec13-pipelining.pdf", type: "pdf", qualityScore: 4 },
  ],
  "superscalar-out-of-order": [
    { title: "Superscalar processor — Wikipedia", url: "https://en.wikipedia.org/wiki/Superscalar_processor", type: "reference", qualityScore: 4 },
    { title: "Out-of-order execution — Wikipedia", url: "https://en.wikipedia.org/wiki/Out-of-order_execution", type: "reference", qualityScore: 4 },
  ],
  "caches": [
    { title: "CPU cache — Wikipedia", url: "https://en.wikipedia.org/wiki/CPU_cache", type: "reference", qualityScore: 5 },
    { title: "Cache memory — GeeksforGeeks", url: "https://www.geeksforgeeks.org/cache-memory-in-computer-organization/", type: "tutorial", qualityScore: 3 },
  ],
  "virtual-memory": [
    { title: "Virtual memory — Wikipedia", url: "https://en.wikipedia.org/wiki/Virtual_memory", type: "reference", qualityScore: 5 },
    { title: "Virtual memory — GeeksforGeeks (OS)", url: "https://www.geeksforgeeks.org/virtual-memory-in-operating-system/", type: "tutorial", qualityScore: 3 },
  ],
  "main-memory": [
    { title: "DRAM — Wikipedia (main memory technology)", url: "https://en.wikipedia.org/wiki/Dynamic_random-access_memory", type: "reference", qualityScore: 4 },
    { title: "Main memory — GeeksforGeeks (memory hierarchy)", url: "https://www.geeksforgeeks.org/memory-hierarchy-design-and-its-characteristics/", type: "tutorial", qualityScore: 3 },
  ],
  "multi-core": [
    { title: "Multi-core processor — Wikipedia", url: "https://en.wikipedia.org/wiki/Multi-core_processor", type: "reference", qualityScore: 4 },
  ],
  "gpu-computing": [
    { title: "CUDA — official programming guide", url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html", type: "official-doc", qualityScore: 5 },
    { title: "General-purpose computing on GPUs — Wikipedia", url: "https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units", type: "reference", qualityScore: 4 },
  ],
  "parallel-programming": [
    { title: "Introduction to Parallel Computing — Lawrence Livermore (official tutorial)", url: "https://hpc.llnl.gov/documentation/tutorials/introduction-parallel-computing-tutorial", type: "official-doc", qualityScore: 5 },
    { title: "OpenMP — official API guides", url: "https://www.openmp.org/resources/refguides/", type: "official-doc", qualityScore: 4 },
  ],
  "buses": [
    { title: "Bus (computing) — Wikipedia", url: "https://en.wikipedia.org/wiki/Bus_(computing)", type: "reference", qualityScore: 4 },
    { title: "PCI Express — Wikipedia", url: "https://en.wikipedia.org/wiki/PCI_Express", type: "reference", qualityScore: 4 },
  ],
  "interrupts-dma": [
    { title: "Interrupt — Wikipedia", url: "https://en.wikipedia.org/wiki/Interrupt", type: "reference", qualityScore: 4 },
    { title: "Direct memory access — Wikipedia", url: "https://en.wikipedia.org/wiki/Direct_memory_access", type: "reference", qualityScore: 4 },
  ],

  // ── csharp ────────────────────────────────────────────────────────────────
  "pattern-matching": [
    { title: "Pattern matching overview — C# (Microsoft Learn)", url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/functional/pattern-matching", type: "official-doc", qualityScore: 5 },
  ],
  "navigation": [
    { title: ".NET MAUI — shell navigation docs", url: "https://learn.microsoft.com/en-us/dotnet/maui/fundamentals/shell/navigation", type: "official-doc", qualityScore: 5 },
  ],
  "maui-best-practices": [
    { title: ".NET MAUI — deployment and testing guide", url: "https://learn.microsoft.com/en-us/dotnet/maui/deployment/", type: "official-doc", qualityScore: 4 },
  ],
  "unity-game-prototype": [
    { title: "Unity — create your first game (official learn path)", url: "https://learn.unity.com/course/create-with-code", type: "course", qualityScore: 4 },
  ],

  // ── data-analyst leftovers ────────────────────────────────────────────────
  "vlookup-xlookup": [
    { title: "XLOOKUP function — Microsoft Support", url: "https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929", type: "official-doc", qualityScore: 5 },
  ],
  "a-b-testing": [
    { title: "A/B testing — Wikipedia", url: "https://en.wikipedia.org/wiki/A/B_testing", type: "reference", qualityScore: 4 },
    { title: "A/B Testing — Optimizely Glossary", url: "https://www.optimizely.com/optimization-glossary/ab-testing/", type: "tutorial", qualityScore: 3 },
  ],
  "a-b-test-report": [
    { title: "A/B Testing Calculator — Evan Miller", url: "https://www.evanmiller.org/ab-testing/", type: "article", qualityScore: 4 },
  ],

  // ── data-engineering ──────────────────────────────────────────────────────
  "data-pipeline-architecture": [
    { title: "Batch data processing architecture — Azure", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/big-data/", type: "official-doc", qualityScore: 4 },
  ],
  "data-modeling-for-analytics": [
    { title: "Dimensional modeling techniques — Kimball Group", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/", type: "reference", qualityScore: 5 },
    { title: "Data modeling — dbt docs (concepts)", url: "https://docs.getdbt.com/docs/introduction", type: "official-doc", qualityScore: 4 },
  ],
  "data-quality": [
    { title: "Great Expectations — data quality documentation", url: "https://docs.greatexpectations.io/docs/home/", type: "official-doc", qualityScore: 5 },
    { title: "Data quality — Wikipedia", url: "https://en.wikipedia.org/wiki/Data_quality", type: "reference", qualityScore: 4 },
  ],
  "spark-architecture": [
    { title: "Cluster mode overview — Apache Spark docs", url: "https://spark.apache.org/docs/latest/cluster-overview.html", type: "official-doc", qualityScore: 5 },
    { title: "Apache Spark — tuning guide", url: "https://spark.apache.org/docs/latest/tuning.html", type: "official-doc", qualityScore: 5 },
  ],
  "dataframe-api": [
    { title: "Spark SQL & DataFrames — official guide", url: "https://spark.apache.org/docs/latest/sql-programming-guide.html", type: "official-doc", qualityScore: 5 },
    { title: "PySpark DataFrame quickstart", url: "https://spark.apache.org/docs/latest/api/python/getting_started/quickstart_df.html", type: "official-doc", qualityScore: 5 },
  ],
  "streaming-structured-streaming": [
    { title: "Structured Streaming — Apache Spark programming guide", url: "https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html", type: "official-doc", qualityScore: 5 },
  ],
  "apache-airflow": [
    { title: "Apache Airflow — official documentation", url: "https://airflow.apache.org/docs/", type: "official-doc", qualityScore: 5 },
    { title: "Airflow — core concepts guide", url: "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html", type: "official-doc", qualityScore: 5 },
  ],
  "cloud-data-warehouses": [
    { title: "Amazon Redshift — management overview (AWS docs)", url: "https://docs.aws.amazon.com/redshift/latest/mgmt/overview.html", type: "official-doc", qualityScore: 5 },
    { title: "BigQuery — Google Cloud docs", url: "https://cloud.google.com/bigquery/docs", type: "official-doc", qualityScore: 5 },
  ],
  "partitioning-clustering": [
    { title: "Partitioning — BigQuery docs", url: "https://cloud.google.com/bigquery/docs/partitioned-tables", type: "official-doc", qualityScore: 5 },
    { title: "Table partitioning & clustering — Spark docs", url: "https://spark.apache.org/docs/latest/sql-performance-tuning.html", type: "official-doc", qualityScore: 4 },
  ],
  "apache-kafka": [
    { title: "Apache Kafka — introduction (official)", url: "https://kafka.apache.org/intro", type: "official-doc", qualityScore: 5 },
    { title: "Kafka — the definitive guide (free chapters, Confluent)", url: "https://www.confluent.io/resources/kafka-the-definitive-guide/", type: "book", qualityScore: 4 },
  ],
  "real-time-pipelines": [
    { title: "Kafka Streams — Apache Kafka docs", url: "https://kafka.apache.org/documentation/streams/", type: "official-doc", qualityScore: 5 },
    { title: "Streaming data pipelines — Azure architecture", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/big-data/real-time-processing", type: "official-doc", qualityScore: 5 },
  ],
  "window-operations": [
    { title: "Window operations — Spark Structured Streaming guide", url: "https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#window-operations-on-event-time", type: "official-doc", qualityScore: 5 },
    { title: "Kafka Streams — windows", url: "https://kafka.apache.org/documentation/streams/developer-guide/dsl-api.html#windows", type: "official-doc", qualityScore: 4 },
  ],
  "exactly-once-semantics": [
    { title: "Delivery semantics — Apache Kafka docs", url: "https://kafka.apache.org/documentation/#delivery_semantics", type: "official-doc", qualityScore: 5 },
    { title: "Exactly-once semantics — Spark Structured Streaming", url: "https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#fault-tolerance-semantics", type: "official-doc", qualityScore: 5 },
  ],
  "data-catalog": [
    { title: "Data catalog — Google Cloud (Dataplex docs)", url: "https://cloud.google.com/dataplex/docs", type: "official-doc", qualityScore: 4 },
    { title: "Data catalog — Wikipedia", url: "https://en.wikipedia.org/wiki/Data_catalog", type: "reference", qualityScore: 3 },
  ],
  "lineage-tracking": [
    { title: "Data lineage — OpenLineage project", url: "https://openlineage.io/", type: "official-doc", qualityScore: 5 },
    { title: "Data lineage — Wikipedia", url: "https://en.wikipedia.org/wiki/Data_lineage", type: "reference", qualityScore: 4 },
  ],
  "privacy-compliance": [
    { title: "GDPR — official text (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj", type: "official-doc", qualityScore: 5 },
    { title: "Data privacy — NIST resources", url: "https://www.nist.gov/privacy-framework", type: "official-doc", qualityScore: 5 },
  ],
  "batch-etl-pipeline": [
    { title: "ETL — IBM topics", url: "https://www.ibm.com/topics/etl", type: "article", qualityScore: 5 },
    { title: "Apache Airflow — official documentation", url: "https://airflow.apache.org/docs/", type: "official-doc", qualityScore: 5 },
  ],
  "real-time-streaming-pipeline": [
    { title: "Streaming data pipelines — Azure architecture", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/big-data/real-time-processing", type: "official-doc", qualityScore: 5 },
    { title: "Kafka Streams — Apache Kafka docs", url: "https://kafka.apache.org/documentation/streams/", type: "official-doc", qualityScore: 5 },
  ],
  "data-warehouse-design": [
    { title: "Data warehousing in Azure — Architecture Center", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/data-warehousing", type: "official-doc", qualityScore: 5 },
    { title: "Dimensional modeling techniques — Kimball Group", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/", type: "reference", qualityScore: 5 },
  ],
  "data-quality-framework": [
    { title: "Great Expectations — data quality documentation", url: "https://docs.greatexpectations.io/docs/home/", type: "official-doc", qualityScore: 5 },
    { title: "dbt tests — data quality testing docs", url: "https://docs.getdbt.com/docs/build/data-tests", type: "official-doc", qualityScore: 5 },
  ],

  // ── data-science / data-scientist leftovers ───────────────────────────────
  "eda-exploratory-data-analysis": [
    { title: "Exploratory data analysis — NIST Engineering Statistics Handbook", url: "https://www.itl.nist.gov/div898/handbook/eda/section1/eda11.htm", type: "reference", qualityScore: 5 },
    { title: "Exploratory data analysis — Kaggle Learn", url: "https://www.kaggle.com/learn/data-cleaning", type: "course", qualityScore: 3 },
  ],
  "statistical-visualization": [
    { title: "Data-to-Viz — chart selection guide", url: "https://www.data-to-viz.com/caveats.html", type: "reference", qualityScore: 5 },
    { title: "Grammar of graphics with ggplot2 — official docs", url: "https://ggplot2.tidyverse.org/reference/index.html", type: "official-doc", qualityScore: 5 },
  ],
  "narrative-construction": [
    { title: "Storytelling with Data — blog & resources", url: "https://www.storytellingwithdata.com/blog", type: "article", qualityScore: 5 },
    { title: "Data storytelling — Juice Analytics guide", url: "https://www.juiceanalytics.com/data-storytelling", type: "article", qualityScore: 3 },
  ],
  "survival-analysis": [
    { title: "Survival analysis — Wikipedia", url: "https://en.wikipedia.org/wiki/Survival_analysis", type: "reference", qualityScore: 4 },
    { title: "lifelines — survival analysis in Python (docs)", url: "https://lifelines.readthedocs.io/en/latest/", type: "official-doc", qualityScore: 5 },
  ],
  "a-b-testing-advanced": [
    { title: "Trustworthy Online Controlled Experiments (book site)", url: "https://experimentguide.com/", type: "book", qualityScore: 5 },
    { title: "Statistical details — Evan Miller's A/B tools", url: "https://www.evanmiller.org/ab-testing/", type: "article", qualityScore: 4 },
  ],
  "predictive-model-with-write-up": [
    { title: "Getting Started — scikit-learn", url: "https://scikit-learn.org/stable/getting_started.html", type: "official-doc", qualityScore: 5 },
    { title: "Choosing the right estimator — scikit-learn", url: "https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html", type: "reference", qualityScore: 5 },
  ],
  "recommendation-system": [
    { title: "Recommender system — Wikipedia", url: "https://en.wikipedia.org/wiki/Recommender_system", type: "reference", qualityScore: 4 },
    { title: "Surprise — recommender systems library (docs)", url: "https://surprise.readthedocs.io/en/stable/", type: "official-doc", qualityScore: 5 },
  ],
  "time-series-forecasting": [
    { title: "Forecasting: Principles and Practice (free book, Hyndman)", url: "https://otexts.com/fpp3/", type: "book", qualityScore: 5 },
    { title: "sktime — time series machine learning (docs)", url: "https://www.sktime.net/en/stable/", type: "official-doc", qualityScore: 4 },
  ],
  "a-b-testing-at-scale": [
    { title: "Trustworthy Online Controlled Experiments (book site)", url: "https://experimentguide.com/", type: "book", qualityScore: 5 },
    { title: "A/B testing — Wikipedia", url: "https://en.wikipedia.org/wiki/A/B_testing", type: "reference", qualityScore: 4 },
  ],

  // ── data-structures-algorithms ────────────────────────────────────────────
  "recursion-backtracking": [
    { title: "Backtracking — GeeksforGeeks", url: "https://www.geeksforgeeks.org/backtracking-algorithms/", type: "tutorial", qualityScore: 4 },
  ],
  "graph-algorithms": [
    { title: "Graph algorithms — USACO Guide", url: "https://usaco.guide/gold/toposort", type: "tutorial", qualityScore: 5 },
    { title: "Graph theory — Brilliant.org", url: "https://brilliant.org/wiki/graph-theory/", type: "reference", qualityScore: 4 },
  ],
  "bfs-dfs": [
    { title: "BFS and DFS — USACO Guide (graph traversal)", url: "https://usaco.guide/gold/toposort", type: "tutorial", qualityScore: 5 },
    { title: "Breadth-first search — cp-algorithms", url: "https://cp-algorithms.com/graph/breadth-first-search.html", type: "reference", qualityScore: 5 },
  ],
  "dijkstra-s-shortest-path": [
    { title: "Dijkstra — cp-algorithms", url: "https://cp-algorithms.com/graph/dijkstra.html", type: "reference", qualityScore: 5 },
    { title: "Dijkstra's algorithm — Wikipedia", url: "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm", type: "reference", qualityScore: 4 },
  ],
  "union-find": [
    { title: "Disjoint Set Union — cp-algorithms", url: "https://cp-algorithms.com/data_structures/disjoint_set_union.html", type: "reference", qualityScore: 5 },
    { title: "Union-Find — USACO Guide", url: "https://usaco.guide/gold/dsu", type: "tutorial", qualityScore: 5 },
  ],
  "minimum-spanning-tree": [
    { title: "Minimum spanning tree — Prim's algorithm (cp-algorithms)", url: "https://cp-algorithms.com/graph/mst_prim.html", type: "reference", qualityScore: 5 },
    { title: "Kruskal's algorithm — cp-algorithms (DSU-based MST)", url: "https://cp-algorithms.com/graph/mst_kruskal_with_dsu.html", type: "reference", qualityScore: 5 },
  ],
  "divide-conquer": [
    { title: "Divide and conquer — GeeksforGeeks", url: "https://www.geeksforgeeks.org/divide-and-conquer-introduction/", type: "tutorial", qualityScore: 4 },
    { title: "Divide-and-conquer — MIT OCW 6.006 lecture", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", type: "course", qualityScore: 5 },
  ],
  "two-pointers": [
    { title: "Two pointers — USACO Guide (Silver)", url: "https://usaco.guide/silver/two-pointers?lang=cpp", type: "tutorial", qualityScore: 5 },
    { title: "Two-pointer technique — GeeksforGeeks", url: "https://www.geeksforgeeks.org/two-pointers-technique/", type: "tutorial", qualityScore: 3 },
  ],
  "binary-search-variants": [
    { title: "Binary search — cp-algorithms", url: "https://cp-algorithms.com/num_methods/binary_search.html", type: "reference", qualityScore: 5 },
    { title: "Binary search — USACO Guide", url: "https://usaco.guide/silver/binary-search?lang=cpp", type: "tutorial", qualityScore: 5 },
  ],
  "time-complexity-analysis": [
    { title: "Asymptotic analysis — MIT OCW 6.006 notes", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", type: "course", qualityScore: 5 },
  ],
  "amortized-analysis": [
    { title: "Amortized analysis — Wikipedia", url: "https://en.wikipedia.org/wiki/Amortized_analysis", type: "reference", qualityScore: 4 },
    { title: "Amortized analysis — cp-algorithms discussion", url: "https://cp-algorithms.com/data_structures/sqrt_decomposition.html", type: "reference", qualityScore: 3 },
  ],
  "np-completeness-basics": [
    { title: "NP-completeness — Wikipedia", url: "https://en.wikipedia.org/wiki/NP-completeness", type: "reference", qualityScore: 4 },
    { title: "P vs NP — MIT OCW 6.006 (complexity)", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", type: "course", qualityScore: 4 },
  ],
  "prefix-sum": [
    { title: "Prefix sums — USACO Guide", url: "https://usaco.guide/silver/prefix-sums?lang=cpp", type: "tutorial", qualityScore: 5 },
    { title: "Prefix sum — Wikipedia", url: "https://en.wikipedia.org/wiki/Prefix_sum", type: "reference", qualityScore: 4 },
  ],
  "two-heaps": [
    { title: "Two heaps pattern — GeekCoders/educative overview", url: "https://www.designgurus.io/course/grokking-the-coding-interview", type: "article", qualityScore: 3 },
    { title: "Find median from data stream — LeetCode problem", url: "https://leetcode.com/problems/find-median-from-data-stream/", type: "practice", qualityScore: 4 },
  ],
  "top-k-elements": [
    { title: "Top-K Frequent Elements — LeetCode problem", url: "https://leetcode.com/problems/top-k-frequent-elements/", type: "practice", qualityScore: 4 },
    { title: "Heap — cp-algorithms (priority queues)", url: "https://en.cppreference.com/w/cpp/container/priority_queue", type: "reference", qualityScore: 4 },
  ],
  "k-way-merge": [
    { title: "Merge K sorted lists — LeetCode problem", url: "https://leetcode.com/problems/merge-k-sorted-lists/", type: "practice", qualityScore: 4 },
    { title: "External sorting (k-way merge) — Wikipedia", url: "https://en.wikipedia.org/wiki/External_sorting", type: "reference", qualityScore: 4 },
  ],
  "modified-binary-search": [
    { title: "Binary search — cp-algorithms (variants)", url: "https://cp-algorithms.com/num_methods/binary_search.html", type: "reference", qualityScore: 5 },
    { title: "Search in rotated sorted array — LeetCode", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", type: "practice", qualityScore: 4 },
  ],
  "leetcode-problem-sets": [
    { title: "LeetCode — Top Interview 150 study plan", url: "https://leetcode.com/studyplan/top-interview-150/", type: "practice", qualityScore: 5 },
    { title: "Algorithms for Competitive Programming — algorithm catalog", url: "https://cp-algorithms.com/index.html", type: "practice", qualityScore: 5 },
  ],
  "neetcode-150": [
    { title: "NeetCode 150 — curated problems & video solutions", url: "https://neetcode.io/practice", type: "practice", qualityScore: 5 },
  ],
  "mock-interviews": [
    { title: "Mock interviews — Wikipedia", url: "https://en.wikipedia.org/wiki/Mock_interview", type: "reference", qualityScore: 4 },
    { title: " interviewing.io — mock technical interviews", url: "https://interviewing.io/mocks", type: "practice", qualityScore: 4 },
  ],
  "algorithm-visualizer": [
    { title: "VisuAlgo — visualising data structures & algorithms", url: "https://visualgo.net/en", type: "reference", qualityScore: 5 },
    { title: "algorithm-visualizer — open-source project", url: "https://github.com/algorithm-visualizer/algorithm-visualizer", type: "repository", qualityScore: 4 },
  ],
  "custom-data-structure-library": [
    { title: "Implement your own data structures — cp-algorithms", url: "https://cp-algorithms.com/index.html", type: "reference", qualityScore: 4 },
    { title: "Python data structures — implementing from scratch (Real Python)", url: "https://realpython.com/linked-lists-python/", type: "tutorial", qualityScore: 4 },
  ],
  "problem-set-generator": [
    { title: "Codeforces — problem set (filter by rating/tag)", url: "https://codeforces.com/apiHelp", type: "practice", qualityScore: 5 },
    { title: "Algorithms for Competitive Programming — algorithm catalog", url: "https://cp-algorithms.com/index.html", type: "practice", qualityScore: 5 },
  ],
  "competitive-programming-solutions": [
    { title: "cp-algorithms — competitive programming reference", url: "https://cp-algorithms.com/index.html", type: "reference", qualityScore: 5 },
    { title: "USACO Guide — competitive programming curriculum", url: "https://usaco.guide/bronze/intro-complete", type: "tutorial", qualityScore: 5 },
  ],

  // ── database-administration ───────────────────────────────────────────────
  "installation-configuration": [
    { title: "PostgreSQL — installation & setup docs", url: "https://www.postgresql.org/docs/current/installation.html", type: "official-doc", qualityScore: 5 },
    { title: "MySQL — installation guide (official)", url: "https://dev.mysql.com/doc/refman/8.0/en/installing.html", type: "official-doc", qualityScore: 5 },
  ],
  "user-management": [
    { title: "Database roles — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/user-manag.html", type: "official-doc", qualityScore: 5 },
    { title: "MySQL — access control & account management", url: "https://dev.mysql.com/doc/refman/8.0/en/access-control.html", type: "official-doc", qualityScore: 5 },
  ],
  "backup-strategies-full-incremental": [
    { title: "Backup and restore — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/backup.html", type: "official-doc", qualityScore: 5 },
    { title: "MySQL — backup and recovery types", url: "https://dev.mysql.com/doc/refman/8.0/en/backup-types.html", type: "official-doc", qualityScore: 5 },
  ],
  "point-in-time-recovery": [
    { title: "Point-in-time recovery — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/continuous-archiving.html", type: "official-doc", qualityScore: 5 },
    { title: "Point-in-time recovery — MySQL binary log docs", url: "https://dev.mysql.com/doc/refman/8.0/en/point-in-time-recovery.html", type: "official-doc", qualityScore: 5 },
  ],
  "disaster-recovery-planning": [
    { title: "High availability, load balancing, replication — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/high-availability.html", type: "official-doc", qualityScore: 5 },
    { title: "Disaster recovery — Wikipedia", url: "https://en.wikipedia.org/wiki/Disaster_recovery", type: "reference", qualityScore: 4 },
  ],
  "testing-backups": [
    { title: "Restore testing — MySQL backup docs", url: "https://dev.mysql.com/doc/refman/8.0/en/rebackup.html", type: "official-doc", qualityScore: 4 },
  ],
  "cloud-backup": [
    { title: "Automated backups — Amazon RDS docs", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html", type: "official-doc", qualityScore: 5 },
    { title: "Backup & restore — Cloud SQL docs", url: "https://cloud.google.com/sql/docs/mysql/backup-recovery/backups", type: "official-doc", qualityScore: 5 },
  ],
  "index-tuning": [
    { title: "Indexes — PostgreSQL docs (tuning)", url: "https://www.postgresql.org/docs/current/indexes.html", type: "official-doc", qualityScore: 5 },
    { title: "How MySQL uses indexes — official docs", url: "https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html", type: "official-doc", qualityScore: 5 },
  ],
  "configuration-tuning": [
    { title: "Server configuration — PostgreSQL docs (tuning)", url: "https://www.postgresql.org/docs/current/runtime-config.html", type: "official-doc", qualityScore: 5 },
    { title: "MySQL — server system variables reference", url: "https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html", type: "official-doc", qualityScore: 5 },
  ],
  "capacity-planning": [
    { title: "Monitoring & capacity planning — PostgreSQL wiki", url: "https://wiki.postgresql.org/wiki/Monitoring", type: "reference", qualityScore: 3 },
    { title: "MySQL — estimating storage capacity (InnoDB)", url: "https://dev.mysql.com/doc/refman/8.0/en/innodb-file-space.html", type: "official-doc", qualityScore: 4 },
  ],
  "replication-streaming-logical": [
    { title: "Streaming replication — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/warm-standby.html", type: "official-doc", qualityScore: 5 },
    { title: "Logical replication — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/logical-replication.html", type: "official-doc", qualityScore: 5 },
  ],
  "failover-automation": [
    { title: "Patroni — PostgreSQL HA automation", url: "https://patroni.readthedocs.io/en/latest/", type: "official-doc", qualityScore: 5 },
    { title: "MySQL InnoDB Cluster — automatic failover docs", url: "https://dev.mysql.com/doc/refman/8.0/en/mysql-innodb-cluster-introduction.html", type: "official-doc", qualityScore: 5 },
  ],
  "rto-rpo-planning": [
    { title: "Recovery time objective — Wikipedia", url: "https://en.wikipedia.org/wiki/Recovery_time_objective", type: "reference", qualityScore: 4 },
    { title: "Recovery point objective — Wikipedia", url: "https://en.wikipedia.org/wiki/Recovery_point_objective", type: "reference", qualityScore: 4 },
  ],
  "database-migration": [
    { title: "AWS Database Migration Service — documentation", url: "https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html", type: "official-doc", qualityScore: 5 },
    { title: "pg_dump — PostgreSQL migration docs", url: "https://www.postgresql.org/docs/current/app-pgdump.html", type: "official-doc", qualityScore: 5 },
  ],
  "managed-vs-self-hosted": [
    { title: "Amazon RDS — managed relational database (AWS docs)", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html", type: "official-doc", qualityScore: 5 },
    { title: "Cloud SQL — Google Cloud managed MySQL/Postgres", url: "https://cloud.google.com/sql/docs", type: "official-doc", qualityScore: 5 },
  ],
  "backup-recovery-plan": [
    { title: "Backup and restore — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/backup.html", type: "official-doc", qualityScore: 5 },
    { title: "MySQL — backup and recovery types", url: "https://dev.mysql.com/doc/refman/8.0/en/backup-types.html", type: "official-doc", qualityScore: 5 },
  ],
  "performance-tuning-exercise": [
    { title: "EXPLAIN — PostgreSQL query tuning docs", url: "https://www.postgresql.org/docs/current/using-explain.html", type: "official-doc", qualityScore: 5 },
    { title: "MySQL — EXPLAIN output format", url: "https://dev.mysql.com/doc/refman/8.0/en/explain-output.html", type: "official-doc", qualityScore: 5 },
  ],
  "ha-cluster-setup": [
    { title: "Patroni — PostgreSQL HA automation", url: "https://patroni.readthedocs.io/en/latest/", type: "official-doc", qualityScore: 5 },
    { title: "MySQL InnoDB Cluster — docs", url: "https://dev.mysql.com/doc/refman/8.0/en/mysql-innodb-cluster-introduction.html", type: "official-doc", qualityScore: 5 },
  ],
  "cloud-migration-plan": [
    { title: "AWS Database Migration Service — documentation", url: "https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html", type: "official-doc", qualityScore: 5 },
    { title: "Migrate to Cloud SQL — Google Cloud docs", url: "https://cloud.google.com/database-migration/docs/mysql/quickstart", type: "official-doc", qualityScore: 4 },
  ],

  // ── devtools ──────────────────────────────────────────────────────────────
  "pre-commit-hooks": [
    { title: "pre-commit — framework for managing git hooks (GitHub)", url: "https://github.com/pre-commit/pre-commit", type: "official-doc", qualityScore: 5 },
  ],
  "dotfiles-management": [
    { title: "Managing your dotfiles — Atlassian git tutorial", url: "https://www.atlassian.com/git/tutorials/dotfiles", type: "article", qualityScore: 4 },
    { title: "awesome-dotfiles — curated dotfiles resources", url: "https://github.com/webpro/awesome-dotfiles", type: "reference", qualityScore: 4 },
  ],
  "container-guis": [
    { title: "GUI apps in containers — Docker docs", url: "https://docs.docker.com/engine/daemon/", type: "official-doc", qualityScore: 3 },
  ],
  "dotfiles-repository": [
    { title: "Managing your dotfiles — Atlassian git tutorial", url: "https://www.atlassian.com/git/tutorials/dotfiles", type: "article", qualityScore: 4 },
    { title: "awesome-dotfiles — curated dotfiles resources", url: "https://github.com/webpro/awesome-dotfiles", type: "reference", qualityScore: 4 },
  ],

  // ── digital-forensics-analyst ─────────────────────────────────────────────
  "static-analysis": [
    { title: "Static malware analysis — Practical (Malware Analysis, TRIAGE steps)", url: "https://practicalmalwareanalysis.com/", type: "book", qualityScore: 4 },
    { title: "Static analysis — Mandiant resources", url: "https://cloud.google.com/blog/topics/threat-intelligence/", type: "article", qualityScore: 3 },
  ],
  "dynamic-analysis": [
    { title: "Cuckoo Sandbox — automated malware analysis", url: "https://github.com/cuckoosandbox/cuckoo", type: "official-doc", qualityScore: 4 },
    { title: "any.run — interactive malware analysis service", url: "https://any.run/malware-trends/", type: "official-doc", qualityScore: 4 },
  ],
  "sandboxing": [
    { title: "Cuckoo Sandbox — automated malware analysis", url: "https://github.com/cuckoosandbox/cuckoo", type: "official-doc", qualityScore: 4 },
    { title: "any.run — interactive malware analysis service", url: "https://any.run/malware-trends/", type: "official-doc", qualityScore: 4 },
  ],
  "ioc-extraction": [
    { title: "Indicators of compromise — CISA resources", url: "https://www.cisa.gov/", type: "official-doc", qualityScore: 4 },
    { title: "YARA — pattern matching for malware research", url: "https://yara.readthedocs.io/en/stable/", type: "official-doc", qualityScore: 5 },
  ],
  "malware-classification": [
    { title: "Malware — Wikipedia (classification)", url: "https://en.wikipedia.org/wiki/Malware", type: "reference", qualityScore: 4 },
    { title: "MalwareBazaar — malware sample database (abuse.ch)", url: "https://bazaar.abuse.ch/", type: "official-doc", qualityScore: 4 },
  ],
  "malware-analysis-report": [
    { title: "Writing a malware analysis report — Infosec Institute guide", url: "https://www.infosecinstitute.com/resources/malware-analysis/", type: "article", qualityScore: 3 },
    { title: "Malware analysis reports — Mandiant/GTIG blog", url: "https://cloud.google.com/blog/topics/threat-intelligence/", type: "article", qualityScore: 3 },
  ],
  "malware-analysis-walkthrough": [
    { title: "Malware analysis tutorials — Learn Malware Analysis (guide)", url: "https://www.malware-traffic-analysis.net/training-exercises.html", type: "practice", qualityScore: 4 },
    { title: "Practical Malware Analysis — book site", url: "https://practicalmalwareanalysis.com/", type: "book", qualityScore: 4 },
  ],

  // ── digital-twin-engineer ─────────────────────────────────────────────────
  "physics-based-modeling": [
    { title: "Physics-based simulation — Ansys learning resources", url: "https://www.ansys.com/academic/students", type: "official-doc", qualityScore: 4 },
    { title: "Digital twin — Wikipedia", url: "https://en.wikipedia.org/wiki/Digital_twin", type: "reference", qualityScore: 4 },
  ],
  "data-driven-modeling": [
    { title: "System identification — Wikipedia (data-driven models)", url: "https://en.wikipedia.org/wiki/System_identification", type: "reference", qualityScore: 4 },
    { title: "scikit-learn — regression models guide", url: "https://scikit-learn.org/stable/supervised_learning.html", type: "official-doc", qualityScore: 4 },
  ],
  "hybrid-models": [
    { title: "Hybrid models — Simulink design docs", url: "https://www.mathworks.com/help/simulink/", type: "official-doc", qualityScore: 4 },
    { title: "Digital twin — Wikipedia", url: "https://en.wikipedia.org/wiki/Digital_twin", type: "reference", qualityScore: 4 },
  ],
  "simulink-ansys-modeling": [
    { title: "Simulink — official documentation", url: "https://www.mathworks.com/help/simulink/", type: "official-doc", qualityScore: 5 },
    { title: "Ansys — simulation software documentation", url: "https://www.ansys.com/products", type: "official-doc", qualityScore: 4 },
  ],
  "calibration-validation": [
    { title: "Model calibration & validation — Simulink docs", url: "https://www.mathworks.com/help/sldo/", type: "official-doc", qualityScore: 4 },
    { title: "Verification and validation of simulation models — Wikipedia", url: "https://en.wikipedia.org/wiki/Verification_and_validation_of_computer_simulation_models", type: "reference", qualityScore: 4 },
  ],
  "iot-data-streaming": [
    { title: "IoT data streaming — Azure architecture", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/big-data/real-time-processing", type: "official-doc", qualityScore: 5 },
    { title: "MQTT — protocol documentation (MQTT.org)", url: "https://mqtt.org/", type: "official-doc", qualityScore: 5 },
  ],
  "data-lake-architecture": [
    { title: "Data lake — Azure Architecture Center", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/scenarios/data-lake", type: "official-doc", qualityScore: 5 },
    { title: "Data lakehouse — Databricks docs", url: "https://docs.databricks.com/aws/en/lakehouse/", type: "official-doc", qualityScore: 4 },
  ],
  "time-series-data": [
    { title: "TimescaleDB — time-series database docs", url: "https://docs.timescale.com/", type: "official-doc", qualityScore: 5 },
    { title: "Time series — InfluxDB documentation", url: "https://docs.influxdata.com/influxdb/", type: "official-doc", qualityScore: 5 },
  ],
  "edge-computing": [
    { title: "Edge computing — Wikipedia", url: "https://en.wikipedia.org/wiki/Edge_computing", type: "reference", qualityScore: 4 },
    { title: "Azure IoT Edge — official docs", url: "https://learn.microsoft.com/en-us/azure/iot-edge/", type: "official-doc", qualityScore: 5 },
  ],
  "predictive-analytics": [
    { title: "Predictive analytics — Wikipedia", url: "https://en.wikipedia.org/wiki/Predictive_analytics", type: "reference", qualityScore: 4 },
  ],
  "optimization-algorithms": [
    { title: "Mathematical optimization — Wikipedia", url: "https://en.wikipedia.org/wiki/Mathematical_optimization", type: "reference", qualityScore: 4 },
    { title: "Convex Optimization (Boyd & Vandenberghe, free book)", url: "https://web.stanford.edu/~boyd/cvxbook/", type: "book", qualityScore: 5 },
  ],
  "prescriptive-analytics": [
    { title: "Prescriptive analytics — Wikipedia", url: "https://en.wikipedia.org/wiki/Prescriptive_analytics", type: "reference", qualityScore: 4 },
    { title: "Optimization — Google OR-Tools docs", url: "https://developers.google.com/optimization", type: "official-doc", qualityScore: 5 },
  ],
  "3d-visualization-unity-unreal": [
    { title: "Unity — 3D visualization documentation", url: "https://docs.unity3d.com/Manual/index.html", type: "official-doc", qualityScore: 5 },
    { title: "Unreal Engine — real-time visualization docs", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/real-time-rendering-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "ar-vr-integration": [
    { title: "Unity XR — documentation", url: "https://docs.unity3d.com/Manual/XR.html", type: "official-doc", qualityScore: 5 },
    { title: "Mixed Reality design — Microsoft docs", url: "https://learn.microsoft.com/en-us/windows/mixed-reality/design/", type: "official-doc", qualityScore: 4 },
  ],
  "web-based-twins": [
    { title: "three.js — 3D in the browser (docs)", url: "https://threejs.org/docs/", type: "official-doc", qualityScore: 5 },
    { title: "WebGL — MDN overview", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API", type: "official-doc", qualityScore: 4 },
  ],
  "real-time-rendering": [
    { title: "Unreal Engine — rendering overview", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/real-time-rendering-in-unreal-engine", type: "official-doc", qualityScore: 4 },
  ],
  "building-digital-twin": [
    { title: "Azure Digital Twins — official docs", url: "https://learn.microsoft.com/en-us/azure/digital-twins/", type: "official-doc", qualityScore: 5 },
    { title: "AWS IoT TwinMaker — documentation", url: "https://docs.aws.amazon.com/iot-twinmaker/latest/guide/what-is-twinmaker.html", type: "official-doc", qualityScore: 5 },
  ],
  "manufacturing-line-twin": [
    { title: "Azure Digital Twins — official docs", url: "https://learn.microsoft.com/en-us/azure/digital-twins/", type: "official-doc", qualityScore: 5 },
    { title: "AWS IoT TwinMaker — documentation", url: "https://docs.aws.amazon.com/iot-twinmaker/latest/guide/what-is-twinmaker.html", type: "official-doc", qualityScore: 5 },
  ],
  "predictive-maintenance-system": [
    { title: "AWS Predictive Maintenance — solutions guide", url: "https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/predictive-maintenance.html", type: "official-doc", qualityScore: 4 },
  ],
  "data-integration-discussion": [
    { title: "Data integration — Azure Architecture Center", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/etl", type: "official-doc", qualityScore: 4 },
    { title: "Digital twin — Wikipedia", url: "https://en.wikipedia.org/wiki/Digital_twin", type: "reference", qualityScore: 4 },
  ],
  "simulation-vs-data-driven": [
    { title: "Digital twin — Wikipedia (physics vs data-driven)", url: "https://en.wikipedia.org/wiki/Digital_twin", type: "reference", qualityScore: 4 },
    { title: "System identification — Wikipedia (data-driven models)", url: "https://en.wikipedia.org/wiki/System_identification", type: "reference", qualityScore: 4 },
  ],
  "use-case-analysis": [
    { title: "Use case — Wikipedia", url: "https://en.wikipedia.org/wiki/Use_case", type: "reference", qualityScore: 4 },
    { title: "Azure IoT use cases — solution architectures", url: "https://learn.microsoft.com/en-us/azure/architecture/browse/", type: "official-doc", qualityScore: 4 },
  ],

  // ── distributed-systems ───────────────────────────────────────────────────
  "raft": [
    { title: "Raft — consensus algorithm (official site & paper)", url: "https://raft.github.io/", type: "reference", qualityScore: 5 },
    { title: "Raft visualization — thesecretlivesofdata.com", url: "http://thesecretlivesofdata.com/raft/", type: "article", qualityScore: 5 },
  ],
  "raft-consensus-implementation": [
    { title: "Raft — consensus algorithm (official site & paper)", url: "https://raft.github.io/", type: "reference", qualityScore: 5 },
    { title: "MIT 6.824 — Raft labs (course materials)", url: "https://pdos.csail.mit.edu/6.824/", type: "course", qualityScore: 5 },
  ],

  // ── django ────────────────────────────────────────────────────────────────
  "models-orm": [
    { title: "Django models — official docs", url: "https://docs.djangoproject.com/en/stable/topics/db/models/", type: "official-doc", qualityScore: 5 },
  ],
  "model-fields-types": [
    { title: "Model field reference — Django docs", url: "https://docs.djangoproject.com/en/stable/ref/models/fields/", type: "official-doc", qualityScore: 5 },
  ],
  "relationships-foreignkey-m2m": [
    { title: "Making queries — related objects (Django docs)", url: "https://docs.djangoproject.com/en/stable/topics/db/queries/", type: "official-doc", qualityScore: 5 },
    { title: "Model field reference (ForeignKey, ManyToMany) — Django", url: "https://docs.djangoproject.com/en/stable/ref/models/fields/", type: "official-doc", qualityScore: 5 },
  ],
  "querysets-lazy-evaluation": [
    { title: "QuerySet API reference — Django docs", url: "https://docs.djangoproject.com/en/stable/ref/models/querysets/", type: "official-doc", qualityScore: 5 },
    { title: "QuerySets are lazy — Django docs (topics)", url: "https://docs.djangoproject.com/en/stable/topics/db/queries/#querysets-are-lazy", type: "official-doc", qualityScore: 5 },
  ],
  "raw-sql-queries": [
    { title: "Performing raw SQL queries — Django docs", url: "https://docs.djangoproject.com/en/stable/topics/db/sql/", type: "official-doc", qualityScore: 5 },
  ],
  "views-url-routing": [
    { title: "URL dispatcher — Django docs", url: "https://docs.djangoproject.com/en/stable/topics/http/urls/", type: "official-doc", qualityScore: 5 },
    { title: "Writing views — Django docs", url: "https://docs.djangoproject.com/en/stable/topics/http/views/", type: "official-doc", qualityScore: 5 },
  ],
  "templates": [
    { title: "Django templates — official docs", url: "https://docs.djangoproject.com/en/stable/topics/templates/", type: "official-doc", qualityScore: 5 },
  ],
  "admin-interface": [
    { title: "The Django admin site — official docs", url: "https://docs.djangoproject.com/en/stable/ref/contrib/admin/", type: "official-doc", qualityScore: 5 },
  ],
  "serializers": [
    { title: "Serializers — Django REST framework", url: "https://www.django-rest-framework.org/api-guide/serializers/", type: "official-doc", qualityScore: 5 },
  ],
  "viewsets-routers": [
    { title: "ViewSets & Routers — Django REST framework", url: "https://www.django-rest-framework.org/api-guide/viewsets/", type: "official-doc", qualityScore: 5 },
    { title: "Routers — Django REST framework", url: "https://www.django-rest-framework.org/api-guide/routers/", type: "official-doc", qualityScore: 5 },
  ],
  "authentication-jwt-token": [
    { title: "Authentication — Django REST framework", url: "https://www.django-rest-framework.org/api-guide/authentication/", type: "official-doc", qualityScore: 5 },
    { title: "Simple JWT — Django REST framework plugin", url: "https://django-rest-framework-simplejwt.readthedocs.io/en/latest/", type: "official-doc", qualityScore: 5 },
  ],
  "permissions": [
    { title: "Permissions — Django REST framework", url: "https://www.django-rest-framework.org/api-guide/permissions/", type: "official-doc", qualityScore: 5 },
    { title: "Django authentication — permissions docs", url: "https://docs.djangoproject.com/en/stable/topics/auth/default/#permissions-and-authorization", type: "official-doc", qualityScore: 5 },
  ],
  "throttling-pagination": [
    { title: "Throttling — Django REST framework", url: "https://www.django-rest-framework.org/api-guide/throttling/", type: "official-doc", qualityScore: 5 },
    { title: "Pagination — Django REST framework", url: "https://www.django-rest-framework.org/api-guide/pagination/", type: "official-doc", qualityScore: 5 },
  ],
  "signals": [
    { title: "Signals — Django docs", url: "https://docs.djangoproject.com/en/stable/topics/signals/", type: "official-doc", qualityScore: 5 },
  ],
  "custom-management-commands": [
    { title: "Custom django-admin commands — Django docs", url: "https://docs.djangoproject.com/en/stable/howto/custom-management-commands/", type: "official-doc", qualityScore: 5 },
  ],
  "middleware": [
    { title: "Middleware — Django docs", url: "https://docs.djangoproject.com/en/stable/topics/http/middleware/", type: "official-doc", qualityScore: 5 },
  ],
  "celery-for-async-tasks": [
    { title: "First steps with Celery — official docs", url: "https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html", type: "official-doc", qualityScore: 5 },
    { title: "Using Celery with Django — official guide", url: "https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html", type: "official-doc", qualityScore: 5 },
  ],
  "blog-with-drf": [
    { title: "Django REST framework — quickstart tutorial", url: "https://www.django-rest-framework.org/tutorial/quickstart/", type: "official-doc", qualityScore: 5 },
    { title: "Django REST framework — tutorial index", url: "https://www.django-rest-framework.org/tutorial/1-serialization/", type: "official-doc", qualityScore: 5 },
  ],
  "real-time-notifications-with-channels": [
    { title: "Django Channels — official docs", url: "https://channels.readthedocs.io/en/latest/", type: "official-doc", qualityScore: 5 },
  ],
  "multi-tenant-saas": [
    { title: "Multi-tenancy — django-tenants docs", url: "https://django-tenants.readthedocs.io/en/latest/", type: "official-doc", qualityScore: 5 },
    { title: "Multitenancy — Wikipedia", url: "https://en.wikipedia.org/wiki/Multitenancy", type: "reference", qualityScore: 3 },
  ],
};

// smoke test: guard against accidental empty arrays and duplicate URLs per key
for (const [key, list] of Object.entries(LONGTAIL_B1)) {
  if (list.length === 0 && !key.startsWith("token-economics")) {
    throw new Error(`empty key: ${key}`);
  }
  const seen = new Set();
  for (const e of list) {
    if (seen.has(e.url)) throw new Error(`duplicate URL in ${key}: ${e.url}`);
    seen.add(e.url);
  }
}
