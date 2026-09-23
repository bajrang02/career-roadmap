// Long-tail resource library — Part C4 (Spring Boot, MySQL, testing, AppSec, IoT, perf, Rails)

export const LONGTAIL_C4 = {
  // ── spring-boot ──────────────────────────────────────────────────────────
  "auto-configuration": [
    { title: "Auto-configuration — Spring Boot reference", url: "https://docs.spring.io/spring-boot/reference/using/auto-configuration.html", type: "official-doc", qualityScore: 5 },
    { title: "Creating your own auto-configuration — Spring Boot", url: "https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html", type: "official-doc", qualityScore: 4 },
  ],
  "application-properties": [
    { title: "Externalized configuration — Spring Boot", url: "https://docs.spring.io/spring-boot/reference/features/external-config.html", type: "official-doc", qualityScore: 5 },
    { title: "Common application properties — Spring Boot", url: "https://docs.spring.io/spring-boot/appendix/application-properties/index.html", type: "reference", qualityScore: 4 },
  ],
  "spring-mvc": [
    { title: "Web MVC — Spring Framework reference", url: "https://docs.spring.io/spring-framework/reference/web/webmvc.html", type: "official-doc", qualityScore: 5 },
    { title: "DispatcherServlet — Spring MVC", url: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet.html", type: "official-doc", qualityScore: 4 },
  ],
  "rest-controllers": [
    { title: "Building a RESTful web service — Spring guide", url: "https://spring.io/guides/gs/rest-service", type: "tutorial", qualityScore: 5 },
    { title: "Annotated controllers — Spring MVC", url: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller.html", type: "official-doc", qualityScore: 4 },
  ],
  "embedded-server": [
    { title: "Servlet web applications — Spring Boot", url: "https://docs.spring.io/spring-boot/reference/web/servlet.html", type: "official-doc", qualityScore: 4 },
    { title: "Embedded web servers — Spring Boot how-to", url: "https://docs.spring.io/spring-boot/how-to/webserver.html", type: "official-doc", qualityScore: 4 },
  ],
  "query-methods": [
    { title: "Query methods — Spring Data JPA", url: "https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html", type: "official-doc", qualityScore: 5 },
    { title: "Accessing data with JPA — Spring guide", url: "https://spring.io/guides/gs/accessing-data-jpa/", type: "tutorial", qualityScore: 4 },
  ],
  "pagination-sorting": [
    { title: "Paging and sorting — Spring Data JPA", url: "https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html", type: "official-doc", qualityScore: 4 },
    { title: "Spring Data commons — paging", url: "https://docs.spring.io/spring-data/commons/reference/repositories/core-concepts.html", type: "official-doc", qualityScore: 3 },
  ],
  "auditing": [
    { title: "Auditing — Spring Data JPA reference", url: "https://docs.spring.io/spring-data/jpa/reference/auditing.html", type: "official-doc", qualityScore: 5 },
  ],
  "authentication-manager": [
    { title: "Authentication architecture — Spring Security", url: "https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html", type: "official-doc", qualityScore: 5 },
    { title: "Username/password authentication — Spring Security", url: "https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/index.html", type: "official-doc", qualityScore: 4 },
  ],
  "jwt-authentication": [
    { title: "OAuth2 JWT — Spring Security resource server", url: "https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html", type: "official-doc", qualityScore: 5 },
  ],
  "role-based-authorization": [
    { title: "Authorize HTTP requests — Spring Security", url: "https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html", type: "official-doc", qualityScore: 5 },
    { title: "Authorization architecture — Spring Security", url: "https://docs.spring.io/spring-security/reference/servlet/authorization/index.html", type: "official-doc", qualityScore: 4 },
  ],
  "csrf-protection": [
    { title: "Cross Site Request Forgery — Spring Security", url: "https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html", type: "official-doc", qualityScore: 5 },
  ],
  "method-security": [
    { title: "Method security — Spring Security", url: "https://docs.spring.io/spring-security/reference/servlet/authorization/method-security.html", type: "official-doc", qualityScore: 5 },
  ],
  "spring-aop": [
    { title: "Aspect Oriented Programming — Spring Framework", url: "https://docs.spring.io/spring-framework/reference/core/aop.html", type: "official-doc", qualityScore: 5 },
    { title: "AOP with @AspectJ — Spring Framework", url: "https://docs.spring.io/spring-framework/reference/core/aop/ataspectj.html", type: "official-doc", qualityScore: 4 },
  ],
  "caching-redis": [
    { title: "Caching — Spring Boot reference", url: "https://docs.spring.io/spring-boot/reference/io/caching.html", type: "official-doc", qualityScore: 5 },
    { title: "Redis with Spring Data Redis — guide", url: "https://docs.spring.io/spring-data/redis/reference/redis.html", type: "official-doc", qualityScore: 4 },
  ],
  "scheduling": [
    { title: "Task execution and scheduling — Spring Framework", url: "https://docs.spring.io/spring-framework/reference/integration/scheduling.html", type: "official-doc", qualityScore: 5 },
  ],
  "event-publishing": [
    { title: "Application events — Spring Framework", url: "https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html", type: "official-doc", qualityScore: 4 },
    { title: "Spring events — Baeldung guide", url: "https://www.baeldung.com/spring-events", type: "article", qualityScore: 4 },
  ],
  "actuator-monitoring": [
    { title: "Spring Boot Actuator — reference", url: "https://docs.spring.io/spring-boot/reference/actuator/index.html", type: "official-doc", qualityScore: 5 },
    { title: "Actuator endpoints — Spring Boot", url: "https://docs.spring.io/spring-boot/reference/actuator/endpoints.html", type: "reference", qualityScore: 4 },
  ],
  "rest-api-with-jpa": [
    { title: "Accessing data with JPA — Spring guide", url: "https://spring.io/guides/gs/accessing-data-jpa/", type: "tutorial", qualityScore: 5 },
    { title: "Building REST services with Spring — guide", url: "https://spring.io/guides/tutorials/rest/", type: "course", qualityScore: 5 },
  ],
  "jwt-auth-service": [
    { title: "Spring Boot and OAuth2 — tutorial", url: "https://spring.io/guides/tutorials/spring-boot-oauth2/", type: "course", qualityScore: 4 },
    { title: "OAuth2 JWT — Spring Security", url: "https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html", type: "official-doc", qualityScore: 4 },
  ],
  "microservice-with-eureka": [
    { title: "Service registration and discovery — Spring guide", url: "https://spring.io/guides/gs/service-registration-and-discovery/", type: "tutorial", qualityScore: 5 },
    { title: "Spring Cloud Netflix Eureka — docs", url: "https://docs.spring.io/spring-cloud-netflix/reference/spring-cloud-netflix.html", type: "official-doc", qualityScore: 4 },
  ],
  "spring-batch-processing": [
    { title: "Spring Batch — reference documentation", url: "https://docs.spring.io/spring-batch/reference/index.html", type: "official-doc", qualityScore: 5 },
    { title: "Creating a batch service — Spring guide", url: "https://spring.io/guides/gs/batch-processing/", type: "tutorial", qualityScore: 4 },
  ],

  // ── mysql ────────────────────────────────────────────────────────────────
  "database-table-creation": [
    { title: "Tutorial — MySQL reference manual", url: "https://dev.mysql.com/doc/refman/8.4/en/tutorial.html", type: "official-doc", qualityScore: 5 },
    { title: "CREATE TABLE — MySQL reference manual", url: "https://dev.mysql.com/doc/refman/8.4/en/create-table.html", type: "reference", qualityScore: 4 },
  ],
  "index-types-b-tree-hash": [
    { title: "B-tree and hash indexes — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/index-btree-hash.html", type: "official-doc", qualityScore: 5 },
    { title: "How MySQL uses indexes — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/mysql-indexes.html", type: "official-doc", qualityScore: 4 },
  ],
  "composite-indexes": [
    { title: "Multiple-column indexes — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html", type: "official-doc", qualityScore: 5 },
  ],
  "explain-analysis": [
    { title: "Using EXPLAIN to optimize queries — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/using-explain.html", type: "official-doc", qualityScore: 5 },
    { title: "EXPLAIN output format — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/explain-output.html", type: "reference", qualityScore: 4 },
  ],
  "slow-query-log": [
    { title: "The slow query log — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html", type: "official-doc", qualityScore: 5 },
  ],
  "privileges-grants": [
    { title: "Privileges provided by MySQL", url: "https://dev.mysql.com/doc/refman/8.4/en/privileges-provided.html", type: "official-doc", qualityScore: 5 },
    { title: "GRANT statement — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/grant.html", type: "reference", qualityScore: 4 },
  ],
  "backup-recovery": [
    { title: "Backup and recovery — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/backup-and-recovery.html", type: "official-doc", qualityScore: 5 },
    { title: "mysqldump — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/mysqldump.html", type: "reference", qualityScore: 4 },
  ],
  "replication": [
    { title: "Replication — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/replication.html", type: "official-doc", qualityScore: 5 },
  ],
  "innodb-engine": [
    { title: "The InnoDB storage engine — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/innodb-storage-engine.html", type: "official-doc", qualityScore: 5 },
    { title: "InnoDB architecture — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/innodb-architecture.html", type: "official-doc", qualityScore: 4 },
  ],
  "group-replication": [
    { title: "Group replication — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/group-replication.html", type: "official-doc", qualityScore: 5 },
  ],
  "innodb-cluster": [
    { title: "MySQL InnoDB Cluster — manual", url: "https://dev.mysql.com/doc/refman/8.4/en/mysql-innodb-cluster-introduction.html", type: "official-doc", qualityScore: 5 },
    { title: "MySQL AdminAPI — InnoDB Cluster", url: "https://dev.mysql.com/doc/mysql-shell/8.4/en/mysql-shell-adminapi.html", type: "official-doc", qualityScore: 4 },
  ],
  "mysql-shell": [
    { title: "MySQL Shell — user guide", url: "https://dev.mysql.com/doc/mysql-shell/8.4/en/", type: "official-doc", qualityScore: 4 },
    { title: "MySQL Shell utilities", url: "https://dev.mysql.com/doc/mysql-shell/8.4/en/mysql-shell-utilities.html", type: "official-doc", qualityScore: 4 },
  ],
  "replication-setup": [
    { title: "Setting up replication — MySQL manual", url: "https://dev.mysql.com/doc/refman/8.4/en/replication-howto.html", type: "official-doc", qualityScore: 5 },
  ],
  "migration-from-sqlite-to-mysql": [
    { title: "Database migration — MySQL Workbench", url: "https://dev.mysql.com/doc/workbench/en/wb-migration.html", type: "official-doc", qualityScore: 4 },
    { title: "SQLite to MySQL migration guide", url: "https://dev.mysql.com/doc/workbench/en/wb-migration-wizard.html", type: "official-doc", qualityScore: 3 },
  ],

  // ── software-testing (skill roadmap) ─────────────────────────────────────
  "automation-strategy": [
    { title: "Test practices — Selenium docs", url: "https://www.selenium.dev/documentation/test_practices/", type: "official-doc", qualityScore: 5 },
    { title: "Practical test pyramid — Martin Fowler", url: "https://martinfowler.com/articles/practical-test-pyramid.html", type: "article", qualityScore: 5 },
  ],
  "software-testing::performance-metrics": [
    { title: "JMeter glossary — performance metrics", url: "https://jmeter.apache.org/usermanual/glossary.html", type: "reference", qualityScore: 4 },
    { title: "k6 metrics — documentation", url: "https://grafana.com/docs/k6/latest/using-k6/metrics/", type: "official-doc", qualityScore: 4 },
  ],
  "performance-reports": [
    { title: "Generating a dashboard report — JMeter", url: "https://jmeter.apache.org/usermanual/generating-dashboard.html", type: "official-doc", qualityScore: 5 },
    { title: "k6 results output — reports", url: "https://grafana.com/docs/k6/latest/results-output/", type: "official-doc", qualityScore: 4 },
  ],
  "test-plan-for-web-app": [
    { title: "How to create a test plan — Guru99", url: "https://www.guru99.com/test-plan.html", type: "tutorial", qualityScore: 4 },
    { title: "Web testing — MDN accessibility & testing", url: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing", type: "course", qualityScore: 4 },
  ],
  "software-testing::automated-test-suite": [
    { title: "Playwright Test — introduction", url: "https://playwright.dev/docs/intro", type: "official-doc", qualityScore: 5 },
    { title: "Getting started with WebDriver — Selenium", url: "https://www.selenium.dev/documentation/webdriver/getting_started/", type: "official-doc", qualityScore: 4 },
  ],
  "software-testing::performance-test-report": [
    { title: "Generating a dashboard report — JMeter", url: "https://jmeter.apache.org/usermanual/generating-dashboard.html", type: "official-doc", qualityScore: 5 },
    { title: "k6 — results output", url: "https://grafana.com/docs/k6/latest/results-output/", type: "official-doc", qualityScore: 4 },
  ],
  "api-test-collection": [
    { title: "Collections overview — Postman docs", url: "https://learning.postman.com/docs/collections/collections-overview/", type: "official-doc", qualityScore: 5 },
    { title: "API testing — Playwright docs", url: "https://playwright.dev/docs/api-testing", type: "official-doc", qualityScore: 4 },
  ],

  // ── secure-software-development ──────────────────────────────────────────
  "threat-modeling-stride": [
    { title: "Threat modeling — Microsoft security engineering", url: "https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats", type: "official-doc", qualityScore: 5 },
    { title: "Threat modeling cheat sheet — OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html", type: "official-doc", qualityScore: 5 },
  ],
  "security-requirements": [
    { title: "OWASP ASVS — application security verification standard", url: "https://github.com/OWASP/ASVS", type: "official-doc", qualityScore: 5 },
    { title: "NIST SSDF — secure software development framework", url: "https://csrc.nist.gov/pubs/sp/800/218/final", type: "official-doc", qualityScore: 4 },
  ],
  "secure-design-review": [
    { title: "OWASP SAMM — software assurance maturity model", url: "https://owasp.org/www-project-samm/", type: "official-doc", qualityScore: 4 },
    { title: "Secure design principles — OWASP cheat sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Product_Design_Cheat_Sheet.html", type: "official-doc", qualityScore: 4 },
  ],
  "secure-coding-standards": [
    { title: "Secure coding practices — OWASP quick reference", url: "https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/", type: "official-doc", qualityScore: 5 },
  ],
  "injection-flaws": [
    { title: "Injection prevention cheat sheet — OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html", type: "official-doc", qualityScore: 5 },
    { title: "SQL injection prevention cheat sheet — OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html", type: "official-doc", qualityScore: 5 },
  ],
  "broken-authentication": [
    { title: "Authentication cheat sheet — OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", type: "official-doc", qualityScore: 5 },
    { title: "Session management cheat sheet — OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html", type: "official-doc", qualityScore: 4 },
  ],
  "xss-patterns": [
    { title: "XSS prevention cheat sheet — OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html", type: "official-doc", qualityScore: 5 },
    { title: "Cross-site scripting — PortSwigger Web Security Academy", url: "https://portswigger.net/web-security/cross-site-scripting", type: "course", qualityScore: 5 },
  ],
  "insecure-deserialization": [
    { title: "Deserialization cheat sheet — OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html", type: "official-doc", qualityScore: 5 },
    { title: "Insecure deserialization — PortSwigger Academy", url: "https://portswigger.net/web-security/deserialization", type: "course", qualityScore: 5 },
  ],
  "static-analysis-tools": [
    { title: "Semgrep — getting started", url: "https://semgrep.dev/docs/getting-started/", type: "official-doc", qualityScore: 4 },
    { title: "SAST — OWASP source code analysis tools", url: "https://owasp.org/www-community/Source_Code_Analysis_Tools", type: "reference", qualityScore: 4 },
  ],
  "manual-code-review": [
    { title: "OWASP code review guide", url: "https://owasp.org/www-project-code-review-guide/", type: "official-doc", qualityScore: 5 },
  ],
  "secure-coding-patterns": [
    { title: "Input validation cheat sheet — OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html", type: "official-doc", qualityScore: 5 },
    { title: "OWASP Top 10 Proactive Controls", url: "https://top10proactive.owasp.org/the-top-10/", type: "official-doc", qualityScore: 5 },
  ],
  "language-specific-vulnerabilities": [
    { title: "NodeJS security cheat sheet — OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html", type: "official-doc", qualityScore: 4 },
    { title: "CWE Top 25 most dangerous software weaknesses", url: "https://cwe.mitre.org/top25/archive/2024/2024_cwe_top25.html", type: "reference", qualityScore: 5 },
  ],
  "fix-recommendations": [
    { title: "OWASP Top 10 — web application security risks", url: "https://owasp.org/www-project-top-ten/", type: "official-doc", qualityScore: 5 },
    { title: "CWE — common weakness enumeration", url: "https://cwe.mitre.org/data/index.html", type: "reference", qualityScore: 4 },
  ],
  "dynamic-analysis-tools": [
    { title: "OWASP ZAP — documentation", url: "https://www.zaproxy.org/docs/", type: "official-doc", qualityScore: 5 },
    { title: "DAST — OWASP vulnerability scanning tools", url: "https://owasp.org/www-community/Vulnerability_Scanning_Tools", type: "reference", qualityScore: 3 },
  ],
  "software-composition-analysis": [
    { title: "OWASP Dependency-Check", url: "https://owasp.org/www-project-dependency-check/", type: "official-doc", qualityScore: 5 },
    { title: "GitHub Dependabot alerts — docs", url: "https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts", type: "official-doc", qualityScore: 4 },
  ],
  "sbom-generation": [
    { title: "SBOM — CISA resource hub", url: "https://www.cisa.gov/sbom", type: "official-doc", qualityScore: 4 },
    { title: "CycloneDX specification", url: "https://cyclonedx.org/specification/overview/", type: "official-doc", qualityScore: 4 },
  ],
  "container-image-scanning": [
    { title: "Trivy — container image scanning docs", url: "https://trivy.dev/latest/docs/target/container_image/", type: "official-doc", qualityScore: 4 },
    { title: "Docker Scout — image analysis", url: "https://docs.docker.com/scout/", type: "official-doc", qualityScore: 4 },
  ],
  "signed-commits": [
    { title: "Signing commits — GitHub docs", url: "https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits", type: "official-doc", qualityScore: 5 },
    { title: "Sigstore — software signing", url: "https://docs.sigstore.dev/", type: "official-doc", qualityScore: 4 },
  ],
  "security-in-ci-cd": [
    { title: "Security hardening for GitHub Actions", url: "https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions", type: "official-doc", qualityScore: 5 },
    { title: "OWASP DevSecOps guideline", url: "https://owasp.org/www-project-devsecops-guideline/", type: "official-doc", qualityScore: 5 },
  ],
  "automated-security-gates": [
    { title: "About code scanning — GitHub docs", url: "https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning", type: "official-doc", qualityScore: 4 },
    { title: "Semgrep CI — docs", url: "https://semgrep.dev/docs/semgrep-ci/overview/", type: "official-doc", qualityScore: 4 },
  ],
  "infrastructure-as-code-security": [
    { title: "Checkov — IaC security scanning", url: "https://www.checkov.io/1.Welcome/What%20is%20Checkov.html", type: "official-doc", qualityScore: 4 },
    { title: "tfsec — Terraform security scanner", url: "https://aquasecurity.github.io/tfsec/v1.28.5/", type: "official-doc", qualityScore: 4 },
  ],
  "security-metrics": [
    { title: "OWASP SAMM — measuring security maturity", url: "https://owasp.org/www-project-samm/", type: "official-doc", qualityScore: 4 },
    { title: "DORA — software delivery metrics", url: "https://dora.dev/guides/dora-metrics-four-keys/", type: "reference", qualityScore: 4 },
  ],
  "secure-code-review-guide": [
    { title: "OWASP code review guide v2", url: "https://owasp.org/www-project-code-review-guide/", type: "official-doc", qualityScore: 5 },
    { title: "Google engineering practices — code review", url: "https://google.github.io/eng-practices/review/", type: "official-doc", qualityScore: 4 },
  ],
  "appsec-pipeline-implementation": [
    { title: "OWASP DevSecOps guideline", url: "https://owasp.org/www-project-devsecops-guideline/", type: "official-doc", qualityScore: 5 },
    { title: "NIST SSDF — SP 800-218", url: "https://csrc.nist.gov/pubs/sp/800/218/final", type: "official-doc", qualityScore: 4 },
  ],
  "threat-model-document": [
    { title: "Threat modeling cheat sheet — OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html", type: "official-doc", qualityScore: 5 },
    { title: "Microsoft Threat Modeling Tool — threats", url: "https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats", type: "official-doc", qualityScore: 4 },
  ],
  "security-test-suite": [
    { title: "OWASP Web Security Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/", type: "official-doc", qualityScore: 5 },
    { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", type: "course", qualityScore: 5 },
  ],

  // ── robotics ─────────────────────────────────────────────────────────────
  "ros2-best-practices": [
    { title: "ROS 2 design — developer guide", url: "https://docs.ros.org/en/rolling/The-ROS2-Project/Contributing/Developer-Guide.html", type: "official-doc", qualityScore: 4 },
    { title: "ROS 2 tutorials — beginner CLI tools", url: "https://docs.ros.org/en/rolling/Tutorials/Beginner-CLI-Tools.html", type: "course", qualityScore: 4 },
  ],
  "sensor-integration": [
    { title: "Understanding ROS 2 topics — sensors and messages", url: "https://docs.ros.org/en/rolling/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html", type: "tutorial", qualityScore: 4 },
    { title: "ROS 2 sensor drivers — camera & IMU guides", url: "https://docs.ros.org/en/rolling/Tutorials/Advanced.html", type: "tutorial", qualityScore: 3 },
  ],
  "arduino-ros-bridge": [
    { title: "Arduino — language reference", url: "https://docs.arduino.cc/language-reference/", type: "official-doc", qualityScore: 4 },
  ],
  "arduino-robotics-projects": [
    { title: "Arduino — getting started guide", url: "https://docs.arduino.cc/learn/starting-guide/getting-started-arduino", type: "official-doc", qualityScore: 4 },
    { title: "Arduino project hub — robotics", url: "https://projecthub.arduino.cc/", type: "reference", qualityScore: 3 },
  ],
  "ros-architecture": [
    { title: "ROS 2 concepts — basic", url: "https://docs.ros.org/en/rolling/Concepts/Basic.html", type: "official-doc", qualityScore: 5 },
    { title: "ROS 2 design — architecture", url: "https://docs.ros.org/en/rolling/Concepts/Basic/About-Nodes.html", type: "official-doc", qualityScore: 4 },
  ],

  // ── mobile-testing ───────────────────────────────────────────────────────
  "test-strategy": [
    { title: "Appium — introduction", url: "https://appium.io/docs/en/latest/intro/", type: "official-doc", qualityScore: 4 },
    { title: "Testing fundamentals — Android developers", url: "https://developer.android.com/training/testing/fundamentals", type: "official-doc", qualityScore: 4 },
  ],
  "appium": [
    { title: "Appium — quickstart", url: "https://appium.io/docs/en/latest/quickstart/", type: "official-doc", qualityScore: 5 },
    { title: "Appium — capabilities", url: "https://appium.io/docs/en/latest/guides/caps/", type: "reference", qualityScore: 4 },
  ],
  "platform-specific": [
    { title: "XCTest — Apple developer docs", url: "https://developer.apple.com/documentation/xctest", type: "official-doc", qualityScore: 5 },
    { title: "Instrumented unit tests — Android", url: "https://developer.android.com/training/testing/instrumented-tests", type: "official-doc", qualityScore: 4 },
  ],
  "detox": [
    { title: "Detox — getting started", url: "https://wix.github.io/Detox/docs/introduction/getting-started", type: "official-doc", qualityScore: 5 },
    { title: "Detox — API reference", url: "https://wix.github.io/Detox/docs/api/actions", type: "reference", qualityScore: 4 },
  ],
  "app-performance": [
    { title: "App performance — Android developers", url: "https://developer.android.com/topic/performance", type: "official-doc", qualityScore: 4 },
    { title: "Improving app performance — Apple docs", url: "https://developer.apple.com/documentation/xcode/improving-your-app-s-performance", type: "official-doc", qualityScore: 4 },
  ],

  // ── iot-networking ───────────────────────────────────────────────────────
  "mqtt": [
    { title: "MQTT — AWS IoT protocol documentation", url: "https://docs.aws.amazon.com/iot/latest/developerguide/mqtt.html", type: "official-doc", qualityScore: 5 },
    { title: "MQTT 5.0 specification — OASIS", url: "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html", type: "official-doc", qualityScore: 4 },
  ],
  "coap": [
    { title: "CoAP — RFC 7252", url: "https://datatracker.ietf.org/doc/html/rfc7252", type: "official-doc", qualityScore: 5 },
    { title: "Constrained Application Protocol — Wikipedia", url: "https://en.wikipedia.org/wiki/Constrained_Application_Protocol", type: "reference", qualityScore: 3 },
  ],
  "http-vs-mqtt": [
    { title: "AWS IoT protocols — MQTT, HTTP, and more", url: "https://docs.aws.amazon.com/iot/latest/developerguide/protocols.html", type: "official-doc", qualityScore: 5 },
    { title: "MQTT vs HTTP — HiveMQ guide", url: "https://mqtt.org/faq/", type: "article", qualityScore: 3 },
  ],
  "aws-iot-core": [
    { title: "What is AWS IoT Core? — developer guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html", type: "official-doc", qualityScore: 5 },
    { title: "AWS IoT Core — getting started tutorial", url: "https://docs.aws.amazon.com/iot/latest/developerguide/iot-gs.html", type: "tutorial", qualityScore: 4 },
  ],
  "device-security": [
    { title: "AWS IoT security — developer guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/iot-security.html", type: "official-doc", qualityScore: 4 },
    { title: "OWASP IoT security testing guide", url: "https://owasp.org/www-project-iot-security-testing-guide/", type: "official-doc", qualityScore: 4 },
  ],
  "edge-gateways": [
    { title: "AWS IoT Greengrass — developer guide", url: "https://docs.aws.amazon.com/greengrass/v2/developerguide/what-is-iot-greengrass.html", type: "official-doc", qualityScore: 4 },
    { title: "Edge computing — Wikipedia", url: "https://en.wikipedia.org/wiki/Edge_computing", type: "reference", qualityScore: 3 },
  ],
  "fog-computing": [
    { title: "Fog computing — Wikipedia", url: "https://en.wikipedia.org/wiki/Fog_computing", type: "reference", qualityScore: 4 },
    { title: "Edge vs fog computing — Azure architecture", url: "https://learn.microsoft.com/en-us/azure/iot-edge/about-iot-edge", type: "official-doc", qualityScore: 3 },
  ],

  // ── performance-engineering ──────────────────────────────────────────────
  "cpu-profiling": [
    { title: "Performance panel — Chrome DevTools", url: "https://developer.chrome.com/docs/devtools/performance/", type: "official-doc", qualityScore: 4 },
    { title: "cProfile — Python profilers", url: "https://docs.python.org/3/library/profile.html", type: "official-doc", qualityScore: 4 },
  ],
  "memory-profiling": [
    { title: "Memory panel — Chrome DevTools", url: "https://developer.chrome.com/docs/devtools/memory/", type: "official-doc", qualityScore: 4 },
    { title: "memory-profiler — Python package", url: "https://pypi.org/project/memory-profiler/", type: "official-doc", qualityScore: 3 },
  ],
  "i-o-profiling": [
    { title: "I/O statistics — Linux kernel docs", url: "https://docs.kernel.org/admin-guide/iostats.html", type: "official-doc", qualityScore: 4 },
    { title: "Linux performance analysis — Brendan Gregg", url: "https://www.brendangregg.com/linuxperf.html", type: "article", qualityScore: 4 },
  ],
  "cache-optimization": [
    { title: "CPU cache — optimization background", url: "https://en.wikipedia.org/wiki/CPU_cache", type: "reference", qualityScore: 3 },
    { title: "perf — Linux performance analysis tools", url: "https://www.brendangregg.com/perf.html", type: "article", qualityScore: 4 },
  ],
  "parallelism": [
    { title: "OpenMP — specification and guides", url: "https://www.openmp.org/specifications/", type: "official-doc", qualityScore: 4 },
    { title: "Parallel computing — Wikipedia", url: "https://en.wikipedia.org/wiki/Parallel_computing", type: "reference", qualityScore: 3 },
  ],
  "gc-tuning": [
    { title: "Java HotSpot GC tuning guide", url: "https://docs.oracle.com/en/java/javase/21/gctuning/", type: "official-doc", qualityScore: 5 },
    { title: "Garbage collection — .NET docs", url: "https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/", type: "official-doc", qualityScore: 4 },
  ],
  "network-optimization": [
    { title: "Web performance — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/Performance", type: "official-doc", qualityScore: 4 },
    { title: "TCP tuning — Linux kernel networking docs", url: "https://docs.kernel.org/networking/ip-sysctl.html", type: "official-doc", qualityScore: 4 },
  ],

  // ── ruby-on-rails ────────────────────────────────────────────────────────
  "hotwire-turbo-stimulus": [
    { title: "Turbo handbook — Hotwire", url: "https://turbo.hotwired.dev/handbook/introduction", type: "official-doc", qualityScore: 5 },
    { title: "Stimulus handbook — Hotwire", url: "https://stimulus.hotwired.dev/handbook/introduction", type: "official-doc", qualityScore: 5 },
  ],
  "spa-like-ux-without-a-js-framework": [
    { title: "Turbo Drive handbook", url: "https://turbo.hotwired.dev/handbook/drive", type: "official-doc", qualityScore: 5 },
    { title: "Turbo Frames handbook", url: "https://turbo.hotwired.dev/handbook/frames", type: "official-doc", qualityScore: 4 },
  ],
  "deployment-scaling": [
    { title: "Kamal — deployment docs", url: "https://kamal-deploy.org/docs/installation/", type: "official-doc", qualityScore: 4 },
    { title: "Rails asset pipeline — guides", url: "https://guides.rubyonrails.org/asset_pipeline.html", type: "official-doc", qualityScore: 4 },
  ],
  "kamal-or-container-deploys": [
    { title: "Kamal — configuration reference", url: "https://kamal-deploy.org/docs/configuration/", type: "official-doc", qualityScore: 5 },
    { title: "Docker — get started", url: "https://docs.docker.com/get-started/", type: "official-doc", qualityScore: 4 },
  ],
  "zero-downtime-restarts": [
    { title: "Kamal — commands and rollbacks", url: "https://kamal-deploy.org/docs/commands/", type: "official-doc", qualityScore: 4 },
    { title: "Rails — configuring apps", url: "https://guides.rubyonrails.org/configuring.html", type: "official-doc", qualityScore: 3 },
  ],
  "log-error-monitoring": [
    { title: "Debugging Rails applications — guides", url: "https://guides.rubyonrails.org/debugging_rails_applications.html", type: "official-doc", qualityScore: 5 },
    { title: "Sentry for Ruby on Rails — docs", url: "https://docs.sentry.io/platforms/ruby/guides/rails/", type: "official-doc", qualityScore: 4 },
  ],
};
