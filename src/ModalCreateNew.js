import React, { Component } from 'react';

import { launchIntoFullscreen, exitFullscreen } from './Utility';

import slug from 'slugg';

import update from 'react-addons-update';

import * as actions from './model/actions';
import store from './model/store';

import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
//import AceEditor from 'react-ace';

import 'brace/theme/github';



// Render editor


export default class ModalCreateNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullscreen: false,
      setting: {
        uuid: undefined,
        name: undefined,
        description: undefined,
        value: undefined,
        xtype: 'textfield',
        namespace: undefined,
        lexicon: undefined,
        area: undefined
      }

    };
  }

  componentWillMount() {
    const props = this.props;
    const xtypes = props.xtypes;

    console.log('xtypes!', xtypes);

    this.setState({
      setting: update(this.state.setting, {$merge: {
        namespace: props.view.namespace,
        area: props.view.area
      }})
    });
  }

  async componentDidMount() {
    this.setState({
      previouslyFocusedItem: document.activeElement
    })
    this.keyInput.focus();
    this.addListeners();
    
    const { default: AceEditor } = await import('react-ace');
    this.setState({
      ace: (
        <AceEditor
          mode="javascript"
          theme="github"
          onChange={(event) => {
          }}
          name="ace-desc"
          width="auto"
          height="auto"

        />
      )
    });
  }

  addListeners() {
    ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'].forEach((handler) => (
      document.addEventListener(handler, this.handleFullScreenChange)
    ));
  }

  removeListeners() {
    ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'].forEach((handler) => (
      document.removeEventListener(handler, this.handleFullScreenChange)
    ));
  }

  componentWillUnmount() {
    const props = this.props;

    if(this.state.previouslyFocusedItem) {
      this.state.previouslyFocusedItem.focus();
    }
    this.removeListeners();


  }

  handleFullScreenChange = (event) => {
    const fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement,
    isFullscreen = fullscreenElement ? true : false;

    this.setState({
      isFullscreen: (fullscreenElement) ? true : false
    });

  }



  render() {
    console.log(this.state);
    const props = this.props;

    const namespaces = props.namespaces;

    const optgroups = Object.keys(namespaces).map((key) => {

      const options = namespaces[key].map((namespace) => (
        <option key={namespace}>{namespace}</option>
      ));


      return (
        <optgroup key={key} label={key}>
         {options}
        </optgroup>
      );
    });

    const xtypes = props.xtypes.map((xtype) => {
      return (
        <option key={`new-${xtype}`} value={slug(xtype)}>{xtype}</option>
      );
    });

    const areas = props.areas.map((area) => {
      return (
        <option key={`new-${area}`} value={area}>{area}</option>
      );
    });

    return (
      <dialog open inert ref={(dialog) => { this.dialog = dialog; }}>
        <header>
          <h1>Create New Setting</h1>
          <label htmlFor="enter_fullscreen">
            <input type="checkbox" id="enter_fullscreen" name="enter_fullscreen" checked={this.state.isFullscreen} onChange={(event) => {
              if(event.target.checked) {
                launchIntoFullscreen(this.dialog);
              } else {
                exitFullscreen();
              }
              this.setState({
                isFullscreen: event.target.checked
              })
            }} />
            Fullscreen
          </label>
        </header>
        <form action="" className="new-setting" onSubmit={(event) => {
          event.preventDefault();
          store.dispatch(actions.addSetting(this.state.setting, props.view));
          props.handleClose();
        }}>
          <div className="new-key field">
            <label htmlFor="new-key">Key</label>
            <input ref={(input) => { this.keyInput = input; }} required type="text" id="new-key" name="new-key" placeholder="mx.foo" onChange={(event) => {
              this.setState({
                setting: update(this.state.setting, {$merge: {
                  uuid: event.target.value
                }})
              })
            }} />
            <p>
              <small>The key for the Setting. It will be available in your content via the <code>[[++{this.state.setting.uuid || 'key'}]]</code> placeholder.</small>
            </p>
          </div>

          <div className="new-xtype field">
            <label htmlFor="new-xtype">Field Type</label>
            <select name="new-xtype" id="new-xtype" value={this.state.setting.xtype} onChange={(event) => {
              this.setState({
                setting: update(this.state.setting, {$merge: {
                  xtype: event.target.value
                }})
              })
            }}>
              {xtypes}
            </select>
            <p>
              <small>Choose how to set values for this setting.</small>
            </p>
          </div>

          <div className="new-name field">
            <label htmlFor="new-name">Name</label>
            <input type="text" id="new-name" name="new-name" placeholder="Foo" onChange={(event) => {
              this.setState({
                setting: update(this.state.setting, {$merge: {
                  name: event.target.value
                }})
              })
            }} />
            <p>
              <small>An optional human friendly name for the setting.</small>
            </p>
          </div>

          <div className="new-namespace field">
            <label htmlFor="new-namespace">Namespace</label>
            <select name="new-namespace" id="new-namespace" value={this.state.setting.namespace} onChange={(event) => {
              this.setState({
                setting: update(this.state.setting, {$merge: {
                  namespace: event.target.value
                }})
              })
            }}>
              {optgroups}
            </select>
            <p>
              <small>The Namespace that this Setting is associated with.</small>
            </p>
          </div>

          <div className="new-area field">
            <label htmlFor="new-area">Area</label>
            <input type="text" name="new-area" id="new-area" list="area-datalist" value={this.state.setting.area} onChange={(event) => {
              this.setState({
                setting: update(this.state.setting, {$merge: {
                  area: event.target.value
                }})
              })
            }} />
              <datalist id="area-datalist">
              <select value={this.state.setting.area} onChange={(event) => {
                this.setState({
                  setting: update(this.state.setting, {$merge: {
                    area: event.target.value
                  }})
                })
              }}>
              <option key={`new-all`} value="all">All</option>
              {areas}
            </select>
            </datalist>
            <p>
              <small>Optionally organize this setting within an area.</small>
            </p>
          </div>
          <div className="new-desc field">
            <details>
              <summary><label htmlFor="new-desc">Description</label></summary>
              <textarea name="new-desc" id="new-desc" cols="30" rows="3" onChange={(event) => {
                this.setState({
                  setting: update(this.state.setting, {$merge: {
                    description: event.target.value
                  }})
                })
              }}></textarea>
              <p>
                <small>A short description of the Setting. <a aria-label="Using lexicon entries as descriptive values" href="https://rtfm.modx.com" target="_rtfmlexiconentry">This can be a Lexicon&nbsp;Entry</a>.</small>
              </p>
            </details>
          </div>
          <div className="new-lexicon field">
            <details>
              <summary><label htmlFor="new-lexicon">Lexicon</label></summary>
              <input type="text" name="new-lexicon" id="new-lexicon" onChange={(event) => {
                this.setState({
                  setting: update(this.state.setting, {$merge: {
                    lexicon: event.target.value
                  }})
                })
              }} />
              <p>
                <small>Plain language that is understandable here please.</small>
              </p>
            </details>
          </div>
          <div className="new-value field">
            <label htmlFor="new-value">Value</label>
            {this.state.ace || <h2>Loading</h2>}
          </div>
          <footer className="sometimes flexible button-bar">
            <button type="reset" onClick={props.handleClose}>Close</button>
            <button type="reset">Reset</button>
            <button type="submit">Save</button>
          </footer>
        </form>
      </dialog>
    );
  }
}

/*
<textarea hidden name="new-value" id="new-value" cols="30" rows="3" onChange={(event) => {
  this.setState({
    setting: update(this.state.setting, {$merge: {
      value: event.target.value
    }})
  })
}}></textarea>
*/
