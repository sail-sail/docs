const SSH2Promise = require("ssh2-promise");
const fs = require("node:fs/promises");
const { randomUUID } = require("node:crypto");
const publish_cnf = require(`${ __dirname }/publish_cnf.js`);

const projectName = "docs";
const publishBase = publish_cnf[projectName].publishBase;

const sshConfig = {
  host: publish_cnf[projectName].host,
  username: publish_cnf[projectName].username,
  password: publish_cnf[projectName].password,
};

console.log({ ...sshConfig, password: "" });

const buildPath = `${ __dirname }/../../.vitepress/dist/`;
const publishPath = `${ publishBase }/${ projectName }/`;
const uuid = randomUUID();
const publishPathTmp = `${ publishBase }/${ projectName }_tmp_${ uuid }/`;

if (publishBase === "/") {
  console.error("publishBase is /");
  process.exit();
}
if (publishBase !== "/data/") {
  console.error("publishBase is not /data/");
  process.exit();
}
if (projectName !== "docs") {
  console.error("projectName is not docs");
  process.exit();
}

console.log(publishPath);

(async function() {
  const ssh = new SSH2Promise(sshConfig);
  await ssh.connect();
  const sftp = ssh.sftp();
  
  let data;
  
  try {
    const cmd = `mkdir ${ publishPathTmp }`;
    console.log(cmd);
    data = await ssh.exec(cmd);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
  
  const treeDir = async function(dir) {
    const files = await fs.readdir(`${ buildPath }/${ dir }`);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const stats = await fs.stat(`${ buildPath }/${ dir }/${ file }`);
      if (stats.isDirectory()) {
        try {
          await sftp.mkdir(`${ publishPathTmp }/${ dir }/${ file }`);
        } catch (errTmp) {
          console.error(errTmp.message);
        }
        await treeDir(`/${ dir }/${ file }`);
      } else {
        await sftp.fastPut(`${ buildPath }/${ dir }/${ file }`, `${ publishPathTmp }/${ dir }/${ file }`);
      }
    }
  };
  await treeDir("");
  
  try {
    let cmd = "";
    cmd += `mkdir -p ${ publishPath }`;
    cmd += ` ; rm -rf ${ publishPath }/*`;
    cmd += ` ; mv -f ${ publishPathTmp }/* ${ publishPath }/`;
    cmd += ` ; rmdir ${ publishPathTmp }`;
    data = await ssh.exec(cmd);
  } catch (err) {
    console.error(err);
  }
  
  if (data) {
    console.log(data);
  }
  
  await ssh.close();
})();
