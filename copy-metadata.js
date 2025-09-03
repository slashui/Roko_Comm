const fs = require('fs');
const path = require('path');

// 定义源文件和目标目录
const sourceFile = 'app/[locale]/(dashboard)/(route)/course/444/metadata.json';
const targetDirs = [
  'app/[locale]/(dashboard)/(route)/course/111',
  'app/[locale]/(dashboard)/(route)/course/123'
];

// 复制文件的函数
function copyMetadata() {
  try {
    // 检查源文件是否存在
    if (!fs.existsSync(sourceFile)) {
      console.error(`源文件不存在: ${sourceFile}`);
      return;
    }

    // 读取源文件内容
    const sourceContent = fs.readFileSync(sourceFile, 'utf8');
    console.log(`成功读取源文件: ${sourceFile}`);

    // 复制到每个目标目录
    targetDirs.forEach(targetDir => {
      try {
        // 确保目标目录存在
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
          console.log(`创建目录: ${targetDir}`);
        }

        // 目标文件路径
        const targetFile = path.join(targetDir, 'metadata.json');
        
        // 写入文件
        fs.writeFileSync(targetFile, sourceContent, 'utf8');
        console.log(`成功复制到: ${targetFile}`);
      } catch (error) {
        console.error(`复制到 ${targetDir} 失败:`, error.message);
      }
    });

    console.log('所有复制操作完成!');
  } catch (error) {
    console.error('复制过程中发生错误:', error.message);
  }
}

// 执行复制操作
copyMetadata();