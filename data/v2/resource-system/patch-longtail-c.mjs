// Patch Part C libraries: swap every dead/temporary URL for a probe-verified
// replacement, and drop entries whose key already keeps a verified direct URL.
import fs from "node:fs";

const REPLACE = {
  "https://docs.netlify.com/build/overview/": "https://docs.netlify.com/configure-builds/overview/",
  "https://recharts.org/en-US/guide": "https://github.com/recharts/recharts",
  "https://square.github.io/retrofit/": "https://github.com/square/retrofit",
  "https://docs.unity3d.com/Manual/UsingTheEditor.html": "https://docs.unity3d.com/6000.0/Documentation/Manual/GameObjects.html",
  "https://learn.unity.com/tutorial/render-pipeline-optimization": "https://docs.unity3d.com/6000.0/Documentation/Manual/Profiler.html",
  "https://docs.unity3d.com/Manual/nav-NavigationSystem.html": "https://en.wikipedia.org/wiki/Navigation_mesh",
  "https://docs.unity3d.com/Manual/nav-BuildingNavMesh.html": "https://en.wikipedia.org/wiki/Pathfinding",
  "https://learn.unity.com/project/2d-platformer-microgame": "https://docs.unity3d.com/6000.0/Documentation/Manual/Unity2D.html",
  "https://learn.unity.com/project/karting-microgame": "https://docs.unity3d.com/6000.0/Documentation/Manual/class-WheelCollider.html",
  "https://zustand.docs.pmnd.rs/getting-started/introduction": "https://github.com/pmndrs/zustand#readme",
  "https://zustand.docs.pmnd.rs/guides/updating-state": "https://www.npmjs.com/package/zustand",
  "https://zustand.docs.pmnd.rs/guides/immutable-state-and-merging": "https://react.dev/learn/managing-state",
  "https://zustand.docs.pmnd.rs/guides/prevent-rerenders-with-use-shallow": "https://react.dev/learn/scaling-up-with-reducer-and-context",
  "https://zustand.docs.pmnd.rs/guides/practice-with-no-store-actions": "https://github.com/pmndrs/zustand",
  "https://zustand.docs.pmnd.rs/guides/slices-pattern": "https://www.npmjs.com/package/zustand",
  "https://docs.flutter.dev/cookbook/networking/local-storage": "https://docs.flutter.dev/cookbook/persistence/sqlite",
  "https://r4ds.hadley.nz/vectors": "https://r4ds.had.co.nz/vectors.html",
  "https://r4ds.hadley.nz/exploratory-data-analysis": "https://r4ds.had.co.nz/exploratory-data-analysis.html",
  "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/aov": "https://stat.ethz.ch/R-manual/R-devel/library/stats/html/aov.html",
  "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/lm": "https://stat.ethz.ch/R-manual/R-devel/library/stats/html/lm.html",
  "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/chisq.test": "https://stat.ethz.ch/R-manual/R-devel/library/stats/html/chisq.test.html",
  "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/Chisquare": "https://en.wikipedia.org/wiki/Chi-squared_test",
  "https://www.statmethods.net/graphs/index.html": "https://r4ds.had.co.nz/data-visualisation.html",
  "https://www.statmethods.net/stats/regression.html": null,
  "https://www.statmethods.net/stats/anova.html": null,
  "https://www.geeksforgeeks.org/decision-table-testing/": null,
  "https://testlink.org/documentation.html": "https://github.com/TestLinkOpenSourceTRMS/testlink-code",
  "https://www.guru99.com/how-to-create-test-plan-document.html": "https://www.guru99.com/test-plan.html",
  "https://playwright.dev/docs/test-intro": "https://playwright.dev/docs/intro",
  "https://playwright.dev/docs/test-architecture": "https://playwright.dev/docs/test-parallel",
  "https://www.geeksforgeeks.org/software-testing-defect-management/": "https://www.guru99.com/defect-management-process.html",
  "https://www.guru99.com/defect-triage-meeting.html": "https://www.guru99.com/defect-management-process.html",
  "https://learning.postman.com/docs/collections/using-variables/": "https://learning.postman.com/docs/sending-requests/variables/variables/",
  "https://allurereport.org/docs/gettingstarted/": "https://allurereport.org/docs/how-it-works/",
  "https://allurereport.org/docs/testops/": "https://docs.qameta.io/allure/",
  "https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/quality-gates/": "https://docs.sonarsource.com/sonarqube-server/latest/quality-standards-administration/managing-quality-gates/introduction-to-quality-gates/",
  "https://docs.sonarsource.com/sonarcloud/analyzing-source-code/quality-gates/": "https://docs.sonarsource.com/sonarqube-server/",
  "https://www.tensorflow.org/lite/guide": "https://ai.google.dev/edge/litert/overview",
  "https://www.tensorflow.org/lite/performance/model_optimization": "https://www.tensorflow.org/lite/performance/post_training_quantization",
  "https://www.atlassian.com/agile/product-management/problem-framing": "https://www.atlassian.com/agile/product-management/discovery",
  "https://www.designkit.org/methods/define-the-problem.html": "https://www.atlassian.com/agile/product-management",
  "https://www.figma.com/best-practices/design-handoff/": "https://help.figma.com/hc/en-us/articles/360040521453-Dev-Mode",
  "https://www.atlassian.com/agile/product-management/metrics": "https://www.atlassian.com/agile/product-management/prioritization-framework",
  "https://amplitude.com/docs/analytics/charts/cohort-analysis": "https://docs.mixpanel.com/docs/reports/retention",
  "https://www.optimizely.com/optimization-glossary/experimentation-culture/": "https://www.optimizely.com/optimization-glossary/ab-testing/",
  "https://www.atlassian.com/work-management/project-management/technical-specification": null,
  "https://launchdarkly.com/blog/product-launch-playbook/": "https://launchdarkly.com/docs/home/experimentation",
  "https://docs.launchdarkly.com/home/monitoring": "https://launchdarkly.com/docs/home/flags",
  "https://docs.mixpanel.com/docs/reports/dashboards": "https://docs.mixpanel.com/docs/reports/overview",
  "https://www.tryexponent.com/blog/product-manager-interview-guide": null,
  "https://www.prodpad.com/blog/prioritization-frameworks/": null,
  "https://hbr.org/2015/03/how-to-handle-qa": "https://www.toastmasters.org/resources/public-speaking-tips",
  "https://www.toastmasters.org/magazine/magazine-issues/how-to-handle-a-qa-session": null,
  "https://www.servicenow.com/products/platform.html": null,
  "https://developer.mozilla.org/en-US/docs/Glossary/Web3": "https://ethereum.org/en/web3/",
  "https://docs.quantum.ibm.com/build/error-correction": "https://docs.quantum.ibm.com/run/error-mitigation-explanation",
  "https://qiskit.org/ecosystem/": "https://en.wikipedia.org/wiki/Quantum_error_correction",
  "https://learn.microsoft.com/en-us/power-platform/guidance/adoption/": "https://learn.microsoft.com/en-us/power-platform/guidance/adoption/methodology",
  "https://support.google.com/appsheet/answer/10104470": null,
  "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/design-great-apps": "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/reference-properties",
  "https://learn.microsoft.com/en-us/power-automate/flows-overview": "https://learn.microsoft.com/en-us/power-automate/getting-started",
  "https://learn.microsoft.com/en-us/power-platform/alm/source-control": null,
  "https://www.outsystems.com/blog/posts/scale-low-code/": "https://www.outsystems.com/blog/posts/low-code-architecture/",
  "https://learn.microsoft.com/en-us/power-pages/getting-started/": "https://learn.microsoft.com/en-us/power-pages/",
  "https://learn.microsoft.com/en-us/power-pages/getting-started/create-site": null,
  "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-column-chart": null,
  "https://learn.microsoft.com/en-us/power-automate/desktop-flows/excel-actions": "https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction",
  "https://machinelearningmastery.com/ablation-study/": "https://en.wikipedia.org/wiki/Ablation_(artificial_intelligence)",
  "https://writingcenter.unc.edu/tips-and-tools/scientific-papers/": null,
  "https://meta.discourse.org/t/community-moderation-guide/": "https://meta.discourse.org/c/community/7",
  "https://www.sba.gov/business-guide/manage-your-business/write-business-plan": "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure",
  "https://hbr.org/2019/03/the-right-way-to-take-criticism": null,
  "https://www.sba.gov/business-guide/manage-your-business/get-business-insurance": "https://www.sba.gov/business-guide/manage-your-business",
  "https://www.freecodecamp.org/news/tag/personal-branding/": "https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/",
  "https://blog.hubspot.com/sales/cold-email": null,
  "https://blog.hubspot.com/service/how-to-write-a-case-study": "https://en.wikipedia.org/wiki/Case_study",
  "https://dribbble.com/stories/2019/05/23/how-to-write-a-case-study": null,
  "https://www.pon.harvard.edu/daily/negotiation-skills-daily/": "https://www.pon.harvard.edu/tag/negotiation-skills/",
  "https://flask-wtf.readthedocs.io/en/stable/": "https://flask-wtf.readthedocs.io/en/1.2.x/",
  "https://flask-wtf.readthedocs.io/en/stable/form.html": "https://flask-wtf.readthedocs.io/en/1.2.x/form/",
  "https://flask-wtf.readthedocs.io/en/stable/csrf.html": "https://flask-wtf.readthedocs.io/en/1.2.x/csrf/",
  "https://flask-wtf.readthedocs.io/en/stable/quickstart.html": "https://flask-wtf.readthedocs.io/en/1.2.x/quickstart/",
  "https://fastapi.tiangolo.com/tutorial/security/api-key/": "https://fastapi.tiangolo.com/tutorial/security/",
  "https://redis.io/docs/latest/develop/clients/spring/": "https://docs.spring.io/spring-data/redis/reference/redis.html",
  "https://owasp.org/www-project-application-security-verification-standard/": "https://github.com/OWASP/ASVS",
  "https://wiki.sei.cmu.edu/confluence/display/seccode/SEI+CERT+Coding+Standards": null,
  "https://micro.ros.org/docs/tutorials/core/overview/": null,
  "https://design.ros2.org/articles/ros2_ddsm_arch.html": "https://docs.ros.org/en/rolling/Concepts/Basic/About-Nodes.html",
  "https://design.ros2.org/": "https://docs.ros.org/en/rolling/The-ROS2-Project/Contributing/Developer-Guide.html",
  "https://www.hivemq.com/blog/mqtt-vs-http/": "https://mqtt.org/faq/",
  "https://learn.microsoft.com/en-us/azure/architecture/guide/iot/iot-edge-solution-architecture": "https://learn.microsoft.com/en-us/azure/iot-edge/about-iot-edge",
  "https://docs.unity3d.com/Manual/UNet.html": null,
};

const FILES = [
  "longtail-resources-c1.mjs",
  "longtail-resources-c2.mjs",
  "longtail-resources-c3.mjs",
  "longtail-resources-c4.mjs",
];

let replaced = 0;
let dropped = 0;
for (const f of FILES) {
  const lines = fs.readFileSync(f, "utf8").split("\n");
  const out = [];
  for (const line of lines) {
    const m = line.match(/url:\s*"([^"]+)"/);
    if (m && Object.prototype.hasOwnProperty.call(REPLACE, m[1])) {
      const next = REPLACE[m[1]];
      if (next === null) {
        dropped++;
        continue; // drop the whole entry line
      }
      out.push(line.replace(`"${m[1]}"`, `"${next}"`));
      replaced++;
      continue;
    }
    out.push(line);
  }
  fs.writeFileSync(f, out.join("\n"));
}
console.log(`replaced ${replaced} urls · dropped ${dropped} dead entries`);
