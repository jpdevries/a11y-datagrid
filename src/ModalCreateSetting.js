import React, { Component } from 'react';

export default function ModalCreateSetting(props) {
  return (
    <section>
      <h1>Create New Setting</h1>

      <div className="field">
        <label htmlFor="key">Key&ensp;</label>
        <p>
          The key for the Setting. It will be available in your content via the [[++key]] placeholder.
        </p>
        <input type="text" name="key" id="key" />
      </div>

      <div className="field">
        <label htmlFor="name">Name&ensp;</label>
        <p>
          A Name for the Setting. This can be a Lexicon Entry based on the key, following the format "setting_" + key.
        </p>
        <input type="text" name="name" id="name" />
      </div>

      <div className="field">
        <label htmlFor="description">Description:&ensp;</label>
        <p>
          A short description of the Setting. This can be a Lexicon Entry based on the key, following the format "setting_" + key + "_desc".
        </p>
        <input type="text" name="description" id="description" />
      </div>

      <div className="field">
        <label htmlFor="description">Field Type:&ensp;</label>
        <p>
          The field type of the setting. This can be: textfield, textarea, or boolean.
        </p>
        <input type="text" name="description" id="description" />
      </div>

      <div className="field">
        <label htmlFor="namespace">Namespace:&ensp;</label>
        <p>
          The Namespace that this Setting is associated with. The default Lexicon Topic will be loaded for this Namespace when grabbing Settings.
        </p>
        <input type="text" name="namespace" id="namespace" />
      </div>

      <div className="field">
        <label htmlFor="lexicon">Area Lexicon Entry:&ensp;</label>
        <p>
        Enter the key of the lexicon entry for the area here. If there is no lexicon entry, it will just display the area key.
Core Areas: authentication, caching, file, furls, gateway, language, manager, session, site, system
        </p>
        <input type="text" name="lexicon" id="lexicon" />
      </div>

      <div className="field">
        <label htmlFor="value">Value:&ensp;</label>

        <textarea name="value" id="value"></textarea>
      </div>

      <footer>
        <button>Close</button>
        <button type="submit">Save</button>
      </footer>

    </section>
  );
}
