import React from 'react'
import {
  Editor,
  EditorState,
  convertFromRaw,
} from 'draft-js'

const Description = ({des}) => (
  <Editor
  readOnly={true}
  editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(des)))}/>
)
export default Description
