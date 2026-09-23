// Long-tail resource library — Part C3 (FPGA, hardware validation, Flask, FastAPI)
// Keys: "roadmapSlug::topicSlug" when a label repeats across roadmaps, else the bare slug.

const FPGA_VENDOR = [
  { title: "Vivado Design Suite — AMD product page", url: "https://www.amd.com/en/products/software/adaptive-socs-and-fpgas/vivado.html", type: "official-doc", qualityScore: 4 },
  { title: "FPGA — Wikipedia overview", url: "https://en.wikipedia.org/wiki/Field-programmable_gate_array", type: "reference", qualityScore: 4 },
];

export const LONGTAIL_C3 = {
  // ── fpga-engineer + fpga-design (same 14 labels) ─────────────────────────
  "fpga-engineer::xilinx-vivado": FPGA_VENDOR,
  "fpga-design::xilinx-vivado": FPGA_VENDOR,
  "fpga-engineer::vivado-ide-project-flow": [
    { title: "Vivado IDE — user guide (UG893)", url: "https://docs.amd.com/r/en-US/ug893-vivado-ide", type: "official-doc", qualityScore: 4 },
    { title: "Vivado design flows overview (UG892)", url: "https://docs.amd.com/r/en-US/ug892-vivado-design-flows-overview", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-design::vivado-ide-project-flow": [
    { title: "Vivado IDE — user guide (UG893)", url: "https://docs.amd.com/r/en-US/ug893-vivado-ide", type: "official-doc", qualityScore: 4 },
    { title: "Vivado design flows overview (UG892)", url: "https://docs.amd.com/r/en-US/ug892-vivado-design-flows-overview", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-engineer::simulation-synthesis": [
    { title: "Vivado logic simulation (UG900)", url: "https://docs.amd.com/r/en-US/ug900-vivado-logic-simulation", type: "official-doc", qualityScore: 4 },
    { title: "Vivado synthesis (UG901)", url: "https://docs.amd.com/r/en-US/ug901-vivado-synthesis", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-design::simulation-synthesis": [
    { title: "Vivado logic simulation (UG900)", url: "https://docs.amd.com/r/en-US/ug900-vivado-logic-simulation", type: "official-doc", qualityScore: 4 },
    { title: "Vivado synthesis (UG901)", url: "https://docs.amd.com/r/en-US/ug901-vivado-synthesis", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-engineer::implementation-bitstream": [
    { title: "Vivado implementation (UG904)", url: "https://docs.amd.com/r/en-US/ug904-vivado-implementation", type: "official-doc", qualityScore: 4 },
    { title: "Vivado programming and debugging (UG908)", url: "https://docs.amd.com/r/en-US/ug908-vivado-programming-debugging", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-design::implementation-bitstream": [
    { title: "Vivado implementation (UG904)", url: "https://docs.amd.com/r/en-US/ug904-vivado-implementation", type: "official-doc", qualityScore: 4 },
    { title: "Vivado programming and debugging (UG908)", url: "https://docs.amd.com/r/en-US/ug908-vivado-programming-debugging", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-engineer::intel-quartus": [
    { title: "Quartus Prime — Intel FPGA development tools", url: "https://www.intel.com/content/www/us/en/products/details/fpga/development-tools/quartus-prime.html", type: "official-doc", qualityScore: 4 },
    { title: "Intel Quartus Prime Standard edition user guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/introduction.html", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-design::intel-quartus": [
    { title: "Quartus Prime — Intel FPGA development tools", url: "https://www.intel.com/content/www/us/en/products/details/fpga/development-tools/quartus-prime.html", type: "official-doc", qualityScore: 4 },
    { title: "Intel Quartus Prime Standard edition user guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/introduction.html", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-engineer::quartus-prime-ide": [
    { title: "Quartus Prime — getting started", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/getting-started.html", type: "official-doc", qualityScore: 4 },
    { title: "Intel FPGA design flow overview", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/design-flow.html", type: "official-doc", qualityScore: 3 },
  ],
  "fpga-design::quartus-prime-ide": [
    { title: "Quartus Prime — getting started", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/getting-started.html", type: "official-doc", qualityScore: 4 },
    { title: "Intel FPGA design flow overview", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/design-flow.html", type: "official-doc", qualityScore: 3 },
  ],
  "fpga-engineer::analysis-synthesis": [
    { title: "Analysis & synthesis — Quartus Prime user guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/analysis-synthesis.html", type: "official-doc", qualityScore: 4 },
    { title: "Vivado synthesis (UG901)", url: "https://docs.amd.com/r/en-US/ug901-vivado-synthesis", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-design::analysis-synthesis": [
    { title: "Analysis & synthesis — Quartus Prime user guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/analysis-synthesis.html", type: "official-doc", qualityScore: 4 },
    { title: "Vivado synthesis (UG901)", url: "https://docs.amd.com/r/en-US/ug901-vivado-synthesis", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-engineer::place-route": [
    { title: "Fitter (place & route) — Quartus Prime guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/fitter-place-and-route.html", type: "official-doc", qualityScore: 4 },
    { title: "Vivado implementation (UG904)", url: "https://docs.amd.com/r/en-US/ug904-vivado-implementation", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-design::place-route": [
    { title: "Fitter (place & route) — Quartus Prime guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/fitter-place-and-route.html", type: "official-doc", qualityScore: 4 },
    { title: "Vivado implementation (UG904)", url: "https://docs.amd.com/r/en-US/ug904-vivado-implementation", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-engineer::in-system-debugging-signaltap": [
    { title: "System debugging (SignalTap) — Intel guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/system-debugging.html", type: "official-doc", qualityScore: 4 },
    { title: "Vivado programming and debugging (UG908)", url: "https://docs.amd.com/r/en-US/ug908-vivado-programming-debugging", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-design::in-system-debugging-signaltap": [
    { title: "System debugging (SignalTap) — Intel guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/system-debugging.html", type: "official-doc", qualityScore: 4 },
    { title: "Vivado programming and debugging (UG908)", url: "https://docs.amd.com/r/en-US/ug908-vivado-programming-debugging", type: "official-doc", qualityScore: 4 },
  ],
  "fpga-engineer::clb-lut-structure": [
    { title: "7 Series FPGAs configurable logic block (UG474)", url: "https://docs.amd.com/v/u/en-US/ug474_7Series_CLB", type: "official-doc", qualityScore: 5 },
    { title: "Lookup table — FPGA internals", url: "https://en.wikipedia.org/wiki/Lookup_table", type: "reference", qualityScore: 3 },
  ],
  "fpga-design::clb-lut-structure": [
    { title: "7 Series FPGAs configurable logic block (UG474)", url: "https://docs.amd.com/v/u/en-US/ug474_7Series_CLB", type: "official-doc", qualityScore: 5 },
    { title: "Lookup table — FPGA internals", url: "https://en.wikipedia.org/wiki/Lookup_table", type: "reference", qualityScore: 3 },
  ],
  "fpga-engineer::bram-dsp-blocks": [
    { title: "7 Series memory resources (UG473)", url: "https://docs.amd.com/v/u/en-US/ug473_7Series_Memory_Resources", type: "official-doc", qualityScore: 5 },
    { title: "7 Series DSP48E1 slice (UG479)", url: "https://docs.amd.com/v/u/en-US/ug479_7Series_DSP48E1", type: "official-doc", qualityScore: 5 },
  ],
  "fpga-design::bram-dsp-blocks": [
    { title: "7 Series memory resources (UG473)", url: "https://docs.amd.com/v/u/en-US/ug473_7Series_Memory_Resources", type: "official-doc", qualityScore: 5 },
    { title: "7 Series DSP48E1 slice (UG479)", url: "https://docs.amd.com/v/u/en-US/ug479_7Series_DSP48E1", type: "official-doc", qualityScore: 5 },
  ],
  "fpga-engineer::io-blocks": [
    { title: "7 Series SelectIO resources (UG471)", url: "https://docs.amd.com/v/u/en-US/ug471_7Series_SelectIO", type: "official-doc", qualityScore: 5 },
    { title: "I/O standards — Intel FPGA guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/i-o-standards.html", type: "official-doc", qualityScore: 3 },
  ],
  "fpga-design::io-blocks": [
    { title: "7 Series SelectIO resources (UG471)", url: "https://docs.amd.com/v/u/en-US/ug471_7Series_SelectIO", type: "official-doc", qualityScore: 5 },
    { title: "I/O standards — Intel FPGA guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/i-o-standards.html", type: "official-doc", qualityScore: 3 },
  ],
  "fpga-engineer::routing-architecture": [
    { title: "7 Series clocking resources (UG472)", url: "https://docs.amd.com/v/u/en-US/ug472_7Series_Clocking", type: "official-doc", qualityScore: 4 },
    { title: "Vivado design flows overview (UG892)", url: "https://docs.amd.com/r/en-US/ug892-vivado-design-flows-overview", type: "official-doc", qualityScore: 3 },
  ],
  "fpga-design::routing-architecture": [
    { title: "7 Series clocking resources (UG472)", url: "https://docs.amd.com/v/u/en-US/ug472_7Series_Clocking", type: "official-doc", qualityScore: 4 },
    { title: "Vivado design flows overview (UG892)", url: "https://docs.amd.com/r/en-US/ug892-vivado-design-flows-overview", type: "official-doc", qualityScore: 3 },
  ],
  "fpga-engineer::power-domains": [
    { title: "Xilinx Power Estimator user guide (UG440)", url: "https://docs.amd.com/r/en-US/ug440-xilinx-power-estimator", type: "official-doc", qualityScore: 4 },
    { title: "Power analysis — Intel FPGA guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/power-analysis.html", type: "official-doc", qualityScore: 3 },
  ],
  "fpga-design::power-domains": [
    { title: "Xilinx Power Estimator user guide (UG440)", url: "https://docs.amd.com/r/en-US/ug440-xilinx-power-estimator", type: "official-doc", qualityScore: 4 },
    { title: "Power analysis — Intel FPGA guide", url: "https://www.intel.com/content/www/us/en/docs/programmable/683082/current/power-analysis.html", type: "official-doc", qualityScore: 3 },
  ],

  // ── hardware-validation-engineer ─────────────────────────────────────────
  "rtl-to-fpga": [
    { title: "Vivado design flows overview (UG892)", url: "https://docs.amd.com/r/en-US/ug892-vivado-design-flows-overview", type: "official-doc", qualityScore: 4 },
    { title: "Register-transfer level — Wikipedia", url: "https://en.wikipedia.org/wiki/Register-transfer_level", type: "reference", qualityScore: 3 },
  ],
  "speed-conversion": [
    { title: "Static timing analysis — Wikipedia", url: "https://en.wikipedia.org/wiki/Static_timing_analysis", type: "reference", qualityScore: 3 },
    { title: "Vivado using constraints (UG903)", url: "https://docs.amd.com/r/en-US/ug903-vivado-using-constraints", type: "official-doc", qualityScore: 4 },
  ],
  "debug-in-prototyping": [
    { title: "FPGA prototyping — Wikipedia", url: "https://en.wikipedia.org/wiki/FPGA_prototyping", type: "reference", qualityScore: 3 },
    { title: "Vivado programming and debugging (UG908)", url: "https://docs.amd.com/r/en-US/ug908-vivado-programming-debugging", type: "official-doc", qualityScore: 4 },
  ],
  "validation-on-fpga": [
    { title: "Vivado programming and debugging (UG908)", url: "https://docs.amd.com/r/en-US/ug908-vivado-programming-debugging", type: "official-doc", qualityScore: 4 },
    { title: "Hardware emulation — Wikipedia", url: "https://en.wikipedia.org/wiki/Hardware_emulation", type: "reference", qualityScore: 3 },
  ],
  "fpga-validation-platform": [
    { title: "FPGA prototyping — Wikipedia", url: "https://en.wikipedia.org/wiki/FPGA_prototyping", type: "reference", qualityScore: 3 },
    { title: "Vivado design flows overview (UG892)", url: "https://docs.amd.com/r/en-US/ug892-vivado-design-flows-overview", type: "official-doc", qualityScore: 3 },
  ],

  // ── python / javascript: REST APIs ───────────────────────────────────────
  "python::rest-apis": [
    { title: "FastAPI tutorial — user guide", url: "https://fastapi.tiangolo.com/tutorial/", type: "official-doc", qualityScore: 5 },
    { title: "Requests — quickstart", url: "https://requests.readthedocs.io/en/latest/user/quickstart/", type: "official-doc", qualityScore: 4 },
  ],
  "javascript::rest-apis": [
    { title: "Using Fetch — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", type: "official-doc", qualityScore: 5 },
    { title: "Express routing — official guide", url: "https://expressjs.com/en/guide/routing.html", type: "official-doc", qualityScore: 4 },
  ],

  // ── flask ────────────────────────────────────────────────────────────────
  "app-setup-configuration": [
    { title: "Quickstart — Flask docs", url: "https://flask.palletsprojects.com/en/stable/quickstart/", type: "official-doc", qualityScore: 5 },
    { title: "Configuration handling — Flask docs", url: "https://flask.palletsprojects.com/en/stable/config/", type: "official-doc", qualityScore: 4 },
  ],
  "templates-jinja2": [
    { title: "Templates — Flask docs", url: "https://flask.palletsprojects.com/en/stable/templating/", type: "official-doc", qualityScore: 5 },
    { title: "Jinja template designer documentation", url: "https://jinja.palletsprojects.com/en/stable/templates/", type: "official-doc", qualityScore: 5 },
  ],
  "static-files": [
    { title: "Static files — Flask quickstart", url: "https://flask.palletsprojects.com/en/stable/quickstart/#static-files", type: "official-doc", qualityScore: 4 },
    { title: "Managing static files — Flask patterns", url: "https://flask.palletsprojects.com/en/stable/patterns/", type: "official-doc", qualityScore: 3 },
  ],
  "request-response-objects": [
    { title: "Request object — Flask API", url: "https://flask.palletsprojects.com/en/stable/api/#flask.Request", type: "reference", qualityScore: 5 },
    { title: "Response object — Flask API", url: "https://flask.palletsprojects.com/en/stable/api/#flask.Response", type: "reference", qualityScore: 4 },
  ],
  "wtforms-integration": [
    { title: "Flask-WTF — documentation", url: "https://flask-wtf.readthedocs.io/en/1.2.x/", type: "official-doc", qualityScore: 5 },
    { title: "WTForms — field documentation", url: "https://wtforms.readthedocs.io/en/stable/fields/", type: "official-doc", qualityScore: 4 },
  ],
  "form-validation": [
    { title: "Form validation — Flask-WTF docs", url: "https://flask-wtf.readthedocs.io/en/1.2.x/form/", type: "official-doc", qualityScore: 5 },
    { title: "Validators — WTForms docs", url: "https://wtforms.readthedocs.io/en/stable/validators/", type: "official-doc", qualityScore: 4 },
  ],
  "csrf-protection": [
    { title: "CSRF protection — Flask-WTF docs", url: "https://flask-wtf.readthedocs.io/en/1.2.x/csrf/", type: "official-doc", qualityScore: 5 },
    { title: "Cross-Site Request Forgery — OWASP cheat sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html", type: "official-doc", qualityScore: 4 },
  ],
  "flask-sqlalchemy": [
    { title: "Flask-SQLAlchemy — quickstart", url: "https://flask-sqlalchemy.palletsprojects.com/en/stable/quickstart/", type: "official-doc", qualityScore: 5 },
    { title: "Flask-SQLAlchemy — models", url: "https://flask-sqlalchemy.palletsprojects.com/en/stable/models/", type: "official-doc", qualityScore: 4 },
  ],
  "database-migrations-flask-migrate": [
    { title: "Flask-Migrate — documentation", url: "https://flask-migrate.readthedocs.io/en/latest/", type: "official-doc", qualityScore: 5 },
    { title: "Alembic tutorial", url: "https://alembic.sqlalchemy.org/en/latest/tutorial.html", type: "official-doc", qualityScore: 4 },
  ],
  "flask-login": [
    { title: "Flask-Login — documentation", url: "https://flask-login.readthedocs.io/en/latest/", type: "official-doc", qualityScore: 5 },
    { title: "How it works — Flask-Login", url: "https://flask-login.readthedocs.io/en/latest/#how-it-works", type: "official-doc", qualityScore: 4 },
  ],
  "password-hashing-werkzeug": [
    { title: "Password hashing — Werkzeug security utils", url: "https://werkzeug.palletsprojects.com/en/stable/utils/#module-werkzeug.security", type: "official-doc", qualityScore: 5 },
    { title: "Password storage — OWASP cheat sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html", type: "official-doc", qualityScore: 4 },
  ],
  "flask-wtf": [
    { title: "Flask-WTF — quickstart", url: "https://flask-wtf.readthedocs.io/en/1.2.x/quickstart/", type: "official-doc", qualityScore: 4 },
    { title: "Flask-WTF — documentation home", url: "https://flask-wtf.readthedocs.io/en/1.2.x/", type: "official-doc", qualityScore: 3 },
  ],
  "environment-variables": [
    { title: "Configuration — Flask docs", url: "https://flask.palletsprojects.com/en/stable/config/", type: "official-doc", qualityScore: 5 },
    { title: "CLI & environment variables — Flask docs", url: "https://flask.palletsprojects.com/en/stable/cli/", type: "official-doc", qualityScore: 4 },
  ],
  "blueprints": [
    { title: "Blueprints — Flask docs", url: "https://flask.palletsprojects.com/en/stable/blueprints/", type: "official-doc", qualityScore: 5 },
    { title: "Modular applications with blueprints — Flask patterns", url: "https://flask.palletsprojects.com/en/stable/patterns/appfactories/", type: "official-doc", qualityScore: 4 },
  ],
  "celery-integration": [
    { title: "Celery — user guide", url: "https://docs.celeryq.dev/en/stable/userguide/", type: "official-doc", qualityScore: 5 },
    { title: "Celery with Flask — docs", url: "https://flask.palletsprojects.com/en/stable/patterns/celery/", type: "official-doc", qualityScore: 4 },
  ],
  "websocket-with-flask-socketio": [
    { title: "Flask-SocketIO — documentation", url: "https://flask-socketio.readthedocs.io/en/latest/", type: "official-doc", qualityScore: 5 },
    { title: "WebSockets — MDN reference", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API", type: "official-doc", qualityScore: 4 },
  ],
  "blog-with-flask": [
    { title: "Flask tutorial — build a blog app", url: "https://flask.palletsprojects.com/en/stable/tutorial/", type: "official-doc", qualityScore: 5 },
    { title: "Blueprint & views — Flask tutorial", url: "https://flask.palletsprojects.com/en/stable/tutorial/views/", type: "official-doc", qualityScore: 4 },
  ],
  "user-authentication-system": [
    { title: "Flask-Login — protecting views", url: "https://flask-login.readthedocs.io/en/latest/#protecting-views", type: "official-doc", qualityScore: 4 },
    { title: "Authentication — OWASP cheat sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", type: "official-doc", qualityScore: 4 },
  ],
  "task-scheduler": [
    { title: "Periodic tasks — Celery beat", url: "https://docs.celeryq.dev/en/stable/userguide/periodic-tasks.html", type: "official-doc", qualityScore: 5 },
    { title: "Background tasks — FastAPI docs", url: "https://fastapi.tiangolo.com/tutorial/background-tasks/", type: "official-doc", qualityScore: 3 },
  ],

  // ── fastapi ──────────────────────────────────────────────────────────────
  "path-operations": [
    { title: "First steps — FastAPI tutorial", url: "https://fastapi.tiangolo.com/tutorial/first-steps/", type: "official-doc", qualityScore: 5 },
    { title: "Path operation configuration — FastAPI", url: "https://fastapi.tiangolo.com/tutorial/path-operation-configuration/", type: "official-doc", qualityScore: 4 },
  ],
  "request-body-pydantic": [
    { title: "Request body — FastAPI tutorial", url: "https://fastapi.tiangolo.com/tutorial/body/", type: "official-doc", qualityScore: 5 },
    { title: "Pydantic models — concepts", url: "https://docs.pydantic.dev/latest/concepts/models/", type: "official-doc", qualityScore: 4 },
  ],
  "query-parameters": [
    { title: "Query parameters — FastAPI tutorial", url: "https://fastapi.tiangolo.com/tutorial/query-params/", type: "official-doc", qualityScore: 5 },
  ],
  "path-parameters": [
    { title: "Path parameters — FastAPI tutorial", url: "https://fastapi.tiangolo.com/tutorial/path-params/", type: "official-doc", qualityScore: 5 },
  ],
  "background-tasks": [
    { title: "Background tasks — FastAPI tutorial", url: "https://fastapi.tiangolo.com/tutorial/background-tasks/", type: "official-doc", qualityScore: 5 },
  ],
  "cors-middleware": [
    { title: "CORS — FastAPI tutorial", url: "https://fastapi.tiangolo.com/tutorial/cors/", type: "official-doc", qualityScore: 5 },
    { title: "Cross-Origin Resource Sharing — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS", type: "official-doc", qualityScore: 5 },
  ],
  "sqlalchemy-orm": [
    { title: "SQL (relational) databases — FastAPI tutorial", url: "https://fastapi.tiangolo.com/tutorial/sql-databases/", type: "official-doc", qualityScore: 5 },
    { title: "SQLAlchemy ORM — quick start", url: "https://docs.sqlalchemy.org/en/20/orm/quickstart.html", type: "official-doc", qualityScore: 5 },
  ],
  "async-sqlalchemy": [
    { title: "Asyncio extension — SQLAlchemy docs", url: "https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html", type: "official-doc", qualityScore: 5 },
  ],
  "alembic-migrations": [
    { title: "Alembic tutorial — migrations", url: "https://alembic.sqlalchemy.org/en/latest/tutorial.html", type: "official-doc", qualityScore: 5 },
    { title: "Auto-generating migrations — Alembic", url: "https://alembic.sqlalchemy.org/en/latest/autogenerate.html", type: "official-doc", qualityScore: 4 },
  ],
  "pydantic-sqlalchemy": [
    { title: "Pydantic models — FastAPI + SQLAlchemy patterns", url: "https://fastapi.tiangolo.com/tutorial/sql-databases/", type: "official-doc", qualityScore: 4 },
    { title: "Pydantic — model config", url: "https://docs.pydantic.dev/latest/concepts/config/", type: "official-doc", qualityScore: 3 },
  ],
  "oauth2-with-password-flow": [
    { title: "OAuth2 with password and bearer — FastAPI security", url: "https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/", type: "official-doc", qualityScore: 5 },
    { title: "OAuth 2.0 — RFC 6749", url: "https://datatracker.ietf.org/doc/html/rfc6749", type: "official-doc", qualityScore: 4 },
  ],
  "jwt-tokens": [
    { title: "OAuth2 with JWT tokens — FastAPI security", url: "https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/", type: "official-doc", qualityScore: 5 },
    { title: "JWT introduction — jwt.io", url: "https://jwt.io/introduction", type: "article", qualityScore: 4 },
  ],
  "api-key-authentication": [
    { title: "API keys — FastAPI security", url: "https://fastapi.tiangolo.com/tutorial/security/", type: "official-doc", qualityScore: 5 },
    { title: "API key best practices — Google Cloud", url: "https://cloud.google.com/docs/authentication/api-keys", type: "official-doc", qualityScore: 4 },
  ],
  "fastapi::role-based-access": [
    { title: "Get current user — FastAPI security", url: "https://fastapi.tiangolo.com/tutorial/security/get-current-user/", type: "official-doc", qualityScore: 5 },
    { title: "Dependencies with yield — FastAPI", url: "https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/", type: "official-doc", qualityScore: 3 },
  ],
  "https": [
    { title: "HTTPS deployment — FastAPI docs", url: "https://fastapi.tiangolo.com/deployment/https/", type: "official-doc", qualityScore: 5, scope: "parent" },
    { title: "Transport Layer Security — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security", type: "official-doc", qualityScore: 4, scope: "parent" },
  ],
  "real-time-websocket-chat": [
    { title: "WebSockets — FastAPI advanced guide", url: "https://fastapi.tiangolo.com/advanced/websockets/", type: "official-doc", qualityScore: 5 },
    { title: "The WebSocket protocol — RFC 6455", url: "https://datatracker.ietf.org/doc/html/rfc6455", type: "official-doc", qualityScore: 4 },
  ],
  "multi-tenant-api": [
    { title: "Dependencies — FastAPI (per-tenant scoping)", url: "https://fastapi.tiangolo.com/tutorial/dependencies/", type: "official-doc", qualityScore: 4 },
    { title: "Multi-tenant SaaS patterns — Microsoft Azure", url: "https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models", type: "official-doc", qualityScore: 4 },
  ],
};
