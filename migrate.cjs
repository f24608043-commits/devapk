const fs = require('fs');

function updateFile(src, dest) {
  let s = fs.readFileSync(src, 'utf8');
  s = s.replace(/import \{ createFileRoute \}.*?\n/g, '');
  s = s.replace(/export const Route = createFileRoute[\s\S]*?\}\);\n/s, '');
  s = 'import React, { useState } from "react";\nimport { MainLayout } from "@/layouts/MainLayout";\n' + s;
  s = s.replace('return (\n    <div className="bg-white', 'return (\n    <MainLayout>\n    <div className="bg-white');
  s = s.replace('</style>\n    </div>\n  );\n}', '</style>\n    </div>\n    </MainLayout>\n  );\n}');
  fs.writeFileSync(dest, s);
}

updateFile(
  'c:/Users/Abu Bakar/Documents/NDMC-Complete-main/src/routes/services.tsx',
  'c:/Users/Abu Bakar/Documents/dental 222222/src/pages/Services.tsx'
);

updateFile(
  'c:/Users/Abu Bakar/Documents/NDMC-Complete-main/src/routes/education.tsx',
  'c:/Users/Abu Bakar/Documents/dental 222222/src/pages/Education.tsx'
);

console.log("Done");
