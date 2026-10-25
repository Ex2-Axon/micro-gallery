from __future__ import annotations

import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent
PYTHON_TOOLS_DIRECTORY = PROJECT_ROOT / "python-tools"
sys.path.insert(0, str(PYTHON_TOOLS_DIRECTORY))

from template_registrar_ui import main


if __name__ == "__main__":
    main()
