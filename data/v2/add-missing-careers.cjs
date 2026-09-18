const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/v2/source/careers-v2.json', 'utf8'));

// Careers to add for sparse domains
const NEW_CAREERS = [
  // Chemical & Process (need +4)
  { slug: 'process-engineer', title: 'Process Engineer', domain: 'Chemical & Process', category: 'non-it', icon: '🧪', color: '#7C3AED', difficulty: 'Intermediate', duration: '10-14 months', description: 'Design, optimize and manage chemical and physical processes in manufacturing plants.', tagline: 'Optimize industrial processes.', prerequisites: ['Chemical Engineering fundamentals'], tools: ['Aspen Plus', 'MATLAB', 'AutoCAD'], sections: [] },
  { slug: 'process-safety-engineer', title: 'Process Safety Engineer', domain: 'Chemical & Process', category: 'non-it', icon: '⚠️', color: '#EF4444', difficulty: 'Advanced', duration: '12-18 months', description: 'Ensure safety of chemical processes through hazard analysis, risk assessment and safety systems.', tagline: 'Keep industrial processes safe.', prerequisites: ['Process Engineering', 'Safety fundamentals'], tools: ['HAZOP Software', 'PHA-Pro', 'Canary'], sections: [] },
  { slug: 'petrochemical-engineer', title: 'Petrochemical Engineer', domain: 'Chemical & Process', category: 'non-it', icon: '🛢️', color: '#92400E', difficulty: 'Intermediate', duration: '10-14 months', description: 'Design and operate processes for converting petroleum and natural gas into useful products.', tagline: 'Turn raw materials into products.', prerequisites: ['Chemical Engineering'], tools: ['HYSYS', 'UniSim', 'Pro/II'], sections: [] },
  { slug: 'bioprocess-engineer', title: 'Bioprocess Engineer', domain: 'Chemical & Process', category: 'non-it', icon: '🧬', color: '#059669', difficulty: 'Intermediate', duration: '10-14 months', description: 'Design and scale biotechnological processes for pharmaceutical, food and biofuel production.', tagline: 'Scale biological processes.', prerequisites: ['Biology', 'Chemical Engineering'], tools: ['SuperPro Designer', 'BioSolve', 'MATLAB'], sections: [] },

  // Aerospace & Aviation (need +4)
  { slug: 'aerodynamics-engineer', title: 'Aerodynamics Engineer', domain: 'Aerospace & Aviation', category: 'non-it', icon: '✈️', color: '#2563EB', difficulty: 'Advanced', duration: '12-18 months', description: 'Analyze and optimize airflow around aircraft, spacecraft and vehicles for performance.', tagline: 'Shape how things fly.', prerequisites: ['Fluid Mechanics', 'Physics'], tools: ['ANSYS Fluent', 'OpenFOAM', 'XFOIL'], sections: [] },
  { slug: 'propulsion-engineer', title: 'Propulsion Engineer', domain: 'Aerospace & Aviation', category: 'non-it', icon: '🚀', color: '#DC2626', difficulty: 'Advanced', duration: '12-18 months', description: 'Design and test jet engines, rocket motors and electric propulsion systems.', tagline: 'Power the vehicles of tomorrow.', prerequisites: ['Thermodynamics', 'Fluid Mechanics'], tools: ['NPSS', 'GasTurb', 'CFD Tools'], sections: [] },
  { slug: 'avionics-engineer', title: 'Avionics Engineer', domain: 'Aerospace & Aviation', category: 'non-it', icon: '📡', color: '#7C3AED', difficulty: 'Advanced', duration: '12-18 months', description: 'Design electronic systems for aircraft including navigation, communication and flight controls.', tagline: 'The electronics of flight.', prerequisites: ['Electronics', 'Control Systems'], tools: ['MATLAB/Simulink', 'LabVIEW', 'Altium'], sections: [] },
  { slug: 'aircraft-design-engineer', title: 'Aircraft Design Engineer', domain: 'Aerospace & Aviation', category: 'non-it', icon: '🛩️', color: '#0891B2', difficulty: 'Advanced', duration: '12-18 months', description: 'Design aircraft structures, systems and configurations from concept to production.', tagline: 'Design the aircraft of tomorrow.', prerequisites: ['Aerospace Engineering', 'CAD'], tools: ['CATIA', 'NX', 'VORPIC'], sections: [] },

  // Industrial & Systems (need +4)
  { slug: 'quality-engineer', title: 'Quality Engineer', domain: 'Industrial & Systems', category: 'non-it', icon: '✅', color: '#16A34A', difficulty: 'Intermediate', duration: '8-12 months', description: 'Ensure products and processes meet quality standards through testing, auditing and improvement.', tagline: 'Deliver zero-defect products.', prerequisites: ['Statistics', 'Manufacturing basics'], tools: ['Minitab', 'SPC Software', 'SAP QM'], sections: [] },
  { slug: 'supply-chain-engineer', title: 'Supply Chain Engineer', domain: 'Industrial & Systems', category: 'non-it', icon: '📦', color: '#F59E0B', difficulty: 'Intermediate', duration: '8-12 months', description: 'Optimize the flow of goods from raw materials to customers through logistics and planning.', tagline: 'Keep the supply chain moving.', prerequisites: ['Operations Research', 'Logistics'], tools: ['SAP SCM', 'Oracle SCM', 'Tableau'], sections: [] },
  { slug: 'operations-research-analyst', title: 'Operations Research Analyst', domain: 'Industrial & Systems', category: 'non-it', icon: '📊', color: '#6366F1', difficulty: 'Advanced', duration: '10-14 months', description: 'Use mathematical modeling and optimization to solve complex operational problems.', tagline: 'Optimize with math.', prerequisites: ['Mathematics', 'Statistics', 'Programming'], tools: ['MATLAB', 'Python', 'CPLEX', 'Gurobi'], sections: [] },
  { slug: 'reliability-engineer', title: 'Reliability Engineer', domain: 'Industrial & Systems', category: 'non-it', icon: '🔧', color: '#EA580C', difficulty: 'Intermediate', duration: '8-12 months', description: 'Ensure products and systems perform reliably throughout their intended lifespan.', tagline: 'Make things that last.', prerequisites: ['Statistics', 'Failure Analysis'], tools: ['Weibull++', 'ReliaSoft', 'Minitab'], sections: [] },

  // Materials & Metallurgy (need +4)
  { slug: 'metallurgical-engineer', title: 'Metallurgical Engineer', domain: 'Materials & Metallurgy', category: 'non-it', icon: '🔬', color: '#64748B', difficulty: 'Intermediate', duration: '10-14 months', description: 'Study and process metals to improve their properties for engineering applications.', tagline: 'Transform metals at the atomic level.', prerequisites: ['Chemistry', 'Physics'], tools: ['SEM', 'XRD', 'JMatPro'], sections: [] },
  { slug: 'materials-scientist', title: 'Materials Scientist', domain: 'Materials & Metallurgy', category: 'non-it', icon: '🧪', color: '#8B5CF6', difficulty: 'Advanced', duration: '12-18 months', description: 'Research and develop new materials with specific properties for engineering applications.', tagline: 'Create the materials of the future.', prerequisites: ['Chemistry', 'Physics', 'Materials Science'], tools: ['MATLAB', 'COMSOL', 'DFT Software'], sections: [] },
  { slug: 'corrosion-engineer', title: 'Corrosion Engineer', domain: 'Materials & Metallurgy', category: 'non-it', icon: '🛡️', color: '#059669', difficulty: 'Intermediate', duration: '8-12 months', description: 'Prevent and manage material degradation through coatings, cathodic protection and material selection.', tagline: 'Fight material degradation.', prerequisites: ['Materials Science', 'Chemistry'], tools: ['Corrosion Modeling Software', 'Electrochemistry Equipment'], sections: [] },
  { slug: 'polymer-engineer', title: 'Polymer Engineer', domain: 'Materials & Metallurgy', category: 'non-it', icon: '🔗', color: '#EC4899', difficulty: 'Intermediate', duration: '10-14 months', description: 'Develop and process polymer materials for automotive, medical and consumer products.', tagline: 'Engineer plastic materials.', prerequisites: ['Chemistry', 'Materials Science'], tools: ['Polymer Simulation Software', 'Rheometer', 'DSC'], sections: [] },

  // Biomedical & Bioengineering (need +4)
  { slug: 'medical-device-engineer', title: 'Medical Device Engineer', domain: 'Biomedical & Bioengineering', category: 'non-it', icon: '🏥', color: '#DC2626', difficulty: 'Intermediate', duration: '10-14 months', description: 'Design and develop medical devices from concept through regulatory approval to production.', tagline: 'Build life-saving devices.', prerequisites: ['Biomedical Engineering', 'Regulatory Knowledge'], tools: ['SolidWorks', 'MATLAB', 'CAD'], sections: [] },
  { slug: 'clinical-engineer', title: 'Clinical Engineer', domain: 'Biomedical & Bioengineering', category: 'non-it', icon: '💊', color: '#2563EB', difficulty: 'Intermediate', duration: '8-12 months', description: 'Manage and maintain medical equipment in hospitals and healthcare facilities.', tagline: 'Keep medical equipment running.', prerequisites: ['Biomedical Engineering', 'Electronics'], tools: ['Equipment Management Software', 'Test Equipment'], sections: [] },
  { slug: 'biomaterials-engineer', title: 'Biomaterials Engineer', domain: 'Biomedical & Bioengineering', category: 'non-it', icon: '🧬', color: '#7C3AED', difficulty: 'Advanced', duration: '12-18 months', description: 'Develop biocompatible materials for implants, tissue engineering and drug delivery.', tagline: 'Materials that work with the body.', prerequisites: ['Materials Science', 'Biology'], tools: ['COMSOL', 'Material Testing Equipment', 'Cell Culture'], sections: [] },
  { slug: 'medical-imaging-engineer', title: 'Medical Imaging Engineer', domain: 'Biomedical & Bioengineering', category: 'non-it', icon: '📷', color: '#0891B2', difficulty: 'Advanced', duration: '12-18 months', description: 'Develop and maintain medical imaging systems including MRI, CT, ultrasound and X-ray.', tagline: 'See inside the human body.', prerequisites: ['Physics', 'Electronics', 'Signal Processing'], tools: ['MATLAB', 'Image Processing Tools', 'DICOM Software'], sections: [] },

  // Agricultural & Biological (need +4)
  { slug: 'irrigation-engineer', title: 'Irrigation Engineer', domain: 'Agricultural & Biological', category: 'non-it', icon: '💧', color: '#2563EB', difficulty: 'Intermediate', duration: '8-12 months', description: 'Design and manage irrigation systems for efficient water use in agriculture.', tagline: 'Deliver water where it\'s needed.', prerequisites: ['Hydraulics', 'Agriculture basics'], tools: ['AutoCAD', 'EPANET', 'Irrigation Design Software'], sections: [] },
  { slug: 'precision-agriculture-specialist', title: 'Precision Agriculture Specialist', domain: 'Agricultural & Biological', category: 'non-it', icon: '🌾', color: '#16A34A', difficulty: 'Intermediate', duration: '8-12 months', description: 'Use GPS, sensors and data analytics to optimize farming operations.', tagline: 'Farm smarter with technology.', prerequisites: ['Agriculture', 'Data Analysis', 'GPS/GIS'], tools: ['GPS Systems', 'Drone Software', 'Farm Management Software'], sections: [] },
  { slug: 'food-process-engineer', title: 'Food Process Engineer', domain: 'Agricultural & Biological', category: 'non-it', icon: '🍎', color: '#EA580C', difficulty: 'Intermediate', duration: '8-12 months', description: 'Design and optimize food processing operations from raw materials to finished products.', tagline: 'Process food safely and efficiently.', prerequisites: ['Food Science', 'Chemical Engineering'], tools: ['Food Processing Software', 'HACCP Tools', 'MATLAB'], sections: [] },
  { slug: 'biosystems-engineer', title: 'Biosystems Engineer', domain: 'Agricultural & Biological', category: 'non-it', icon: '🌱', color: '#059669', difficulty: 'Intermediate', duration: '10-14 months', description: 'Apply engineering principles to biological systems including agriculture, environment and biotechnology.', tagline: 'Engineer biological solutions.', prerequisites: ['Biology', 'Engineering fundamentals'], tools: ['MATLAB', 'Simulation Software', 'Lab Equipment'], sections: [] },

  // Environmental & Energy (need +1)
  { slug: 'sustainability-engineer', title: 'Sustainability Engineer', domain: 'Environmental & Energy', category: 'non-it', icon: '♻️', color: '#16A34A', difficulty: 'Intermediate', duration: '8-12 months', description: 'Design and implement sustainable solutions to reduce environmental impact.', tagline: 'Build a sustainable future.', prerequisites: ['Environmental Science', 'Engineering'], tools: ['LCA Software', 'Energy Modeling', 'CAD'], sections: [] },
];

// Add new careers
let added = 0;
const existingSlugs = new Set(data.careers.map(c => c.slug));
for (const career of NEW_CAREERS) {
  if (existingSlugs.has(career.slug)) {
    console.log('SKIP: ' + career.title + ' (already exists)');
    continue;
  }
  data.careers.push(career);
  added++;
  console.log('ADDED: ' + career.title + ' → ' + career.domain);
}

// Write back
fs.writeFileSync('data/v2/source/careers-v2.json', JSON.stringify(data, null, 2));
console.log('\nAdded ' + added + ' careers. Total: ' + data.careers.length);

// Final distribution
const domains = {};
data.careers.forEach(c => {
  const d = c.domain || 'none';
  if (!domains[d]) domains[d] = [];
  domains[d].push(c.title);
});

console.log('\n=== Final Domain Distribution ===');
Object.entries(domains).sort((a,b) => b[1].length - a[1].length).forEach(([d, items]) => {
  const status = items.length < 5 ? '❌' : '✅';
  console.log(status + ' ' + d + ': ' + items.length + ' careers');
});
