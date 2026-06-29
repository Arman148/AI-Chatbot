import React, { useRef, useState } from "react";
import Button from "../../ui/button/Button";
import "./style.css";
import { addStyles, EditableMathField, MathField } from "react-mathquill";

addStyles(); // injects MathQuill CSS once

interface MathNoteOverlayProps {
  onClose: () => void;
  onChangeLatex: (value: string) => void;
  onInsertIntoChat: () => void;
}

const MathNoteOverlay: React.FC<MathNoteOverlayProps> = ({
  onClose,
  onChangeLatex,
  onInsertIntoChat,
}) => {
  const [latexValue, setLatexValue] = useState<string>("");
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const mathFieldRef = useRef<MathField | null>(null);

  const handleChange = (mf: MathField) => {
    const value = mf.latex();
    setLatexValue(value);
    onChangeLatex(value);
  };

  const handleTogglePalette = () => {
    setIsPaletteOpen((prev) => !prev);
  };

  const applyCmd = (fn: (mf: MathField) => void) => {
    const mf = mathFieldRef.current;
    if (!mf) return;
    fn(mf);
    const value = mf.latex();
    setLatexValue(value);
    onChangeLatex(value);
  };

  const handleInsertClick = () => {
    if (!latexValue.trim()) return;
    onInsertIntoChat();
  };

  return (
    <div className="math-note-overlay">
      <div className="math-note-card">
        <div className="math-note-header">
          <span className="math-note-title">Math note</span>
          <Button
            variant="glass"
            onClick={onClose}
            className="math-note-close-btn"
          >
            ✕
          </Button>
        </div>

        <div className="math-note-preview">
          {latexValue ? (
            <span className="math-note-preview-text">{latexValue}</span>
          ) : (
            <span className="math-note-preview-placeholder">
              Start typing in the editor below…
            </span>
          )}
        </div>

        <div className="math-note-editor">
          <div className="math-note-editor-field-wrapper">
            <EditableMathField
              latex={latexValue}
              mathquillDidMount={(mf) => {
                mathFieldRef.current = mf;
              }}
              onChange={handleChange}
              className="math-note-mathfield"
            />
          </div>

          {isPaletteOpen && (
            <div className="math-note-palette">
              <button
                type="button"
                className="math-note-palette-btn"
                onClick={() =>
                  applyCmd((mf) => {
                    mf.cmd("\\frac");
                  })
                }
              >
                a/b
              </button>

              <button
                type="button"
                className="math-note-palette-btn"
                onClick={() =>
                  applyCmd((mf) => {
                    mf.cmd("^");
                  })
                }
              >
                x²
              </button>

              <button
                type="button"
                className="math-note-palette-btn"
                onClick={() =>
                  applyCmd((mf) => {
                    mf.cmd("_");
                  })
                }
              >
                xₙ
              </button>

              <button
                type="button"
                className="math-note-palette-btn"
                onClick={() =>
                  applyCmd((mf) => {
                    mf.write("\\int_{a}^{b} ");
                  })
                }
              >
                ∫
              </button>

              <button
                type="button"
                className="math-note-palette-btn"
                onClick={() =>
                  applyCmd((mf) => {
                    mf.write("\\left|x\\right|");
                  })
                }
              >
                |x|
              </button>

              <button
                type="button"
                className="math-note-palette-btn"
                onClick={() =>
                  applyCmd((mf) => {
                    mf.cmd("\\sqrt");
                  })
                }
              >
                √x
              </button>

              <button
                type="button"
                className="math-note-palette-btn"
                onClick={() =>
                  applyCmd((mf) => {
                    mf.cmd("\\omega");
                  })
                }
              >
                ω
              </button>

              <button
                type="button"
                className="math-note-palette-btn"
                onClick={() =>
                  applyCmd((mf) => {
                    mf.write("\\mathcal{F}");
                  })
                }
              >
                𝓕
              </button>
            </div>
          )}

          <div className="math-note-footer-row">
            <Button
              variant="glass"
              className="math-note-insert-btn"
              onClick={handleInsertClick}
            >
              Insert into chat
            </Button>

            <Button
              variant="glass"
              className="math-note-dictionary-btn"
              onClick={handleTogglePalette}
            >
              {isPaletteOpen ? "Hide symbols" : "Symbols"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathNoteOverlay;
