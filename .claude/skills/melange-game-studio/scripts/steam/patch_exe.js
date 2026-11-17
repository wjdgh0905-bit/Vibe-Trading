// Windows exe에 아이콘·버전 정보 넣기 (wine 없이 resedit로)
// 사용: node patch_exe.js <exe> <ico> <version> <name>
'use strict';
const fs = require('fs');
const ResEdit = require('resedit');
const PE = require('pe-library');
const [exe, ico, ver, name = 'Game'] = process.argv.slice(2);
const exeData = PE.NtExecutable.from(fs.readFileSync(exe), { ignoreCert: true });
const res = PE.NtExecutableResource.from(exeData);
const iconFile = ResEdit.Data.IconFile.from(fs.readFileSync(ico));
const groups = ResEdit.Resource.IconGroupEntry.fromEntries(res.entries);
const gid = groups.length ? groups[0].id : 1, lang = groups.length ? groups[0].lang : 1033;
ResEdit.Resource.IconGroupEntry.replaceIconsForResource(res.entries, gid, lang, iconFile.icons.map(i => i.data));
const vi = ResEdit.Resource.VersionInfo.fromEntries(res.entries)[0];
const [a, b, c] = ver.split('.').map(Number);
vi.setFileVersion(a, b, c, 0, 1033); vi.setProductVersion(a, b, c, 0, 1033);
vi.setStringValues({ lang: 1033, codepage: 1200 }, {
  FileDescription: name, ProductName: name, CompanyName: 'melange lab',
  OriginalFilename: name + '.exe', InternalName: name, LegalCopyright: '(c) melange lab',
  FileVersion: ver, ProductVersion: ver
});
vi.outputToResourceEntries(res.entries);
res.outputResource(exeData);
fs.writeFileSync(exe, Buffer.from(exeData.generate()));
console.log('patched', exe);
