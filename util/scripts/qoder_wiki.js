const fs = require("fs/promises");
const path = require("path");

const fromProjectPath = "D:/hugjs/nest/";
const rootDir = path.resolve(__dirname, "../../");

const type = "deno"; // deno | rust

async function exec() {
  console.log("源项目路径：", fromProjectPath);
  console.log("目标项目路径：", rootDir + "/repowiki/" + type + "/");
  
  // 删除文件夹
  await fs.rm(rootDir + "/repowiki/" + type + "/", { recursive: true, force: true });
  
  // 复制文件夹
  await fs.cp(
    fromProjectPath + ".qoder/repowiki/zh/content/",
    rootDir + "/repowiki/" + type + "/",
    {
      recursive: true,
    },
  );
  
  // 递归文件, 替换 file:// 为 https://github.com/sail-sail/nest/blob/main/
  const walk = async (dir) => {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        await walk(filePath);
      } else if (stat.isFile() && file.endsWith(".md")) {
        let content = await fs.readFile(filePath, "utf-8");
        content = content.replaceAll("file://", "https://github.com/sail-sail/nest/blob/main/");
        content = content.replaceAll("<cite>", "");
        content = content.replaceAll("</cite>", "");
        await fs.writeFile(filePath, content, "utf-8");
        console.log("处理文件：", filePath);
      }
    }
  };
  
  await walk(rootDir + "/repowiki/" + type + "/");
  
  console.log("完成");
  
}

exec();
