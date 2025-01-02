1# 创建一个目录用来保存生成的 HTML 文件
$OutputDir = "out"
if (-not (Test-Path -Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir
}

# 遍历指定目录中的每个 Markdown 文件
$MarkdownFiles = Get-ChildItem -Path "" -Filter "*.md"
foreach ($File in $MarkdownFiles) {
    # 构造输出 HTML 文件的路径
    $OutputFile = Join-Path -Path $OutputDir -ChildPath ($File.BaseName + ".html")

    # 执行 Pandoc 命令进行转换
    pandoc $File.FullName -o $OutputFile
}
