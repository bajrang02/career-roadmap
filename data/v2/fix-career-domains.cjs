const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/v2/source/careers-v2.json', 'utf8'));

// Map each career to its correct domain based on title/role
const DOMAIN_MAP = {
  // Software & Computing
  'Software Engineer': 'Software & Computing',
  'Frontend Developer': 'Software & Computing',
  'Backend Developer': 'Software & Computing',
  'Full Stack Developer': 'Software & Computing',
  'Mobile App Developer (Android)': 'Software & Computing',
  'iOS Developer': 'Software & Computing',
  'Cross-Platform Developer': 'Software & Computing',
  'Game Developer': 'Software & Computing',
  'API Developer': 'Software & Computing',
  'Software Testing Engineer': 'Software & Computing',
  'QA Automation Engineer': 'Software & Computing',
  'Platform Engineer': 'Software & Computing',
  'System Engineer': 'Software & Computing',
  'Build & Release Engineer': 'Software & Computing',
  'Technical Writer': 'Software & Computing',
  'Open Source Developer': 'Software & Computing',
  'Developer Advocate': 'Software & Computing',
  'Freelance Software Developer': 'Software & Computing',
  'Low-Code Developer': 'Software & Computing',
  'RPA Developer': 'Software & Computing',
  'Blockchain Developer': 'Software & Computing',
  'Web3 Developer': 'Software & Computing',
  'AR/VR Developer': 'Software & Computing',
  'Product Engineer': 'Software & Computing',
  'Technical Consultant': 'Software & Computing',
  'Technical Support Engineer': 'Software & Computing',
  'Solutions Engineer': 'Software & Computing',
  'Customer Success Engineer': 'Software & Computing',
  'Research Engineer': 'Software & Computing',
  'Digital Twin Engineer': 'Software & Computing',
  'Quantum Computing Researcher': 'Software & Computing',
  
  // AI & Data Science
  'Data Scientist': 'AI & Data Science',
  'Machine Learning Engineer': 'AI & Data Science',
  'AI Engineer': 'AI & Data Science',
  'Data Analyst': 'AI & Data Science',
  'BI Developer': 'AI & Data Science',
  'Analytics Engineer': 'AI & Data Science',
  'Prompt Engineer': 'AI & Data Science',
  'AI Application Developer': 'AI & Data Science',
  'MLOps Engineer': 'AI & Data Science',
  'Edge AI Engineer': 'AI & Data Science',
  'Bioinformatics Engineer': 'AI & Data Science',
  
  // Cybersecurity
  'Cybersecurity Analyst': 'Cybersecurity',
  'Penetration Tester': 'Cybersecurity',
  'SOC Analyst': 'Cybersecurity',
  'Security Analyst': 'Cybersecurity',
  'Ethical Hacker': 'Cybersecurity',
  'Security Engineer': 'Cybersecurity',
  'Cloud Security Engineer': 'Cybersecurity',
  'Application Security Engineer': 'Cybersecurity',
  'Digital Forensics Analyst': 'Cybersecurity',
  'Malware Analyst': 'Cybersecurity',
  'Threat Intelligence Analyst': 'Cybersecurity',
  'GRC Analyst': 'Cybersecurity',
  'Security Consultant': 'Cybersecurity',
  
  // Cloud & DevOps
  'Cloud Engineer': 'Cloud & DevOps',
  'DevOps Engineer': 'Cloud & DevOps',
  'Site Reliability Engineer (SRE)': 'Cloud & DevOps',
  'Infrastructure Engineer': 'Cloud & DevOps',
  'AWS Cloud Engineer': 'Cloud & DevOps',
  'Azure Engineer': 'Cloud & DevOps',
  'GCP Engineer': 'Cloud & DevOps',
  'Kubernetes Engineer': 'Cloud & DevOps',
  'Linux Administrator': 'Cloud & DevOps',
  'Windows Administrator': 'Cloud & DevOps',
  'Network Engineer': 'Cloud & DevOps',
  'Database Administrator': 'Cloud & DevOps',
  'Storage Engineer': 'Cloud & DevOps',
  'Virtualization Engineer': 'Cloud & DevOps',
  'ERP Consultant': 'Cloud & DevOps',
  'SAP Consultant': 'Cloud & DevOps',
  'Salesforce Developer': 'Cloud & DevOps',
  'ServiceNow Developer': 'Cloud & DevOps',
  
  // Electrical & Electronics
  'Electrical Engineer': 'Electrical & Electronics',
  'Control Systems Engineer': 'Electrical & Electronics',
  'FPGA Engineer': 'Electrical & Electronics',
  'VLSI Design Engineer': 'Electrical & Electronics',
  'ASIC Engineer': 'Electrical & Electronics',
  'PCB Design Engineer': 'Electrical & Electronics',
  'Electronics Design Engineer': 'Electrical & Electronics',
  'RF Engineer': 'Electrical & Electronics',
  'Signal Processing Engineer': 'Electrical & Electronics',
  'Telecom Engineer': 'Electrical & Electronics',
  'Hardware Validation Engineer': 'Electrical & Electronics',
  'Power Electronics Engineer': 'Electrical & Electronics',
  'Electrical Design Engineer': 'Electrical & Electronics',
  'Power Systems Engineer': 'Electrical & Electronics',
  'Protection Engineer': 'Electrical & Electronics',
  'Embedded Engineer': 'Electrical & Electronics',
  'Firmware Engineer': 'Electrical & Electronics',
  'IoT Engineer': 'Electrical & Electronics',
  
  // Mechanical Engineering
  'Mechanical Engineer': 'Mechanical Engineering',
  'Mechanical Design Engineer': 'Mechanical Engineering',
  'CAD Engineer': 'Mechanical Engineering',
  'CAE Engineer': 'Mechanical Engineering',
  'Manufacturing Engineer': 'Mechanical Engineering',
  'Production Engineer': 'Mechanical Engineering',
  'Quality Engineer': 'Mechanical Engineering',
  'Maintenance Engineer': 'Mechanical Engineering',
  'HVAC Engineer': 'Mechanical Engineering',
  'Automotive Engineer': 'Mechanical Engineering',
  'Mechatronics Engineer': 'Mechanical Engineering',
  'Robotics Engineer': 'Mechanical Engineering',
  'Automation Engineer': 'Mechanical Engineering',
  
  // Civil & Construction
  'Civil Engineer': 'Civil & Construction',
  'Structural Engineer': 'Civil & Construction',
  'Planning Engineer': 'Civil & Construction',
  'Quantity Surveyor': 'Civil & Construction',
  'Construction Engineer': 'Civil & Construction',
  'Highway Engineer': 'Civil & Construction',
  'Geotechnical Engineer': 'Civil & Construction',
  'Water Resources Engineer': 'Civil & Construction',
  'Site Engineer': 'Civil & Construction',
  'GIS Engineer': 'Civil & Construction',
  
  // Chemical & Process
  'Chemical Engineer': 'Chemical & Process',
  
  // Agricultural & Biological
  'Agricultural Engineer': 'Agricultural & Biological',
  
  // Aerospace & Aviation
  'Aerospace Engineer': 'Aerospace & Aviation',
  
  // Industrial & Systems
  'Industrial Engineer': 'Industrial & Systems',
  
  // Materials & Metallurgy
  'Materials Engineer': 'Materials & Metallurgy',
  
  // Environmental & Energy
  'Environmental Engineer': 'Environmental & Energy',
  'Renewable Energy Engineer': 'Environmental & Energy',
  'Solar Engineer': 'Environmental & Energy',
  'Electrical Maintenance Engineer': 'Environmental & Energy',
  
  // Biomedical & Bioengineering
  'Biomedical Engineer': 'Biomedical & Bioengineering',
};

// Apply domain mapping
let updated = 0;
data.careers.forEach(c => {
  const newDomain = DOMAIN_MAP[c.title];
  if (newDomain && c.domain !== newDomain) {
    c.domain = newDomain;
    updated++;
  }
});

// Write back
fs.writeFileSync('data/v2/source/careers-v2.json', JSON.stringify(data, null, 2));

// Report
console.log(`Updated ${updated} careers`);

// Show final distribution
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
