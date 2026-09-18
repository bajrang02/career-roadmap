import fs from 'fs';

const path = 'source/skills-v2.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const removeSlugs = new Set([
  'test-automation',
  'software-architecture',
  'cloud-architecture',
  'data-visualization',
  'performance-engineering',
]);

const before = data.skills.length;
data.skills = data.skills.filter(s => !removeSlugs.has(s.slug));
const after = data.skills.length;

console.log(`Removed ${before - after} skills (${[...removeSlugs].join(', ')})`);
console.log(`Total skills: ${after}`);

if (after !== 80) {
  console.error(`✗ Expected 80, got ${after}`);
  process.exit(1);
}

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log(`✓ Written ${after} skills to ${path}`);
