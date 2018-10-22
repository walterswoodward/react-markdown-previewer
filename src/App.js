import React, { Fragment, Component } from "react";
import "./index.css";
const ReactMarkdown = require("react-markdown/with-html");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: initial_text,
      editorMaximized: false,
      previewMaximized: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleEditorWindow = this.toggleEditorWindow.bind(this);
    this.togglePreviewWindow = this.togglePreviewWindow.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }

  toggleEditorWindow() {
    if (this.state.editorMaximized === false) {
      this.setState({
        editorMaximized: true,
        previewMaximized: false
      });
    } else if (this.state.editorMaximized === true) {
      this.setState({
        editorMaximized: false,
        previewMaximized: false
      });
    }
  }

  togglePreviewWindow() {
    if (this.state.previewMaximized === false) {
      this.setState({
        previewMaximized: true,
        editorMaximized: false
      });
    } else if (this.state.previewMaximized === true) {
      this.setState({
        previewMaximized: false,
        editorMaximized: false
      });
    }
  }

  render() {
    console.log("this.state:", this.state);
    let editorView;
    let previewView;
    let editorToggleViewText;
    let previewToggleViewText;
    if (
      this.state.editorMaximized === false &&
      this.state.previewMaximized === false
    ) {
      editorView = "editor_container";
      previewView = "preview_container";
      editorToggleViewText = "Click to Maximize";
      previewToggleViewText = "Click to Maximize";
    } else if (
      this.state.editorMaximized === true &&
      this.state.previewMaximized === false
    ) {
      editorView = "editor_container_maximized";
      previewView = "preview_container_minimized";
      editorToggleViewText = "Click to Minimize";
    } else if (
      this.state.previewMaximized === true &&
      this.state.editorMaximized === false
    ) {
      previewView = "preview_container_maximized";
      editorView = "editor_container_minimized";
      previewToggleViewText = "Click to Minimize";
    }
    return (
      <div className="container">
        <div id={editorView} className="converter">
          <div id="editor_toolbar">
            <Toolbar text="Editor" />
            <div id="editor_toggleview" onClick={this.toggleEditorWindow}>
              {editorToggleViewText}
            </div>
          </div>
          <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        </div>
        <div id={previewView} className="converter">
          <div id="preview_toolbar">
            <Toolbar text="Previewer" />
            <div id="preview_toggleview" onClick={this.togglePreviewWindow}>
              {previewToggleViewText}
            </div>
          </div>
          <div id="preview">
            <Preview
              markdown={this.state.markdown}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const Toolbar = props => {
  return <Fragment>{props.text}</Fragment>;
};

const Editor = props => {
  return (
    <textarea
      value={props.markdown}
      onChange={props.onChange}
      type="text"
      id="editor"
    />
  );
};

const Preview = props => {
  return <ReactMarkdown source={props.markdown} escapeHtml={false} />;
};
const initial_text = `# H1
## H2
### H3
#### H4
##### H5
###### H6

_italics_
*italics*

__bold__
**bold**

1. Ordered...
2. ...list items

* Unordered...
* ...list

[inline-style link](https://www.google.com)

[inline-style link with title](https://www.google.com "Google's Homepage")

For a useful markdown syntax: [![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

\`\`\`javascript
This is a code-block
var s = "JavaScript syntax highlighting";
alert(s);
\`\`\`

Inline \`code\` has escaped \`back-ticks around\` it.
> This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. 

`;

// 
//  a blockquote, an image, and bolded text