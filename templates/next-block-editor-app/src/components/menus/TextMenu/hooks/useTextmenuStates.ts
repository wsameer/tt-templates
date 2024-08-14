import { Editor, useEditorState } from '@tiptap/react'
import { useCallback, useMemo } from 'react'
import deepEql from 'fast-deep-equal'
import { ShouldShowProps } from '../../types'
import { isCustomNodeSelected, isTextSelected } from '@/lib/utils'

export const useTextmenuStates = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: () => {
      return {
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
        isStrike: editor.isActive('strike'),
        isUnderline: editor.isActive('underline'),
        isCode: editor.isActive('code'),
        isSubscript: editor.isActive('subscript'),
        isSuperscript: editor.isActive('superscript'),
        isAlignLeft: editor.isActive({ textAlign: 'left' }),
        isAlignCenter: editor.isActive({ textAlign: 'center' }),
        isAlignRight: editor.isActive({ textAlign: 'right' }),
        isAlignJustify: editor.isActive({ textAlign: 'justify' }),
        currentColor: editor.getAttributes('textStyle')?.color || undefined,
        currentHighlight: editor.getAttributes('highlight')?.color || undefined,
        currentFont: editor.getAttributes('textStyle')?.fontFamily || undefined,
        currentSize: editor.getAttributes('textStyle')?.fontSize || undefined,
      }
    },
    equalityFn: deepEql,
  })

  const shouldShow = useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (!view) {
        return false
      }

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement
      const node = nodeDOM || domAtPos

      if (isCustomNodeSelected(editor, node)) {
        return false
      }

      return isTextSelected({ editor })
    },
    [editor],
  )

  return {
    shouldShow,
    ...states,
  }
}
