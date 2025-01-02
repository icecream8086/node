# 创建一个目录用来保存生成的 DOCX 文件
$OutputDir = "out"
if (-not (Test-Path -Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir
}

# 自定义模板的路径
$TemplatePath = "C:\Users\zzbsn\Documents\自定义 Office 模板\template.dotx"

# 遍历指定目录中的每个 Markdown 文件
$MarkdownFiles = Get-ChildItem -Path "" -Filter "*.md"
foreach ($File in $MarkdownFiles) {
    # 构造输出 DOCX 文件的路径
    $OutputFile = Join-Path -Path $OutputDir -ChildPath ($File.BaseName + ".docx")

    # 执行 Pandoc 命令进行转换，并使用自定义模板
    pandoc $File.FullName -o $OutputFile --reference-doc=$TemplatePath
}
