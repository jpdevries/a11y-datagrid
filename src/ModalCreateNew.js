import React, { Component } from 'react';

import slug from 'slugg';

export default class ModalCreateNew extends Component {
  componentDidMount() {
    this.setState({
      previouslyFocusedItem: document.activeElement
    })
    this.keyInput.focus();
  }
  componentWillUnmount() {
    if(this.state.previouslyFocusedItem) {
      this.state.previouslyFocusedItem.focus();
    }
  }
  render() {
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
    
    return (
      <dialog open inert>
        <h1>Create New Setting</h1>
        <form action="" className="new-setting">
          <div className="new-key field">
            <details open>
              <summary><label htmlFor="new-key">Key</label></summary>
              <input ref={(input) => { this.keyInput = input; }} required type="text" id="new-key" name="new-key" placeholder="mx.foo" />
              <p>
                <small>The key for the Setting. It will be available in your content via the [[++key]] placeholder.</small>
              </p>
            </details>
            
            
          </div>
          <div className="new-name field">
            <details open>
              <summary><label htmlFor="new-name">Name</label></summary>
              <input type="text" id="new-name" name="new-name" placeholder="Foo" />
              <p>
                <small>A Name for the Setting. This can be a Lexicon Entry based on the key, following the format "setting_" + key.</small>
              </p>
            </details>
          </div>
          <div className="new-desc field">
            <details>
              <summary><label htmlFor="new-desc">Description</label></summary>
              <textarea name="new-desc" id="new-desc" cols="30" rows="3"></textarea>
              <p>
                <small>A short description of the Setting. This can be a Lexicon Entry based on the key, following the format "setting_" + key + "_desc".</small>
              </p>
            </details>
          </div>
          <div className="new-xtype field">
            <details open>
              <summary><label htmlFor="new-xtype">Field Type</label></summary>
              <select name="new-xtype" id="new-xtype" value="textfield">
                {xtypes}
              </select>
              <p>
                <small>The field type of the setting. This can be: textfield, textarea, or boolean.</small>
              </p>
            </details>
          </div>
          <div className="new-namespace field">
            <details open>
              <summary><label htmlFor="new-namespace">Namespace</label></summary>
              <select name="new-namespace" id="new-namespace">
                {optgroups}
              </select>
              <p>
                <small>The Namespace that this Setting is associated with. The default Lexicon Topic will be loaded for this Namespace when grabbing Settings.</small>
              </p>
            </details>
          </div>
          <div className="new-lexicon field">
            <details>
              <summary><label htmlFor="new-lexicon">Lexicon</label></summary>
              <input type="text" name="new-lexicon" id="new-lexicon" />
              <p>
                <small>Enter the key of the lexicon entry for the area here. If there is no lexicon entry, it will just display the area key.
                  Core Areas: authentication, caching, file, furls, gateway, language, manager, session, site, system</small>
              </p>
            </details>
          </div>
          <div className="new-value field">
            <label htmlFor="new-value">Value</label>
            <textarea name="new-value" id="new-value" cols="30" rows="3"></textarea>
          </div>
          <footer className="sometimes flexible button-bar">
            <button type="reset" onClick={props.handleClose}>Close</button>
            <button>Save</button>
          </footer>
        </form>
      </dialog>
    );
  }
}