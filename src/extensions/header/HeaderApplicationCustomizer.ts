import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderProvider,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HeaderApplicationCustomizerStrings';
import styles from './HeaderAppCustomizer.module.scss';
const LOG_SOURCE: string = 'HeaderApplicationCustomizer';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderApplicationCustomizerProperties> {
  private _headerContent: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    this.context.placeholderProvider.changedEvent.add(this, this._renderHeaderContent);
    this._renderHeaderContent();
    return Promise.resolve();
  }

  private _renderHeaderContent(): void {
    console.log('HelloWorldApplicationCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',
      this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));
    // Handling the top placeholder
    if (!this._headerContent) {
      this._headerContent =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._headerContent) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }
      if (this._headerContent.domElement) {
        require('./HeaderAppCustomizer.scss');
        this._headerContent.domElement.innerHTML = `
                    <div class="app">
                      <div class="ms-bgColor-themeDark ms-fontColor-white top">
                        <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> Welcome
                      </div>
                    </div>`;
      }
    }
  }
  private _onDispose(): void {
  }
}
