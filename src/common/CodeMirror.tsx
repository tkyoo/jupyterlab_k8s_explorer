import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { StreamLanguage } from '@codemirror/language';
import { yaml as codemirrorYaml } from '@codemirror/legacy-modes/mode/yaml';
import yaml from 'js-yaml';

import React from 'react';

type CodeMirrorComponentProps = {
  code: any;
};

type CodeMirrorState = {
  state?: string;
};

class CodeMirrorComponent extends React.Component<
  CodeMirrorComponentProps,
  CodeMirrorState
> {
  constructor(prop: CodeMirrorComponentProps) {
    super(prop);
    this.state = {
      // openModal: this.props.openModal
    };
  }

  render(): JSX.Element {
    return (
      <CodeMirror
        theme={sublime}
        value={yaml.dump(this.props.code)}
        height="90%"
        width="50rem"
        extensions={[StreamLanguage.define(codemirrorYaml)]}
      />
    );
  }
}

export { CodeMirrorComponent };
