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
    console.log('HeaderApplicationCustomizer._renderPlaceHolders()');
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
        <div class="fuse-header">
        <div class="fuse-header-titleArea">
            <div class="fuse-header-logoSlidesContainer">
                <div class="fuse-siteLogoContainer">
                    <a class="fuse-siteLogo-link" id="ctl00_onetidProjectPropertyTitleGraphic" href="/sites/fusedemonorthstarprime/">
                        <img alt="Northstar" src="/sites/fusedemonorthstarprime/SiteAssets/untitled.png">
                    </a>
                </div>
                <div class="fuse-slides-container">
                    <div class="fuse-weather-slides" style="position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 60px; left: 0px; display: none; z-index: 8; opacity: 1;">
                            <img alt="Weather Image" src="https://openweathermap.org/img/w/01n.png">
                            <span class="fuse-weather-data">4 °C / 39 °F 11:52pm
                                <br>New York, US
                                <br>
                                <span id="fuse-text-openweathermap" style="font-size:10px">OpenWeatherMap</span>
                            </span>
                        </div>
                        <div style="position: absolute; top: 60px; left: 0px; display: none; z-index: 8; opacity: 1; width: 205px; height: 47px;">
                            <img alt="Weather Image" src="https://openweathermap.org/img/w/02n.png">
                            <span class="fuse-weather-data">14 °C / 58 °F 10:52pm
                                <br>Austin, US
                                <br>
                                <span id="fuse-text-openweathermap" style="font-size:10px">OpenWeatherMap</span>
                            </span>
                        </div>
                        <div style="position: absolute; top: 60px; left: 0px; display: none; z-index: 8; opacity: 1; width: 205px; height: 47px;">
                            <img alt="Weather Image" src="https://openweathermap.org/img/w/10n.png">
                            <span class="fuse-weather-data">7 °C / 45 °F 4:52am
                                <br>London, GB
                                <br>
                                <span id="fuse-text-openweathermap" style="font-size:10px">OpenWeatherMap</span>
                            </span>
                        </div>
                        <div style="position: absolute; top: 60px; left: 0px; display: none; z-index: 8; opacity: 1; width: 205px; height: 47px;">
                            <img alt="Weather Image" src="https://openweathermap.org/img/w/01n.png">
                            <span class="fuse-weather-data">7 °C / 44 °F 5:52am
                                <br>Paris, FR
                                <br>
                                <span id="fuse-text-openweathermap" style="font-size:10px">OpenWeatherMap</span>
                            </span>
                        </div>
                        <div style="position: absolute; top: 60px; left: 0px; display: none; z-index: 8; opacity: 1; width: 205px; height: 47px;">
                            <img alt="Weather Image" src="https://openweathermap.org/img/w/01n.png">
                            <span class="fuse-weather-data">17 °C / 62 °F 6:52am
                                <br>Istanbul, TR
                                <br>
                                <span id="fuse-text-openweathermap" style="font-size:10px">OpenWeatherMap</span>
                            </span>
                        </div>
                        <div style="position: absolute; top: 60px; left: 0px; display: none; z-index: 8; opacity: 1; width: 205px; height: 47px;">
                            <img alt="Weather Image" src="https://openweathermap.org/img/w/01d.png">
                            <span class="fuse-weather-data">25 °C / 77 °F 7:52am
                                <br>Dubai, AE
                                <br>
                                <span id="fuse-text-openweathermap" style="font-size:10px">OpenWeatherMap</span>
                            </span>
                        </div>
                        <div style="position: absolute; top: 0px; left: 0px; display: block; z-index: 9; opacity: 1; width: 205px; height: 47px;">
                            <img alt="Weather Image" src="https://openweathermap.org/img/w/50d.png">
                            <span class="fuse-weather-data">30 °C / 86 °F 9:22am
                                <br>Delhi, IN
                                <br>
                                <span id="fuse-text-openweathermap" style="font-size:10px">OpenWeatherMap</span>
                            </span>
                        </div>
                        <div style="position: absolute; top: 0px; left: 0px; display: none; z-index: 1;">
                            <img alt="Weather Image" src="https://openweathermap.org/img/w/01d.png">
                            <span class="fuse-weather-data">25 °C / 77 °F 11:52am
                                <br>Shanghai, CN
                                <br>
                                <span id="fuse-text-openweathermap" style="font-size:10px">OpenWeatherMap</span>
                            </span>
                        </div>
                    </div>
                    <div class="fuse-stock-slides" style="overflow: hidden;">
                        <div style="position: absolute; top: 32px; left: 0px; display: none; z-index: 4; opacity: 1; width: 145px; height: 31px;">ADS ($0.14) (-0.07 %) $203.96</div>
                        <div style="position: absolute; top: 0px; left: 0px; display: block; z-index: 5; opacity: 1; width: 145px; height: 31px;">MSFT ($0.33) (-0.35 %) $94.26</div>
                        <div style="position: absolute; top: 32px; left: 0px; display: none; z-index: 4; opacity: 1; width: 145px; height: 31px;">GE $0.01 (0.07 %) $14.40</div>
                        <div style="position: absolute; top: 32px; left: 0px; display: none; z-index: 4; opacity: 1; width: 145px; height: 31px;">BA ($0.08) (-0.02 %) $342.79</div>
                    </div>
                </div>
            </div>
            <div class="fuse-search-container">
                <div class="fuse-searchBoxControl">
                    <input title="Search..." type="search" placeholder="Search..." />
                    <a role="button">
                        <img alt="Search" src="/_layouts/15/images/searchresultui.png?rev=44#ThemeKey=searchresultui">
                    </a>
                </div>
            </div>
            <div class="clear"/>
        </div>
        <div class="fuse-Header-MegaMenu-PseudoStatus ms-dialogHidden" id="fuse-Header-MegaMenu-Master-Wrapper">
            <div class="fuse-MegaMenu-Desktop-Master-Wrapper fuse-MegaMenu-Global-Master-Wrapper">
                <div class="fuse-MegaMenu-Desktop-FirstLevel-Wrapper">
                    <ul class="fuse-MegaMenu-Desktop-FirstLevel-TotalItems5">
                        <li class="fuse-MegaMenu-Desktop-FirstLevel-Menu-Item0">
                            <a title="Read More About Home" class="fuse-MegaMenu-Desktop-FirstLevel-Menu-Item fuse-MegaMenu-Desktop-FirstLevel-Menu-Item-Closed"
                                aria-label="Read More About Home" href="https://catsysdemo.sharepoint.com/sites/fusedemonorthstarprime/Pages/Home.aspx"
                                data-menuindex="0">Home</a>
                        </li>
                        <li class="fuse-MegaMenu-Desktop-FirstLevel-Menu-Item1">
                            <div tabindex="0" title="Corporate" class="fuse-MegaMenu-Desktop-FirstLevel-Menu-Item fuse-MegaMenu-Desktop-FirstLevel-Menu-Item-Open"
                                aria-label="Corporate" data-menuindex="1">Corporate</div>
                        </li>
                        <li class="fuse-MegaMenu-Desktop-FirstLevel-Menu-Item2">
                            <div tabindex="0" title="Operations" class="fuse-MegaMenu-Desktop-FirstLevel-Menu-Item fuse-MegaMenu-Desktop-FirstLevel-Menu-Item-Closed"
                                aria-label="Operations" data-menuindex="2">Operations</div>
                        </li>
                        <li class="fuse-MegaMenu-Desktop-FirstLevel-Menu-Item3">
                            <a title="Read More About My Point" class="fuse-MegaMenu-Desktop-FirstLevel-Menu-Item fuse-MegaMenu-Desktop-FirstLevel-Menu-Item-Closed"
                                aria-label="Read More About My Point" href="https://catsysdemo.sharepoint.com/sites/fusedemonorthstarprime/Pages/ttec%20Home.aspx"
                                data-menuindex="3">My Point</a>
                        </li>
                        <li class="fuse-MegaMenu-Desktop-FirstLevel-Menu-Item4">
                            <a title="Read More About Help Center" class="fuse-MegaMenu-Desktop-FirstLevel-Menu-Item fuse-MegaMenu-Desktop-FirstLevel-Menu-Item-Closed"
                                aria-label="Read More About Help Center" href="https://catsysdemo.sharepoint.com/sites/fusedemonorthstarprime/helpcenter/Pages/Home.aspx"
                                data-menuindex="4">Help Center</a>
                        </li>
                    </ul>
                </div>
                <div class="fuse-MegaMenu-Desktop-SecondLevel-Master-Wrapper">
                    <div class="fuse-MegaMenu-Desktop-SecondLevel-Container fuse-MegaMenu-Desktop-SecondLevel-Container-ColumnCount3" style="display: block;"
                        data-menuindex="1">
                        <div class="fuse-MegaMenu-Desktop-SecondLevel-QuickLaunchBar-Master-Wrapper"></div>
                        <div class="fuse-MegaMenu-Desktop-SecondLevel-Column-Wrapper">
                            <div class="fuse-MegaMenu-Desktop-SecondLevel-Group-Wrapper">
                                <div class="fuse-MegaMenu-Desktop-SecondLevel-Group-Header" style="color:">Departments</div>
                                <div class="fuse-MegaMenu-Desktop-SecondLevel-Group-Items-Wrapper">
                                    <div class="fuse-MegaMenu-Desktop-SecondLevel-Group-Items-Link">
                                        <a title="Read More About Human Resources" class="fuse-MegaMenu-Desktop-SecondLevel-Group-Item" style="color:;" aria-label="Read More About Human Resources"
                                            href="https://catsysdemo.sharepoint.com/sites/fusedemonorthstarprime/depts/hr/Pages/Home.aspx"
                                            target="_self">Human Resources</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fuse-MegaMenu-Desktop-SecondLevel-Container fuse-MegaMenu-Desktop-SecondLevel-Container-ColumnCount3" data-menuindex="2">
                        <div class="fuse-MegaMenu-Desktop-SecondLevel-QuickLaunchBar-Master-Wrapper"></div>
                        <div class="fuse-MegaMenu-Desktop-SecondLevel-Column-Wrapper">
                            <div class="fuse-MegaMenu-Desktop-SecondLevel-Group-Wrapper">
                                <div class="fuse-MegaMenu-Desktop-SecondLevel-Group-Header" style="color:">Services</div>
                                <div class="fuse-MegaMenu-Desktop-SecondLevel-Group-Items-Wrapper">
                                    <div class="fuse-MegaMenu-Desktop-SecondLevel-Group-Items-Link">
                                        <a title="Read More About Emergency Management" class="fuse-MegaMenu-Desktop-SecondLevel-Group-Item" style="color:;" aria-label="Read More About Emergency Management"
                                            href="https://catsysdemo.sharepoint.com/sites/fusedemonorthstarprime/services/Pages/default.aspx"
                                            target="_self">
                                            <span class="fa fa-plus-square" style="color:"></span>Emergency Management</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      `;
      }
    }
  }
  private _onDispose(): void {
  }
}
