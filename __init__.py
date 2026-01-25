import os

# 版本定义
# __version__ = "2.1.13"
# VERSION = __version__

# 节点注册
NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]

WEB_DIRECTORY = os.path.join(os.path.dirname(__file__), 'web')

# 当前目录设置
# current_directory = os.path.dirname(os.path.abspath(__file__))
NODE_JS = ["web/hNodeAlignPro.js", "web/hNodeAlignPro_cfg.js"] # , "web/hNodeAlignPro_settings.js", "web/hNodeAlignPro_n2.js"