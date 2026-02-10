#!/usr/bin/env python3
"""
视频脚本自动翻译工具
使用此脚本将英文 videoscript.md 翻译为中文 videoscript-zh.md
"""

import os
import re
from pathlib import Path

# 技术术语映射表（保持英文的术语）
KEEP_ENGLISH = [
    'DeFi', 'CDP', 'mint', 'burn', 'collateral', 'health factor', 
    'oracle', 'invariant', 'mock', 'fuzz', 'ERC20', 'Solidity',
    'Foundry', 'Chainlink', 'DAI', 'MakerDAO', 'USDC', 'USDT',
    'Wei', 'Ether', 'Gas', 'ABI', 'Remix'
]

# 功能性词汇翻译
TRANSLATIONS = {
    'deposit': '存入',
    'redeem': '赎回',
    'liquidate': '清算',
    'liquidation': '清算',
    'withdraw': '提取',
    'borrow': '借出',
    'lend': '借入',
    'stablecoin': '稳定币',
    'smart contract': '智能合约',
    'blockchain': '区块链',
    'wallet': '钱包',
    'test': '测试',
    'testing': '测试',
}

def translate_videoscript(input_path, output_path):
    """
    翻译视频脚本
    
    注意：此函数需要配合翻译API使用，如：
    - Google Translate API
    - DeepL API
    - OpenAI API
    
    建议使用方式：
    1. 导出所有英文内容
    2. 使用专业翻译工具（如DeepL）批量翻译
    3. 导入翻译结果，保持格式
    """
    
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取表格内容
    lines = content.split('\n')
    
    print(f"处理文件: {input_path}")
    print(f"总行数: {len(lines)}")
    print(f"\n建议：")
    print(f"1. 将此文件内容复制到翻译工具（如DeepL）")
    print(f"2. 翻译时保持表格格式 | 时间戳 | 内容 |")
    print(f"3. 保持技术术语：{', '.join(KEEP_ENGLISH[:5])}...")
    print(f"4. 保存为: {output_path}\n")
    
    return content

def find_untranslated_files(root_dir='.'):
    """查找所有未翻译的文件"""
    untranslated = []
    
    for root, dirs, files in os.walk(root_dir):
        if 'videoscript.md' in files:
            en_path = os.path.join(root, 'videoscript.md')
            zh_path = os.path.join(root, 'videoscript-zh.md')
            
            # 检查是否已翻译
            if not os.path.exists(zh_path):
                # 检查是否为待录制
                with open(en_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if '🎬 待录制' not in content and 'Coming Soon' not in content:
                        clips = len(re.findall(r'\|\s*\d{2}:\d{2}:\d{2}', content))
                        untranslated.append({
                            'path': en_path,
                            'output': zh_path,
                            'dir': root,
                            'clips': clips
                        })
    
    return sorted(untranslated, key=lambda x: x['clips'])

def main():
    print("=" * 70)
    print("视频脚本翻译工具")
    print("=" * 70)
    
    # 查找未翻译文件
    untranslated = find_untranslated_files()
    
    if not untranslated:
        print("\n✅ 所有文件都已翻译！")
        return
    
    print(f"\n找到 {len(untranslated)} 个未翻译文件:\n")
    
    total_clips = 0
    for i, item in enumerate(untranslated, 1):
        print(f"{i}. {item['dir']}")
        print(f"   Clips: {item['clips']}")
        print(f"   输入: {item['path']}")
        print(f"   输出: {item['output']}\n")
        total_clips += item['clips']
    
    print("=" * 70)
    print(f"总计需翻译: {total_clips} clips\n")
    
    print("推荐翻译流程:")
    print("1. 使用 DeepL (https://www.deepl.com/) - 最佳质量")
    print("2. 或使用 Google Translate API")
    print("3. 保持表格格式和技术术语")
    print("4. 口语化翻译风格\n")
    
    print("提示：可以使用以下命令批量导出文本:")
    print("  for file in untranslated:")
    print("    # 复制到剪贴板，粘贴到DeepL")
    print("    # 翻译后保存为 videoscript-zh.md\n")

if __name__ == '__main__':
    main()
