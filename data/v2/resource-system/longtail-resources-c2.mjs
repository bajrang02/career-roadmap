// ─────────────────────────────────────────────────────────────────────────────
// Long-tail resource library — Part C2 (professional / role clusters)
// Keys: last component of nodePathId, or "roadmapSlug::key" when a label repeats
// across roadmaps and the resources must differ. Same entry shape as Part A/B1.
// ─────────────────────────────────────────────────────────────────────────────

export const LONGTAIL_C2 = {
  // ── machine-learning-engineer ────────────────────────────────────────────
  "end-to-end-ml-project": [
    { title: "Made With ML — end-to-end MLOps course", url: "https://madewithml.com/", type: "course", qualityScore: 5 },
    { title: "scikit-learn — example gallery", url: "https://scikit-learn.org/stable/auto_examples/index.html", type: "tutorial", qualityScore: 4 },
  ],
  "applied-ml-scenarios": [
    { title: "Rules of Machine Learning — Google", url: "https://developers.google.com/machine-learning/guides/rules-of-ml", type: "article", qualityScore: 5 },
    { title: "MLOps: continuous delivery and automation pipelines — Google Cloud", url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning", type: "article", qualityScore: 5 },
  ],

  // ── software-testing-engineer ────────────────────────────────────────────
  "equivalence-partitioning": [
    { title: "Equivalence partitioning & boundary value analysis — Guru99", url: "https://www.guru99.com/equivalence-partitioning-boundary-value-analysis.html", type: "tutorial", qualityScore: 4 },
    { title: "ISTQB glossary — equivalence partition", url: "https://glossary.istqb.org/en_US/term/equivalence-partition", type: "reference", qualityScore: 4 },
  ],
  "boundary-value-analysis": [
    { title: "Boundary value analysis — GeeksforGeeks", url: "https://www.geeksforgeeks.org/software-testing-boundary-value-analysis/", type: "tutorial", qualityScore: 4 },
    { title: "Boundary value analysis — Guru99", url: "https://www.guru99.com/equivalence-partitioning-boundary-value-analysis.html", type: "tutorial", qualityScore: 3 },
  ],
  "decision-tables": [
    { title: "Decision table testing — Guru99", url: "https://www.guru99.com/decision-table-testing.html", type: "tutorial", qualityScore: 4 },
  ],
  "selenium-webdriver-setup": [
    { title: "Getting started with WebDriver — Selenium docs", url: "https://www.selenium.dev/documentation/webdriver/getting_started/", type: "official-doc", qualityScore: 5 },
    { title: "WebDriver — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/WebDriver", type: "official-doc", qualityScore: 4 },
  ],
  "assertions-waits": [
    { title: "Waiting strategies — Selenium docs", url: "https://www.selenium.dev/documentation/webdriver/waits/", type: "official-doc", qualityScore: 5 },
    { title: "Assertions and waits — Playwright docs", url: "https://playwright.dev/docs/test-assertions", type: "official-doc", qualityScore: 4 },
  ],
  "postman-collections": [
    { title: "Collections overview — Postman docs", url: "https://learning.postman.com/docs/collections/collections-overview/", type: "official-doc", qualityScore: 5 },
    { title: "Write scripts in Postman — docs", url: "https://learning.postman.com/docs/writing-scripts/intro-to-scripts/", type: "official-doc", qualityScore: 4 },
  ],
  "jmeter-fundamentals": [
    { title: "Building a test plan — Apache JMeter manual", url: "https://jmeter.apache.org/usermanual/get-started.html", type: "official-doc", qualityScore: 5 },
    { title: "JMeter glossary — metrics", url: "https://jmeter.apache.org/usermanual/glossary.html", type: "reference", qualityScore: 4 },
  ],
  "performance-metrics-tps-response-time": [
    { title: "JMeter glossary — throughput & response time", url: "https://jmeter.apache.org/usermanual/glossary.html", type: "reference", qualityScore: 5 },
    { title: "Performance testing metrics — Gatling docs", url: "https://docs.gatling.io/", type: "official-doc", qualityScore: 3 },
  ],
  "bottleneck-analysis": [
    { title: "JMeter best practices — analyzing results", url: "https://jmeter.apache.org/usermanual/best-practices.html", type: "official-doc", qualityScore: 4 },
    { title: "Profiling & bottleneck analysis — Chrome DevTools", url: "https://developer.chrome.com/docs/devtools/performance/", type: "official-doc", qualityScore: 4 },
  ],
  "testrail-testlink": [
    { title: "TestRail getting started — user guide", url: "https://www.gurock.com/testrail/docs/user-guide/getting-started/", type: "official-doc", qualityScore: 4 },
    { title: "TestLink documentation", url: "https://github.com/TestLinkOpenSourceTRMS/testlink-code", type: "official-doc", qualityScore: 3 },
  ],
  "test-case-writing": [
    { title: "How to write test cases — Guru99", url: "https://www.guru99.com/test-case.html", type: "tutorial", qualityScore: 4 },
    { title: "ISO/IEC/IEEE 29119 test design — ISTQB", url: "https://www.istqb.org/", type: "reference", qualityScore: 3 },
  ],
  "traceability-matrix": [
    { title: "Traceability matrix — Guru99", url: "https://www.guru99.com/traceability-matrix.html", type: "tutorial", qualityScore: 4 },
    { title: "Requirements traceability — Wikipedia", url: "https://en.wikipedia.org/wiki/Requirements_traceability", type: "reference", qualityScore: 3 },
  ],
  "test-metrics-reporting": [
    { title: "Software testing metrics — Guru99", url: "https://www.guru99.com/software-testing-metrics.html", type: "tutorial", qualityScore: 4 },
    { title: "Test reports — Playwright docs", url: "https://playwright.dev/docs/test-reporters", type: "official-doc", qualityScore: 4 },
  ],
  "chaos-engineering-basics": [
    { title: "Principles of Chaos Engineering", url: "https://principlesofchaos.org/", type: "official-doc", qualityScore: 5 },
    { title: "Chaos Monkey — overview", url: "https://netflix.github.io/chaosmonkey/", type: "official-doc", qualityScore: 4 },
  ],
  "comprehensive-test-plan": [
    { title: "How to create a test plan — Guru99", url: "https://www.guru99.com/test-plan.html", type: "tutorial", qualityScore: 4 },
    { title: "Test plan — IEEE 829 overview", url: "https://en.wikipedia.org/wiki/Test_plan", type: "reference", qualityScore: 3 },
  ],
  "software-testing-engineer::automated-test-suite": [
    { title: "Playwright Test — introduction", url: "https://playwright.dev/docs/intro", type: "official-doc", qualityScore: 5 },
    { title: "Testing Library — guiding principles", url: "https://testing-library.com/docs/guiding-principles/", type: "official-doc", qualityScore: 4 },
  ],
  "software-testing-engineer::performance-test-report": [
    { title: "Generating a dashboard report — JMeter", url: "https://jmeter.apache.org/usermanual/generating-dashboard.html", type: "official-doc", qualityScore: 5 },
    { title: "k6 — results output and reports", url: "https://grafana.com/docs/k6/latest/results-output/", type: "official-doc", qualityScore: 4 },
  ],
  "bug-report-portfolio": [
    { title: "How to write a good bug report", url: "https://www.softwaretestinghelp.com/how-to-write-good-bug-report/", type: "article", qualityScore: 4 },
    { title: "Bug writing guidelines — Mozilla", url: "https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html", type: "official-doc", qualityScore: 4 },
  ],
  "test-strategy-questions": [
    { title: "Software testing interview questions — Guru99", url: "https://www.guru99.com/software-testing-interview-questions.html", type: "tutorial", qualityScore: 4 },
    { title: "Test strategy — ISTQB glossary", url: "https://glossary.istqb.org/en_US/term/test-strategy", type: "reference", qualityScore: 4 },
  ],
  "bug-reporting-scenarios": [
    { title: "How to write a bug report — Guru99", url: "https://www.guru99.com/how-to-write-a-bug-report.html", type: "tutorial", qualityScore: 4 },
    { title: "Defect reporting — GeeksforGeeks", url: "https://www.guru99.com/defect-management-process.html", type: "tutorial", qualityScore: 3 },
  ],
  "automation-framework-design": [
    { title: "Design strategies — Selenium docs", url: "https://www.selenium.dev/documentation/test_practices/design_strategies/", type: "official-doc", qualityScore: 5 },
    { title: "Page Object Model — Selenium docs", url: "https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/", type: "official-doc", qualityScore: 4 },
  ],
  "defect-triage-practice": [
    { title: "Defect triage meeting — Guru99", url: "https://www.guru99.com/defect-management-process.html", type: "tutorial", qualityScore: 4 },
    { title: "Bug lifecycle — GeeksforGeeks", url: "https://www.geeksforgeeks.org/bug-life-cycle-in-software-development/", type: "tutorial", qualityScore: 3 },
  ],

  // ── qa-automation-engineer ───────────────────────────────────────────────
  "test-automation-strategy": [
    { title: "Test practices — Selenium docs", url: "https://www.selenium.dev/documentation/test_practices/", type: "official-doc", qualityScore: 5 },
    { title: "Testing strategies — Playwright docs", url: "https://playwright.dev/docs/intro", type: "official-doc", qualityScore: 4 },
  ],
  "framework-design-patterns": [
    { title: "Design strategies — Selenium docs", url: "https://www.selenium.dev/documentation/test_practices/design_strategies/", type: "official-doc", qualityScore: 5 },
    { title: "Page Object Models — Selenium docs", url: "https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/", type: "official-doc", qualityScore: 4 },
  ],
  "automation-roi-analysis": [
    { title: "Test automation strategy & ROI — Selenium docs", url: "https://www.selenium.dev/documentation/test_practices/", type: "official-doc", qualityScore: 4 },
    { title: "When to automate — ISTQB glossary", url: "https://glossary.istqb.org/en_US/term/test-automation", type: "reference", qualityScore: 3 },
  ],
  "selenium-webdriver-advanced": [
    { title: "Driver sessions & management — Selenium docs", url: "https://www.selenium.dev/documentation/webdriver/drivers/", type: "official-doc", qualityScore: 5 },
    { title: "Actions API — Selenium docs", url: "https://www.selenium.dev/documentation/webdriver/actions_api/", type: "official-doc", qualityScore: 4 },
  ],
  "playwright-cross-browser": [
    { title: "Browsers — Playwright docs", url: "https://playwright.dev/docs/browsers", type: "official-doc", qualityScore: 5 },
    { title: "Projects & configuration — Playwright", url: "https://playwright.dev/docs/test-projects", type: "official-doc", qualityScore: 4 },
  ],
  "element-location-strategies": [
    { title: "Locators — Playwright docs", url: "https://playwright.dev/docs/locators", type: "official-doc", qualityScore: 5 },
    { title: "Locating elements — Selenium docs", url: "https://www.selenium.dev/documentation/webdriver/elements/locators/", type: "official-doc", qualityScore: 5 },
  ],
  "handling-dynamic-content": [
    { title: "Actionability & auto-waiting — Playwright", url: "https://playwright.dev/docs/actionability", type: "official-doc", qualityScore: 5 },
    { title: "Waiting strategies — Selenium docs", url: "https://www.selenium.dev/documentation/webdriver/waits/", type: "official-doc", qualityScore: 4 },
  ],
  "rest-assured-requests": [
    { title: "REST Assured — usage guide", url: "https://rest-assured.io/", type: "official-doc", qualityScore: 5 },
    { title: "Requests — HTTP library for Python", url: "https://requests.readthedocs.io/en/latest/user/quickstart/", type: "official-doc", qualityScore: 4 },
  ],
  "mock-service-setup": [
    { title: "Pact — contract testing documentation", url: "https://docs.pact.io/", type: "official-doc", qualityScore: 5 },
    { title: "WireMock — stub mapping", url: "https://wiremock.org/docs/stubbing/", type: "official-doc", qualityScore: 4 },
  ],
  "api-test-data-setup": [
    { title: "Using variables — Postman docs", url: "https://learning.postman.com/docs/sending-requests/variables/variables/", type: "official-doc", qualityScore: 4 },
    { title: "Faker — generate test data", url: "https://fakerjs.dev/guide/", type: "official-doc", qualityScore: 4 },
  ],
  "keyword-driven-framework": [
    { title: "Robot Framework user guide", url: "https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html", type: "official-doc", qualityScore: 5 },
    { title: "Cucumber — BDD documentation", url: "https://cucumber.io/docs/bdd/", type: "official-doc", qualityScore: 4 },
  ],
  "hybrid-frameworks": [
    { title: "TestNG documentation", url: "https://testng.org/", type: "official-doc", qualityScore: 4 },
    { title: "Cucumber — Gherkin reference", url: "https://cucumber.io/docs/gherkin/reference/", type: "official-doc", qualityScore: 4 },
  ],
  "custom-reporting": [
    { title: "Allure Report — documentation", url: "https://allurereport.org/docs/", type: "official-doc", qualityScore: 5 },
    { title: "Playwright reporters", url: "https://playwright.dev/docs/test-reporters", type: "official-doc", qualityScore: 4 },
  ],
  "performance-test-automation": [
    { title: "k6 — load testing documentation", url: "https://grafana.com/docs/k6/latest/", type: "official-doc", qualityScore: 5 },
    { title: "JMeter — getting started", url: "https://jmeter.apache.org/usermanual/get-started.html", type: "official-doc", qualityScore: 4 },
  ],
  "security-test-automation": [
    { title: "OWASP ZAP — getting started", url: "https://www.zaproxy.org/getting-started/", type: "official-doc", qualityScore: 5 },
    { title: "OWASP ZAP automation framework", url: "https://www.zaproxy.org/docs/automate/", type: "official-doc", qualityScore: 4 },
  ],
  "allure-reporting": [
    { title: "Allure Report — getting started", url: "https://allurereport.org/docs/how-it-works/", type: "official-doc", qualityScore: 5 },
    { title: "Allure — testops reporting", url: "https://docs.qameta.io/allure/", type: "official-doc", qualityScore: 4 },
  ],
  "test-coverage-analysis": [
    { title: "Code coverage — Jest docs", url: "https://jestjs.io/docs/cli#--coverageboolean", type: "official-doc", qualityScore: 4 },
    { title: "Coverage — Playwright docs", url: "https://playwright.dev/docs/api/class-coverage", type: "official-doc", qualityScore: 4 },
  ],
  "flaky-test-management": [
    { title: "Retries — Playwright docs", url: "https://playwright.dev/docs/test-retries", type: "official-doc", qualityScore: 5 },
    { title: "Flaky tests — Google Testing Blog", url: "https://testing.googleblog.com/2017/04/where-do-our-flaky-tests-come-from.html", type: "article", qualityScore: 4 },
  ],
  "test-analytics-dashboards": [
    { title: "Allure TestOps — analytics", url: "https://docs.qameta.io/allure/", type: "official-doc", qualityScore: 4 },
    { title: "Grafana dashboards — docs", url: "https://grafana.com/docs/grafana/latest/dashboards/", type: "official-doc", qualityScore: 4 },
  ],
  "quality-gates": [
    { title: "Quality gates — SonarQube docs", url: "https://docs.sonarsource.com/sonarqube-server/latest/quality-standards-administration/managing-quality-gates/introduction-to-quality-gates/", type: "official-doc", qualityScore: 5 },
    { title: "Quality gates — SonarCloud docs", url: "https://docs.sonarsource.com/sonarqube-server/", type: "official-doc", qualityScore: 4 },
  ],
  "full-e2e-test-framework": [
    { title: "Playwright — end-to-end testing guide", url: "https://playwright.dev/docs/intro", type: "official-doc", qualityScore: 5 },
    { title: "Cypress — end-to-end testing", url: "https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test", type: "official-doc", qualityScore: 4 },
  ],
  "api-test-suite": [
    { title: "Collection runs — Postman docs", url: "https://learning.postman.com/docs/collections/running-collections/intro-to-collection-runs/", type: "official-doc", qualityScore: 5 },
    { title: "API testing — Playwright docs", url: "https://playwright.dev/docs/api-testing", type: "official-doc", qualityScore: 4 },
  ],
  "cross-browser-test-matrix": [
    { title: "BrowserStack Selenium — getting started", url: "https://www.browserstack.com/docs/automate/selenium/getting-started", type: "official-doc", qualityScore: 4 },
    { title: "Cross-browser testing — Playwright", url: "https://playwright.dev/docs/browsers", type: "official-doc", qualityScore: 4 },
  ],
  "framework-design-discussion": [
    { title: "Test fixtures — Playwright docs", url: "https://playwright.dev/docs/test-fixtures", type: "official-doc", qualityScore: 5 },
    { title: "Page Object Models — Selenium", url: "https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/", type: "official-doc", qualityScore: 4 },
  ],
  "automation-architecture": [
    { title: "Test architecture — Playwright docs", url: "https://playwright.dev/docs/test-parallel", type: "official-doc", qualityScore: 5 },
    { title: "Test pyramid — Martin Fowler", url: "https://martinfowler.com/articles/practical-test-pyramid.html", type: "article", qualityScore: 5 },
  ],
  "problem-solving-scenarios": [
    { title: "Software testing interview questions — GeeksforGeeks", url: "https://www.geeksforgeeks.org/software-testing-interview-questions/", type: "tutorial", qualityScore: 3 },
    { title: "Testing scenarios — Ministry of Testing", url: "https://www.ministryoftesting.com/articles", type: "article", qualityScore: 3 },
  ],

  // ── mlops-engineer ───────────────────────────────────────────────────────
  "airflow-for-ml": [
    { title: "Airflow tutorial — official docs", url: "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html", type: "official-doc", qualityScore: 5 },
    { title: "Airflow — taskflow API", url: "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/taskflow.html", type: "official-doc", qualityScore: 4 },
  ],
  "kubeflow-pipelines": [
    { title: "Kubeflow Pipelines — overview", url: "https://www.kubeflow.org/docs/components/pipelines/", type: "official-doc", qualityScore: 5 },
    { title: "Kubeflow Pipelines — pipeline concepts", url: "https://www.kubeflow.org/docs/components/pipelines/concepts/pipeline/", type: "official-doc", qualityScore: 4 },
  ],
  "prefect-dagster": [
    { title: "Prefect — getting started", url: "https://docs.prefect.io/latest/", type: "official-doc", qualityScore: 4 },
    { title: "Dagster — getting started", url: "https://docs.dagster.io/getting-started", type: "official-doc", qualityScore: 4 },
  ],
  "training-pipelines": [
    { title: "SageMaker Pipelines — AWS docs", url: "https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines.html", type: "official-doc", qualityScore: 5 },
    { title: "Vertex AI Pipelines — Google Cloud", url: "https://cloud.google.com/vertex-ai/docs/pipelines/introduction", type: "official-doc", qualityScore: 4 },
  ],
  "batch-inference": [
    { title: "Batch transform — SageMaker docs", url: "https://docs.aws.amazon.com/sagemaker/latest/dg/batch-transform.html", type: "official-doc", qualityScore: 5 },
    { title: "Vertex AI batch predictions", url: "https://cloud.google.com/vertex-ai/docs/predictions/get-batch-predictions", type: "official-doc", qualityScore: 4 },
  ],
  "edge-deployment": [
    { title: "SageMaker Edge Manager — AWS docs", url: "https://docs.aws.amazon.com/sagemaker/latest/dg/edge.html", type: "official-doc", qualityScore: 4 },
    { title: "TensorFlow Lite — guide", url: "https://ai.google.dev/edge/litert/overview", type: "official-doc", qualityScore: 5 },
  ],
  "mlops-engineer::model-compression": [
    { title: "Model optimization — TensorFlow Lite", url: "https://www.tensorflow.org/lite/performance/post_training_quantization", type: "official-doc", qualityScore: 5 },
    { title: "PyTorch performance tuning guide", url: "https://pytorch.org/tutorials/recipes/recipes/tuning_guide.html", type: "official-doc", qualityScore: 4 },
  ],
  "a-b-testing-models": [
    { title: "MLOps: continuous delivery and automation pipelines — Google Cloud", url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning", type: "article", qualityScore: 5 },
    { title: "Model Monitor — SageMaker docs", url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html", type: "official-doc", qualityScore: 4 },
  ],
  "drift-detection": [
    { title: "Data and model quality monitoring — SageMaker", url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html", type: "official-doc", qualityScore: 5 },
    { title: "Monitoring and drift — NannyML docs", url: "https://docs.nannyml.com/", type: "official-doc", qualityScore: 4 },
  ],
  "mlops-engineer::performance-metrics": [
    { title: "Metrics and scoring — scikit-learn", url: "https://scikit-learn.org/stable/modules/model_evaluation.html", type: "official-doc", qualityScore: 5 },
    { title: "Model evaluation — TensorFlow docs", url: "https://www.tensorflow.org/tfx/guide/evaluator", type: "official-doc", qualityScore: 4 },
  ],
  "alerting-systems": [
    { title: "Alerting overview — Prometheus docs", url: "https://prometheus.io/docs/alerting/latest/overview/", type: "official-doc", qualityScore: 5 },
    { title: "Alertmanager — configuration", url: "https://prometheus.io/docs/alerting/latest/configuration/", type: "official-doc", qualityScore: 4 },
  ],
  "logging-tracing": [
    { title: "Traces — OpenTelemetry docs", url: "https://opentelemetry.io/docs/concepts/signals/traces/", type: "official-doc", qualityScore: 5 },
    { title: "Logging — OpenTelemetry docs", url: "https://opentelemetry.io/docs/concepts/signals/logs/", type: "official-doc", qualityScore: 4 },
  ],
  "feedback-loops": [
    { title: "MLOps: continuous delivery and automation pipelines — Google Cloud", url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning", type: "article", qualityScore: 5 },
    { title: "Monitoring production ML — Google Cloud", url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning#monitoring", type: "article", qualityScore: 4 },
  ],
  "feature-store-concepts": [
    { title: "Feast — feature store concepts", url: "https://docs.feast.dev/getting-started/concepts/overview", type: "official-doc", qualityScore: 5 },
    { title: "Feature store — Vertex AI docs", url: "https://cloud.google.com/vertex-ai/docs/featurestore/overview", type: "official-doc", qualityScore: 4 },
  ],
  "feast-tecton": [
    { title: "Feast — quickstart", url: "https://docs.feast.dev/getting-started/quickstart", type: "official-doc", qualityScore: 5 },
    { title: "Tecton — feature platform docs", url: "https://docs.tecton.ai/", type: "official-doc", qualityScore: 4 },
  ],
  "online-vs-offline-features": [
    { title: "Feature retrieval — Feast concepts", url: "https://docs.feast.dev/getting-started/concepts/feature-retrieval", type: "official-doc", qualityScore: 5 },
    { title: "Online and offline stores — Feast", url: "https://docs.feast.dev/getting-started/concepts/feature-view", type: "official-doc", qualityScore: 4 },
  ],
  "feature-monitoring": [
    { title: "Data quality monitoring — SageMaker", url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-data-quality.html", type: "official-doc", qualityScore: 4 },
    { title: "Feature monitoring — Google Cloud ML monitoring", url: "https://cloud.google.com/vertex-ai/docs/model-monitoring/overview", type: "official-doc", qualityScore: 4 },
  ],
  "mlflow-tracking": [
    { title: "MLflow Tracking — official docs", url: "https://mlflow.org/docs/latest/tracking.html", type: "official-doc", qualityScore: 5 },
    { title: "MLflow — getting started", url: "https://mlflow.org/docs/latest/getting-started/index.html", type: "official-doc", qualityScore: 4 },
  ],
  "weights-biases": [
    { title: "Weights & Biases — guides", url: "https://docs.wandb.ai/guides/", type: "official-doc", qualityScore: 5 },
    { title: "W&B — experiment tracking", url: "https://docs.wandb.ai/guides/track", type: "official-doc", qualityScore: 4 },
  ],
  "model-registry": [
    { title: "MLflow Model Registry — docs", url: "https://mlflow.org/docs/latest/model-registry.html", type: "official-doc", qualityScore: 5 },
    { title: "SageMaker Model Registry — AWS", url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html", type: "official-doc", qualityScore: 4 },
  ],
  "mlops-engineer::reproducible-experiments": [
    { title: "MLflow tracking concepts — reproducibility", url: "https://mlflow.org/docs/latest/tracking.html", type: "official-doc", qualityScore: 4 },
    { title: "W&B artifacts — versioning data and models", url: "https://docs.wandb.ai/guides/artifacts", type: "official-doc", qualityScore: 4 },
  ],
  "gpu-management": [
    { title: "NVIDIA GPU Operator — docs", url: "https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html", type: "official-doc", qualityScore: 4 },
    { title: "Kubernetes — schedule GPUs", url: "https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/", type: "official-doc", qualityScore: 5 },
  ],
  "multi-cloud-ml": [
    { title: "MLOps architecture — Google Cloud", url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning", type: "article", qualityScore: 5 },
    { title: "Multi-cloud ML — AWS well-architected ML lens", url: "https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html", type: "official-doc", qualityScore: 4 },
  ],
  "model-monitoring-dashboard": [
    { title: "Grafana dashboards — docs", url: "https://grafana.com/docs/grafana/latest/dashboards/", type: "official-doc", qualityScore: 4 },
    { title: "Model Monitor visualization — SageMaker", url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-visualize.html", type: "official-doc", qualityScore: 4 },
  ],
  "feature-store-implementation": [
    { title: "Build a training dataset — Feast guides", url: "https://docs.feast.dev/how-to-guides/feast-snowflake-gcp-aws/build-a-training-dataset", type: "official-doc", qualityScore: 4 },
    { title: "Vertex AI Feature Store — docs", url: "https://cloud.google.com/vertex-ai/docs/featurestore/overview", type: "official-doc", qualityScore: 4 },
  ],
  "automated-retraining-system": [
    { title: "Automated retraining — Kubeflow Pipelines", url: "https://www.kubeflow.org/docs/components/pipelines/concepts/pipeline/", type: "official-doc", qualityScore: 4 },
    { title: "SageMaker Pipelines — automation", url: "https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines.html", type: "official-doc", qualityScore: 4 },
  ],

  // ── grc-analyst / iot-engineer / edge-ai-engineer ────────────────────────
  "servicenow-grc": [
    { title: "Governance, Risk, and Compliance — ServiceNow docs", url: "https://docs.servicenow.com/bundle/vancouver-governance-risk-compliance/page/product/grc-risk/concept/c_GRC.html", type: "official-doc", qualityScore: 4 },
    { title: "NIST Risk Management Framework", url: "https://csrc.nist.gov/projects/risk-management/about-rmf", type: "official-doc", qualityScore: 5 },
  ],
  "http-rest-apis": [
    { title: "REST API design — MDN", url: "https://developer.mozilla.org/en-US/docs/Glossary/REST", type: "official-doc", qualityScore: 4 },
    { title: "HTTP request methods — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods", type: "official-doc", qualityScore: 5 },
  ],
  "edge-ai-engineer::model-compression": [
    { title: "Model optimization — TensorFlow Lite", url: "https://www.tensorflow.org/lite/performance/post_training_quantization", type: "official-doc", qualityScore: 5 },
    { title: "Quantization — PyTorch docs", url: "https://pytorch.org/docs/stable/quantization.html", type: "official-doc", qualityScore: 4 },
  ],

  // ── product-engineer ─────────────────────────────────────────────────────
  "product-discovery": [
    { title: "Continuous discovery — Product Talk", url: "https://www.producttalk.org/continuous-discovery/", type: "article", qualityScore: 4 },
    { title: "Product discovery — Atlassian guide", url: "https://www.atlassian.com/agile/product-management/discovery", type: "article", qualityScore: 4 },
  ],
  "problem-definition": [
    { title: "Problem framing — Atlassian product management", url: "https://www.atlassian.com/agile/product-management/discovery", type: "article", qualityScore: 4 },
    { title: "Define the problem — IDEO design kit", url: "https://www.atlassian.com/agile/product-management", type: "article", qualityScore: 3 },
  ],
  "solution-ideation": [
    { title: "Ideation — IDEO design kit", url: "https://www.designkit.org/methods/brainstorm-rules.html", type: "article", qualityScore: 3 },
    { title: "Design thinking — ideation stage", url: "https://www.interaction-design.org/literature/article/what-is-ideation", type: "article", qualityScore: 3 },
  ],
  "prioritization-frameworks": [
    { title: "RICE prioritization — Intercom", url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/", type: "article", qualityScore: 4 },
    { title: "Prioritization frameworks — Atlassian", url: "https://www.atlassian.com/agile/product-management/prioritization-framework", type: "article", qualityScore: 4 },
  ],
  "feature-flags": [
    { title: "Feature flags — LaunchDarkly docs", url: "https://docs.launchdarkly.com/home/flags", type: "official-doc", qualityScore: 5 },
    { title: "Feature toggles — Martin Fowler", url: "https://martinfowler.com/articles/feature-toggles.html", type: "article", qualityScore: 5 },
  ],
  "analytics-implementation": [
    { title: "Analytics for web — Google Analytics 4 docs", url: "https://developers.google.com/analytics/devguides/collection/ga4", type: "official-doc", qualityScore: 4 },
    { title: "Segment — tracking plan best practices", url: "https://segment.com/docs/getting-started/", type: "official-doc", qualityScore: 3 },
  ],
  "design-handoff": [
    { title: "Design handoff — Figma best practices", url: "https://help.figma.com/hc/en-us/articles/360040521453-Dev-Mode", type: "official-doc", qualityScore: 4 },
    { title: "Figma best practices — design handoff workflows", url: "https://www.figma.com/best-practices/", type: "official-doc", qualityScore: 3 },
  ],
  "accessibility-in-products": [
    { title: "Web Content Accessibility Guidelines (WCAG) 2.2", url: "https://www.w3.org/TR/WCAG22/", type: "official-doc", qualityScore: 5 },
    { title: "Accessibility — MDN web docs", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility", type: "official-doc", qualityScore: 5 },
  ],
  "product-metrics-aarrr": [
    { title: "AARRR pirate metrics — overview", url: "https://amplitude.com/blog/pirate-metrics-framework", type: "article", qualityScore: 4 },
    { title: "Product metrics — Atlassian", url: "https://www.atlassian.com/agile/product-management/prioritization-framework", type: "article", qualityScore: 4 },
  ],
  "funnel-analysis": [
    { title: "Funnel analysis — Amplitude docs", url: "https://amplitude.com/docs/analytics/charts/funnel-analysis", type: "official-doc", qualityScore: 4 },
    { title: "Funnel analysis — Mixpanel docs", url: "https://docs.mixpanel.com/docs/reports/funnels", type: "official-doc", qualityScore: 4 },
  ],
  "cohort-analysis": [
    { title: "Cohort analysis — Wikipedia overview", url: "https://en.wikipedia.org/wiki/Cohort_analysis", type: "reference", qualityScore: 3 },
    { title: "Retention analysis — Amplitude docs", url: "https://amplitude.com/docs/analytics/charts/retention-analysis", type: "official-doc", qualityScore: 4 },
    { title: "Cohort analysis — Mixpanel docs", url: "https://docs.mixpanel.com/docs/reports/retention", type: "official-doc", qualityScore: 4 },
  ],
  "data-driven-decisions": [
    { title: "Data-informed product decisions — Amplitude", url: "https://amplitude.com/blog/data-driven-product-decisions", type: "article", qualityScore: 3 },
    { title: "Experimentation culture — Optimizely", url: "https://www.optimizely.com/optimization-glossary/ab-testing/", type: "article", qualityScore: 3 },
  ],
  "technical-specs": [
    { title: "Design docs at Google", url: "https://www.industrialempathy.com/posts/design-docs-at-google/", type: "article", qualityScore: 4 },
  ],
  "launch-playbooks": [
    { title: "Product launch checklist — Atlassian", url: "https://www.atlassian.com/agile/product-management/product-launch-checklist", type: "article", qualityScore: 3 },
    { title: "Feature launch playbook — LaunchDarkly", url: "https://launchdarkly.com/docs/home/experimentation", type: "article", qualityScore: 3 },
  ],
  "post-launch-monitoring": [
    { title: "Product monitoring with feature flags — LaunchDarkly", url: "https://launchdarkly.com/docs/home/flags", type: "official-doc", qualityScore: 4 },
    { title: "Release health — Sentry docs", url: "https://docs.sentry.io/product/releases/health/", type: "official-doc", qualityScore: 4 },
  ],
  "feature-case-study": [
    { title: "Product case studies — Intercom blog", url: "https://www.intercom.com/blog/product-management/", type: "case-study", qualityScore: 3 },
    { title: "Feature case study — Reforge examples", url: "https://www.reforge.com/blog", type: "article", qualityScore: 3 },
  ],
  "product-metrics-dashboard": [
    { title: "Product analytics dashboards — Amplitude", url: "https://amplitude.com/docs/analytics/charts", type: "official-doc", qualityScore: 4 },
    { title: "Dashboard best practices — Mixpanel", url: "https://docs.mixpanel.com/docs/reports/overview", type: "official-doc", qualityScore: 3 },
  ],
  "product-sense-questions": [
    { title: "Product sense interviews — Exponent", url: "https://www.tryexponent.com/courses/product-management/product-sense", type: "course", qualityScore: 4 },
  ],
  "technical-design": [
    { title: "System design primer — GitHub", url: "https://github.com/donnemartin/system-design-primer", type: "repository", qualityScore: 5 },
    { title: "Design docs at Google", url: "https://www.industrialempathy.com/posts/design-docs-at-google/", type: "article", qualityScore: 4 },
  ],
  "metrics-discussion": [
    { title: "Product metrics — Amplitude docs", url: "https://amplitude.com/docs/analytics/charts", type: "official-doc", qualityScore: 3 },
    { title: "North Star metric — Amplitude blog", url: "https://amplitude.com/blog/product-north-star-metric", type: "article", qualityScore: 4 },
  ],
  "prioritization-exercises": [
    { title: "Prioritization frameworks — Atlassian", url: "https://www.atlassian.com/agile/product-management/prioritization-framework", type: "article", qualityScore: 4 },
  ],

  // ── solutions-engineer ───────────────────────────────────────────────────
  "q-a-handling": [
    { title: "Handling Q&A in presentations — HBR guide", url: "https://www.toastmasters.org/resources/public-speaking-tips", type: "article", qualityScore: 3 },
  ],

  // ── servicenow-developer ─────────────────────────────────────────────────
  "platform-architecture": [
    { title: "ServiceNow platform overview — docs", url: "https://docs.servicenow.com/bundle/vancouver-platform-administration/page/administer/platform-administration/concept/c_PlatformAdministration.html", type: "official-doc", qualityScore: 4 },
  ],
  "table-field-design": [
    { title: "Tables and fields — ServiceNow docs", url: "https://docs.servicenow.com/bundle/vancouver-platform-administration/page/administer/table-administration/concept/c_Tables.html", type: "official-doc", qualityScore: 4 },
    { title: "Create a table — ServiceNow docs", url: "https://docs.servicenow.com/bundle/vancouver-platform-administration/page/administer/table-administration/task/t_CreateATable.html", type: "official-doc", qualityScore: 4 },
  ],
  "acl-security": [
    { title: "Access control lists (ACLs) — ServiceNow docs", url: "https://docs.servicenow.com/bundle/vancouver-platform-security/page/administer/security/concept/c_AccessControlLists.html", type: "official-doc", qualityScore: 4 },
    { title: "Application access control — ServiceNow", url: "https://docs.servicenow.com/bundle/vancouver-platform-security/page/administer/security/concept/c_ApplicationAccessControl.html", type: "official-doc", qualityScore: 3 },
  ],
  "scripting-glide-js": [
    { title: "Glide API — server-side scripting guide", url: "https://developer.servicenow.com/dev.do#!/guides/vancouver/now-platform/glide-api/glide-api-overview", type: "official-doc", qualityScore: 4 },
    { title: "Client-side scripting — ServiceNow docs", url: "https://developer.servicenow.com/dev.do#!/learn/courses/vancouver/app_store_learnv2_scripting_vancouver_client_side_scripting/", type: "course", qualityScore: 3 },
  ],
  "update-sets-source-control": [
    { title: "Update sets — ServiceNow docs", url: "https://docs.servicenow.com/bundle/vancouver-application-development/page/build/system-update-sets/concept/system-update-sets.html", type: "official-doc", qualityScore: 4 },
    { title: "Source control integration — ServiceNow", url: "https://docs.servicenow.com/bundle/vancouver-application-development/page/build/applications/concept/source-control.html", type: "official-doc", qualityScore: 3 },
  ],
  "servicenow-admin": [
    { title: "ServiceNow administration fundamentals — Now Learning", url: "https://nowlearning.servicenow.com/lxp/en/now-platform/service-now-administration-fundamentals", type: "course", qualityScore: 4 },
    { title: "Platform administration — ServiceNow docs", url: "https://docs.servicenow.com/bundle/vancouver-platform-administration/page/administer/platform-administration/concept/c_PlatformAdministration.html", type: "official-doc", qualityScore: 3 },
  ],
  "servicenow-architect": [
    { title: "ServiceNow certified technical architect — Now Learning", url: "https://nowlearning.servicenow.com/lxp/en/now-platform/certified-technical-architect", type: "course", qualityScore: 4 },
    { title: "Now Platform architecture — ServiceNow docs", url: "https://docs.servicenow.com/bundle/vancouver-platform-administration/page/administer/platform-administration/concept/c_PlatformAdministration.html", type: "official-doc", qualityScore: 3 },
  ],

  // ── web3-developer ───────────────────────────────────────────────────────
  "web3-vs-web2": [
    { title: "Web3 — MDN glossary", url: "https://ethereum.org/en/web3/", type: "reference", qualityScore: 4 },
    { title: "Ethereum — introduction to the stack", url: "https://ethereum.org/en/developers/docs/", type: "official-doc", qualityScore: 5 },
  ],
  "decentralized-storage": [
    { title: "IPFS — documentation", url: "https://docs.ipfs.tech/", type: "official-doc", qualityScore: 5 },
    { title: "IPFS concepts — content addressing", url: "https://docs.ipfs.tech/concepts/content-addressing/", type: "official-doc", qualityScore: 4 },
  ],
  "identity-did": [
    { title: "Decentralized identifiers (DIDs) — W3C", url: "https://www.w3.org/TR/did-core/", type: "official-doc", qualityScore: 5 },
    { title: "Verifiable credentials — W3C", url: "https://www.w3.org/TR/vc-data-model/", type: "official-doc", qualityScore: 4 },
  ],
  "the-graph-indexing": [
    { title: "The Graph — indexing overview", url: "https://thegraph.com/docs/en/indexing/", type: "official-doc", qualityScore: 5 },
    { title: "The Graph — what is a subgraph", url: "https://thegraph.com/docs/en/developing/creating-a-subgraph/", type: "official-doc", qualityScore: 4 },
  ],
  "crypto-wallets": [
    { title: "Wallet APIs — ethereum.org", url: "https://ethereum.org/en/developers/docs/apis/javascript/", type: "official-doc", qualityScore: 4 },
    { title: "EIP-1193: Ethereum provider JavaScript API", url: "https://eips.ethereum.org/EIPS/eip-1193", type: "official-doc", qualityScore: 5 },
  ],
  "contract-reading-writing": [
    { title: "Smart contracts — ethereum.org docs", url: "https://ethereum.org/en/developers/docs/smart-contracts/", type: "official-doc", qualityScore: 5 },
    { title: "Solidity — official documentation", url: "https://docs.soliditylang.org/en/latest/", type: "official-doc", qualityScore: 5 },
  ],
  "event-listening": [
    { title: "Contract events — Solidity docs", url: "https://docs.soliditylang.org/en/latest/contracts.html#events", type: "official-doc", qualityScore: 5 },
    { title: "Events and logs — ethers.js docs", url: "https://docs.ethers.org/v6/api/contract/#ContractEvent", type: "official-doc", qualityScore: 4 },
  ],
  "gas-estimation": [
    { title: "Gas and fees — ethereum.org", url: "https://ethereum.org/en/developers/docs/gas/", type: "official-doc", qualityScore: 5 },
    { title: "Gas estimation — ethers.js provider API", url: "https://docs.ethers.org/v6/api/providers/#Provider-estimateGas", type: "reference", qualityScore: 4 },
  ],
  "multi-chain-support": [
    { title: "Chainlist — EVM networks and RPC endpoints", url: "https://chainlist.org/", type: "reference", qualityScore: 3 },
    { title: "Wagmi — multi-chain configuration", url: "https://wagmi.sh/react/api/createConfig", type: "official-doc", qualityScore: 4 },
  ],
  "subgraph-development": [
    { title: "Creating a subgraph — The Graph docs", url: "https://thegraph.com/docs/en/developing/creating-a-subgraph/", type: "official-doc", qualityScore: 5 },
    { title: "Subgraph development — AssemblyScript mappings", url: "https://thegraph.com/docs/en/developing/assemblyscript-api/", type: "official-doc", qualityScore: 4 },
  ],
  "entity-design": [
    { title: "Defining entities — The Graph docs", url: "https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest", type: "official-doc", qualityScore: 4 },
    { title: "Subgraph schema — GraphQL entities", url: "https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-schema", type: "official-doc", qualityScore: 4 },
  ],
  "deploying-subgraphs": [
    { title: "Deploying a subgraph — The Graph docs", url: "https://thegraph.com/docs/en/deploying/subgraph-studio/", type: "official-doc", qualityScore: 5 },
    { title: "Graph CLI — publish command", url: "https://thegraph.com/docs/en/developing/creating-a-subgraph/#deploying-your-subgraph", type: "official-doc", qualityScore: 3 },
  ],
  "indexing-optimizations": [
    { title: "Indexer performance — The Graph docs", url: "https://thegraph.com/docs/en/indexing/", type: "official-doc", qualityScore: 4 },
    { title: "Subgraph best practices — The Graph", url: "https://thegraph.com/docs/en/developing/creating-a-subgraph/#best-practices", type: "official-doc", qualityScore: 3 },
  ],
  "dao-dashboard": [
    { title: "Build a DAO dashboard — ethereum.org tutorials", url: "https://ethereum.org/en/developers/tutorials/", type: "tutorial", qualityScore: 4 },
    { title: "Governor contract — OpenZeppelin docs", url: "https://docs.openzeppelin.com/contracts/5.x/governance", type: "official-doc", qualityScore: 5 },
  ],
  "multi-chain-dapp": [
    { title: "Multi-chain wagmi — connecting chains", url: "https://wagmi.sh/react/getting-started", type: "official-doc", qualityScore: 4 },
    { title: "Layer 2 rollups — ethereum.org", url: "https://ethereum.org/en/developers/docs/scaling/", type: "official-doc", qualityScore: 5 },
  ],
  "smart-contract-discussion": [
    { title: "Smart contract security — ethereum.org", url: "https://ethereum.org/en/developers/docs/smart-contracts/security/", type: "official-doc", qualityScore: 5 },
    { title: "Smart contract weaknesses — SWC registry", url: "https://swcregistry.io/", type: "reference", qualityScore: 4 },
  ],

  // ── quantum-computing-researcher ─────────────────────────────────────────
  "qiskit-basics": [
    { title: "Qiskit — getting started", url: "https://docs.quantum.ibm.com/start", type: "official-doc", qualityScore: 5 },
    { title: "Qiskit — circuits tutorial", url: "https://docs.quantum.ibm.com/build/circuit-construction", type: "tutorial", qualityScore: 4 },
  ],
  "running-on-real-hardware": [
    { title: "Run on quantum hardware — IBM Quantum docs", url: "https://docs.quantum.ibm.com/run", type: "official-doc", qualityScore: 5 },
    { title: "IBM Quantum — primitives & execution", url: "https://docs.quantum.ibm.com/run/primitives", type: "official-doc", qualityScore: 4 },
  ],
  "fault-tolerance": [
    { title: "Quantum error correction — IBM docs", url: "https://docs.quantum.ibm.com/run/error-mitigation-explanation", type: "official-doc", qualityScore: 4 },
    { title: "Surface codes — error correction tutorial", url: "https://en.wikipedia.org/wiki/Quantum_error_correction", type: "reference", qualityScore: 3 },
  ],

  // ── low-code-developer ───────────────────────────────────────────────────
  "low-code-vs-no-code-vs-pro-code": [
    { title: "Low-code vs no-code — Gartner glossary", url: "https://www.gartner.com/en/information-technology/glossary/low-code-application-platform-lcap", type: "reference", qualityScore: 3 },
    { title: "What is low-code? — Microsoft Power Apps", url: "https://learn.microsoft.com/en-us/power-apps/", type: "official-doc", qualityScore: 3 },
  ],
  "platform-selection": [
    { title: "Low-code platform comparison — Gartner Magic Quadrant", url: "https://www.gartner.com/en/documents/4022215", type: "article", qualityScore: 3 },
    { title: "Power Platform — choosing an approach", url: "https://learn.microsoft.com/en-us/power-platform/guidance/", type: "official-doc", qualityScore: 3 },
  ],
  "architecture-decisions": [
    { title: "Architecture decision records — ADR GitHub", url: "https://github.com/joelparkerhenderson/architecture-decision-record", type: "repository", qualityScore: 4 },
    { title: "Low-code architecture patterns — OutSystems", url: "https://www.outsystems.com/blog/posts/low-code-architecture/", type: "article", qualityScore: 3 },
  ],
  "when-to-use-low-code": [
    { title: "When to use low-code — Gartner guidance", url: "https://www.gartner.com/en/information-technology/glossary/low-code-application-platform-lcap", type: "reference", qualityScore: 3 },
    { title: "Power Platform adoption — when to use", url: "https://learn.microsoft.com/en-us/power-platform/guidance/adoption/methodology", type: "official-doc", qualityScore: 3 },
  ],
  "limitations-workarounds": [
    { title: "Low-code limitations — ThoughtWorks technology radar", url: "https://www.thoughtworks.com/radar", type: "article", qualityScore: 3 },
    { title: "Power Apps limits — Microsoft docs", url: "https://learn.microsoft.com/en-us/power-platform/admin/api-request-limits-allocations", type: "official-doc", qualityScore: 3 },
  ],
  "visual-app-builder": [
    { title: "Power Apps — create your first app", url: "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-blank-app", type: "official-doc", qualityScore: 4 },
  ],
  "data-models": [
    { title: "Data model — Dataverse tables", url: "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-intro", type: "official-doc", qualityScore: 4 },
    { title: "Tables and relationships — Dataverse", url: "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-edit-entity-relationships", type: "official-doc", qualityScore: 3 },
  ],
  "ui-components": [
    { title: "Controls in canvas apps — Power Apps", url: "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/reference-properties", type: "official-doc", qualityScore: 3 },
    { title: "Gallery control — Power Apps guidance", url: "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-gallery", type: "official-doc", qualityScore: 3 },
  ],
  "business-logic-visual": [
    { title: "Power Fx — formulas overview", url: "https://learn.microsoft.com/en-us/power-platform/power-fx/overview", type: "official-doc", qualityScore: 4 },
    { title: "Power Automate flows — cloud flows", url: "https://learn.microsoft.com/en-us/power-automate/getting-started", type: "official-doc", qualityScore: 4 },
  ],
  "role-based-access": [
    { title: "Security roles — Power Platform admin", url: "https://learn.microsoft.com/en-us/power-platform/admin/security-roles-privileges", type: "official-doc", qualityScore: 4 },
    { title: "Sharing and permissions — Power Apps", url: "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/share-app", type: "official-doc", qualityScore: 3 },
  ],
  "application-deployment": [
    { title: "Solutions overview — Power Platform", url: "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm", type: "official-doc", qualityScore: 4 },
    { title: "ALM with Power Platform — guidance", url: "https://learn.microsoft.com/en-us/power-platform/alm/", type: "official-doc", qualityScore: 3 },
  ],
  "version-management": [
    { title: "Solution versioning — Power Platform ALM", url: "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm", type: "official-doc", qualityScore: 3 },
  ],
  "scaling-considerations": [
    { title: "Power Platform limits — official docs", url: "https://learn.microsoft.com/en-us/power-platform/admin/api-request-limits-allocations", type: "official-doc", qualityScore: 3 },
    { title: "Scalable low-code architecture — OutSystems", url: "https://www.outsystems.com/blog/posts/low-code-architecture/", type: "article", qualityScore: 3 },
  ],
  "business-process-automation": [
    { title: "Power Automate — cloud flows overview", url: "https://learn.microsoft.com/en-us/power-automate/getting-started", type: "official-doc", qualityScore: 4 },
    { title: "Business process flows — Power Apps", url: "https://learn.microsoft.com/en-us/power-automate/business-process-flows-overview", type: "official-doc", qualityScore: 3 },
  ],
  "customer-portal": [
    { title: "Power Pages — getting started", url: "https://learn.microsoft.com/en-us/power-pages/", type: "official-doc", qualityScore: 4 },
  ],
  "analytics-dashboard": [
    { title: "Power BI — get started building dashboards", url: "https://learn.microsoft.com/en-us/power-bi/fundamentals/service-get-started", type: "official-doc", qualityScore: 4 },
  ],
  "mobile-app": [
    { title: "Power Apps mobile — docs", url: "https://learn.microsoft.com/en-us/power-apps/mobile/overview", type: "official-doc", qualityScore: 3 },
    { title: "Responsive canvas apps — Power Apps", url: "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-responsive-layout", type: "official-doc", qualityScore: 3 },
  ],
  "platform-comparison": [
    { title: "Low-code platforms — Gartner glossary", url: "https://www.gartner.com/en/information-technology/glossary/low-code-application-platform-lcap", type: "reference", qualityScore: 3 },
    { title: "Power Platform vs competitors — Microsoft guidance", url: "https://learn.microsoft.com/en-us/power-platform/guidance/", type: "official-doc", qualityScore: 3 },
  ],
  "architecture-discussion": [
    { title: "Architecture decision records", url: "https://github.com/joelparkerhenderson/architecture-decision-record", type: "repository", qualityScore: 4 },
    { title: "Designing low-code solutions — Microsoft", url: "https://learn.microsoft.com/en-us/power-platform/guidance/", type: "official-doc", qualityScore: 3 },
  ],
  "integration-scenarios": [
    { title: "Custom connectors — Power Platform", url: "https://learn.microsoft.com/en-us/connectors/custom-connectors/", type: "official-doc", qualityScore: 4 },
    { title: "Power Platform integration patterns", url: "https://learn.microsoft.com/en-us/power-platform/guidance/", type: "official-doc", qualityScore: 3 },
  ],
  "when-not-to-use-low-code": [
    { title: "Low-code limitations — ThoughtWorks radar", url: "https://www.thoughtworks.com/radar", type: "article", qualityScore: 3 },
    { title: "When low-code fails — Gartner research", url: "https://www.gartner.com/en/information-technology/glossary/low-code-application-platform-lcap", type: "reference", qualityScore: 3 },
  ],

  // ── rpa-developer ────────────────────────────────────────────────────────
  "bot-types-attended-unattended": [
    { title: "Attended vs unattended automation — UiPath docs", url: "https://docs.uipath.com/robot/standalone/latest/user-guide/attended-vs-unattended", type: "official-doc", qualityScore: 4 },
    { title: "Robot types — UiPath documentation", url: "https://docs.uipath.com/orchestrator/automation-cloud/latest/user-guide/about-robots", type: "official-doc", qualityScore: 3 },
  ],
  "excel-file-automation": [
    { title: "Excel automation — UiPath activities guide", url: "https://docs.uipath.com/activities/other/latest/productivity/overview-excel-activities", type: "official-doc", qualityScore: 4 },
    { title: "Excel file automation — Power Automate desktop", url: "https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction", type: "official-doc", qualityScore: 4 },
  ],
  "ocr-document-understanding": [
    { title: "Document Understanding — UiPath docs", url: "https://docs.uipath.com/document-understanding/automation-cloud/latest/user-guide/introduction", type: "official-doc", qualityScore: 4 },
    { title: "Form Recognizer / Document Intelligence — Azure AI", url: "https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview", type: "official-doc", qualityScore: 4 },
  ],
  "ai-ml-integration": [
    { title: "AI Center — UiPath ML skills", url: "https://docs.uipath.com/ai-center/automation-cloud/latest/user-guide/introduction", type: "official-doc", qualityScore: 4 },
    { title: "AI Builder — Power Platform", url: "https://learn.microsoft.com/en-us/ai-builder/overview", type: "official-doc", qualityScore: 4 },
  ],

  // ── research-engineer ────────────────────────────────────────────────────
  "reading-research-papers": [
    { title: "How to read a paper — S. Keshav", url: "https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf", type: "pdf", qualityScore: 5 },
    { title: "How to read a research paper — Harvard guide", url: "https://www.eecs.harvard.edu/~michaelm/postscripts/ReadPaper.pdf", type: "pdf", qualityScore: 4 },
  ],
  "paper-implementation": [
    { title: "Papers with Code — implementations and benchmarks", url: "https://paperswithcode.com/sota", type: "reference", qualityScore: 4 },
    { title: "Reproducible research — ML Reproducibility checklist", url: "https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf", type: "pdf", qualityScore: 4 },
  ],
  "experiment-design": [
    { title: "Design of experiments — NIST handbook", url: "https://www.itl.nist.gov/div898/handbook/pri/pri.htm", type: "official-doc", qualityScore: 5 },
    { title: "DoE — overview", url: "https://en.wikipedia.org/wiki/Design_of_experiments", type: "reference", qualityScore: 3 },
  ],
  "research-communication": [
    { title: "How to write a great research paper — Simon Peyton Jones", url: "https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/", type: "article", qualityScore: 5 },
    { title: "Ten simple rules for better figures", url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003833", type: "article", qualityScore: 4 },
  ],
  "literature-review": [
    { title: "Literature review — University of Toronto guide", url: "https://advice.writing.utoronto.ca/types-of-writing/literature-review/", type: "article", qualityScore: 4 },
    { title: "Systematic literature review — PRISMA", url: "https://www.prisma-statement.org/", type: "official-doc", qualityScore: 4 },
  ],
  "methodology-evaluation": [
    { title: "Critical appraisal — CASP checklists", url: "https://casp-uk.net/casp-tools-checklists/", type: "reference", qualityScore: 4 },
    { title: "Reproducibility checklist — NeurIPS", url: "https://neurips.cc/public/guides/PaperChecklist", type: "official-doc", qualityScore: 4 },
  ],
  "ablation-studies": [
    { title: "Ablation study — definition and practice", url: "https://en.wikipedia.org/wiki/Ablation_(artificial_intelligence)", type: "article", qualityScore: 3 },
    { title: "Understanding ablation studies in ML", url: "https://www.cs.mcgill.ca/~jpineau/", type: "article", qualityScore: 3 },
  ],
  "statistical-significance": [
    { title: "Statistical significance — NIST handbook", url: "https://www.itl.nist.gov/div898/handbook/prc/section1/prc13.htm", type: "official-doc", qualityScore: 5 },
    { title: "Hypothesis testing — Khan Academy", url: "https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample", type: "course", qualityScore: 4 },
  ],
  "paper-to-code": [
    { title: "Papers with Code — code for research papers", url: "https://paperswithcode.com/sota", type: "reference", qualityScore: 5 },
    { title: "Implementation of research papers — tips", url: "https://github.com/robertsdionne/neural-network-papers", type: "repository", qualityScore: 3 },
  ],
  "efficient-implementation": [
    { title: "PyTorch — performance tuning guide", url: "https://pytorch.org/tutorials/recipes/recipes/tuning_guide.html", type: "official-doc", qualityScore: 5 },
    { title: "Efficient deep learning — Deep Learning Systems", url: "https://dlsyscourse.org/", type: "course", qualityScore: 4 },
  ],
  "research-engineer::gpu-optimization": [
    { title: "CUDA C++ programming guide", url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html", type: "official-doc", qualityScore: 5 },
    { title: "GPU performance optimization — Nsight docs", url: "https://docs.nvidia.com/nsight-compute/NsightCompute/index.html", type: "official-doc", qualityScore: 4 },
  ],
  "research-engineer::reproducible-experiments": [
    { title: "Reproducibility checklist — NeurIPS", url: "https://neurips.cc/public/guides/PaperChecklist", type: "official-doc", qualityScore: 4 },
    { title: "Reproducible research — ACM badging", url: "https://www.acm.org/publications/policies/artifact-review-and-badging-current", type: "official-doc", qualityScore: 4 },
  ],
  "research-writing": [
    { title: "How to write a great research paper — Microsoft Research", url: "https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/", type: "article", qualityScore: 5 },
  ],
  "internal-tech-talks": [
    { title: "How to give a technical talk — advice", url: "https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/", type: "article", qualityScore: 3 },
    { title: "Speaking tips — Google tech writing", url: "https://developers.google.com/tech-writing", type: "course", qualityScore: 3 },
  ],
  "conference-presentations": [
    { title: "Presenting a conference talk — guide", url: "https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/", type: "article", qualityScore: 3 },
    { title: "How to prepare a conference talk — ACM", url: "https://www.acm.org/publications/authors/", type: "article", qualityScore: 3 },
  ],
  "blog-posts": [
    { title: "Google technical writing course", url: "https://developers.google.com/tech-writing", type: "course", qualityScore: 5 },
    { title: "Writing for the web — Nielsen Norman", url: "https://www.nngroup.com/articles/how-users-read-on-the-web/", type: "article", qualityScore: 3 },
  ],
  "patent-basics": [
    { title: "Patent basics — USPTO", url: "https://www.uspto.gov/patents/basics", type: "official-doc", qualityScore: 5 },
    { title: "Patent process overview — USPTO", url: "https://www.uspto.gov/patents/basics/patent-process-overview", type: "official-doc", qualityScore: 4 },
  ],
  "paper-implementation-blog": [
    { title: "Papers with Code — reimplementations", url: "https://paperswithcode.com/", type: "reference", qualityScore: 4 },
    { title: "Google technical writing course", url: "https://developers.google.com/tech-writing", type: "course", qualityScore: 3 },
  ],
  "research-prototype": [
    { title: "Papers with Code — state-of-the-art benchmarks", url: "https://paperswithcode.com/sota", type: "reference", qualityScore: 4 },
    { title: "Deep Learning Systems — lectures (CMU)", url: "https://dlsyscourse.org/lectures/", type: "course", qualityScore: 4 },
  ],
  "novel-method-comparison": [
    { title: "Experimental comparison — NIST handbook", url: "https://www.itl.nist.gov/div898/handbook/pri/pri.htm", type: "official-doc", qualityScore: 4 },
    { title: "Benchmarking best practices — MLPerf", url: "https://mlcommons.org/benchmarks/", type: "official-doc", qualityScore: 4 },
  ],
  "survey-paper": [
    { title: "Writing a literature review — UNC", url: "https://writingcenter.unc.edu/tips-and-tools/literature-reviews/", type: "article", qualityScore: 4 },
    { title: "Systematic reviews — PRISMA statement", url: "https://www.prisma-statement.org/", type: "official-doc", qualityScore: 3 },
  ],
  "paper-discussion": [
    { title: "How to read a paper — S. Keshav", url: "https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf", type: "pdf", qualityScore: 5 },
    { title: "Critiquing research — CASP tools", url: "https://casp-uk.net/casp-tools-checklists/", type: "reference", qualityScore: 3 },
  ],
  "coding-challenge": [
    { title: "LeetCode — problem set", url: "https://cp-algorithms.com/index.html", type: "reference", qualityScore: 4 },
    { title: "HackerRank — algorithms practice", url: "https://www.hackerrank.com/domains/algorithms", type: "course", qualityScore: 3 },
  ],
  "research-methodology": [
    { title: "Research methods knowledge base", url: "https://conjointly.com/kb/", type: "book", qualityScore: 4 },
    { title: "Design of experiments — NIST handbook", url: "https://www.itl.nist.gov/div898/handbook/pri/pri.htm", type: "official-doc", qualityScore: 4 },
  ],

  // ── open-source-developer ────────────────────────────────────────────────
  "reviewing-contributions": [
    { title: "How to review a pull request — GitHub docs", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request", type: "official-doc", qualityScore: 4 },
    { title: "Code review guidelines — Google", url: "https://google.github.io/eng-practices/review/", type: "official-doc", qualityScore: 5 },
  ],
  "release-management": [
    { title: "Managing releases — GitHub docs", url: "https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository", type: "official-doc", qualityScore: 4 },
    { title: "Semantic versioning 2.0.0", url: "https://semver.org/", type: "official-doc", qualityScore: 5 },
  ],
  "backward-compatibility": [
    { title: "Semantic versioning — compatibility rules", url: "https://semver.org/", type: "official-doc", qualityScore: 5 },
    { title: "Backward compatibility — Python PEP 387", url: "https://peps.python.org/pep-0387/", type: "official-doc", qualityScore: 4 },
  ],
  "deprecation-policies": [
    { title: "Deprecation policy — Kubernetes", url: "https://kubernetes.io/docs/reference/using-api/deprecation-policy/", type: "official-doc", qualityScore: 5 },
    { title: "Deprecating APIs — Google developer docs", url: "https://cloud.google.com/apis/design/versioning", type: "official-doc", qualityScore: 4 },
  ],
  "security-advisories": [
    { title: "GitHub Advisory Database", url: "https://github.com/advisories", type: "reference", qualityScore: 5 },
    { title: "Coordinated vulnerability disclosure — GitHub docs", url: "https://docs.github.com/en/code-security/security-advisories", type: "official-doc", qualityScore: 4 },
  ],
  "rfc-process": [
    { title: "The RFC process — Rust", url: "https://github.com/rust-lang/rfcs", type: "repository", qualityScore: 4 },
    { title: "IETF RFC process", url: "https://www.ietf.org/process/rfcs/", type: "official-doc", qualityScore: 4 },
  ],
  "design-documents": [
    { title: "Design docs at Google", url: "https://www.industrialempathy.com/posts/design-docs-at-google/", type: "article", qualityScore: 4 },
    { title: "Design document templates — Rust RFCs", url: "https://github.com/rust-lang/rfcs/blob/master/0000-template.md", type: "repository", qualityScore: 3 },
  ],
  "roadmapping": [
    { title: "Project roadmaps — GitHub docs", url: "https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects", type: "official-doc", qualityScore: 3 },
    { title: "Open source roadmapping — Kubernetes", url: "https://github.com/kubernetes/kubernetes/milestones", type: "repository", qualityScore: 3 },
  ],
  "community-calls": [
    { title: "Building welcoming communities — Open Source Guides", url: "https://opensource.guide/building-community/", type: "article", qualityScore: 3 },
    { title: "Discourse — community moderation guide", url: "https://meta.discourse.org/c/community/7", type: "article", qualityScore: 3 },
  ],
  "create-and-publish-library": [
    { title: "Publishing packages — npm docs", url: "https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry", type: "official-doc", qualityScore: 4 },
    { title: "Packaging Python projects — PyPA guide", url: "https://packaging.python.org/en/latest/tutorials/packaging-projects/", type: "official-doc", qualityScore: 5 },
  ],
  "contribute-to-major-project": [
    { title: "How to contribute to open source — Open Source Guides", url: "https://opensource.guide/how-to-contribute/", type: "article", qualityScore: 5 },
    { title: "First contributions — hands-on workshop", url: "https://github.com/firstcontributions/first-contributions", type: "repository", qualityScore: 4 },
  ],
  "write-technical-blog": [
    { title: "Google technical writing course", url: "https://developers.google.com/tech-writing", type: "course", qualityScore: 5 },
    { title: "Technical blogging — GitHub Pages docs", url: "https://docs.github.com/en/pages", type: "official-doc", qualityScore: 3 },
  ],
  "speak-at-conference": [
    { title: "CFP and conference speaking guide — Papercall", url: "https://www.papercall.io/cfps", type: "reference", qualityScore: 3 },
    { title: "How to write a conference proposal", url: "https://www.usenix.org/conferences/author-resources", type: "official-doc", qualityScore: 3 },
  ],
  "maintainer-experience": [
    { title: "Maintaining a project — Open Source Guides", url: "https://opensource.guide/best-practices/", type: "article", qualityScore: 4 },
    { title: "Building welcoming communities — Open Source Guides", url: "https://opensource.guide/building-community/", type: "article", qualityScore: 4 },
  ],
  "community-discussion": [
    { title: "Contributor covenant — code of conduct", url: "https://www.contributor-covenant.org/", type: "official-doc", qualityScore: 3 },
    { title: "Building community — Open Source Guides", url: "https://opensource.guide/building-community/", type: "article", qualityScore: 3 },
  ],

  // ── freelance-software-developer ─────────────────────────────────────────
  "business-setup": [
    { title: "Starting a business — SBA guide", url: "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure", type: "official-doc", qualityScore: 4 },
    { title: "Freelance business setup — Upwork resources", url: "https://www.upwork.com/resources/beginners-guide-to-freelancing", type: "article", qualityScore: 3 },
  ],
  "legal-contracts": [
    { title: "Freelance contract basics — Freelancers Union", url: "https://www.freelancersunion.org/resources/contract-101/", type: "article", qualityScore: 3 },
    { title: "Independent contractor agreements — SBA", url: "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure", type: "official-doc", qualityScore: 3 },
  ],
  "pricing-strategies": [
    { title: "Freelance rate setting — Upwork guide", url: "https://www.upwork.com/resources/how-to-set-your-freelance-rates", type: "article", qualityScore: 4 },
    { title: "Value-based pricing for freelancers", url: "https://www.freelancersunion.org/resources/", type: "article", qualityScore: 3 },
  ],
  "time-management": [
    { title: "Time management for freelancers — Freelancers Union", url: "https://www.freelancersunion.org/resources/", type: "article", qualityScore: 3 },
    { title: "Deep work — time blocking guide", url: "https://todoist.com/productivity-methods/time-blocking", type: "article", qualityScore: 3 },
  ],
  "client-acquisition": [
    { title: "Finding clients — Upwork resources", url: "https://www.upwork.com/resources/how-to-find-freelance-clients", type: "article", qualityScore: 3 },
    { title: "Client acquisition for freelancers — Freelancers Union", url: "https://www.freelancersunion.org/resources/", type: "article", qualityScore: 3 },
  ],
  "scope-definition": [
    { title: "Project scope management — PMI", url: "https://www.pmi.org/learning/library/scope-management-essential-8555", type: "article", qualityScore: 3 },
    { title: "Statement of work — Atlassian guide", url: "https://www.atlassian.com/software/confluence/templates/statement-of-work", type: "article", qualityScore: 3 },
  ],
  "communication-protocols": [
    { title: "Client communication for freelancers — Upwork", url: "https://www.upwork.com/resources/client-communication", type: "article", qualityScore: 3 },
    { title: "Remote communication best practices — GitLab handbook", url: "https://handbook.gitlab.com/handbook/company/culture/all-remote/", type: "official-doc", qualityScore: 3 },
  ],
  "feedback-handling": [
    { title: "Client feedback loops — Freelancers Union", url: "https://www.freelancersunion.org/resources/", type: "article", qualityScore: 3 },
  ],
  "project-delivery": [
    { title: "Agile delivery — Atlassian guide", url: "https://www.atlassian.com/agile/project-management", type: "article", qualityScore: 3 },
    { title: "Delivering projects — PMI", url: "https://www.pmi.org/learning/library", type: "article", qualityScore: 3 },
  ],
  "full-stack-development": [
    { title: "Full stack open — University of Helsinki", url: "https://fullstackopen.com/en/", type: "course", qualityScore: 5 },
    { title: "MDN — web development learning area", url: "https://developer.mozilla.org/en-US/docs/Learn", type: "course", qualityScore: 5 },
  ],
  "devops-basics": [
    { title: "DevOps — Atlassian guide", url: "https://www.atlassian.com/devops", type: "article", qualityScore: 4 },
    { title: "Docker — get started", url: "https://docs.docker.com/get-started/", type: "official-doc", qualityScore: 5 },
  ],
  "invoicing-accounting": [
    { title: "Invoicing basics — SBA", url: "https://www.sba.gov/business-guide/manage-your-business/manage-your-finances", type: "official-doc", qualityScore: 3 },
    { title: "Freelance accounting — Freelancers Union", url: "https://www.freelancersunion.org/resources/", type: "article", qualityScore: 3 },
  ],
  "tax-planning": [
    { title: "Self-employment tax — IRS", url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes", type: "official-doc", qualityScore: 5 },
    { title: "Small business taxes — IRS", url: "https://www.irs.gov/businesses/small-businesses-self-employed", type: "official-doc", qualityScore: 4 },
  ],
  "insurance": [
    { title: "Business insurance — SBA guide", url: "https://www.sba.gov/business-guide/manage-your-business", type: "official-doc", qualityScore: 4 },
    { title: "Freelancer insurance — Freelancers Union", url: "https://www.freelancersunion.org/resources/", type: "article", qualityScore: 3 },
  ],
  "personal-branding": [
    { title: "Personal branding for developers — freeCodeCamp", url: "https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/", type: "article", qualityScore: 3 },
    { title: "Building a developer brand — GitHub profile guide", url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/about-your-profile", type: "official-doc", qualityScore: 3 },
  ],
  "upwork-fiverr-toptal": [
    { title: "Upwork — freelancer resources", url: "https://www.upwork.com/resources/beginners-guide-to-freelancing", type: "article", qualityScore: 3 },
    { title: "Fiverr — seller guidelines", url: "https://help.fiverr.com/hc/en-us/categories/4405872054417", type: "official-doc", qualityScore: 3 },
  ],
  "cold-outreach": [
    { title: "Cold outreach for freelancers — Upwork", url: "https://www.upwork.com/resources/how-to-find-freelance-clients", type: "article", qualityScore: 3 },
  ],
  "referral-systems": [
    { title: "Referral programs — HubSpot guide", url: "https://blog.hubspot.com/service/customer-referral-program", type: "article", qualityScore: 3 },
    { title: "Getting referrals as a freelancer", url: "https://www.freelancersunion.org/resources/", type: "article", qualityScore: 3 },
  ],
  "content-marketing": [
    { title: "Content marketing — HubSpot academy", url: "https://academy.hubspot.com/courses/content-marketing", type: "course", qualityScore: 4 },
    { title: "Developer content marketing — guide", url: "https://www.freecodecamp.org/news/tag/blogging/", type: "article", qualityScore: 3 },
  ],
  "client-case-studies": [
    { title: "Writing case studies — HubSpot guide", url: "https://en.wikipedia.org/wiki/Case_study", type: "article", qualityScore: 3 },
  ],
  "personal-website": [
    { title: "GitHub Pages — site publishing", url: "https://docs.github.com/en/pages", type: "official-doc", qualityScore: 4 },
    { title: "Vercel — getting started", url: "https://vercel.com/docs/getting-started-with-vercel", type: "official-doc", qualityScore: 4 },
  ],
  "portfolio-presentation": [
    { title: "Developer portfolio guide — freeCodeCamp", url: "https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/", type: "article", qualityScore: 3 },
    { title: "Portfolio projects — GitHub showcase", url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme", type: "official-doc", qualityScore: 3 },
  ],
  "client-scenario-discussion": [
    { title: "Consulting case interviews — Management Consulted", url: "https://managementconsulted.com/case-interview/", type: "course", qualityScore: 3 },
    { title: "Client discovery conversations — guide", url: "https://www.freelancersunion.org/resources/", type: "article", qualityScore: 3 },
  ],
  "pricing-negotiation": [
    { title: "Negotiation skills — Harvard PON", url: "https://www.pon.harvard.edu/tag/negotiation-skills/", type: "article", qualityScore: 4 },
    { title: "Freelance rate negotiation — Upwork", url: "https://www.upwork.com/resources/how-to-negotiate-freelance-rates", type: "article", qualityScore: 3 },
  ],
  "technical-assessment": [
    { title: "Technical interview prep — Tech Interview Handbook", url: "https://www.techinterviewhandbook.org/", type: "course", qualityScore: 5 },
    { title: "Take-home assignments — guidance", url: "https://github.com/poteto/hiring-without-whiteboards", type: "repository", qualityScore: 3 },
  ],
};
