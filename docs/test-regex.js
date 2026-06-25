const str = `
# Notes

### testnote
this is a test

#### another note
this is another

## section

### final
hello
`;

const regex = /^###\s+([^\n]+)\n([\s\S]*?)(?=\n#+\s|$)/gm;
let match;
while ((match = regex.exec(str)) !== null) {
  console.log('NAME:', match[1]);
  console.log('CONTENT:', match[2].trim());
}
