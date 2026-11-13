import fs from 'fs';

const content = fs.readFileSync('src/app/ex.tsx', 'utf8');

const matches = [...content.matchAll(/<(section|header|footer|div\s+id="[^"]+")[^>]*>/gi)];
matches.forEach((m, idx) => {
  const line = m[0].replace(/\/\/\s*/g, '').replace(/\s+/g, ' ');
  if (line.includes('section') || line.includes('header') || line.includes('footer') || line.includes('id=')) {
    console.log(`${idx}: ${line.slice(0, 160)}`);
  }
});
