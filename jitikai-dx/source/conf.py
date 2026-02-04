# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = '自治会 改善案'
copyright = '2026, 近藤'
author = '近藤'
release = 'Ver 0.3'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = []

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

language = 'ja'

# -- Options for LaTeX output ------------------------------------------------
latex_engine = 'lualatex'

latex_elements = {
    'papersize': 'a4paper',
    'pointsize': '11pt',
    'fontpkg': r'\usepackage{luatexja}',
    'preamble': r'''
\usepackage[Hiragino,HaranoAji,Deluxe]{luatexja-preset} % 汎用的なプリセットを使用
\usepackage{indentfirst}
\usepackage{xurl} % 長いURLの改行を許可
''',
}

# 独自の Makefile ターゲットを尊重させるため
latex_use_xindy = True

latex_docclass = {'manual': 'ltjsbook'}

latex_elements = {
    'papersize': 'a4paper',
    'pointsize': '11pt',
    # (C) Polyglossiaパッケージを読み込まない
    'polyglossia': '',

    # (D) フォント設定：標準的な「原ノ味フォント」を使用する設定に変更
    'fontpkg': r'''
\usepackage[haranoaji,deluxe]{luatexja-preset}
''',

    # (E) プリアンブル設定
    'preamble': r'''
\usepackage{indentfirst}
\usepackage{xurl}
\renewcommand\familydefault{\sfdefault}   % 文書全体をサンセリフ（ゴシック体）にする
\renewcommand\kanjifamilydefault{\gtdefault}
''',
}
# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

# html_theme = 'alabaster'
html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
html_title = "自治会 デジタル化の改善案"
