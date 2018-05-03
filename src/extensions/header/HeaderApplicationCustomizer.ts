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
import * as $ from 'jquery';
import * as moment from 'moment';
require('./jquery.cycle.all.js');
require('moment-timezone');
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderApplicationCustomizerProperties {
    // This is an example; replace with your own property
    stockJsonFileRelativeUri: string;
    weatherJsonFilerelativeUri: string;
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
                            <a class="fuse-siteLogo-link">
                                <img class="fuse-siteLogo-Img">
                            </a>
                        </div>
                        <div class="fuse-slides-container">
                            <div class="fuse-weather-slides" style="position: relative; overflow: hidden;">
                            </div>
                            <div class="fuse-stock-slides" style="overflow: hidden;">
                            </div>
                        </div>
                    </div>
                    <div class="fuse-search-container">
                    </div>
                    <div class="clear" />
                </div>
                <div class="menu-container">
                    <div class="menu">
                        <ul>
                            <li>
                                <a href="${this.context.pageContext.site.absoluteUrl}">Home</a>
                            </li>
                            <li>
                                <a href="#">Corporate</a>
                                <ul>
                                    <li>
                                        <a href="${this.context.pageContext.site.absoluteUrl}/depts">Departments</a>
                                        <ul>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/depts/hr">Human Resources</a>
                                            </li>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/depts/it">IT</a>
                                            </li>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/depts/Accounting">Accounting</a>
                                            </li>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/depts/Marketing">Marketing</a>
                                            </li>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/depts/FunCommittee">Fun Committee</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div class="menu-subMenugroup">About</div>
                                        <ul>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/SitePages/OurHistory.aspx">Our History</a>
                                            </li>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/SitePages/CoreValues.aspx">Core Values</a>
                                            </li>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/SitePages/LeaderShipTeam.aspx">LeaderShip Team</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Operations</a>
                                <ul>
                                    <li>
                                        <a href="${this.context.pageContext.site.absoluteUrl}/services">Services</a>
                                        <ul>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/services/SitePages/EmergencyManagement.aspx">Emergency Management</a>
                                            </li>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/services/SitePages/CommunityDevelopment.aspx">Community Development</a>
                                            </li>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/services/SitePages/InternationalRelief.aspx">International Relief</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Offices</a>
                                <ul>
                                    <li>
                                        <div class="menu-subMenugroup">Offices</div>
                                        <ul>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/SitePages/Austin.aspx">Austin</a>
                                            </li>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/SitePages/Phoenix.aspx">Phoenix</a>
                                            </li>
                                            <li>
                                                <a href="${this.context.pageContext.site.absoluteUrl}/SitePages/Baltimore.aspx">Baltimore</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="${this.context.pageContext.site.absoluteUrl}/SitePages/HelpCenter.aspx">HelpCenter</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
      `;
                this._setCompositeHeaderVisibility(false);
                this._renderSiteLogo();
                this._renderSearchControl(this.context.pageContext.site.absoluteUrl);
                this._renderStockSlides();
                this._renderWeatherSlides();
                this._renderMegaMenu();
            }
        }
    }
    private _renderSiteLogo(): void {
        $('.fuse-siteLogo-Img').attr('src', this.context.pageContext.web.logoUrl);
        $('.fuse-siteLogo-Img').attr('alt', this.context.pageContext.web.title);
        $('.fuse-siteLogo-link').attr('href', this.context.pageContext.site.serverRelativeUrl);
    }
    private _setCompositeHeaderVisibility(isVisible: boolean): void {
        var compositeHeaderInterval = setInterval(function () {
            var header = $('.ms-compositeHeader');
            if (header.length > 0) {
                if (isVisible) {
                    $('.ms-compositeHeader').show();
                } else {
                    $('.ms-compositeHeader').hide();
                }
            }
        }, 100);
    }
    private _renderSearchControl(webAbsoluteUrl: string): void {
        var searchBoxContainerInterval = setInterval(function () {
            var children = $('.ms-compositeHeader-searchBoxContainer').children();
            if (children.length > 0) {
                var searchBoxContainer = $('.ms-compositeHeader-searchBoxContainer').prop("outerHTML");
                $('.fuse-search-container').html(searchBoxContainer);
                clearInterval(searchBoxContainerInterval);
                $(".fuse-search-container form").submit(function (event) {
                    var searchValue = $(".fuse-search-container form input").val();
                    window.location.href = webAbsoluteUrl + '/_layouts/15/search.aspx/siteall?q=' + searchValue;
                    event.preventDefault();
                });
                $('.ms-compositeHeader').remove();
            }
        }, 100);
    }
    private _renderStockSlides(): void {
        $('.fuse-stock-slides').empty();
        var stockJsonLocation = this.context.pageContext.site.absoluteUrl + this.properties.stockJsonFileRelativeUri;
        $(".fuse-stock-slides").load(stockJsonLocation, function () {
            ($('.fuse-stock-slides') as any).cycle({ timeout: 3000, speed: 700, fx: 'scrollDown', next: ".fuse-stock-slides", pause: 1 });
        });
    }
    private _renderMegaMenu(): void {
        $(document).ready(function () {
            $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
            $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
            $(".menu > ul").before("<div class=\"menu-mobile\"></div>");
            $(".menu > ul > li").hover(
                function (e) {
                    if ($(window).width() > 943) {
                        $(this).children("ul").fadeIn(150);
                        e.preventDefault();
                    }
                }, function (e) {
                    if ($(window).width() > 943) {
                        $(this).children("ul").fadeOut(150);
                        e.preventDefault();
                    }
                }
            );
            $(".menu > ul > li").click(function () {
                if ($(window).width() < 943) {
                    $(this).children("ul").fadeToggle(150);
                }
            });
            $(".menu-mobile").click(function (e) {
                $(".menu > ul").toggleClass('show-on-mobile');
                e.preventDefault();
            });
        });
    }
    private _renderWeatherSlides(): void {
        $('.fuse-weather-slides').empty();
        var firstWeatherItem = '5128638#New York#US/Eastern,4254010#Austin#US/Central,2643743#London#Europe/London,2968815#Paris#Europe/Paris,745044#Istanbul#Europe/Istanbul,292223#Dubai#Asia/Dubai,1273294#Delhi#Asia/Kolkata,1796236#Shanghai#Asia/Shanghai';
        if (firstWeatherItem != null && firstWeatherItem != "") {
            var timeZoneCodes = firstWeatherItem.split(',');
            var timeZoneTimes = this._getCurrentTimeByIdentifier(timeZoneCodes);
            var arrTimes = timeZoneTimes.split(',');
            var weatherJsonLocation = this.context.pageContext.site.absoluteUrl + this.properties.weatherJsonFilerelativeUri;
            $.getJSON(weatherJsonLocation, function (data) {
                var weatherImageUrl = "https://openweathermap.org/img/w/";
                if (data !== undefined && data.list !== undefined) {
                    for (var i = 0; i < data.cnt; i++) {
                        var tempInFahrenheit = Math.round(data.list[i].main.temp) + " &#176;F";
                        var tempInCelcius = Math.round((data.list[i].main.temp - 32) * .5556) + " " + "&#176;C";
                        var locationLine = data.list[i].name;
                        if (data.list[i].sys.country != "") {
                            locationLine = locationLine + ", " + data.list[i].sys.country;
                        }
                        $('.fuse-weather-slides').append("<div><img alt='Weather Image' src='" + weatherImageUrl + data.list[i].weather[0].icon + '.png' + "'/><span class='fuse-weather-data'>" + tempInCelcius + " / " + tempInFahrenheit + " " + arrTimes[i] + "<br/>" + locationLine + "<br/><span id='fuse-text-openweathermap' style='font-size:10px'>OpenWeatherMap</span></span></div>");
                    }
                    ($('.fuse-weather-slides') as any).cycle({ timeout: 5000, speed: 500, fx: 'scrollDown', next: ".fuse-weather-slides", pause: 1 });
                }
            });
        }
    }
    private _getCurrentTimeByIdentifier(timeZoneCodes): string {
        var sTimeZoneTimes = "";
        var comma = ","; //did not like the HTML code here
        var sArritems = []; // array join
        for (var i = 0; i < timeZoneCodes.length; i++) {
            //the timezone ids are in the format CityID#CityName#TimeZoneID, where the city name is always to the right of the CityID code
            var hereTime = moment(Date());
            var timeZoneIds = timeZoneCodes[i].split("#");
            if (i == 0) {
                let nowThereTime = (hereTime as any).tz(timeZoneIds[2]).format('h:mma');
                sArritems[i] = nowThereTime;
            }
            else {
                let nowThereTime = (hereTime as any).tz(timeZoneIds[2]).format('h:mma');
                sArritems[i] = comma + nowThereTime;
            }
        }
        sTimeZoneTimes = "" + sArritems.join("");
        return sTimeZoneTimes;
    }
    private _onDispose(): void {
    }
}
